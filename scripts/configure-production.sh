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

echo "🐳 Reiniciando contenedor del backend..."
cd /root
docker-compose -f docker-compose-capitalta.yml restart capitalta-api

echo "⏳ Esperando a que el servicio esté listo..."
sleep 5

echo "🧪 Verificando salud del API..."
HEALTH_CHECK=$(curl -s https://api.capitalta.abdev.click/health || echo "failed")
if [ "$HEALTH_CHECK" = '{"ok":true}' ]; then
    echo "✅ API responding correctly"
else
    echo "⚠️ API health check: $HEALTH_CHECK"
    echo "📋 Mostrando logs del API..."
    docker logs capitalta-api --tail 20
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
