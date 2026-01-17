# ✅ Guía de Configuración Final - Vercel Deploy

**Fecha**: 16 de Enero 2026
**Estado**: ✅ Código Corregido - Falta Configurar Variables en Vercel

---

## 🎯 Resumen de Cambios Realizados

### ✅ Archivos Modificados:

1. **`vercel.json` (raíz)**
   - ✅ Removido rewrite innecesario de `/api/*`
   - ✅ Configuración simplificada y clara
   - ✅ Sin conflictos con rutas locales

2. **`apps/web/package.json`**
   - ✅ Removido postinstall que ejecutaba `prisma generate`
   - ✅ Prisma NO se necesita en frontend
   - ✅ Builds más rápidos

3. **`apps/web/.env.example`**
   - ✅ Removida referencia a DATABASE_URL (no necesaria)
   - ✅ Agregada variable `NEXT_PUBLIC_API_URL`
   - ✅ Documentación clara de variables requeridas

4. **`apps/web/vercel.json` (duplicado)**
   - ✅ ELIMINADO - Causa conflictos con la configuración raíz

---

## 🔧 Pasos Finales - Configurar Vercel

### Paso 1: Conectar/Sincronizar en Vercel

```bash
# Si aún no está conectado:
vercel link

# Actualizar cambios
git add .
git commit -m "fix: corregir configuración de Vercel y remover Prisma del frontend"
git push origin main
```

### Paso 2: Configurar Variables de Entorno en Vercel

**En Dashboard → https://vercel.com/dashboard**

1. Seleccionar el proyecto `proyecto-capitalta-web` (o similar)
2. Ir a **Settings → Environment Variables**
3. Agregar las siguientes variables:

#### Variables Requeridas:

```
NEXTAUTH_SECRET = [Generar nuevo con: openssl rand -base64 32]
NEXTAUTH_URL = $VERCEL_URL
NEXT_PUBLIC_API_URL = https://api.capitalta.abdev.click
```

#### Generar NEXTAUTH_SECRET (en terminal):
```bash
openssl rand -base64 32
```

**Ejemplo de salida:**
```
abc123def456ghi789jkl012mno345pqr=
```

**Pasos en Vercel UI:**
1. Click en "Add New"
2. **Name**: `NEXTAUTH_SECRET`
3. **Value**: (pegar el valor generado)
4. Click "Save"

Repetir para:
- `NEXTAUTH_URL` = `$VERCEL_URL`
- `NEXT_PUBLIC_API_URL` = `https://api.capitalta.abdev.click`

### Paso 3: Desencadenar Nuevo Build

```bash
# Opción 1: Desde CLI
vercel --prod

# Opción 2: Desde Vercel UI
# Settings → Deployments → Redeploy
# Seleccionar el último commit y hacer "Redeploy"
```

### Paso 4: Verificar Deployment

```bash
# Ver logs en tiempo real
vercel logs --follow

# Inspeccionar deployment
vercel inspect

# Probar la URL
curl https://capitalta-app.vercel.app

# Probar API en producción
curl https://capitalta-app.vercel.app/api/login -X POST
```

---

## 🧪 Checklist de Verificación

### Pre-Deploy
- [ ] `vercel.json` simplificado (sin rewrites)
- [ ] `apps/web/vercel.json` eliminado
- [ ] `apps/web/package.json` sin postinstall de Prisma
- [ ] `apps/web/.env.example` actualizado
- [ ] Cambios committed y pusheados a main

### Post-Deploy en Vercel
- [ ] Variables de entorno configuradas
- [ ] Build completado exitosamente
- [ ] Acceso a https://capitalta-app.vercel.app
- [ ] Login funciona (redirige correctamente)
- [ ] Conexión a backend API (api.capitalta.abdev.click)
- [ ] NextAuth sessions se crean correctamente

### Pruebas Funcionales
```bash
# 1. Acceder a página de login
curl https://capitalta-app.vercel.app/login

# 2. Intentar login sin credenciales
curl -X POST https://capitalta-app.vercel.app/api/login \
  -H "Content-Type: application/json" \
  -d '{"email":"","password":""}'

# 3. Verificar NEXTAUTH_SECRET está seteado
# Debería redirigir a login si no hay sesión
curl -b "Cookie: next-auth.session-token=invalid" \
  https://capitalta-app.vercel.app/dashboard
```

---

## 📋 Configuración en Vercel Dashboard

**Settings que ya están correctos:**
- ✅ Root Directory: `apps/web` (Vercel lo detecta automáticamente)
- ✅ Framework: Next.js (detectado automáticamente)
- ✅ Build Command: `npm run build`
- ✅ Output Directory: `.next`
- ✅ Node.js: 22.x (automático, puedes verificar)

---

## 🚨 Errores Comunes y Soluciones

### Error: "NEXTAUTH_SECRET is undefined"
**Causa**: Variable no configurada en Vercel
**Solución**: 
```bash
# En Vercel UI → Settings → Environment Variables
# Agregar: NEXTAUTH_SECRET = [valor aleatorio]
```

### Error: "Cannot reach https://api.capitalta.abdev.click"
**Causa**: Backend API no está corriendo
**Solución**: 
```bash
# Verificar que VPS tiene backend funcionando
ssh root@149.102.137.243
docker ps | grep capitalta-api
docker logs capitalta-api
```

### Error: "Module not found" durante build
**Causa**: Dependencias faltantes
**Solución**:
```bash
# Reinstalar localmente y verificar
cd apps/web
npm install
npm run build
```

### Error: "Rewrites not found" (404 en /api/*)
**Causa**: Se removieron rewrites pero código aún los usa
**Solución**:
- ✅ Ya está corregido en vercel.json
- ✅ Código usa `NEXT_PUBLIC_API_URL` directamente

---

## 📞 Comandos Útiles Vercel CLI

```bash
# Conectar proyecto a Vercel
vercel link

# Deployar en staging
vercel

# Deployar en producción
vercel --prod

# Ver estado actual
vercel status

# Ver logs
vercel logs [--follow]

# Inspeccionar deployment
vercel inspect

# Listar variables de entorno
vercel env list

# Pullizar variables de entorno localmente
vercel env pull
```

---

## ✨ Próximas Mejoras (Opcionales)

1. **Agregar `.nvmrc` para especificar Node.js:**
   ```
   22.11.0
   ```

2. **Agregar `.vercelignore` para excluir archivos innecesarios:**
   ```
   .git
   .gitignore
   .env.local
   node_modules
   .next
   dist
   docs
   external
   deploy
   ```

3. **Configurar dominio personalizado:**
   - En Vercel Settings → Domains
   - Agregar `app.capitalta.abdev.click`
   - Actualizar DNS si es necesario

4. **Habilitar Analytics y Monitoring:**
   - Web Analytics (gratuito)
   - Sentry para error tracking

---

## 📝 Resumen

**Antes**:
- ❌ vercel.json con rewrites conflictivos
- ❌ vercel.json duplicado en apps/web
- ❌ Prisma en postinstall (innecesario)
- ❌ Variables de entorno no configuradas en Vercel

**Ahora**:
- ✅ vercel.json limpio y simple
- ✅ Archivo duplicado eliminado
- ✅ Build más rápido sin Prisma
- ✅ Variables listas para configurar

**Próximo Paso**: Configurar variables en Vercel Dashboard y verificar que todo funciona.

---

**Documento Generado**: 16 de Enero 2026
**Estado**: ✅ Listo para Deploy
