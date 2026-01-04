import { FastifyInstance } from 'fastify'
import { prisma } from '../db'
import { z } from 'zod'
import bcrypt from 'bcryptjs'

export default async function seedRoutes(app: FastifyInstance) {
  app.post('/seed', async (req, reply) => {
    // Solo permitir en entorno de desarrollo
    if (process.env.NODE_ENV === 'production') {
      reply.code(403)
      return { error: 'seed_not_allowed_in_production' }
    }
    
    const schema = z.object({
      email: z.string().email(),
      nombre: z.string().min(2),
      orgNombre: z.string().min(2),
      rfc: z.string().min(12),
      tipo: z.enum(['PERSONA_MORAL', 'PERSONA_FISICA'])
    })
    const body = schema.parse((req as any).body)
    const org = await prisma.organizacion.upsert({
      where: { rfc: body.rfc },
      update: { nombre: body.orgNombre, tipo: body.tipo },
      create: { rfc: body.rfc, nombre: body.orgNombre, tipo: body.tipo }
    })
    const hash = await bcrypt.hash('seed123', 10)
    const user = await prisma.usuario.upsert({
      where: { email: body.email },
      update: { nombre: body.nombre, organizacionId: org.id },
      create: { email: body.email, nombre: body.nombre, passwordHash: hash, rol: 'CLIENTE', organizacionId: org.id }
    })
    return { usuarioId: user.id, organizacionId: org.id }
  })
}
