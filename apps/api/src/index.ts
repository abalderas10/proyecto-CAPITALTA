import Fastify from 'fastify'
import cors from '@fastify/cors'
import rateLimit from '@fastify/rate-limit'
import dotenv from 'dotenv'
import { prisma } from './db'
import usersRoutes from './routes/users'
import solicitudesRoutes from './routes/solicitudes'
import seedRoutes from './routes/seed'
import garantiasRoutes from './routes/garantias'
import documentosRoutes from './routes/documentos'
import authRoutes from './routes/auth'
import eventosRoutes from './routes/eventos'

dotenv.config()

const app = Fastify({ logger: true })

app.register(cors, {
  origin: process.env.FRONTEND_ORIGIN || 'https://capitalta.abdev.click',
  credentials: true
})

app.register(rateLimit, {
  max: 100,
  timeWindow: '1 minute'
})

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

const port = Number(process.env.PORT || 3000)
const host = process.env.HOST || '0.0.0.0'

async function start() {
  try {
    await prisma.$connect()
  } catch (e) {
    app.log.warn('db connect failed')
  }
  await app.register(usersRoutes)
  await app.register(solicitudesRoutes)
  await app.register(seedRoutes)
  await app.register(authRoutes)
  await app.register(garantiasRoutes)
  await app.register(documentosRoutes)
  await app.register(eventosRoutes)
  await app.listen({ port, host })
}

start()
