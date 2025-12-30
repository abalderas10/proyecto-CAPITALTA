# Backups y Rate Limiting

## Backups de Base de Datos
- Frecuencia: diario a las 02:00 UTC.
- Método: `pg_dump` comprimido (`.sql.gz`).
- Ubicación: volumen cifrado en VPS (`/var/backups/postgres`).
- Retención: 30 días, rotación semanal y mensual.
- Verificación: restauración de muestra mensual en base de pruebas.
- Alertas: fallo de backup → notificación (email/Slack).

## Backups de Documentos
- Frecuencia: snapshot semanal del volumen de documentos.
- Retención: 12 semanas.
- Offsite: opción R2/B2/Drive empresarial si se requiere redundancia.
- Integridad: verificación de hashes al subir y al restaurar.

## Rate Limiting (Traefik)
- Middlewares por ruta:
  - `/auth/*`: límite estricto por IP/usuario.
  - `/solicitudes/*`: límites moderados.
  - `/upload/*`: límites y tamaño máximo.
- Respuestas: códigos 429 con `Retry-After`.

## Rate Limiting (API Fastify)
- `fastify-rate-limit` configurado por endpoint.
- Claves de rate: IP + usuario (si autenticado).
- Backoff exponencial en integraciones externas (SAT/Círculo).

## Protección Adicional
- Body/tamaño máximo de payload.
- Validación de tipos/mime en uploads.
- Detección básica de abuso (patrones de requests, firmas).
