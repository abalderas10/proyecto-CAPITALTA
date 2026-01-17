# 🔴 Problemas de Deploy en Vercel - Análisis y Soluciones

**Fecha**: 16 de Enero 2026
**Estado**: 🔍 Análisis Completado - Correcciones Pendientes

---

## 📊 Problemas Identificados

### 1. ❌ **vercel.json - Configuración Incorrecta**
**Severidad**: 🔴 CRÍTICO

**Problema**:
- El archivo `vercel.json` en la raíz tiene `"root": "apps/web"` 
- Pero también hay otro `apps/web/vercel.json` con configuración duplicada
- Vercel NO respeta el `root` si hay `vercel.json` en el subdirectorio

**Ubicación Actual**:
- `c:\Users\abald\.abm\capitalta\Proyecto__Capitalta\vercel.json` ✅
- `c:\Users\abald\.abm\capitalta\Proyecto__Capitalta\apps\web\vercel.json` ❌ (DUPLICADO)

**Impacto**: Build puede fallar o usar configuración incorrecta.

**Solución**: 
- ✅ Mantener SOLO el archivo raíz `vercel.json`
- ❌ ELIMINAR `apps/web/vercel.json` (es redundante y causa conflicto)

---

### 2. ⚠️ **Prisma en Frontend - Innecesario**
**Severidad**: 🟡 MEDIO

**Problema**:
- En `apps/web/package.json` se incluye:
  ```json
  "postinstall": "test -d ../../apps/api && cd ../../apps/api && npx prisma generate || true"
  ```
- Esto intenta generar código de Prisma (base de datos) durante build en Vercel
- Vercel puede NO tener acceso a `apps/api` en contexto de monorepo
- Prisma NO se necesita en el frontend

**Impacto**: 
- Lentitud en build
- Posibles errores si las rutas no son correctas

**Solución**: 
- Remover Prisma del postinstall del frontend
- Si se necesita typing de Prisma, hacerlo de otra forma

---

### 3. 🔄 **Variables de Entorno - NEXTAUTH_SECRET No Configurado en Vercel**
**Severidad**: 🔴 CRÍTICO

**Problema**:
- En `apps/web/src/auth.ts` línea 87:
  ```typescript
  secret: process.env.NEXTAUTH_SECRET,
  ```
- El archivo `.env.local` tiene valores locales
- **PERO**: Estos NO se sincronizan automáticamente a Vercel
- Vercel necesita estas variables configuradas en Settings → Environment Variables

**Variables Requeridas en Vercel**:
```
NEXTAUTH_SECRET=<valor seguro de 32+ caracteres>
NEXTAUTH_URL=https://capitalta-app.vercel.app (o tu dominio)
NEXT_PUBLIC_API_URL=https://api.capitalta.abdev.click
```

**Impacto**: 
- NextAuth no puede cifrar sesiones
- Login fallará en Vercel pero funciona localmente
- Error: "NEXTAUTH_SECRET is undefined"

---

### 4. 🔐 **NEXTAUTH_URL Mal Configurado**
**Severidad**: 🔴 CRÍTICO

**Problema**:
- `.env.local` tiene: `NEXTAUTH_URL=https://capitalta-app.vercel.app`
- Pero Vercel puede usar un dominio diferente en preview/production
- NextAuth requiere la URL exacta donde está deployado

**Solución**:
- En Vercel Settings, agregar variable: `NEXTAUTH_URL=$VERCEL_URL` 
- O usar el dominio específico configurado

---

### 5. 🏗️ **Build Command - Potencial Conflicto con Monorepo**
**Severidad**: 🟡 MEDIO

**Problema**:
- `vercel.json` tiene: `"buildCommand": "npm run build"`
- Pero está ejecutándose desde `apps/web/`
- El comando necesita acceso a dependencias raíz (si usa workspaces)

**Impacto**: 
- Posibles errores de dependencias no encontradas

**Solución**:
- Verificar que el build funciona localmente: `cd apps/web && npm run build`
- Si falla, puede ser por dependencias faltantes

---

### 6. 📦 **Node.js Version - Verificación**
**Severidad**: 🟢 BAJO

