import { FastifyInstance } from 'fastify'
import { prisma } from '../db'
import { z } from 'zod'
import { ensureAuth } from '../auth'
import { requireRole } from '../utils/auth'
import { errors, sendError, sendSuccess } from '../utils/errors'
import { withoutDeleted, softDeletePayload } from '../utils/softDelete'

export default async function solicitudesRoutes(app: FastifyInstance) {
  // GET /solicitudes - Requiere autenticación
  app.get(
    '/solicitudes',
    { preHandler: ensureAuth },
    async (req, reply) => {
      try {
        const user = (req as any).user
        const qs = (req as any).query || {}
        const estado = qs.estado as string | undefined
        const q = qs.q as string | undefined
        const page = Math.max(1, Number(qs.page || 1))
        const pageSize = Math.min(100, Number(qs.pageSize || 10))

        const where: any = withoutDeleted()

        // Clientes solo ven sus propias solicitudes
        if (user.rol === 'CLIENTE') {
          where.clienteId = user.sub
        }

        if (estado) where.estado = estado
        if (q) {
          where.OR = [
            { producto: { contains: q, mode: 'insensitive' } },
            { cliente: { email: { contains: q, mode: 'insensitive' } } },
          ]
        }

        // Contar con la misma condición
        const total = await prisma.solicitud.count({ where })

        // Una sola query para obtener datos y contar
        const items = await prisma.solicitud.findMany({
          where,
          orderBy: { createdAt: 'desc' },
          select: {
            id: true,
            producto: true,
            montoCentavos: true,
            plazoMeses: true,
            estado: true,
            clienteId: true,
            createdAt: true,
          },
          skip: (page - 1) * pageSize,
          take: pageSize,
        })

        return sendSuccess(reply, { items, total, page, pageSize }, 200)
      } catch (err) {
        if (err instanceof Error && 'code' in err) {
          return sendError(reply, err as any)
        }
        return sendError(reply, errors.internal())
      }
    }
  )

  // GET /solicitudes/:id - Requiere autenticación
  app.get(
    '/solicitudes/:id',
    { preHandler: ensureAuth },
    async (req, reply) => {
      try {
        const id = (req as any).params.id as string
        const user = (req as any).user

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
            createdAt: true,
            deletedAt: true,
          },
        })

        if (!s || s.deletedAt) {
          throw errors.notFound('Solicitud')
        }

        // Autorización: solo el cliente, admin o analista pueden ver
        if (user.rol === 'CLIENTE' && s.clienteId !== user.sub) {
          throw errors.forbidden('No tienes acceso a esta solicitud')
        }

        const { deletedAt, ...rest } = s
        return sendSuccess(reply, rest, 200)
      } catch (err) {
        if (err instanceof Error && 'code' in err) {
          return sendError(reply, err as any)
        }
        return sendError(reply, errors.internal())
      }
    }
  )

  // POST /solicitudes - Crear solicitud (con validación de relaciones)
  app.post('/solicitudes', { preHandler: ensureAuth }, async (req, reply) => {
    try {
      const user = (req as any).user

      const schema = z.object({
        producto: z.string().min(2, 'Producto debe tener al menos 2 caracteres'),
        montoCentavos: z.number().int().positive('Monto debe ser positivo'),
        plazoMeses: z.number().int().positive('Plazo debe ser positivo'),
        clienteId: z.string().uuid('ClienteId debe ser un UUID válido'),
        organizacionId: z.string().uuid('OrganizacionId debe ser un UUID válido'),
      })

      const body = schema.parse((req as any).body)

      // Autorización: solo ADMIN puede crear para otros clientes
      if (user.rol === 'CLIENTE' && body.clienteId !== user.sub) {
        throw errors.forbidden('Solo puedes crear solicitudes para ti mismo')
      }

      // Validar que el cliente existe
      const cliente = await prisma.usuario.findUnique({
        where: { id: body.clienteId },
      })
      if (!cliente || cliente.deletedAt) {
        throw errors.notFound('Cliente')
      }

      // Validar que la organización existe
      const organizacion = await prisma.organizacion.findUnique({
        where: { id: body.organizacionId },
      })
      if (!organizacion || organizacion.deletedAt) {
        throw errors.notFound('Organización')
      }

      // Usar transacción para crear solicitud y evento
      const s = await prisma.$transaction(async (tx) => {
        const solicitud = await tx.solicitud.create({
          data: {
            producto: body.producto,
            montoCentavos: body.montoCentavos,
            plazoMeses: body.plazoMeses,
            clienteId: body.clienteId,
            organizacionId: body.organizacionId,
          },
          select: {
            id: true,
            estado: true,
            producto: true,
            montoCentavos: true,
            plazoMeses: true,
            createdAt: true,
          },
        })

        await tx.evento.create({
          data: {
            actorId: user.sub,
            solicitudId: solicitud.id,
            tipo: 'SOLICITUD_CREADA',
            detalles: { producto: body.producto } as any,
          },
        })

        return solicitud
      })

      return sendSuccess(reply, s, 201)
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

  // PATCH /solicitudes/:id - Editar solicitud
  app.patch('/solicitudes/:id', { preHandler: ensureAuth }, async (req, reply) => {
    try {
      const id = (req as any).params.id as string
      const user = (req as any).user

      const schema = z.object({
        producto: z.string().min(2).optional(),
        montoCentavos: z.number().int().positive().optional(),
        plazoMeses: z.number().int().positive().optional(),
      })

      const body = schema.parse((req as any).body)

      // Verificar que la solicitud existe y obtener propietario
      const prev = await prisma.solicitud.findUnique({
        where: { id },
        select: { estado: true, clienteId: true, deletedAt: true },
      })

      if (!prev || prev.deletedAt) {
        throw errors.notFound('Solicitud')
      }

      // Autorización: solo el cliente o admin pueden editar
      if (user.rol === 'CLIENTE' && prev.clienteId !== user.sub) {
        throw errors.forbidden('No tienes permiso para editar esta solicitud')
      }

      const s = await prisma.solicitud.update({
        where: { id },
        data: body,
        select: {
          id: true,
          producto: true,
          montoCentavos: true,
          plazoMeses: true,
          estado: true,
        },
      })

      return sendSuccess(reply, s, 200)
    } catch (err) {
      if (err instanceof z.ZodError) {
        return sendError(reply, errors.validation('Validación fallida'))
      }
      if (err instanceof Error && 'code' in err) {
        return sendError(reply, err as any)
      }
      return sendError(reply, errors.internal())
    }
  })

  // PATCH /solicitudes/:id/estado - Cambiar estado (solo analista/admin)
  app.patch(
    '/solicitudes/:id/estado',
    { preHandler: [ensureAuth, requireRole('ANALISTA', 'ADMIN')] },
    async (req, reply) => {
      try {
        const id = (req as any).params.id as string
        const user = (req as any).user

        const schema = z.object({
          estado: z.enum(['EN_REVISION', 'APROBADA', 'RECHAZADA', 'CANCELADA']),
        })

        const body = schema.parse((req as any).body)

        const prev = await prisma.solicitud.findUnique({
          where: { id },
          select: { estado: true, deletedAt: true },
        })

        if (!prev || prev.deletedAt) {
          throw errors.notFound('Solicitud')
        }

        // Usar transacción
        const s = await prisma.$transaction(async (tx) => {
          const updated = await tx.solicitud.update({
            where: { id },
            data: { estado: body.estado },
            select: { id: true, estado: true },
          })

          await tx.evento.create({
            data: {
              actorId: user.sub,
              solicitudId: id,
              tipo: 'SOLICITUD_ESTADO',
              detalles: { from: prev.estado, to: body.estado } as any,
            },
          })

          return updated
        })

        return sendSuccess(reply, s, 200)
      } catch (err) {
        if (err instanceof z.ZodError) {
          return sendError(reply, errors.validation('Validación fallida'))
        }
        if (err instanceof Error && 'code' in err) {
          return sendError(reply, err as any)
        }
        return sendError(reply, errors.internal())
      }
    }
  )

  // POST /solicitudes/:id/notes - Agregar nota (solo analista/admin)
  app.post(
    '/solicitudes/:id/notes',
    { preHandler: [ensureAuth, requireRole('ANALISTA', 'ADMIN')] },
    async (req, reply) => {
      try {
        const id = (req as any).params.id as string
        const user = (req as any).user

        const schema = z.object({
          text: z.string().min(1, 'Nota no puede estar vacía'),
        })

        const body = schema.parse((req as any).body)

        // Verificar que la solicitud existe
        const solicitud = await prisma.solicitud.findUnique({
          where: { id },
          select: { deletedAt: true },
        })

        if (!solicitud || solicitud.deletedAt) {
          throw errors.notFound('Solicitud')
        }

        const ev = await prisma.evento.create({
          data: {
            actorId: user.sub,
            solicitudId: id,
            tipo: 'NOTA',
            detalles: { text: body.text } as any,
          },
        })

        return sendSuccess(reply, ev, 201)
      } catch (err) {
        if (err instanceof z.ZodError) {
          return sendError(reply, errors.validation('Validación fallida'))
        }
        if (err instanceof Error && 'code' in err) {
          return sendError(reply, err as any)
        }
        return sendError(reply, errors.internal())
      }
    }
  )

  // DELETE /solicitudes/:id - Soft delete
  app.delete(
    '/solicitudes/:id',
    { preHandler: ensureAuth },
    async (req, reply) => {
      try {
        const id = (req as any).params.id as string
        const user = (req as any).user

        const solicitud = await prisma.solicitud.findUnique({
          where: { id },
          select: { clienteId: true, deletedAt: true },
        })

        if (!solicitud || solicitud.deletedAt) {
          throw errors.notFound('Solicitud')
        }

        // Autorización: solo el cliente o admin pueden eliminar
        if (user.rol === 'CLIENTE' && solicitud.clienteId !== user.sub) {
          throw errors.forbidden('No tienes permiso para eliminar esta solicitud')
        }

        // Usar transacción
        await prisma.$transaction(async (tx) => {
          await tx.solicitud.update({
            where: { id },
            data: softDeletePayload(),
          })

          await tx.evento.create({
            data: {
              actorId: user.sub,
              solicitudId: id,
              tipo: 'SOLICITUD_ELIMINADA',
              detalles: {} as any,
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
