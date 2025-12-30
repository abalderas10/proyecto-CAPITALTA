import { FastifyInstance } from 'fastify'
import { prisma } from '../db'
import { z } from 'zod'
import bcrypt from 'bcryptjs'
import { signToken, ensureAuth } from '../auth'

export default async function authRoutes(app: FastifyInstance) {
  app.post('/auth/login', async (req, reply) => {
    const schema = z.object({ email: z.string().email(), password: z.string().min(6) })
    const body = schema.parse((req as any).body)
    const user = await prisma.usuario.findUnique({ where: { email: body.email } })
    if (!user) { reply.code(401); return { error: 'invalid' } }
    const ok = await bcrypt.compare(body.password, user.passwordHash)
    if (!ok) { reply.code(401); return { error: 'invalid' } }
    const token = signToken({ sub: user.id, email: user.email, rol: user.rol })
    return { token, user: { id: user.id, email: user.email, nombre: user.nombre, rol: user.rol } }
  })

  app.get('/me', { preHandler: ensureAuth }, async (req) => {
    const u = (req as any).user
    const user = await prisma.usuario.findUnique({ where: { id: u.sub }, select: { id: true, email: true, nombre: true, rol: true } })
    return user
  })
}
