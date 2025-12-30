import { FastifyInstance } from 'fastify'
import { prisma } from '../db'
import { z } from 'zod'
import bcrypt from 'bcryptjs'

export default async function usersRoutes(app: FastifyInstance) {
  app.get('/users', async () => {
    const users = await prisma.usuario.findMany({
      select: { id: true, email: true, nombre: true, rol: true, createdAt: true }
    })
    return users
  })

  app.post('/users', async (req, reply) => {
    const schema = z.object({
      email: z.string().email(),
      nombre: z.string().min(2),
      password: z.string().min(8),
      rol: z.enum(['CLIENTE', 'ANALISTA', 'ADMIN']).optional(),
      organizacionId: z.string().optional()
    })
    const body = schema.parse((req as any).body)
    const hash = await bcrypt.hash(body.password, 10)
    const user = await prisma.usuario.create({
      data: {
        email: body.email,
        nombre: body.nombre,
        passwordHash: hash,
        rol: body.rol ?? 'CLIENTE',
        organizacionId: body.organizacionId ?? null
      },
      select: { id: true, email: true, nombre: true, rol: true, createdAt: true }
    })
    reply.code(201)
    return user
  })
}
