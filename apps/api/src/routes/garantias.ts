import { FastifyInstance } from 'fastify'
import { prisma } from '../db'
import { z } from 'zod'
import { ensureAuth } from '../auth'
import { errors, sendError, sendSuccess } from '../utils/errors'
import { softDeletePayload } from '../utils/softDelete'

export default async function garantiasRoutes(app: FastifyInstance) {
  app.get('/solicitudes/:id/garantias', { preHandler: ensureAuth }, async (req, reply) => {
    try {
      const solicitudId = (req as any).params.id as string
      const user = (req as any).user

      // Verificar que la solicitud existe y el usuario tiene acceso
      const solicitud = await prisma.solicitud.findUnique({
        where: { id: solicitudId },
        select: { clienteId: true, deletedAt: true },
      })

      if (!solicitud || solicitud.deletedAt) {
        throw errors.notFound('Solicitud')
      }

      if (user.rol === 'CLIENTE' && solicitud.clienteId !== user.sub) {
        throw errors.forbidden('No tienes acceso a esta solicitud')
      }

      const list = await prisma.garantia.findMany({
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
  })

  app.post('/garantias', { preHandler: ensureAuth }, async (req, reply) => {
    try {
      const user = (req as any).user

      const schema = z.object({
        solicitudId: z.string().uuid('SolicitudId inválido'),
        tipo: z.string().min(1, 'Tipo es requerido'),
        ubicacion: z.string().min(1, 'Ubicación es requerida'),
        avaluoCentavos: z.number().int().positive('Avalúo debe ser positivo'),
        lat: z.number().min(-90, 'Latitud debe estar entre -90 y 90').max(90, 'Latitud debe estar entre -90 y 90').optional(),
        lng: z.number().min(-180, 'Longitud debe estar entre -180 y 180').max(180, 'Longitud debe estar entre -180 y 180').optional(),
      })

      const body = schema.parse((req as any).body)

      // Validar que la solicitud existe
      const solicitud = await prisma.solicitud.findUnique({
        where: { id: body.solicitudId },
        select: { clienteId: true, deletedAt: true },
      })

      if (!solicitud || solicitud.deletedAt) {
        throw errors.notFound('Solicitud')
      }

      // Autorización: solo el cliente propietario o admin pueden agregar garantías
      if (user.rol === 'CLIENTE' && solicitud.clienteId !== user.sub) {
        throw errors.forbidden('No tienes permiso para agregar garantías a esta solicitud')
      }

      // Usar transacción
      const g = await prisma.$transaction(async (tx) => {
        const garantia = await tx.garantia.create({
          data: body,
        })

        await tx.evento.create({
          data: {
            actorId: user.sub,
            solicitudId: body.solicitudId,
            tipo: 'GARANTIA_CREADA',
            detalles: { tipo: body.tipo, ubicacion: body.ubicacion } as any,
          },
        })

        return garantia
      })

      return sendSuccess(reply, g, 201)
    } catch (err) {
      if (err instanceof z.ZodError) {
        return sendError(reply, errors.validation('Validación fallida', err.errors))
      }
      if (err instanceof Error && 'code' in err) {
        return sendError(reply, err as any)
      }
      return sendError(reply, errors.internal())
    }
  })

  // DELETE /garantias/:id - Soft delete
  app.delete('/garantias/:id', { preHandler: ensureAuth }, async (req, reply) => {
    try {
      const id = (req as any).params.id as string
      const user = (req as any).user

      const garantia = await prisma.garantia.findUnique({
        where: { id },
        select: { solicitudId: true, deletedAt: true },
      })

      if (!garantia || garantia.deletedAt) {
        throw errors.notFound('Garantía')
      }

      const solicitud = await prisma.solicitud.findUnique({
        where: { id: garantia.solicitudId },
        select: { clienteId: true },
      })

      // Autorización
      if (user.rol === 'CLIENTE' && solicitud?.clienteId !== user.sub) {
        throw errors.forbidden('No tienes permiso para eliminar esta garantía')
      }

      await prisma.$transaction(async (tx) => {
        await tx.garantia.update({
          where: { id },
          data: softDeletePayload(),
        })

        await tx.evento.create({
          data: {
            actorId: user.sub,
            solicitudId: garantia.solicitudId,
            tipo: 'GARANTIA_ELIMINADA',
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
  })
}
