import jwt from 'jsonwebtoken'
import { FastifyRequest, FastifyReply } from 'fastify'
import { prisma } from './db'

const JWT_SECRET = process.env.JWT_SECRET || 'dev-secret'

export function signToken(payload: any) {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: '7d' })
}

export async function ensureAuth(req: FastifyRequest, reply: FastifyReply) {
  const h = req.headers['authorization']
  if (!h || !h.startsWith('Bearer ')) {
    reply.code(401)
    throw new Error('unauthorized')
  }
  const token = h.slice(7)
  try {
    const decoded = jwt.verify(token, JWT_SECRET) as any
    ;(req as any).user = decoded
  } catch {
    reply.code(401)
    throw new Error('invalid token')
  }
}
