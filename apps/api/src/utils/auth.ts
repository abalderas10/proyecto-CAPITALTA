import { FastifyRequest, FastifyReply } from 'fastify'
import { Rol } from '@prisma/client'
import { errors } from './errors'

export enum Permission {
  VIEW_USERS = 'view_users',
  MANAGE_USERS = 'manage_users',
  VIEW_ANY_SOLICITUD = 'view_any_solicitud',
  MANAGE_ANY_SOLICITUD = 'manage_any_solicitud',
  APPROVE_SOLICITUD = 'approve_solicitud',
  ADD_NOTES = 'add_notes',
}

const rolePermissions: Record<Rol, Permission[]> = {
  CLIENTE: [
    Permission.VIEW_ANY_SOLICITUD,
  ],
  ANALISTA: [
    Permission.VIEW_ANY_SOLICITUD,
    Permission.MANAGE_ANY_SOLICITUD,
    Permission.APPROVE_SOLICITUD,
    Permission.ADD_NOTES,
  ],
  ADMIN: [
    Permission.VIEW_USERS,
    Permission.MANAGE_USERS,
    Permission.VIEW_ANY_SOLICITUD,
    Permission.MANAGE_ANY_SOLICITUD,
    Permission.APPROVE_SOLICITUD,
    Permission.ADD_NOTES,
  ],
}

export function hasPermission(rol: Rol, permission: Permission): boolean {
  return rolePermissions[rol]?.includes(permission) ?? false
}

export function requirePermission(permission: Permission) {
  return async (req: FastifyRequest, reply: FastifyReply) => {
    const user = (req as any).user
    if (!user) {
      throw errors.unauthorized()
    }
    
    if (!hasPermission(user.rol, permission)) {
      throw errors.forbidden(
        `No tienes permiso para: ${permission}`
      )
    }
  }
}

export function requireRole(...roles: Rol[]) {
  return async (req: FastifyRequest, reply: FastifyReply) => {
    const user = (req as any).user
    if (!user) {
      throw errors.unauthorized()
    }
    
    if (!roles.includes(user.rol)) {
      throw errors.forbidden(
        `Se requiere uno de los roles: ${roles.join(', ')}`
      )
    }
  }
}

/**
 * Verifica que el usuario sea propietario del recurso o sea ADMIN
 */
export function requireOwnershipOrAdmin(userId: string) {
  return async (req: FastifyRequest, reply: FastifyReply) => {
    const user = (req as any).user
    if (!user) {
      throw errors.unauthorized()
    }
    
    if (user.sub !== userId && user.rol !== 'ADMIN') {
      throw errors.forbidden('No tienes acceso a este recurso')
    }
  }
}
