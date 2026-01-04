# Notas de Deployment - VPS Contabo

## Estado: ✅ DEPLOYMENT EXITOSO

**Fecha**: 4 Enero 2026
**VPS**: 149.102.137.243 (Ubuntu 22.04 LTS, Contabo)
**Usuario**: root

## Cambios Deployados

### 1. Seguridad - Autenticación Obligatoria
- ✅ Todos los endpoints GET requieren JWT válido
- ✅ Endpoints POST/PATCH requieren autenticación y RBAC
- ✅ Sistema de roles: CLIENTE, ANALISTA, ADMIN
- ✅ Refesh tokens implementados (1h access + 7d refresh)

### 2. Correcciones TypeScript
- ✅ `src/auth.ts` - Tipos de jwt.sign corregidos
- ✅ `src/utils/softDelete.ts` - Tipos genéricos ajustados
- ✅ `Dockerfile` - OpenSSL agregado para Prisma en Alpine

### 3. Base de Datos
- ✅ PostgreSQL 16 corriendo
- ✅ Schema de Prisma sincronizado
- ✅ Soft deletes implementados en 6 modelos
- ✅ Índices optimizados

## URLs de Acceso

```
API Health:  http://149.102.137.243:3001/health
API Version: http://149.102.137.243:3001/version
DB Health:   http://149.102.137.243:3001/db/health
```

## Comandos Útiles en VPS

```bash
# Ver logs del API
docker logs -f capitalta-api

# Entrar en BD
docker exec -it capitalta-db psql -U capitalta -d capitalta_prod

# Ver containers
docker ps

# Restart API
docker restart capitalta-api
```

## Configuración de Ambiente

**Variables requeridas en `.env`:**
```
NODE_ENV=production
PORT=3001
DATABASE_URL=postgresql://capitalta:PASSWORD@capitalta-db:5432/capitalta_prod?schema=public
JWT_SECRET=<generado-en-produccion>
JWT_REFRESH_SECRET=<generado-en-produccion>
NEXTAUTH_SECRET=<generado>
FRONTEND_ORIGIN=https://capitalta.abdev.click
```

## Pasos para Crear Usuario de Prueba

### Opción 1: Via Script SQL
```sql
-- Conectar a BD:
docker exec -it capitalta-db psql -U capitalta -d capitalta_prod

-- Crear organización:
INSERT INTO "Organizacion" (nombre, rfc, tipo) 
VALUES ('Test Org', 'TST123456789', 'PERSONA_MORAL');

-- Crear usuario:
INSERT INTO "Usuario" (email, nombre, "passwordHash", rol, "organizacionId")
VALUES ('test@capitalta.com', 'Test User', '$2a$10$...', 'CLIENTE', 1);
```

### Opción 2: Cambiar a NODE_ENV=development
```bash
docker stop capitalta-api
docker rm capitalta-api
docker run -d --name capitalta-api --network capitalta-net \
  -e NODE_ENV=development \
  ... [otras variables] ... \
  capitalta-api:latest

# Luego usar POST /seed
curl -X POST http://localhost:3001/seed \
  -H 'Content-Type: application/json' \
  -d '{"email":"test@cap.com","nombre":"Test","orgNombre":"Org","rfc":"RFC123456789","tipo":"PERSONA_MORAL"}'
```

## Pruebas de Seguridad

```bash
# 1. Sin token - debe fallar
curl -X GET http://localhost:3001/solicitudes
# Respuesta esperada: {"error":{"code":"UNAUTHORIZED",...}}

# 2. Con token inválido - debe fallar
curl -X GET http://localhost:3001/solicitudes \
  -H 'Authorization: Bearer invalid_token'
# Respuesta esperada: {"error":{"code":"UNAUTHORIZED",...}}

# 3. Login (una vez tengas usuario)
curl -X POST http://localhost:3001/auth/login \
  -H 'Content-Type: application/json' \
  -d '{"email":"test@cap.com","password":"password123"}'
```

## Commits Relacionados

- `acc1214` - fix: agregar OpenSSL a Dockerfile para soporte Prisma en Alpine
- `a9b8188` - refactor(api): mejoras seguridad con autenticación, RBAC, soft deletes

## Próximos Pasos (Opcional)

1. **Secretos de Producción**: Actualizar JWT_SECRET y JWT_REFRESH_SECRET con valores seguros (32+ caracteres aleatorios)
2. **Rate Limiting**: Implementar por usuario en lugar de globalmente
3. **Logging**: Revisar estructura de logs en Fastify
4. **S3**: Migrar documentos a AWS S3 (actualmente en /uploads)
5. **HTTPS**: Configurar Traefik con Let's Encrypt

## Soporte

Para debugging adicional:
```bash
# Ver compilación de TypeScript
npm run build

# Ver estado Prisma
npx prisma studio

# Ver migraciones pendientes
npx prisma migrate status
```

---
**Último update**: 4 Enero 2026, 23:40 UTC
