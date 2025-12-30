# DNS y Traefik — Middlewares de Seguridad

## DNS
- `capitalta.abdev.click` (frontend Vercel): registro CNAME apuntando a Vercel.
- `api.capitalta.abdev.click` (backend VPS): registro A/AAAA a IP pública.
- Verificación de propagación y TLS.

## Traefik — Configuración Base
- EntryPoints: `:80`, `:443`.
- ACME/Let's Encrypt: email de administrador, almacenamiento de certs.
- Redirección HTTP→HTTPS.

## Middlewares de Seguridad
- HSTS: `Strict-Transport-Security: max-age=63072000; includeSubDomains; preload`.
- CSP: política restrictiva (default-src 'self'; img-src 'self' data: https:; script-src 'self' 'unsafe-inline' 'unsafe-eval' https:; style-src 'self' 'unsafe-inline' https:; connect-src 'self' https: api).
- X-Frame-Options: `DENY` (o `SAMEORIGIN` según visor PDF requerido).
- X-Content-Type-Options: `nosniff`.
- Referrer-Policy: `strict-origin-when-cross-origin`.
- Permissions-Policy: deshabilitar APIs innecesarias.

## Rate Limit (Traefik)
- Límites por ruta crítica (`/auth/*`, `/upload/*`).
- Respuestas 429 con `Retry-After`.

## Headers CORS
- Orígenes permitidos: dominio frontend.
- Métodos/cabeceras controladas; credenciales según necesidad.

## Logs y Auditoría
- Access/Error logs habilitados.
- Request IDs correlacionados con backend.
