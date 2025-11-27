#!/bin/bash
# Script para preparar el proyecto para production

echo "🚀 Preparando Revista Habitat para Production..."

# Verificar dependencias
echo "📦 Verificando dependencias..."
if ! command -v npm &> /dev/null; then
    echo "❌ npm no está instalado"
    exit 1
fi

# Instalar dependencias
echo "📥 Instalando dependencias..."
npm ci

# Build
echo "🔨 Compilando el proyecto..."
npm run build

# Verificar .env
echo "✅ Verificando configuración de entorno..."
if [ ! -f ".env.local" ]; then
    echo "⚠️  Archivo .env.local no encontrado"
    echo "📝 Crea el archivo .env.local con:"
    echo "   NEXT_PUBLIC_DIRECTUS_URL=https://habitat.horizontsoftware.com.ar"
    echo "   DIRECTUS_TOKEN=tu_token_aqui"
fi

echo "✨ ¡Listo para desplegar!"
echo ""
echo "Próximos pasos:"
echo "1. Push a tu repositorio: git push"
echo "2. En Dokploy Dashboard:"
echo "   - Crea un nuevo proyecto"
echo "   - Selecciona nixpacks como buildpack"
echo "   - Añade las variables de entorno"
echo "   - Deploy"
