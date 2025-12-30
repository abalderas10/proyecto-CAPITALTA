## Objetivo

* Cubrir los componentes que faltan respecto a shadcn/ui con librerías concretas y mantener imagen profesional.

* Enumerar lo que aún falta especificar para ejecutar sin ambigüedad.

## Propuesta de Librerías Complementarias (Imagen Profesional)

* Wizard/Stepper (multi‑paso):

  * Opción A (nativa): Stepper propio con `tabs` + `progress` de shadcn, control de estado y validación por paso.

  * Opción B (lib): `@ark-ui/react` Stepper (headless, accesible) estilado con Tailwind/shadcn.

* Uploader (robusto, enterprise):

  * Opción A: `Uppy` (Dashboard + Tus para carga reanudable, progreso, reintentos, restricciones). Backend en VPS con `tus-node-server` o endpoints propios.

  * Opción B: `react-dropzone` + UI shadcn (simple y rápido), con barra de progreso y validaciones.

* Firma electrónica:

  * `react-signature-canvas` para trazo, exportación a PNG y estampado en PDFs.

* PDF (visor y generación):

  * Visor: `react-pdf` (render en frontend).

  * Generación/estampado: `pdf-lib` en backend (sellos, insertar imágenes de firma, folios).

* Rich text editor (notas internas/plantillas):

  * `tiptap` (toolbars personalizados con shadcn, extensiones comunes: bold, link, list, table).

* Charts/KPIs:

  * `recharts` (composición y rendimiento correctos), paleta consistente con shadcn.

* Mapas/geo (garantías):

  * `@react-google-maps/api` (básico y confiable) o Mapbox (`react-map-gl`) si requerimos capas avanzadas.

* Data Grid avanzada:

  * `AG Grid Community` (agrupación, filtro, sort, resize, edición inline), estilada para matching visual.

* Multi‑select avanzado:

  * `react-select` (asincrónico, multi), con estilos Tailwind/shadcn.

* Imagen/perfil (recorte):

  * `react-easy-crop` para recorte antes de subir.

## Integración Visual (Profesional)

* Unificar tokens: colores, tipografía, espaciado desde shadcn (Theme CSS vars).

* Iconografía: `lucide-react` (consistente con shadcn).

* Estados y microinteracciones: skeletons, loaders, `toast` para feedback; animaciones sutiles.

* Accesibilidad: focus visible, roles ARIA, navegación por teclado en flujos clave.

## Qué Falta Especificar para Ejecutar

* Backend: framework (Express/Nest/Fastify) y estructura de carpetas.

* Modelo de datos: esquema Prisma completo, claves únicas, índices, constraints, migraciones.

* Contratos API: listado de endpoints, request/response (OpenAPI mínimo), códigos de error, idempotencia.

* Autenticación/autorización: proveedor (NextAuth recomendado), roles/permissions, MFA, políticas de sesión.

* Variables de entorno: `.env.example` definitivo (frontend Vercel, backend VPS) con descripciones.

* Uploader: decisión (Uppy vs Dropzone), límites (tamaño, tipos), antivirus opcional y retención.

* Backups DB: frecuencia (p. ej., diario), retención (p. ej., 30 días), prueba de restauración mensual.

* Observabilidad: Sentry dsn, estrategia de logs (Traefik + API), alertas críticas.

* Rate limiting: niveles por endpoint (auth, upload, consulta SAT), respuesta y bloqueo.

* DNS/Traefik: reglas, middlewares de seguridad (headers, HSTS), redirecciones, certificados.

* Templates: emails (SendGrid) y SMS (Twilio) por evento (alta, cambio de estado, recordatorios).

* UX microcopy: textos de ayuda, mensajes de error, límites y tiempos.

* Legal operativa: consentimiento buró/SAT en formularios, versiones de contratos y manejo de firma.

## Recomendaciones

* Empezar con `Dropzone` + endpoints propios y evolucionar a `Uppy` si la carga/volumen lo exige.

* `AG Grid` para Admin; tablas shadcn + tanstack en Cliente.

* `recharts` para dashboards iniciales; contemplar `nivo` si se quiere mayor riqueza visual.

* Mapas con Google para MVP; Mapbox si se requieren capas/estilos avanzados.

## Entrega Esperada

* Confirmación de librerías elegidas por categoría (wizard, uploader, charts, firmas, PDF, mapas, datagrid).

* Confirmación de framework backend y decisiones de backups/rate limiting.

## ¿Apruebas estas propuestas?

* Con tu visto bueno, detallo el “Spec Técnico v1” con estas elecciones y preparo el scaffolding (manteniendo modo plan hasta tu confirmación).

