import Fastify from 'fastify'
import cors from '@fastify/cors'
import rateLimit from '@fastify/rate-limit'
import dotenv from 'dotenv'
import { prisma } from './db'
import { sendError, errors, AppError } from './utils/errors'
import usersRoutes from './routes/users'
import solicitudesRoutes from './routes/solicitudes'
import seedRoutes from './routes/seed'
import garantiasRoutes from './routes/garantias'
import documentosRoutes from './routes/documentos'
import authRoutes from './routes/auth'
import eventosRoutes from './routes/eventos'

dotenv.config()

const app = Fastify({ logger: true })

// Middleware global de CORS
const allowedOrigins = [
  process.env.FRONTEND_ORIGIN || 'https://capitalta.abdev.click',
  'https://capitalta-app.vercel.app', // Vercel deployment
  'http://localhost:3000', // Desarrollo local
  'http://localhost:3001', // Desarrollo local API
  'http://127.0.0.1:3000',
]

app.register(cors, {
  origin: (origin, callback) => {
    // Permitir requests sin origin (como Postman, curl, health checks)
    if (!origin) return callback(null, true)

    // Verificar si el origin está en la lista blanca
    if (allowedOrigins.includes(origin)) {
      return callback(null, true)
    }

    // En desarrollo (NODE_ENV no es production), permitir cualquier origin
    if (process.env.NODE_ENV !== 'production') {
      return callback(null, true)
    }

    // En producción, rechazar origins no autorizados
    app.log.warn(`CORS rejected origin: ${origin}`)
    callback(new Error('No permitido por CORS'), false)
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
})

// Middleware global de rate limiting
app.register(rateLimit, {
  max: 100,
  timeWindow: '1 minute',
})

// Health checks
app.get('/health', async () => {
  return { ok: true }
})

app.get('/version', async () => {
  return { name: 'capitalta-api', version: '0.1.0' }
})

app.get('/db/health', async () => {
  const r = await prisma.$queryRaw`SELECT 1 as ok`
  return { ok: true }
})

// Registro de rutas
app.register(authRoutes)
app.register(usersRoutes)
app.register(solicitudesRoutes)
app.register(garantiasRoutes)
app.register(documentosRoutes)
app.register(eventosRoutes)
app.register(seedRoutes)

// Manejo global de errores
app.setErrorHandler((error, request, reply) => {
  if (error instanceof AppError) {
    return sendError(reply, error)
  }

  // Errores de validación de Zod
  if (error.name === 'ZodError') {
    return sendError(reply, errors.validation('Validación fallida', (error as any).errors))
  }

  // Log del error
  app.log.error(error)

  return sendError(reply, errors.internal('Error procesando la solicitud'))
})

const port = Number(process.env.PORT || 3000)
const host = process.env.HOST || '0.0.0.0'

async function start() {
  try {
    await prisma.$connect()
    app.log.info('✓ Conectado a la base de datos')
  } catch (e) {
    app.log.error('✗ Error conectando a la base de datos')
    process.exit(1)
  }

  try {
    await app.listen({ port, host })
    app.log.info(`✓ Servidor escuchando en http://${host}:${port}`)
  } catch (err) {
    app.log.error(err)
    process.exit(1)
  }
}

start()
