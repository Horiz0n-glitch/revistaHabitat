# Configuración de Directus para Revista Habitat

Esta guía te ayudará a configurar Directus en tu VPS y conectarlo con el proyecto Next.js.

## 1. Instalación de Directus en tu VPS

### Opción A: Instalación con Docker (Recomendada)

1. Instala Docker y Docker Compose en tu VPS:
\`\`\`bash
# Ubuntu/Debian
sudo apt update
sudo apt install docker.io docker-compose -y
sudo systemctl enable docker
sudo systemctl start docker
\`\`\`

2. Crea un directorio para Directus:
\`\`\`bash
mkdir -p ~/directus
cd ~/directus
\`\`\`

3. Crea un archivo `docker-compose.yml`:
\`\`\`yaml
version: '3'
services:
  database:
    image: postgres:15
    volumes:
      - ./data/database:/var/lib/postgresql/data
    environment:
      POSTGRES_DB: directus
      POSTGRES_USER: directus
      POSTGRES_PASSWORD: tu-password-seguro
    networks:
      - directus

  directus:
    image: directus/directus:latest
    ports:
      - 8055:8055
    volumes:
      - ./uploads:/directus/uploads
      - ./extensions:/directus/extensions
    depends_on:
      - database
    environment:
      KEY: reemplaza-con-clave-aleatoria-32-caracteres
      SECRET: reemplaza-con-secreto-aleatorio-32-caracteres
      
      DB_CLIENT: pg
      DB_HOST: database
      DB_PORT: 5432
      DB_DATABASE: directus
      DB_USER: directus
      DB_PASSWORD: tu-password-seguro
      
      ADMIN_EMAIL: admin@tudominio.com
      ADMIN_PASSWORD: tu-password-admin
      
      PUBLIC_URL: https://directus.tudominio.com
      
      # Configuración de CORS
      CORS_ENABLED: true
      CORS_ORIGIN: https://tudominio.com,http://localhost:3000
      
      # Storage (opcional: usar S3, Cloudflare R2, etc.)
      STORAGE_LOCATIONS: local
      STORAGE_LOCAL_ROOT: ./uploads
      
    networks:
      - directus

networks:
  directus:
\`\`\`

4. Genera claves aleatorias seguras:
\`\`\`bash
# KEY y SECRET deben ser strings aleatorios de al menos 32 caracteres
openssl rand -base64 32
\`\`\`

5. Inicia Directus:
\`\`\`bash
docker-compose up -d
\`\`\`

6. Verifica que esté corriendo:
\`\`\`bash
docker-compose ps
docker-compose logs directus
\`\`\`

### Opción B: Instalación Manual con Node.js

\`\`\`bash
# Instala Node.js 18+ y PostgreSQL
sudo apt install nodejs npm postgresql -y

# Crea base de datos
sudo -u postgres createdb directus
sudo -u postgres createuser directus -P

# Instala Directus
npx create-directus-project directus

# Sigue las instrucciones del instalador
\`\`\`

## 2. Configuración Inicial de Directus

1. Accede a tu instancia:
   - URL: `http://tu-ip-vps:8055` o `https://directus.tudominio.com`
   - Email: el que configuraste en ADMIN_EMAIL
   - Password: el que configuraste en ADMIN_PASSWORD

2. Ve a **Settings → Project Settings → Security**
   - Activa **CORS Enabled**
   - En **CORS Origin**, agrega:
     - `http://localhost:3000` (desarrollo)
     - `https://tudominio.com` (producción)

## 3. Crear las Colecciones (Tablas)

Sigue estos pasos en orden:

### 3.1 Colección: categories

Settings → Data Model → Create Collection

**Nombre:** `categories`

**Campos:**
- `id` (Primary Key) - Integer, Auto Increment
- `name` - String, Required
- `slug` - String, Required, Unique
- `description` - Text
- `icon` - String
- `parent_category` - Many-to-One → categories (self-reference)
- `status` - Dropdown: published, draft, archived (Default: published)
- `sort` - Integer
- `date_created` - Timestamp (Auto)
- `date_updated` - Timestamp (Auto)

### 3.2 Colección: tags

**Nombre:** `tags`

**Campos:**
- `id` - Integer, Auto Increment
- `name` - String, Required
- `slug` - String, Required, Unique
- `status` - Dropdown: published, draft

### 3.3 Colección: authors

**Nombre:** `authors`

**Campos:**
- `id` - Integer, Auto Increment
- `name` - String, Required
- `email` - String (Email format)
- `bio` - Text
- `avatar` - Image (File)
- `role` - String
- `social_links` - JSON
- `status` - Dropdown: active, inactive

### 3.4 Colección: articles

**Nombre:** `articles`

