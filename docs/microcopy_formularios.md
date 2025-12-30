# Guía de Microcopy y Validaciones (Solicitudes)

## Principios
- Claridad, brevedad y acción.
- Mostrar límites (montos, tamaños de archivo, tiempos).
- Confirmaciones positivas y errores útiles.

## Campos y Mensajes
- Email: “Ingresa tu correo empresarial” → error: “Formato inválido”.
- Monto: “Monto solicitado (MXN)” → error: “Debe ser mayor a 0”.
- Plazo: “Plazo (meses)” → error: “Solo números enteros”.
- RFC: “RFC de la organización” → error: “Formato no válido”.
- Garantía: “Describe la garantía” → ayuda: “Ubicación y documentación disponible”.

## Estados
- Guardado: “Cambios guardados”.
- Carga: “Subiendo archivo…”.
- Reintento: “Vuelve a intentar”.
- Éxito: “Solicitud enviada”.

## Validaciones por Paso
- Datos: formato de email, RFC, montos y plazos.
- Garantías: campos requeridos, tipos compatibles.
- Documentos: tipo/mime y tamaño máximo.
- Condiciones: aceptación de términos y consentimiento.
