# Checklist Integraciones y Entorno

## SAT / Círculo de Crédito
- Proveedor y modo: sandbox vs producción.
- Scopes/autorizaciones y consentimiento explícito del usuario.
- Límites (rate limit), reintentos con backoff exponencial.
- Trazabilidad: requestId y auditoría.
- Sanitización y cifrado de PII.

## Stripe (Pagos)
- Productos/planes, impuestos.
- Webhooks seguros en VPS (firma verificada, idempotencia).
- Manejo de estados de pago y reconciliación.

## Twilio / SendGrid
- Verificación de dominios y números.
- Plantillas por evento (alta, cambios, recordatorios, MFA).
- Rate limit, campañas y reputación.

## Storage de Documentos
- Volumen Docker persistente.
- Organización por `solicitud`/`usuario`.
- Antivirus opcional (ClamAV) y validaciones.
- Retención/borrado por política.

## Variables de Entorno
- Frontend (Vercel): `NEXT_PUBLIC_API_URL`, `NEXTAUTH_URL`, `NEXTAUTH_SECRET`.
- Backend (VPS): `DATABASE_URL`, `JWT_SECRET`, `SESSION_SECRET`, `STRIPE_KEY`, `SENDGRID_KEY`, `TWILIO_KEY`, `SAT_PROVIDER_URL`, `CREDITO_PROVIDER_URL`, `SENTRY_DSN`.
- Documentar `.env.example` y owners.

## Roles y Permisos
- Matriz por cliente/analista/admin.
- Auditoría de acciones (evento: quién, qué, cuándo).

## Observabilidad y Seguridad
- Sentry (DSN), logs estructurados, métricas.
- CSP/CSRF, rate limiting, gestión de secretos.

## Testing
- Datos sintéticos para integraciones.
- Pruebas de contrato (mocks) y e2e.
