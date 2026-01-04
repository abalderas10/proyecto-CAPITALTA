import { FastifyInstance } from 'fastify'
import { prisma } from '../db'
import { z } from 'zod'
import multipart from '@fastify/multipart'
import { promises as fs } from 'fs'
import { createReadStream } from 'fs'
import path from 'path'
import crypto from 'crypto'
import { ensureAuth } from '../auth'
import { errors, sendError, sendSuccess } from '../utils/errors'
import { softDeletePayload } from '../utils/softDelete'

// Límite de tamaño de archivo: 10MB
const MAX_FILE_SIZE = 10 * 1024 * 1024

// Tipos MIME permitidos
const ALLOWED_MIME_TYPES = [
  'application/pdf',
  'image/jpeg',
  'image/png',
  'image/gif',
  'application/msword',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
]

// Generar hash SHA-256 del archivo
async function calculateFileHash(filepath: string): Promise<string> {
  const hash = crypto.createHash('sha256')
  const stream = createReadStream(filepath)

  return new Promise((resolve, reject) => {
    stream.on('data', (data) => hash.update(data))
    stream.on('end', () => resolve(hash.digest('hex')))
    stream.on('error', reject)
  })
}

export default async function documentosRoutes(app: FastifyInstance) {
  await app.register(multipart, {
    limits: {
      fileSize: MAX_FILE_SIZE,
    },
  })

  app.get(
    '/solicitudes/:id/documentos',
    { preHandler: ensureAuth },
    async (req, reply) => {
      try {
        const solicitudId = (req as any).params.id as string
        const user = (req as any).user

        // Verificar que la solicitud existe
        const solicitud = await prisma.solicitud.findUnique({
          where: { id: solicitudId },
          select: { clienteId: true, deletedAt: true },
        })

        if (!solicitud || solicitud.deletedAt) {
          throw errors.notFound('Solicitud')
        }

        // Autorización
        if (user.rol === 'CLIENTE' && solicitud.clienteId !== user.sub) {
          throw errors.forbidden('No tienes acceso a esta solicitud')
        }

        const list = await prisma.documento.findMany({
          where: { solicitudId, deletedAt: null },
          orderBy: { createdAt: 'desc' },
        })

        return sendSuccess(reply, list, 200)
      } catch (err) {
        if (err instanceof Error && 'code' in err) {
          return sendError(reply, err as any)
        }
        return sendError(reply, errors.internal())
      }
    }
  )

  app.post('/documentos/upload', { preHandler: ensureAuth }, async (req, reply) => {
    try {
      const user = (req as any).user
      const data = await (req as any).file()

      if (!data) {
        throw errors.badRequest('No se proporcionó archivo')
      }

      const solicitudId = (req as any).headers['x-solicitud-id'] as string
      const ownerId = (req as any).headers['x-owner-id'] as string | undefined

      if (!solicitudId) {
        throw errors.badRequest('Header x-solicitud-id es requerido')
      }

      // Validar tipo MIME
      if (!ALLOWED_MIME_TYPES.includes(data.mimetype)) {
        throw errors.badRequest(`Tipo de archivo no permitido. Permitidos: ${ALLOWED_MIME_TYPES.join(', ')}`)
      }

      // Validar que la solicitud existe
      const solicitud = await prisma.solicitud.findUnique({
        where: { id: solicitudId },
        select: { clienteId: true, deletedAt: true },
      })

      if (!solicitud || solicitud.deletedAt) {
        throw errors.notFound('Solicitud')
      }

      // Autorización
      if (user.rol === 'CLIENTE' && solicitud.clienteId !== user.sub) {
        throw errors.forbidden('No tienes permiso para agregar documentos a esta solicitud')
      }

      const dir = path.join(process.cwd(), 'uploads')
      await fs.mkdir(dir, { recursive: true })
      const filename = `${Date.now()}-${crypto.randomBytes(8).toString('hex')}-${data.filename}`
      const filepath = path.join(dir, filename)
      await fs.writeFile(filepath, await data.toBuffer())

      // Calcular hash SHA-256 del archivo
      const fileHash = await calculateFileHash(filepath)

      // Usar transacción
      const doc = await prisma.$transaction(async (tx) => {
        const documento = await tx.documento.create({
          data: {
            solicitudId,
            tipo: data.mimetype || 'file',
            ruta: `/uploads/${filename}`,
            hash: fileHash,
            ownerId: ownerId || null,
          },
        })

        await tx.evento.create({
          data: {
            actorId: user.sub,
            solicitudId,
            tipo: 'DOCUMENTO_CREADO',
            detalles: { filename, hash: fileHash } as any,
          },
        })

        return documento
      })

      return sendSuccess(reply, doc, 201)
    } catch (err) {
      if (err instanceof Error && 'code' in err) {
        return sendError(reply, err as any)
      }
      return sendError(reply, errors.internal())
    }
  })

  app.get(
    '/documentos/:id/download',
    { preHandler: ensureAuth },
    async (req, reply) => {
      try {
        const id = (req as any).params.id as string
        const user = (req as any).user

        const doc = await prisma.documento.findUnique({
          where: { id },
          select: {
            id: true,
            ruta: true,
            solicitudId: true,
            ownerId: true,
            deletedAt: true,
          },
        })

        if (!doc || doc.deletedAt) {
          throw errors.notFound('Documento')
        }

        const solicitud = await prisma.solicitud.findUnique({
          where: { id: doc.solicitudId },
          select: { clienteId: true },
        })

        const isOwner =
          user?.sub === solicitud?.clienteId ||
          (doc.ownerId && user?.sub === doc.ownerId)
        const isStaff = user?.rol === 'ANALISTA' || user?.rol === 'ADMIN'

        if (!isOwner && !isStaff) {
          throw errors.forbidden('No tienes acceso a este documento')
        }

        const filename = path.basename(doc.ruta)
        const filepath = path.join(process.cwd(), 'uploads', filename)

        try {
          const stream = createReadStream(filepath)
          reply.header('Content-Type', 'application/octet-stream')
          reply.header('Content-Disposition', `attachment; filename=${filename}`)
          return reply.send(stream)
        } catch {
          throw errors.notFound('Archivo no encontrado en el sistema')
        }
      } catch (err) {
        if (err instanceof Error && 'code' in err) {
          return sendError(reply, err as any)
        }
        return sendError(reply, errors.internal())
      }
    }
  )

  app.get(
    '/documentos/:id/view',
    { preHandler: ensureAuth },
    async (req, reply) => {
      try {
        const id = (req as any).params.id as string
        const user = (req as any).user

        const doc = await prisma.documento.findUnique({
          where: { id },
          select: {
            id: true,
            ruta: true,
            tipo: true,
            solicitudId: true,
            ownerId: true,
            deletedAt: true,
          },
        })

        if (!doc || doc.deletedAt) {
          throw errors.notFound('Documento')
        }

        const solicitud = await prisma.solicitud.findUnique({
          where: { id: doc.solicitudId },
          select: { clienteId: true },
        })

        const isOwner =
          user?.sub === solicitud?.clienteId ||
          (doc.ownerId && user?.sub === doc.ownerId)
        const isStaff = user?.rol === 'ANALISTA' || user?.rol === 'ADMIN'

        if (!isOwner && !isStaff) {
          throw errors.forbidden('No tienes acceso a este documento')
        }

        const filename = path.basename(doc.ruta)
        const filepath = path.join(process.cwd(), 'uploads', filename)

        try {
          const stream = createReadStream(filepath)
          reply.header('Content-Type', doc.tipo || 'application/octet-stream')
          return reply.send(stream)
        } catch {
          throw errors.notFound('Archivo no encontrado en el sistema')
        }
      } catch (err) {
        if (err instanceof Error && 'code' in err) {
          return sendError(reply, err as any)
        }
        return sendError(reply, errors.internal())
      }
    }
  )

  app.delete(
    '/documentos/:id',
    { preHandler: ensureAuth },
    async (req, reply) => {
      try {
        const id = (req as any).params.id as string
        const user = (req as any).user

        const doc = await prisma.documento.findUnique({
          where: { id },
          select: { solicitudId: true, ownerId: true, deletedAt: true },
        })

        if (!doc || doc.deletedAt) {
          throw errors.notFound('Documento')
        }

        const solicitud = await prisma.solicitud.findUnique({
          where: { id: doc.solicitudId },
          select: { clienteId: true },
        })

        const isOwner =
          user?.sub === solicitud?.clienteId ||
          (doc.ownerId && user?.sub === doc.ownerId)
        const isStaff = user?.rol === 'ANALISTA' || user?.rol === 'ADMIN'

        if (!isOwner && !isStaff) {
          throw errors.forbidden('No tienes permiso para eliminar este documento')
        }

        // Usar transacción
        await prisma.$transaction(async (tx) => {
          await tx.documento.update({
            where: { id },
            data: softDeletePayload(),
          })

          await tx.evento.create({
            data: {
              actorId: user?.sub,
              solicitudId: doc.solicitudId,
              tipo: 'DOCUMENTO_ELIMINADO',
              detalles: { id } as any,
            },
          })
        })

        return sendSuccess(reply, { ok: true }, 200)
      } catch (err) {
        if (err instanceof Error && 'code' in err) {
          return sendError(reply, err as any)
        }
        return sendError(reply, errors.internal())
      }
    }
  )
}
