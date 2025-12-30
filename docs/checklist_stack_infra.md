# Checklist Stack/Infra y Despliegue (Vercel + Contabo)

## DNS
- `capitalta.abdev.click` → Vercel.
- `api.capitalta.abdev.click` → IP del VPS.
- Registros A/AAAA y CNAME verificados; TTL razonable.

## Vercel (Frontend)
- Variables: `NEXT_PUBLIC_API_URL`, `NEXTAUTH_URL`, `NEXTAUTH_SECRET`.
- Entornos: Development/Preview/Production.
- Rutas: verificación de redirects y headers.

## Contabo (Backend)
- Acceso: SSH por clave; firewall (solo 80/443, puerto SSH).
- Actualizaciones de sistema; `fail2ban` opcional.

## Docker Compose
- Servicios: `traefik`, `api`, `postgres` (+ `redis` opcional).
- Redes: interna para `api` ↔ `postgres`.
- Volúmenes: datos de DB, configuración persistente.
- Healthchecks: `api` y `postgres`.
- Restart policy: `always`.

## Traefik
- EntryPoints: 80/443.
- ACME/Let's Encrypt: email de contacto, almacenamiento de certificados.
- Middlewares: redirección HTTP→HTTPS, HSTS, headers de seguridad (CSP, X-Frame-Options, etc.).
- Rate limit (básico) en rutas sensibles.

## API (Fastify)
- CORS restringido (dominio frontend).
- `fastify-rate-limit` configurado.
- Logs JSON con requestId.
- Healthcheck: `/health`.

## Base de Datos (PostgreSQL)
- Usuario/rol con permisos mínimos.
- Modo producción: `max_connections`, `work_mem` ajustado.
- Backups automáticos (`pg_dump`) y verificación.

## Observabilidad
- Sentry DSN (frontend/backend).
- Logs Traefik y API con rotación.
- Alertas básicas (fallos de healthcheck, error rate).

## CI/CD
- Frontend: Vercel conectado al repo; revisiones previas.
- Backend: pull + `docker compose up -d` (script de despliegue).

## Seguridad
- Gestión de secretos en `.env` (no en repositorio).
- Políticas de contraseña, MFA en cuentas internas.
- Auditoría de cambios críticos.

## Verificación Final
- Certificados válidos y renovación automática.
- Rutas públicas/privadas correctas.
- Persistencia de datos en reinicios.
- Latencia aceptable en endpoints clave.
