import { FastifyInstance } from 'fastify'
import { prisma } from '../db'
import { z } from 'zod'
import bcrypt from 'bcryptjs'
import { signAccessToken, signRefreshToken, ensureAuth } from '../auth'
import { errors, sendError, sendSuccess } from '../utils/errors'

export default async function authRoutes(app: FastifyInstance) {
  app.post('/auth/login', async (req, reply) => {
    try {
      const schema = z.object({
        email: z.string().email('Email inválido'),
        password: z.string().min(6, 'Contraseña muy corta'),
      })
      const body = schema.parse((req as any).body)
      
      const user = await prisma.usuario.findUnique({ where: { email: body.email } })
      if (!user) {
        throw errors.unauthorized('Credenciales inválidas')
      }
      
      const ok = await bcrypt.compare(body.password, user.passwordHash)
      if (!ok) {
        throw errors.unauthorized('Credenciales inválidas')
      }
      
      const accessToken = signAccessToken({
        sub: user.id,
        email: user.email,
        rol: user.rol,
      })
      const refreshToken = signRefreshToken({
        sub: user.id,
        email: user.email,
        rol: user.rol,
      })
      
      return sendSuccess(reply, {
        accessToken,
        refreshToken,
        user: {
          id: user.id,
          email: user.email,
          nombre: user.nombre,
          rol: user.rol,
        },
      }, 200)
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

  app.post('/auth/refresh', async (req, reply) => {
    try {
      const schema = z.object({
        refreshToken: z.string(),
      })
      const body = schema.parse((req as any).body)
      
      const { verifyRefreshToken } = await import('../auth')
      const payload = await verifyRefreshToken(body.refreshToken)
      
      const user = await prisma.usuario.findUnique({
        where: { id: payload.sub },
        select: { id: true, email: true, rol: true },
      })
      
      if (!user) {
        throw errors.notFound('Usuario')
      }
      
      const accessToken = signAccessToken({
        sub: user.id,
        email: user.email,
        rol: user.rol,
      })
      
      return sendSuccess(reply, { accessToken }, 200)
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

  app.get('/me', { preHandler: ensureAuth }, async (req, reply) => {
    try {
      const u = (req as any).user
      const user = await prisma.usuario.findUnique({
        where: { id: u.sub },
        select: {
          id: true,
          email: true,
          nombre: true,
          rol: true,
          createdAt: true,
        },
      })
      
      if (!user) {
        throw errors.notFound('Usuario')
      }
      
      return sendSuccess(reply, user, 200)
    } catch (err) {
      if (err instanceof Error && 'code' in err) {
        return sendError(reply, err as any)
      }
      return sendError(reply, errors.internal())
    }
  })
}
