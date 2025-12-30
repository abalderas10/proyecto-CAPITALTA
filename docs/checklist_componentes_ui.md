# Checklist Componentes UI (MVP)

## Fundacionales (shadcn/ui)
- Botones, inputs, textarea, labels, formularios (validación con `zod`).
- Select, combobox, checkbox, radio, switch, slider.
- Badge, card, table, tabs, accordion, breadcrumb.
- Dialog, drawer/sheet, popover, tooltip, toast.
- Progress, skeleton, separator, pagination, avatar, dropdown-menu, navigation-menu.

## Layout/Acceso
- Header, sidebar, breadcrumb.
- Guards por rol (cliente/analista/admin).

## Autenticación
- Login, registro, reset password, MFA modal.

## Landing/Marketing
- Hero, features, pricing, FAQs, testimonios, CTAs.
- Formularios de captura (lead) con validación y tracking.

## Solicitud de Crédito (multi‑paso)
- Wizard/Stepper por pasos con validación por sección.
- Autosave y recuperación de estado.

## Upload/Documentos
- Carga múltiple, progreso, reintento, validación por tipo/tamaño.
- Previsualización y recorte (imágenes).

## Listados y Gestión
- Tablas con filtros, orden, paginación.
- Acciones masivas (si aplica) y exportación.

## Dashboards/KPIs
- Cards, tablas, gráficos (línea, barras, pie).
- Estados vacíos y skeleton.

## Detalle de Solicitud
- Timeline, notas, adjuntos, aprobaciones, acciones.
- Visor PDF.

## Notificaciones
- Toast/banners.
- Emails programados y por evento.

## Configuración
- Perfil, organización, roles y permisos.

## Accesibilidad/i18n
- ARIA, foco visible, navegación por teclado.
- i18n (si aplica).

## Librerías Complementarias Elegidas
- Wizard/Stepper: tabs + progress (custom shadcn).
- Uploader: `Uppy` (Dashboard + Tus). Alternativa: `react-dropzone`.
- Firma: `react-signature-canvas`.
- PDF: `react-pdf` (visor), `pdf-lib` (generación/estampado).
- Rich text: `tiptap`.
- Charts: `recharts`.
- Mapas: `@react-google-maps/api`.
- Data Grid (admin): `AG Grid Community`.
- Multi‑select: `react-select`.
- Recorte: `react-easy-crop`.
