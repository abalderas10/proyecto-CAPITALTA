import { FastifyInstance } from 'fastify'
import { prisma } from '../db'
import { z } from 'zod'
import { ensureAuth } from '../auth'

export default async function solicitudesRoutes(app: FastifyInstance) {
  app.get('/solicitudes', async (req) => {
    const qs = (req as any).query || {}
    const estado = qs.estado as string | undefined
    const q = qs.q as string | undefined
    const page = Number(qs.page || 1)
    const pageSize = Number(qs.pageSize || 10)
    const where: any = {}
    if (estado) where.estado = estado
    if (q) where.OR = [
      { producto: { contains: q, mode: 'insensitive' } },
      { cliente: { email: { contains: q, mode: 'insensitive' } } }
    ]
    const total = await prisma.solicitud.count({ where })
    const items = await prisma.solicitud.findMany({
      where,
      orderBy: { createdAt: 'desc' },
      select: {
        id: true,
        producto: true,
        montoCentavos: true,
        plazoMeses: true,
        estado: true,
        createdAt: true
      },
      skip: (page - 1) * pageSize,
      take: pageSize
    })
    return { items, total, page, pageSize }
  })

  app.get('/solicitudes/:id', async (req) => {
    const id = (req as any).params.id as string
    const s = await prisma.solicitud.findUnique({
      where: { id },
      select: {
        id: true,
        producto: true,
        montoCentavos: true,
        plazoMeses: true,
        estado: true,
        clienteId: true,
        organizacionId: true,
        createdAt: true
      }
    })
    return s
  })

  app.post('/solicitudes', { preHandler: ensureAuth }, async (req, reply) => {
    const schema = z.object({
      producto: z.string().min(2),
      montoCentavos: z.number().int().positive(),
      plazoMeses: z.number().int().positive(),
      clienteId: z.string(),
      organizacionId: z.string()
    })
    const body = schema.parse((req as any).body)
    const s = await prisma.solicitud.create({
      data: {
        producto: body.producto,
        montoCentavos: body.montoCentavos,
        plazoMeses: body.plazoMeses,
        clienteId: body.clienteId,
        organizacionId: body.organizacionId
      },
      select: {
        id: true,
        estado: true,
        producto: true,
        montoCentavos: true,
        plazoMeses: true,
        createdAt: true
      }
    })
    reply.code(201)
    await prisma.evento.create({ data: { actorId: (req as any).user?.sub, solicitudId: s.id, tipo: 'SOLICITUD_CREADA', detalles: { body } as any } })
    return s
  })

  app.patch('/solicitudes/:id', { preHandler: ensureAuth }, async (req) => {
    const id = (req as any).params.id as string
    const schema = z.object({
      producto: z.string().min(2).optional(),
      montoCentavos: z.number().int().positive().optional(),
      plazoMeses: z.number().int().positive().optional(),
      estado: z.enum(['DRAFT', 'ENVIADA', 'EN_REVISION', 'APROBADA', 'RECHAZADA', 'CANCELADA']).optional()
    })
    const body = schema.parse((req as any).body)
    const prev = await prisma.solicitud.findUnique({ where: { id }, select: { estado: true } })
    const s = await prisma.solicitud.update({
      where: { id },
      data: body,
      select: { id: true, producto: true, montoCentavos: true, plazoMeses: true, estado: true }
    })
    if (body.estado && body.estado !== prev?.estado) {
      await prisma.evento.create({ data: { actorId: (req as any).user?.sub, solicitudId: id, tipo: 'SOLICITUD_ESTADO', detalles: { from: prev?.estado, to: body.estado } as any } })
    }
    return s
  })

  app.patch('/solicitudes/:id/estado', { preHandler: ensureAuth }, async (req, reply) => {
    const id = (req as any).params.id as string
    const schema = z.object({ estado: z.enum(['EN_REVISION', 'APROBADA', 'RECHAZADA', 'CANCELADA']) })
    const body = schema.parse((req as any).body)
    const user = (req as any).user
    if (user?.rol !== 'ANALISTA' && user?.rol !== 'ADMIN') { reply.code(403); return { error: 'forbidden' } }
    const prev = await prisma.solicitud.findUnique({ where: { id }, select: { estado: true } })
    const s = await prisma.solicitud.update({ where: { id }, data: { estado: body.estado }, select: { id: true, estado: true } })
    await prisma.evento.create({ data: { actorId: user?.sub, solicitudId: id, tipo: 'SOLICITUD_ESTADO', detalles: { from: prev?.estado, to: body.estado } as any } })
    return s
  })

  app.post('/solicitudes/:id/notes', { preHandler: ensureAuth }, async (req, reply) => {
    const id = (req as any).params.id as string
    const schema = z.object({ text: z.string().min(1) })
    const body = schema.parse((req as any).body)
    const user = (req as any).user
    if (user?.rol !== 'ANALISTA' && user?.rol !== 'ADMIN') { reply.code(403); return { error: 'forbidden' } }
    const ev = await prisma.evento.create({ data: { actorId: user?.sub, solicitudId: id, tipo: 'NOTA', detalles: { text: body.text } as any } })
    return ev
  })
}
