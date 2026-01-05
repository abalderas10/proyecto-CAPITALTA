#!/bin/bash

# Script de configuración de seguridad para Capitalta VPS
# Este script configura JWT_SECRET y reinicia los servicios

set -e

echo "🔐 Configurando JWT_SECRET para producción..."

# Generar JWT_SECRET seguro
JWT_SECRET=$(openssl rand -base64 32)

echo "📁 Navegando al directorio del proyecto..."
cd /root/proyecto-CAPITALTA

echo "📝 Actualizando archivo .env..."
# Verificar si existe el archivo .env
if [ -f ".env" ]; then
    # Respaldar archivo original
    cp .env .env.backup.$(date +%Y%m%d%H%M%S)
    
    # Verificar si JWT_SECRET ya existe y actualizarlo
    if grep -q "JWT_SECRET=" .env; then
        sed -i "s|JWT_SECRET=.*|JWT_SECRET=$JWT_SECRET|" .env
        echo "✅ JWT_SECRET actualizado en .env"
    else
        echo "JWT_SECRET=$JWT_SECRET" >> .env
        echo "✅ JWT_SECRET agregado a .env"
    fi
else
    echo "JWT_SECRET=$JWT_SECRET" > .env
    echo "✅ Archivo . creado con JWT_SECRET"
fi

echo "🔧 Configurando NODE_ENV=production..."
if grep -q "NODE_ENV=" .env; then
    sed -i "s|NODE_ENV=.*|NODE_ENV=production|" .env
else
    echo "NODE_ENV=production" >> .env
fi

echo "� Verificando JWT_REFRESH_SECRET..."
# Generar JWT_REFRESH_SECRET si no existe
if grep -q "JWT_REFRESH_SECRET=" .env; then
    echo "✅ JWT_REFRESH_SECRET ya existe"
else
    JWT_REFRESH_SECRET=$(openssl rand -base64 32)
    echo "JWT_REFRESH_SECRET=$JWT_REFRESH_SECRET" >> .env
    echo "✅ JWT_REFRESH_SECRET generado y escrito en .env"
fi

# Crear carpeta de backups
BACKUP_DIR=/root/backups
mkdir -p "$BACKUP_DIR"
BACKUP_FILE="$BACKUP_DIR/capitalta_prod_$(date +%Y%m%d%H%M%S).sql"

echo "📦 Haciendo dump de la base de datos a $BACKUP_FILE..."
# Realizar el pg_dump desde el contenedor de postgres
if docker ps --format '{{.Names}}' | grep -q "capitalta-db"; then
    docker exec -t capitalta-db pg_dump -U capitalta capitalta_prod > "$BACKUP_FILE"
    if [ $? -ne 0 ]; then
        echo "❌ Error al generar dump de la base de datos. Abortando."
        exit 1
    fi
    echo "✅ Backup creado: $BACKUP_FILE"
else
    echo "⚠️ No se encontró el contenedor 'capitalta-db'. Asegúrate de que la BD esté en ejecución."
    exit 1
fi

# Verificar que existan migraciones en el repo
if [ -d "./prisma/migrations" ] && [ "$(ls -A prisma/migrations)" ]; then
    echo "✅ Se encontraron migraciones en ./prisma/migrations"
else
    echo "❌ No se encontraron migraciones en ./prisma/migrations. Genera y commitea las migraciones antes de ejecutar en producción."
    exit 1
fi

# Ejecutar migraciones de forma segura usando 'prisma migrate deploy' dentro del contenedor del API
echo "🔁 Aplicando migraciones con 'prisma migrate deploy' en el contenedor del API..."
cd /root
if docker ps --format '{{.Names}}' | grep -q "capitalta-api"; then
    docker-compose -f docker-compose-capitalta.yml exec -T capitalta-api npx prisma migrate deploy
    MIG_EXIT=$?
    if [ $MIG_EXIT -ne 0 ]; then
        echo "❌ Falló 'prisma migrate deploy' (exit $MIG_EXIT). Mostrando logs del API..."
        docker logs capitalta-api --tail 100
        echo "Aborting to avoid inconsistent DB state."
        exit 1
    fi
    echo "✅ Migraciones aplicadas correctamente"
else
    echo "⚠️ No se encontró el contenedor 'capitalta-api'. Asegúrate de que el servicio esté levantado."
    exit 1
fi

# Reconstruir y reiniciar el servicio del backend
echo "🐳 Reconstruyendo y reiniciando el contenedor del backend..."
docker-compose -f docker-compose-capitalta.yml up -d --build capitalta-api

echo "⏳ Esperando a que el servicio esté listo..."
sleep 5

echo "🧪 Verificando salud del API..."
HEALTH_CHECK=$(curl -s https://api.capitalta.abdev.click/health || echo "failed")
if [ "$HEALTH_CHECK" = '{"ok":true}' ]; then
    echo "✅ API responding correctly"
else
    echo "⚠️ API health check: $HEALTH_CHECK"
    echo "📋 Mostrando logs del API..."
    docker logs capitalta-api --tail 200
fi

echo ""
echo "🎉 Configuración completada!"
echo ""
echo "📋 Resumen:"
echo "   - JWT_SECRET ha sido generado y configurado"
echo "   - NODE_ENV=production establecido"
echo "   - Backend reiniciado"
echo ""
echo "⚠️ IMPORTANTE: Guarda esta información de forma segura:"
echo "   JWT_SECRET=$JWT_SECRET"
echo ""
echo "💡 Si necesitas regenerar el JWT_SECRET en el futuro, ejecuta este script nuevamente."
