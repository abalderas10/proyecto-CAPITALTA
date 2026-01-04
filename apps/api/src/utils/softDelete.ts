import { Prisma } from '@prisma/client'

/**
 * Agrega automáticamente la condición deletedAt = null a las queries
 * para excluir registros "eliminados" lógicamente
 */
export function excludeDeleted<T extends { deletedAt?: Date | null }>(
  where?: Prisma.UserWhereInput | any
): any {
  return {
    ...where,
    deletedAt: null,
  }
}

/**
 * Para incluir todos los registros (incluyendo eliminados)
 * Útil para auditoría o recuperación
 */
export function includeDeleted<T extends { deletedAt?: Date | null }>(
  where?: Prisma.UserWhereInput | any
): any {
  return where || {}
}

/**
 * Helper para soft-delete un registro
 * En lugar de: prisma.usuario.delete({ where: { id } })
 * Usar: prisma.usuario.update({ where: { id }, data: { deletedAt: new Date() } })
 */
export function softDeletePayload() {
  return {
    deletedAt: new Date(),
  }
}

/**
 * Extender donde queries para excluir eliminados por defecto
 */
export function withoutDeleted(where: any = {}): any {
  return {
    ...where,
    deletedAt: null,
  }
}
