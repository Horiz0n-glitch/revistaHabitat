# Guía de Deployment en Dokploy con Nixpacks

## Requisitos
- Dokploy instalado en tu VPS
- Node.js 20+ (Nixpacks lo instalará automáticamente)
- npm o yarn

## Pasos para Desplegar

### 1. En Dokploy Dashboard
1. Ve a "Projects" → "Create New Project"
2. Selecciona tu repositorio Git (GitHub/GitLab)
3. Elige la rama (main)
4. Selecciona **Nixpacks** como buildpack

### 2. Configuración del Build
- **Build Command**: `npm run build`
- **Start Command**: `npm start`
- **Runtime Port**: `3000`

### 3. Variables de Entorno
Añade en Dokploy:
```
NODE_ENV=production
NPM_PRODUCTION=true
NEXT_PUBLIC_DIRECTUS_URL=https://habitat.horizontsoftware.com.ar
DIRECTUS_TOKEN=your_actual_token
```

### 4. Health Check (Opcional pero recomendado)
- **Path**: `/`
- **Interval**: 30s
- **Timeout**: 3s

## Alternativa: Usar Dockerfile (Si Nixpacks no funciona)

Si Nixpacks tiene problemas, Dokploy también soporta el Dockerfile que ya está incluido:
```bash
docker build -t revista-habitat .
```

## Monitoreo
- Los logs están disponibles en el dashboard de Dokploy
- Usa: `dokploy logs [project-id]` en terminal

## Notas Importantes
- El proyecto usa Next.js 16 (SSR + SSG soportados)
- Las imágenes están optimizadas para remotePatterns
- Asegúrate que el DIRECTUS_TOKEN sea válido
- El puerto 3000 debe estar expuesto

## Comandos Útiles Locales
```bash
# Verificar que todo funciona
npm ci
npm run build
npm start

# Desarrollo local
npm run dev
```

## Problemas Comunes

### Build Fails
- Verifica que `package-lock.json` esté en el repo
- Asegúrate que todas las variables ENV sean válidas

### Port Already in Use
- Cambia el puerto en Dokploy o usa: `PORT=3001 npm start`

### Problemas con Directus
- Verifica la URL y token de Directus
- Asegúrate que Directus sea accesible desde el VPS
