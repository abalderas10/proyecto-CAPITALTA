import { FastifyInstance } from 'fastify'
import { prisma } from '../db'
import { z } from 'zod'
import { ensureAuth } from '../auth'

export default async function garantiasRoutes(app: FastifyInstance) {
  app.get('/solicitudes/:id/garantias', async (req) => {
    const solicitudId = (req as any).params.id as string
    const list = await prisma.garantia.findMany({ where: { solicitudId }, orderBy: { createdAt: 'desc' } })
    return list
  })

  app.post('/garantias', { preHandler: ensureAuth }, async (req) => {
    const schema = z.object({
      solicitudId: z.string(),
      tipo: z.string(),
      ubicacion: z.string(),
      avaluoCentavos: z.number().int().positive(),
      lat: z.number().optional(),
      lng: z.number().optional()
    })
    const body = schema.parse((req as any).body)
    const g = await prisma.garantia.create({ data: body })
    await prisma.evento.create({ data: { actorId: (req as any).user?.sub, solicitudId: body.solicitudId, tipo: 'GARANTIA_CREADA', detalles: body as any } })
    return g
  })
}
