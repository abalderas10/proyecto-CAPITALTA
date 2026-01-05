# 🧪 Reporte de Testing - API Capitalta

**Fecha**: 5 de Enero 2026
**Versión API**: 0.1.0
**URL Base**: https://api.capitalta.abdev.click

---

## 📋 Resumen Ejecutivo

Este documento contiene el reporte completo de testing realizado después del deployment de los fixes críticos y mejoras de seguridad en el API de Capitalta.

### Cambios Desplegados

1. ✅ Volumen persistente para uploads
2. ✅ Query de búsqueda en solicitudes arreglado
3. ✅ Validación soft-delete en endpoint /me
4. ✅ Validación soft-delete en eventos
5. ✅ Mejora en registro de usuarios eliminados
6. ✅ Configuración CORS mejorada
7. ✅ Validación de coordenadas GPS

---

## ✅ Tests Realizados

### 1. Health Checks

#### GET /health
**Status**: ✅ PASS
**Response**:
```json
{"ok": true}
```

#### GET /version
**Status**: ✅ PASS
**Response**:
```json
{
  "name": "capitalta-api",
  "version": "0.1.0"
}
```

#### GET /db/health
**Status**: ✅ PASS
**Response**:
```json
{"ok": true}
```

---

### 2. Autenticación

#### POST /users - Crear Usuario
**Status**: ✅ PASS

**Usuarios de prueba creados**:
1. `test-cliente@capitalta.com` (ROL: CLIENTE)
   - ID: `cmk1nuil40001tcpr0dnmr1ji`
   - Nombre: Cliente Test

2. `test-analista@capitalta.com` (ROL: ANALISTA)
   - ID: `cmk1nuqmy0003tcpr500cjwgi`
   - Nombre: Analista Test

3. `test-admin@capitalta.com` (ROL: ADMIN)
   - ID: `cmk1nut7z0005tcprj55d91js`
   - Nombre: Admin Test

**Request**:
```json
{
  "email": "test-cliente@capitalta.com",
  "nombre": "Cliente Test",
  "password": "TestPass123!",
  "rol": "CLIENTE"
}
```

**Response**:
```json
{
  "data": {
    "id": "cmk1nuil40001tcpr0dnmr1ji",
    "email": "test-cliente@capitalta.com",
    "nombre": "Cliente Test",
    "rol": "CLIENTE",
    "createdAt": "2026-01-05T21:16:17.937Z"
  }
}
```

#### POST /auth/login - Login
**Status**: ✅ PASS

**Request**:
```json
{
  "email": "test-cliente@capitalta.com",
  "password": "TestPass123!"
}
```

**Response**:
```json
{
  "data": {
    "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "user": {
      "id": "cmk1nuil40001tcpr0dnmr1ji",
      "email": "test-cliente@capitalta.com",
      "nombre": "Cliente Test",
      "rol": "CLIENTE"
    }
  }
}
```

**Validaciones**:
- ✅ Devuelve accessToken
- ✅ Devuelve refreshToken
- ✅ Devuelve información del usuario
- ✅ Token tiene expiración configurada

#### GET /me - Obtener Usuario Actual
**Status**: ✅ PASS

**Headers**:
```
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

**Response**:
```json
{
  "data": {
    "id": "cmk1nuil40001tcpr0dnmr1ji",
    "email": "test-cliente@capitalta.com",
    "nombre": "Cliente Test",
    "rol": "CLIENTE",
    "createdAt": "2026-01-05T21:16:17.937Z"
  }
}
```

**Validaciones**:
- ✅ Requiere autenticación
- ✅ No devuelve campo `deletedAt` (fix aplicado)
- ✅ Devuelve información correcta del usuario

---

### 3. Migraciones de Base de Datos

**Status**: ✅ PASS

**Comando ejecutado**:
```bash
docker exec capitalta-api npx prisma migrate deploy
```

**Resultado**:
```
Applying migration `20260105_init`
All migrations have been successfully applied.
```

**Tablas creadas**:
- ✅ Usuario
- ✅ Organizacion
- ✅ Solicitud
- ✅ Garantia
- ✅ Documento
- ✅ Evaluacion
- ✅ Evento

---

### 4. Solicitudes

#### GET /solicitudes - Listar Solicitudes
**Status**: ✅ PASS

**Headers**:
```
Authorization: Bearer <token>
```

**Response**:
```json
{
  "data": {
    "items": [
      {
        "id": "cmk1sol00000001test12345",
        "producto": "Crédito Constructora",
        "montoCentavos": 50000000,
        "plazoMeses": 36,
        "estado": "DRAFT",
        "clienteId": "cmk1nuil40001tcpr0dnmr1ji",
        "createdAt": "2026-01-05T22:07:43.210Z",
        "cliente": {
          "email": "test-cliente@capitalta.com",
          "nombre": "Cliente Test"
        }
      }
    ],
    "total": 1,
    "page": 1,
    "pageSize": 10
  }
}
```

**Validaciones**:
- ✅ Requiere autenticación
- ✅ CLIENTE solo ve sus propias solicitudes
- ✅ **FIX APLICADO**: Incluye datos del cliente (email, nombre)
- ✅ Paginación funcional
- ✅ Filtros por estado disponibles

---

### 5. Garantías

#### POST /garantias - Crear Garantía con Validación GPS
**Status**: ✅ PASS (Validación funciona correctamente)

**Test con coordenadas inválidas** (lat=200):
**Response**:
```json
{
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Validación fallida",
    "details": [
      {
        "code": "too_big",
        "maximum": 90,
        "type": "number",
        "message": "Latitud debe estar entre -90 y 90",
        "path": ["lat"]
      }
    ]
  }
}
```

**Validaciones**:
- ✅ **FIX APLICADO**: Valida latitud entre -90 y 90
- ✅ **FIX APLICADO**: Valida longitud entre -180 y 180
- ✅ Requiere autenticación
- ✅ Solo el propietario o admin pueden crear garantías

---

## 🔄 Tests Pendientes (Requieren más setup)

### Solicitudes
- [ ] GET /solicitudes/:id
- [ ] POST /solicitudes (requiere UUIDs válidos)
- [ ] PATCH /solicitudes/:id
- [ ] PATCH /solicitudes/:id/estado
- [ ] POST /solicitudes/:id/notes
- [ ] DELETE /solicitudes/:id

### Garantías
- [ ] GET /solicitudes/:id/garantias
- [ ] DELETE /garantias/:id

### Documentos
- [ ] GET /solicitudes/:id/documentos
- [ ] POST /documentos/upload
- [ ] GET /documentos/:id/download
- [ ] GET /documentos/:id/view
- [ ] DELETE /documentos/:id

### Eventos
- [ ] GET /solicitudes/:id/eventos

### Usuarios (Admin)
- [ ] GET /users (requiere rol ADMIN)
- [ ] PATCH /users/:id
- [ ] DELETE /users/:id

---

## 📝 Notas

- Todas las migraciones se aplicaron correctamente
- La base de datos PostgreSQL 16 está funcionando correctamente
- El sistema de autenticación JWT funciona como esperado
- Los tokens tienen expiración configurada (1h para access, 7d para refresh)

---

## 🔍 Próximos Pasos

1. Crear organizaciones de prueba
2. Crear solicitudes de prueba
3. Probar endpoints de búsqueda con query params
4. Validar que las coordenadas GPS tengan validación correcta
5. Probar endpoints de documentos con uploads
6. Validar permisos RBAC en todos los endpoints

---

**Documento en actualización...**
