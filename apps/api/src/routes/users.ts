import { FastifyInstance } from 'fastify'
import { prisma } from '../db'
import { z } from 'zod'
import bcrypt from 'bcryptjs'
import { ensureAuth } from '../auth'
import { requireRole } from '../utils/auth'
import { errors, sendError, sendSuccess } from '../utils/errors'
import { withoutDeleted, softDeletePayload } from '../utils/softDelete'

export default async function usersRoutes(app: FastifyInstance) {
  app.get(
    '/users',
    { preHandler: [ensureAuth, requireRole('ADMIN')] },
    async (req, reply) => {
      try {
        const users = await prisma.usuario.findMany({
          where: withoutDeleted(),
          select: {
            id: true,
            email: true,
            nombre: true,
            rol: true,
            createdAt: true,
          },
          orderBy: { createdAt: 'desc' },
        })
        return sendSuccess(reply, users, 200)
      } catch (err) {
        if (err instanceof Error && 'code' in err) {
          return sendError(reply, err as any)
        }
        return sendError(reply, errors.internal())
      }
    }
  )

  app.post('/users', async (req, reply) => {
    try {
      const schema = z.object({
        email: z.string().email('Email inválido'),
        nombre: z.string().min(2, 'Nombre muy corto'),
        password: z.string().min(8, 'Contraseña debe tener al menos 8 caracteres'),
        rol: z.enum(['CLIENTE', 'ANALISTA', 'ADMIN']).optional(),
        organizacionId: z.string().optional(),
      })

      const body = schema.parse((req as any).body)

      // Verificar si el email ya existe (solo activos)
      const existing = await prisma.usuario.findUnique({
        where: { email: body.email },
      })
      if (existing && !existing.deletedAt) {
        throw errors.conflict('El email ya está registrado')
      }
      // Si existe pero está eliminado, se podría considerar reactivar en lugar de crear nuevo
      // Por ahora, permitimos crear uno nuevo (el UUID será diferente)

      // Verificar que la organización existe si se proporciona
      if (body.organizacionId) {
        const org = await prisma.organizacion.findUnique({
          where: { id: body.organizacionId },
        })
        if (!org) {
          throw errors.notFound('Organización')
        }
      }

      const hash = await bcrypt.hash(body.password, 10)
      const user = await prisma.usuario.create({
        data: {
          email: body.email,
          nombre: body.nombre,
          passwordHash: hash,
          rol: body.rol ?? 'CLIENTE',
          organizacionId: body.organizacionId ?? null,
        },
        select: {
          id: true,
          email: true,
          nombre: true,
          rol: true,
          createdAt: true,
        },
      })

      return sendSuccess(reply, user, 201)
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

  app.patch(
    '/users/:id',
    { preHandler: ensureAuth },
    async (req, reply) => {
      try {
        const userId = (req as any).params.id as string
        const currentUser = (req as any).user

        // Solo puedes editar tu propio usuario o ser ADMIN
        if (currentUser.sub !== userId && currentUser.rol !== 'ADMIN') {
          throw errors.forbidden()
        }

        const schema = z.object({
          nombre: z.string().min(2).optional(),
          password: z.string().min(8).optional(),
        })

        const body = schema.parse((req as any).body)
        const updateData: any = {}

        if (body.nombre) updateData.nombre = body.nombre
        if (body.password) updateData.passwordHash = await bcrypt.hash(body.password, 10)

        const user = await prisma.usuario.update({
          where: { id: userId },
          data: updateData,
          select: {
            id: true,
            email: true,
            nombre: true,
            rol: true,
          },
        })

        return sendSuccess(reply, user, 200)
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

  // DELETE /users/:id - Soft delete
  app.delete(
    '/users/:id',
    { preHandler: [ensureAuth, requireRole('ADMIN')] },
    async (req, reply) => {
      try {
        const userId = (req as any).params.id as string

        const user = await prisma.usuario.findUnique({
          where: { id: userId },
          select: { id: true },
        })

        if (!user) {
          throw errors.notFound('Usuario')
        }

        await prisma.usuario.update({
          where: { id: userId },
          data: softDeletePayload(),
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