**Configurado**:
- `vercel.json` tiene: `"framework": "nextjs"` ✅
- `.nvmrc` no encontrado (Vercel usa 22.x por defecto) ✅

**Verificación Necesaria**:
- ¿Está `Node.js 22.x` disponible en tu `package.json`?
- Check: `package.json` tiene `"engines": { "node": ">=22.0.0" }`?

---

### 7. ⚡ **Rewrites en vercel.json - Posible Conflicto**
**Severidad**: 🟡 MEDIO

**Problema**:
- `vercel.json` tiene rewrites para `/api/*` → `https://api.capitalta.abdev.click`
- Pero también hay archivos en `apps/web/src/app/api/*`
- Vercel puede procesar ambos causando conflicto

**Configuración Actual**:
```json
"rewrites": [
  {
    "source": "/api/:path*",
    "destination": "https://api.capitalta.abdev.click/api/:path*"
  }
]
```

**Impacto**: 
- Llamadas a `/api/register` pueden ir al rewrite en lugar del backend
- O viceversa, dependiendo del orden

**Mejor Solución**:
- Remover el rewrite de `vercel.json`
- Usar `NEXT_PUBLIC_API_URL` directamente en código (ya está hecho ✅)
- Relying en fetch directo es más claro

---

### 8. 🚫 **Google Auth - Sin Credenciales**
**Severidad**: 🟡 MEDIO

**Problema**:
- `src/auth.ts` tiene Google provider pero sin credenciales:
  ```typescript
  clientId: process.env.GOOGLE_CLIENT_ID || '',
  clientSecret: process.env.GOOGLE_CLIENT_SECRET || '',
  ```
- Fallback a strings vacíos puede causar error

**Solución**:
- Si NO se usa Google Auth: Remover provider
- Si se usa: Configurar variables en Vercel

---

## ✅ Checklist de Fixes

- [ ] Eliminar `apps/web/vercel.json` (archivo duplicado)
- [ ] Remover postinstall de Prisma en `apps/web/package.json`
- [ ] Configurar NEXTAUTH_SECRET en Vercel
- [ ] Configurar NEXTAUTH_URL en Vercel (con $VERCEL_URL)
- [ ] Remover rewrite de `/api/*` en `vercel.json`
- [ ] Verificar NEXT_PUBLIC_API_URL en Vercel
- [ ] Remover Google provider si no se usa
- [ ] Hacer build local y verificar: `cd apps/web && npm run build`
- [ ] Hacer deploy en Vercel y verificar logs

---

## 🚀 Pasos para Corregir

### Paso 1: Eliminar Archivo Duplicado
```bash
rm apps/web/vercel.json
```

### Paso 2: Corregir package.json del Frontend
```bash
# Remover el postinstall que intenta ejecutar prisma
# Editar apps/web/package.json
```

### Paso 3: Simplificar vercel.json
```json
{
  "$schema": "https://openapi.vercel.sh/vercel.json",
  "root": "apps/web",
  "buildCommand": "npm run build",
  "outputDirectory": ".next",
  "installCommand": "npm install",
  "framework": "nextjs"
}
```

### Paso 4: Configurar Variables en Vercel

**En Vercel Dashboard → Settings → Environment Variables**:
```
NEXTAUTH_SECRET = [generar con: openssl rand -base64 32]
NEXTAUTH_URL = $VERCEL_URL
NEXT_PUBLIC_API_URL = https://api.capitalta.abdev.click
```

---

## 🔍 Verificación Post-Deploy

```bash
# 1. Verificar que el build es exitoso
vercel logs --follow

# 2. Revisar status de deployment
vercel inspect

# 3. Probar endpoint de login en producción
curl https://capitalta-app.vercel.app/api/login -X POST

# 4. Verificar variables de entorno en Vercel (NO mostrar valores)
vercel env pull
```

---

## 📝 Notas

- **Frontend Actual**: Probablemente en error o no funciona correctamente
- **Backend**: ✅ Funcionando en VPS (api.capitalta.abdev.click)
- **CORS**: ✅ Configurado en backend para permitir frontend
- **NextAuth**: ⚠️ Necesita variables de secreto para funcionar

---

**Próxima Acción**: Aplicar fixes en orden: 1 → 2 → 3 → 4 → Verificar
