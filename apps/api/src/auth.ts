import jwt, { SignOptions } from 'jsonwebtoken'
import { FastifyRequest, FastifyReply } from 'fastify'
import { prisma } from './db'
import { errors } from './utils/errors'

const JWT_SECRET = process.env.JWT_SECRET
const JWT_REFRESH_SECRET = process.env.JWT_REFRESH_SECRET
const ACCESS_TOKEN_EXPIRY = process.env.ACCESS_TOKEN_EXPIRY || '1h'
const REFRESH_TOKEN_EXPIRY = process.env.REFRESH_TOKEN_EXPIRY || '7d'

// Validar secretos en producción
if (process.env.NODE_ENV === 'production') {
  if (!JWT_SECRET) {
    throw new Error('JWT_SECRET environment variable is REQUIRED in production')
  }
  if (!JWT_REFRESH_SECRET) {
    throw new Error('JWT_REFRESH_SECRET environment variable is REQUIRED in production')
  }
}

// En desarrollo, usar secretos por defecto (solo si están configurados)
const effectiveAccessSecret: string = JWT_SECRET || 'dev-access-secret-change-in-production'
const effectiveRefreshSecret: string = JWT_REFRESH_SECRET || 'dev-refresh-secret-change-in-production'

export interface TokenPayload {
  sub: string
  email: string
  rol: string
  iat?: number
  exp?: number
}

export function signAccessToken(payload: Omit<TokenPayload, 'iat' | 'exp'>) {
  const options: SignOptions = { expiresIn: ACCESS_TOKEN_EXPIRY as any }
  return jwt.sign(payload, effectiveAccessSecret, options)
}

export function signRefreshToken(payload: Omit<TokenPayload, 'iat' | 'exp'>) {
  const options: SignOptions = { expiresIn: REFRESH_TOKEN_EXPIRY as any }
  return jwt.sign(payload, effectiveRefreshSecret, options)
}

export async function ensureAuth(req: FastifyRequest, reply: FastifyReply) {
  const h = req.headers['authorization']
  if (!h || !h.startsWith('Bearer ')) {
    throw errors.unauthorized('Token no proporcionado o formato inválido')
  }
  
  const token = h.slice(7)
  try {
    const decoded = jwt.verify(token, effectiveAccessSecret) as TokenPayload
    ;(req as any).user = decoded
  } catch (err: any) {
    if (err.name === 'TokenExpiredError') {
      throw errors.unauthorized('Token expirado')
    }
    throw errors.unauthorized('Token inválido')
  }
}

export async function verifyRefreshToken(token: string): Promise<TokenPayload> {
  try {
    return jwt.verify(token, effectiveRefreshSecret) as TokenPayload
  } catch (err: any) {
    if (err.name === 'TokenExpiredError') {
      throw errors.unauthorized('Refresh token expirado')
    }
    throw errors.unauthorized('Refresh token inválido')
  }
}
