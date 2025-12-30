# Spec Técnico v1 — Capitalta (Vercel + Contabo)

## Arquitectura
- Frontend: Next.js 14 (App Router) desplegado en Vercel (`https://capitalta.abdev.click`).
- Backend: Node.js (Fastify + TypeScript) en Contabo (Docker) detrás de Traefik (`https://api.capitalta.abdev.click`).
- Reverse proxy/SSL: Traefik + Let's Encrypt (HTTP→HTTPS, HSTS, headers de seguridad).
- Base de datos: PostgreSQL en contenedor con volúmenes persistentes, red interna.
- Jobs: BullMQ + Redis opcional para tareas asíncronas (evaluaciones, parsing CFDI, notificaciones).

## Decisiones de Librerías (UI Complementaria)
- Wizard/Stepper: Stepper propio con `tabs` + `progress` de shadcn/ui.
- Uploader: `Uppy` (Dashboard + Tus). Alternativa liviana: `react-dropzone`.
- Firma: `react-signature-canvas`.
- PDF: Visor `react-pdf`; generación/estampado `pdf-lib` en backend.
- Rich text: `tiptap` con toolbars estiladas.
- Charts: `recharts`.
- Mapas: `@react-google-maps/api`.
- Data Grid (admin): `AG Grid Community`.
- Multi‑select: `react-select` (asincrónico y multi).
- Imagen/recorte: `react-easy-crop`.

## Frontend
- Framework: Next.js 14 con App Router; server actions para mutaciones simples.
- UI: Tailwind + shadcn/ui.
- Estado: `@tanstack/react-query` para datos remotos; `zustand` para estado de UI.
- Validación: `react-hook-form` + `zod` (por paso en wizard).
- SEO/Accesibilidad: metadata dinámica, schema.org, ARIA, navegación teclado.

## Backend
- Framework: Fastify (TypeScript, `fastify-swagger` para OpenAPI opcional).
- Seguridad: `fastify-rate-limit`, CORS restringido, headers de seguridad, body limits.
- Auth: NextAuth OAuth/JWT con roles/permissions.
- Integraciones: SAT/Círculo/Stripe/Twilio/SendGrid mediante servicios aislados.
- Observabilidad: logs JSON, Sentry, healthchecks.

## Base de Datos
- ORM: Prisma.
- Esquema inicial (alto nivel):
  - `usuario` (perfil, rol, MFA, estado).
  - `organizacion` (persona moral/física, vínculos).
  - `solicitud` (estado, producto, montos, plazos, timestamps).
  - `garantia` (tipo, ubicación, avalúo, documentos).
  - `documento` (tipo, ruta, hash, versión, owner).
  - `evaluacion` (scores, reglas aplicadas, observaciones).
  - `evento` (auditoría: quién, qué, cuándo).
- Índices: por `solicitud.estado`, `usuario.email`, `documento.owner`, `garantia.ubicacion`.
- Backups: `pg_dump` diario, retención 30 días, prueba de restauración mensual.

## API (Contratos — bosquejo)
- `POST /auth/login` → { email, password } → { token, usuario }.
- `POST /auth/register` → { datos } → { usuario }.
- `GET /solicitudes` (filtros, paginación) → lista.
- `POST /solicitudes` → creación.
- `GET /solicitudes/:id` → detalle + timeline.
- `POST /solicitudes/:id/documentos` → upload (Uppy/Tus o simple).
- `POST /solicitudes/:id/evaluar` → dispara evaluación (jobs).
- `PATCH /solicitudes/:id` → actualizaciones parciales.
- `POST /webhooks/stripe` | `POST /webhooks/sendgrid` → manejados en VPS.
- Errores: esquema consistente `{ code, message, details }`.

## Variables de Entorno
- Frontend (Vercel): `NEXT_PUBLIC_API_URL`, `NEXT_PUBLIC_SITE_URL`, `NEXTAUTH_URL`, `NEXTAUTH_SECRET`.
- Backend (VPS): `DATABASE_URL`, `JWT_SECRET`, `SESSION_SECRET`, `STRIPE_KEY`, `SENDGRID_KEY`, `TWILIO_KEY`, `SAT_PROVIDER_URL`, `CREDITO_PROVIDER_URL`, `SENTRY_DSN`.
- Traefik/Certs: `TRAEFIK_EMAIL`, dominios y labels.

## DNS y Traefik
- DNS: `capitalta.abdev.click` → Vercel; `api.capitalta.abdev.click` → IP del VPS.
- Traefik: entrypoints 80/443, resolutor ACME, redirección HTTP→HTTPS, middlewares de seguridad (HSTS, CSP, headers). Rate limit en API.

## Rate Limiting
- Traefik: limiter por ruta crítica.
- API: `fastify-rate-limit` por IP/usuario para auth, upload y consulta SAT.

## Backups/Retención
- DB: `pg_dump` diario (cron), retención de 30 días en carpeta cifrada.
- Documentos: snapshot semanal del volumen; opción de backup offsite (R2/B2/Drive empresarial).

## Observabilidad
- Sentry (frontend/backend), logs JSON con correlación de request IDs, métricas básicas (p95 latencia).

## Plantillas de Comunicación
- Emails (SendGrid): alta de solicitud, cambio de estado, recordatorios, solicitud de documentos.
- SMS (Twilio): códigos MFA, recordatorios clave.

## Legal/Consentimiento
- Formularios incluyen consentimiento buró/SAT, aceptación de T&C y privacidad; registro de versión.

## Gaps Cerrados
- Elección de librerías complementarias y framework backend.
- Lineamientos de API, variables, DNS/Traefik, rate limiting, backups y observabilidad.

## Próximos Pasos
- Generar scaffolding inicial (carpetas, `.env.example`, docs de despliegue) y checklists específicos.
