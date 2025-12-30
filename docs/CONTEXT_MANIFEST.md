# Contexto de Producto y Diseño — Capitalta

## Fuentes de Verdad
- Documentación: https://docs.capitalta.abdev.click/docs/index
- Sitio Web: www.capitalta.mx

## Mapa de Implementación
- Productos → Landings:
  - Crédito Constructoras: apps/web/src/app/(marketing)/constructoras/page.tsx
  - Crédito Simple PYME: apps/web/src/app/(marketing)/pyme/page.tsx
  - Préstamo Persona Física: apps/web/src/app/(marketing)/persona-fisica/page.tsx
- Requisitos → Páginas:
  - Persona Física: apps/web/src/app/requisitos/persona-fisica/page.tsx
  - PYME: apps/web/src/app/requisitos/pyme/page.tsx
- Proceso y Onboarding → Flujo:
  - Formulario multipasos: apps/web/src/app/solicitud/Form.tsx
  - Estado y timeline: apps/web/src/app/solicitudes/[id]/page.tsx
- Tecnología (API crítica):
  - Endpoints CRUD y eventos: apps/api/src/routes/*
- Diseño y UI:
  - Tokens y estilos: apps/web/src/styles/globals.css, apps/web/src/components/ui/*
- Legal (pendiente integración de enlaces):
  - Términos/Privacidad: footer y páginas dedicadas

## Principios Incorporados
- Evaluación en tiempo real y procesos automatizados (KYC/AML, AVM)
- Transparencia: KPIs, procesos y compliance visibles en landings
- Experiencia profesional: UI consistente, feedback y accesos por rol

## Ajustes Próximos
- Integrar paleta y componentes según Guía de Diseño Capitalta
- Añadir páginas de Términos y Privacidad con enlaces en footer
- Completar SEO y schema.org basado en la Documentación
