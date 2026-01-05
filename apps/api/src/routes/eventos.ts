import { FastifyInstance } from 'fastify'
import { prisma } from '../db'
import { ensureAuth } from '../auth'
import { errors, sendError, sendSuccess } from '../utils/errors'

export default async function eventosRoutes(app: FastifyInstance) {
  app.get(
    '/solicitudes/:id/eventos',
    { preHandler: ensureAuth },
    async (req, reply) => {
      try {
        const solicitudId = (req as any).params.id as string
        const user = (req as any).user

        // Verificar que la solicitud existe y no está eliminada
        const solicitud = await prisma.solicitud.findUnique({
          where: { id: solicitudId },
          select: { clienteId: true, deletedAt: true },
        })

        if (!solicitud || solicitud.deletedAt) {
          throw errors.notFound('Solicitud')
        }

        // Autorización: solo el cliente propietario, analistas y admins
        if (user.rol === 'CLIENTE' && solicitud.clienteId !== user.sub) {
          throw errors.forbidden('No tienes acceso a esta solicitud')
        }

        const list = await prisma.evento.findMany({
          where: { solicitudId },
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
}
