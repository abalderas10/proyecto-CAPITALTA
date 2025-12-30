import { FastifyInstance } from 'fastify'
import { prisma } from '../db'
import { ensureAuth } from '../auth'

export default async function eventosRoutes(app: FastifyInstance) {
  app.get('/solicitudes/:id/eventos', { preHandler: ensureAuth }, async (req) => {
    const solicitudId = (req as any).params.id as string
    const list = await prisma.evento.findMany({ where: { solicitudId }, orderBy: { createdAt: 'desc' } })
    return list
  })
}