**Campos:**
- `id` - Integer, Auto Increment
- `title` - String, Required
- `slug` - String, Required, Unique
- `excerpt` - Text, Required
- `content` - WYSIWYG, Required
- `featured_image` - Image (File), Required
- `gallery` - Multiple Files
- `category` - Many-to-One → categories, Required
- `subcategory` - Many-to-One → categories
- `author` - Many-to-One → authors, Required
- `tags` - Many-to-Many → tags
- `featured` - Boolean (Default: false)
- `views` - Integer (Default: 0)
- `reading_time` - Integer
- `seo_title` - String
- `seo_description` - Text
- `status` - Dropdown: published, draft, archived (Default: draft)
- `publish_date` - DateTime, Required
- `date_created` - Timestamp (Auto)
- `date_updated` - Timestamp (Auto)

### 3.5 Colección: interviews

**Nombre:** `interviews`

**Campos:**
- `id` - Integer, Auto Increment
- `title` - String, Required
- `slug` - String, Required, Unique
- `excerpt` - Text, Required
- `content` - WYSIWYG, Required
- `featured_image` - Image (File), Required
- `interviewee_name` - String, Required
- `interviewee_title` - String
- `audio_file` - File (audio/mp3)
- `category` - Many-to-One → categories
- `author` - Many-to-One → authors, Required
- `tags` - Many-to-Many → tags
- `featured` - Boolean (Default: false)
- `views` - Integer (Default: 0)
- `status` - Dropdown: published, draft, archived
- `publish_date` - DateTime, Required
- `date_created` - Timestamp (Auto)
- `date_updated` - Timestamp (Auto)

### 3.6 Colección: magazines

**Nombre:** `magazines`

**Campos:**
- `id` - Integer, Auto Increment
- `title` - String, Required
- `slug` - String, Required, Unique
- `issue_number` - Integer, Required
- `year` - Integer, Required
- `cover_image` - Image (File), Required
- `pdf_file` - File (application/pdf)
- `description` - Text
- `price` - Decimal, Required
- `table_of_contents` - JSON
- `highlights` - JSON
- `page_count` - Integer
- `status` - Dropdown: available, sold_out, upcoming
- `publish_date` - Date, Required
- `date_created` - Timestamp (Auto)
- `date_updated` - Timestamp (Auto)

### 3.7 Colección: ads

**Nombre:** `ads`

**Campos:**
- `id` - Integer, Auto Increment
- `name` - String, Required
- `image` - Image (File), Required
- `link_url` - String (URL format)
- `size` - Dropdown: leaderboard, billboard, rectangle, square, skyscraper, article-card
- `position` - String
- `impressions` - Integer (Default: 0)
- `clicks` - Integer (Default: 0)
- `status` - Dropdown: active, paused, expired
- `start_date` - Date
- `end_date` - Date
- `client_name` - String
- `priority` - Integer (Default: 1)

## 4. Configurar Permisos

Settings → Roles & Permissions

### Rol: Public (sin autenticación)

Para cada colección:
- `articles`: Read (filter: status = published)
- `interviews`: Read (filter: status = published)
- `magazines`: Read (filter: status = available)
- `categories`: Read (filter: status = published)
- `tags`: Read
- `authors`: Read
- `ads`: Read (filter: status = active)

### Rol: Administrator

- Acceso completo a todas las colecciones

## 5. Generar Token de Acceso

1. Ve a **Settings → Access Tokens**
2. Click en **Create Token**
3. **Name:** "Next.js Production"
4. **Role:** Administrator (o crea un rol específico)
5. No marcar fecha de expiración (o configura según necesites)
6. Copia el token generado

## 6. Configurar Variables de Entorno en Next.js

Crea un archivo `.env.local` en la raíz del proyecto Next.js:

\`\`\`env
# Directus Configuration
NEXT_PUBLIC_DIRECTUS_URL=https://directus.tudominio.com
DIRECTUS_TOKEN=tu-token-generado-aqui
\`\`\`

## 7. Importar Datos de Ejemplo (Opcional)

Puedo crear un script de migración para importar todos los datos mock actuales a Directus. Esto incluye:
- Categorías y subcategorías
- Artículos de ejemplo
- Entrevistas de ejemplo
- Revistas
- Tags
- Autores

¿Quieres que cree este script de migración?

## 8. Nginx Reverse Proxy (Recomendado para Producción)

Si usas Nginx, configura un reverse proxy:

\`\`\`nginx
server {
    listen 80;
    server_name directus.tudominio.com;

    location / {
        proxy_pass http://localhost:8055;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
\`\`\`

Luego instala SSL con Certbot:
\`\`\`bash
sudo apt install certbot python3-certbot-nginx -y
sudo certbot --nginx -d directus.tudominio.com
\`\`\`

## 9. Verificar Instalación

Prueba la API:
\`\`\`bash
curl https://directus.tudominio.com/server/health
\`\`\`

## Credenciales que Necesito

Una vez completada la configuración, proporcióname:

\`\`\`
DIRECTUS_URL=https://directus.tudominio.com
DIRECTUS_TOKEN=tu-token-aqui
\`\`\`

## Soporte

Si encuentras problemas:
1. Revisa los logs: `docker-compose logs directus`
2. Verifica conectividad: `curl http://tu-ip:8055/server/health`
3. Revisa CORS en Settings → Security
4. Verifica permisos en Settings → Roles & Permissions
