import { FastifyReply } from 'fastify'

export enum ErrorCode {
  UNAUTHORIZED = 'UNAUTHORIZED',
  FORBIDDEN = 'FORBIDDEN',
  NOT_FOUND = 'NOT_FOUND',
  VALIDATION_ERROR = 'VALIDATION_ERROR',
  CONFLICT = 'CONFLICT',
  INTERNAL_ERROR = 'INTERNAL_ERROR',
  BAD_REQUEST = 'BAD_REQUEST',
}

export class AppError extends Error {
  constructor(
    public code: ErrorCode,
    public statusCode: number,
    message: string,
    public details?: Record<string, any>
  ) {
    super(message)
    this.name = 'AppError'
  }
}

export const errors = {
  unauthorized: (message = 'No autorizado') => 
    new AppError(ErrorCode.UNAUTHORIZED, 401, message),
  
  forbidden: (message = 'Acceso denegado') => 
    new AppError(ErrorCode.FORBIDDEN, 403, message),
  
  notFound: (resource: string) => 
    new AppError(ErrorCode.NOT_FOUND, 404, `${resource} no encontrado`),
  
  validation: (message: string, details?: any) => 
    new AppError(ErrorCode.VALIDATION_ERROR, 400, message, details),
  
  conflict: (message: string) => 
    new AppError(ErrorCode.CONFLICT, 409, message),
  
  badRequest: (message: string) => 
    new AppError(ErrorCode.BAD_REQUEST, 400, message),
  
  internal: (message = 'Error interno del servidor') => 
    new AppError(ErrorCode.INTERNAL_ERROR, 500, message),
}

export function sendError(reply: FastifyReply, error: AppError | Error) {
  if (error instanceof AppError) {
    return reply.code(error.statusCode).send({
      error: {
        code: error.code,
        message: error.message,
        ...(error.details && { details: error.details }),
      },
    })
  }
  
  return reply.code(500).send({
    error: {
      code: ErrorCode.INTERNAL_ERROR,
      message: 'Error interno del servidor',
    },
  })
}

export function sendSuccess<T>(reply: FastifyReply, data: T, statusCode = 200) {
  return reply.code(statusCode).send({ data })
}
