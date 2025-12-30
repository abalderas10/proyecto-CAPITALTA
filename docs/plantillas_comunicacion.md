# Plantillas de Comunicación (Email/SMS)

## Email — Alta de Solicitud
- Asunto: Tu solicitud ha sido creada
- Preheader: Comienza la evaluación en minutos
- Cuerpo:
  - Hola {nombre},
  - Hemos recibido tu solicitud para {producto}.
  - Estado: {estado}
  - Continúa aquí: {url}

## Email — Cambio de Estado
- Asunto: Actualización de tu solicitud
- Preheader: Nuevo estado disponible
- Cuerpo:
  - Tu solicitud ha cambiado a {estado}.
  - Comentarios: {comentarios}
  - Revisa el detalle: {url}

## Email — Recordatorio de Documentos
- Asunto: Documentos pendientes
- Preheader: Sube tus archivos
- Cuerpo:
  - Faltan {cantidad} documentos.
  - Lista: {lista}
  - Sube aquí: {url}

## SMS — MFA
- Texto:
  - Código: {codigo}. Expira en {minutos} minutos.

## SMS — Recordatorio
- Texto:
  - Tienes pasos pendientes en tu solicitud {id}. Ingresa a {url}
