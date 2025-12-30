# Guía de Despliegue - Capitalta

## Configuración de Vercel para el Frontend

### Paso 1: Importar el Proyecto en Vercel

1. Ir a [vercel.com/new](https://vercel.com/new)
2. Seleccionar "Import Git Repository"
3. Buscar y seleccionar el repositorio: `abalderas10/proyecto-CAPITALTA`
4. Configurar el proyecto con los siguientes ajustes:

### Paso 2: Configuración del Proyecto

#### Framework Preset
- **Framework**: Next.js

#### Root Directory
- **Root Directory**: `apps/web`
- Marcar la opción "Include source files outside of the Root Directory in the Build Step"

#### Build Settings
- **Build Command**: `npm run build`
- **Output Directory**: `.next`
- **Install Command**: `npm install`

#### Node.js Version
- **Node Version**: 22.x (ya configurado en el proyecto)

### Paso 3: Variables de Entorno

Configurar las siguientes variables de entorno en Vercel:

```bash
# API Backend
NEXT_PUBLIC_API_URL=https://api.capitalta.abdev.click

# NextAuth Configuration
NEXTAUTH_URL=https://capitalta-app.vercel.app
NEXTAUTH_SECRET=[GENERAR_SECRETO_SEGURO]
```

**Generar NEXTAUTH_SECRET:**
```bash
openssl rand -base64 32
```

### Paso 4: Dominios Personalizados

Configurar los siguientes dominios en Vercel:

- **Producción**: `app.capitalta.abdev.click` o `capitalta-app.vercel.app`
- **Preview**: Automático por rama de Git

### Paso 5: Actualizar DNS

Si usas un dominio personalizado, agregar el siguiente registro DNS:

```
Type: CNAME
Name: app (o el subdominio deseado)
Value: cname.vercel-dns.com
```

---

## Configuración del Backend en VPS (Contabo)

### Requisitos Previos

- VPS con Ubuntu 22.04
- Docker y Docker Compose instalados
- Dominio apuntando al VPS: `api.capitalta.abdev.click`

### Paso 1: Clonar el Repositorio en el VPS

```bash
ssh user@your-vps-ip
cd /opt
git clone https://github.com/abalderas10/proyecto-CAPITALTA.git
cd proyecto-CAPITALTA
```

### Paso 2: Configurar Variables de Entorno

```bash
# Backend
cd apps/api
cp .env.example .env
nano .env
```

Configurar las siguientes variables:

```bash
PORT=3000
HOST=0.0.0.0
DATABASE_URL=postgresql://user:password@postgres:5432/capitalta
JWT_SECRET=[GENERAR_SECRETO_SEGURO]
SESSION_SECRET=[GENERAR_SECRETO_SEGURO]
FRONTEND_ORIGIN=https://app.capitalta.abdev.click
STRIPE_KEY=
SENDGRID_KEY=
TWILIO_KEY=
SAT_PROVIDER_URL=
CREDITO_PROVIDER_URL=
SENTRY_DSN=
```

```bash
# Deploy
cd ../../deploy
cp .env.example .env
nano .env
```

Configurar:

```bash
TRAEFIK_EMAIL=tu-email@ejemplo.com
```

### Paso 3: Iniciar los Servicios

```bash
cd /opt/proyecto-CAPITALTA/deploy
docker-compose up -d
```

### Paso 4: Ejecutar Migraciones de Base de Datos

```bash
docker-compose exec api npm run prisma:migrate:deploy
docker-compose exec api npm run prisma:generate
```

### Paso 5: Verificar el Estado

```bash
# Ver logs
docker-compose logs -f api

# Verificar salud del API
curl https://api.capitalta.abdev.click/health
curl https://api.capitalta.abdev.click/version
curl https://api.capitalta.abdev.click/db/health
```

---

## Verificación del Despliegue Completo

### Frontend (Vercel)

1. Acceder a `https://app.capitalta.abdev.click`
2. Verificar que la página de inicio carga correctamente
3. Verificar que los assets (CSS, imágenes) cargan sin errores

### Backend (VPS)

1. Verificar endpoints de salud:
   - `https://api.capitalta.abdev.click/health` → `{"ok": true}`
   - `https://api.capitalta.abdev.click/version` → Información de versión
   - `https://api.capitalta.abdev.click/db/health` → Conexión a base de datos

### Integración Frontend-Backend

1. Abrir la consola del navegador en el frontend
2. Verificar que no hay errores de CORS
3. Intentar hacer login (cuando esté implementado)
4. Verificar que las llamadas a `/api/*` se redirigen correctamente

---

## Troubleshooting

### Error: "Module not found" en Vercel

**Solución**: Verificar que `apps/web/package.json` tiene todas las dependencias necesarias.

```bash
cd apps/web
npm install
```

### Error: CORS en el Frontend

**Solución**: Verificar que `FRONTEND_ORIGIN` en el backend incluye el dominio correcto de Vercel.

```bash
# En apps/api/.env
FRONTEND_ORIGIN=https://app.capitalta.abdev.click
```

Reiniciar el contenedor:

```bash
docker-compose restart api
```

### Error: "Cannot connect to database"

**Solución**: Verificar que PostgreSQL está corriendo y accesible.

```bash
docker-compose ps
docker-compose logs postgres
```

### Error: Certificados SSL no se generan

**Solución**: Verificar que el dominio apunta correctamente al VPS y que los puertos 80/443 están abiertos.

```bash
# Verificar DNS
dig api.capitalta.abdev.click

# Verificar puertos
sudo netstat -tulpn | grep -E ':(80|443)'

# Ver logs de Traefik
docker-compose logs traefik
```

---

## Monitoreo y Mantenimiento

### Logs

```bash
# Ver logs del API
docker-compose logs -f api

# Ver logs de Traefik
docker-compose logs -f traefik

# Ver logs de PostgreSQL
docker-compose logs -f postgres
```

### Backups de Base de Datos

```bash
# Crear backup manual
docker-compose exec postgres pg_dump -U user capitalta > backup_$(date +%Y%m%d).sql

# Restaurar backup
cat backup_20250129.sql | docker-compose exec -T postgres psql -U user capitalta
```

### Actualizaciones

```bash
# Actualizar código
cd /opt/proyecto-CAPITALTA
git pull origin main

# Reconstruir y reiniciar
docker-compose build api
docker-compose up -d

# Ejecutar migraciones si hay cambios en el esquema
docker-compose exec api npm run prisma:migrate:deploy
```

---

## Checklist de Despliegue

### Frontend (Vercel)
- [ ] Proyecto importado desde GitHub
- [ ] Root directory configurado: `apps/web`
- [ ] Variables de entorno configuradas
- [ ] Dominio personalizado configurado (opcional)
- [ ] Build exitoso
- [ ] Sitio accesible

### Backend (VPS)
- [ ] Repositorio clonado en el VPS
- [ ] Variables de entorno configuradas
- [ ] Docker Compose iniciado
- [ ] Migraciones ejecutadas
- [ ] Endpoints de salud responden correctamente
- [ ] Certificados SSL generados

### Integración
- [ ] CORS configurado correctamente
- [ ] Frontend puede comunicarse con el backend
- [ ] No hay errores en la consola del navegador

---

## Próximos Pasos

1. **Configurar CI/CD**: Automatizar despliegues con GitHub Actions
2. **Configurar Sentry**: Para monitoreo de errores
3. **Configurar backups automatizados**: Cron job para backups diarios
4. **Configurar alertas**: Monitoreo de uptime y rendimiento
5. **Implementar autenticación completa**: NextAuth con providers
6. **Agregar tests E2E**: Playwright o Cypress para testing automatizado

---

## Recursos Adicionales

- [Documentación de Vercel](https://vercel.com/docs)
- [Documentación de Next.js](https://nextjs.org/docs)
- [Documentación de Fastify](https://fastify.dev/)
- [Documentación de Prisma](https://www.prisma.io/docs)
- [Documentación de Traefik](https://doc.traefik.io/traefik/)
