import { FastifyInstance } from 'fastify'
import { prisma } from '../db'
import { z } from 'zod'
import multipart from '@fastify/multipart'
import { promises as fs } from 'fs'
import { createReadStream } from 'fs'
import path from 'path'
import { ensureAuth } from '../auth'

export default async function documentosRoutes(app: FastifyInstance) {
  await app.register(multipart)

  app.get('/solicitudes/:id/documentos', async (req) => {
    const solicitudId = (req as any).params.id as string
    const list = await prisma.documento.findMany({ where: { solicitudId }, orderBy: { createdAt: 'desc' } })
    return list
  })

  app.post('/documentos/upload', { preHandler: ensureAuth }, async (req) => {
    const data = await (req as any).file()
    const solicitudId = (req as any).headers['x-solicitud-id'] as string
    const ownerId = (req as any).headers['x-owner-id'] as string | undefined
    const dir = path.join(process.cwd(), 'uploads')
    await fs.mkdir(dir, { recursive: true })
    const filename = `${Date.now()}-${data.filename}`
    const filepath = path.join(dir, filename)
    await fs.writeFile(filepath, await data.toBuffer())
    const doc = await prisma.documento.create({
      data: {
        solicitudId,
        tipo: data.mimetype || 'file',
        ruta: `/uploads/${filename}`,
        hash: 'na',
        ownerId: ownerId || null
      }
    })
    await prisma.evento.create({ data: { actorId: (req as any).user?.sub, solicitudId, tipo: 'DOCUMENTO_CREADO', detalles: { filename } as any } })
    return doc
  })

  app.get('/documentos/:id/download', { preHandler: ensureAuth }, async (req, reply) => {
    const id = (req as any).params.id as string
    const doc = await prisma.documento.findUnique({ where: { id }, select: { id: true, ruta: true, solicitudId: true, ownerId: true } })
    if (!doc) { reply.code(404); return { error: 'not_found' } }
    const user = (req as any).user
    const solicitud = await prisma.solicitud.findUnique({ where: { id: doc.solicitudId }, select: { clienteId: true } })
    const isOwner = user?.sub === solicitud?.clienteId || (doc.ownerId && user?.sub === doc.ownerId)
    const isStaff = user?.rol === 'ANALISTA' || user?.rol === 'ADMIN'
    if (!isOwner && !isStaff) { reply.code(403); return { error: 'forbidden' } }
    const filename = path.basename(doc.ruta)
    const filepath = path.join(process.cwd(), 'uploads', filename)
    try {
      const stream = createReadStream(filepath)
      reply.header('Content-Type', 'application/octet-stream')
      reply.header('Content-Disposition', `attachment; filename=${filename}`)
      return reply.send(stream)
    } catch {
      reply.code(404)
      return { error: 'file_missing' }
    }
  })

  app.get('/documentos/:id/view', { preHandler: ensureAuth }, async (req, reply) => {
    const id = (req as any).params.id as string
    const doc = await prisma.documento.findUnique({ where: { id }, select: { id: true, ruta: true, tipo: true, solicitudId: true, ownerId: true } })
    if (!doc) { reply.code(404); return { error: 'not_found' } }
    const user = (req as any).user
    const solicitud = await prisma.solicitud.findUnique({ where: { id: doc.solicitudId }, select: { clienteId: true } })
    const isOwner = user?.sub === solicitud?.clienteId || (doc.ownerId && user?.sub === doc.ownerId)
    const isStaff = user?.rol === 'ANALISTA' || user?.rol === 'ADMIN'
    if (!isOwner && !isStaff) { reply.code(403); return { error: 'forbidden' } }
    const filename = path.basename(doc.ruta)
    const filepath = path.join(process.cwd(), 'uploads', filename)
    try {
      const stream = createReadStream(filepath)
      reply.header('Content-Type', doc.tipo || 'application/octet-stream')
      return reply.send(stream)
    } catch {
      reply.code(404)
      return { error: 'file_missing' }
    }
  })

  app.delete('/documentos/:id', { preHandler: ensureAuth }, async (req, reply) => {
    const id = (req as any).params.id as string
    const user = (req as any).user
    const doc = await prisma.documento.findUnique({ where: { id } })
    if (!doc) { reply.code(404); return { error: 'not_found' } }
    const solicitud = await prisma.solicitud.findUnique({ where: { id: doc.solicitudId }, select: { clienteId: true } })
    const isOwner = user?.sub === solicitud?.clienteId || (doc.ownerId && user?.sub === doc.ownerId)
    const isStaff = user?.rol === 'ANALISTA' || user?.rol === 'ADMIN'
    if (!isOwner && !isStaff) { reply.code(403); return { error: 'forbidden' } }
    const filename = path.basename(doc.ruta)
    const filepath = path.join(process.cwd(), 'uploads', filename)
    try { await fs.unlink(filepath) } catch {}
    await prisma.documento.delete({ where: { id } })
    await prisma.evento.create({ data: { actorId: user?.sub, solicitudId: doc.solicitudId, tipo: 'DOCUMENTO_ELIMINADO', detalles: { id } as any } })
    return { ok: true }
  })
}
