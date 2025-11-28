# Configuración de Formulario de Contacto Institucional

## Colección en Directus: `contacto_instituciones`

Para que el formulario de contacto de instituciones funcione correctamente, necesitas crear la siguiente colección en Directus:

### Instrucciones

1. **Accede al panel de administración de Directus**
2. **Ve a Settings → Data Model**
3. **Crea una nueva colección:**
   - Nombre: `contacto_instituciones`
   - Display Template: `{{nombre_institucion}} - {{nombre_contacto}}`

### Campos (Fields)

Agrega los siguientes campos a la colección:

#### Campos de Sistema
- `id` (Primary Key) - Auto-generado
- `date_created` (DateTime) - Auto-generado

#### Información de la Institución
1. **nombre_institucion** (String/Input)
   - Interface: Input
   - Required: Yes
   - Note: "Nombre completo de la institución"

2. **tipo_institucion** (String/Dropdown)
   - Interface: Dropdown
   - Required: Yes
   - Choices:
     - `fundacion` → "Fundación"
     - `ong` → "ONG"
     - `asociacion` → "Asociación Civil"
     - `otro` → "Otro"

3. **descripcion** (Text/Textarea)
   - Interface: Textarea
   - Required: Yes
   - Note: "Descripción de la institución (mínimo 50 caracteres)"

4. **actividades** (Text/Textarea)
   - Interface: Textarea
   - Required: Yes
   - Note: "Actividades y proyectos que realizan"

#### Datos de Contacto
5. **nombre_contacto** (String/Input)
   - Interface: Input
   - Required: Yes
   - Note: "Nombre de la persona de contacto"

6. **cargo** (String/Input)
   - Interface: Input
   - Required: Yes
   - Note: "Cargo del contacto"

7. **email** (String/Input)
   - Interface: Input
   - Required: Yes
   - Validation: Email format
   - Width: Half

8. **telefono** (String/Input)
   - Interface: Input
   - Required: Yes
   - Width: Half

#### Presencia Digital
9. **sitio_web** (String/Input)
   - Interface: Input
   - Required: No
   - Validation: URL format

10. **instagram** (String/Input)
    - Interface: Input
    - Required: No
    - Placeholder: "@institucion"

11. **facebook** (String/Input)
    - Interface: Input
    - Required: No

12. **linkedin** (String/Input)
    - Interface: Input
    - Required: No

#### Control Interno
13. **estado** (String/Dropdown)
    - Interface: Dropdown
    - Required: Yes
    - Default Value: `pendiente`
    - Choices:
      - `pendiente` → "Pendiente de revisión"
      - `contactado` → "Contactado"
      - `publicado` → "Publicado"
      - `rechazado` → "Rechazado"

14. **fecha_creacion** (DateTime)
    - Interface: DateTime
    - Required: Yes
    - Default: Auto-generated on create

### Permisos

Configura los siguientes permisos para el rol **Public**:

1. **CREATE**: Permitir
   - Fields: Todos excepto `id`, `estado`, `date_created`
   
2. **READ**: Denegar (los datos son privados, solo para administradores)

3. **UPDATE**: Denegar

4. **DELETE**: Denegar

### Flow de Directus (Opcional - Notificación por Email)

Para recibir notificaciones por email cuando una institución llena el formulario:

1. **Crea un nuevo Flow en Directus:**
   - Trigger: `Action (Non-Blocking)` → `items.create` en `contacto_instituciones`

2. **Agrega una operación "Send Email":**
   - To: `yosuanmulti@gmail.com` (o el email del administrador)
   - Subject: `Nueva institución registrada: {{$trigger.payload.nombre_institucion}}`
   - Body:
   ```
   Se ha registrado una nueva institución en el formulario:
   
   INSTITUCIÓN:
   - Nombre: {{$trigger.payload.nombre_institucion}}
   - Tipo: {{$trigger.payload.tipo_institucion}}
   
   CONTACTO:
   - Nombre: {{$trigger.payload.nombre_contacto}}
   - Cargo: {{$trigger.payload.cargo}}
   - Email: {{$trigger.payload.email}}
   - Teléfono: {{$trigger.payload.telefono}}
   
   DESCRIPCIÓN:
   {{$trigger.payload.descripcion}}
   
   ACTIVIDADES:
   {{$trigger.payload.actividades}}
   
   REDES:
   - Sitio Web: {{$trigger.payload.sitio_web}}
   - Instagram: {{$trigger.payload.instagram}}
   - Facebook: {{$trigger.payload.facebook}}
   - LinkedIn: {{$trigger.payload.linkedin}}
   
   Estado: {{$trigger.payload.estado}}
   Fecha: {{$trigger.payload.fecha_creacion}}
   ```

3. **Activa el Flow**

## Implementación en el Sitio Web

El formulario ya está implementado y aparecerá automáticamente en las subcategorías que contengan en su slug las palabras:
- `rse`
- `fundacion`
- `ong`

### Ubicación del Formulario
- **Componente**: `components/institution-contact-form.tsx`
- **Acción del servidor**: `app/actions/contact-institution.tsx`
- **Página**: Se muestra en `app/categoria/[category]/[subcategory]/page.tsx`

### Pruebas

1. Navega a la subcategoría "RSE fundaciones y ONG"
2. Deberías ver el formulario destacado con fondo degradado
3. Llena todos los campos requeridos
4. Envía el formulario
5. Verifica en Directus que se creó el registro en `contacto_instituciones`
6. Si configuraste el Flow, verifica que llegó el email

## Notas Importantes

- Los registros se guardan con estado `pendiente` por defecto
- Puedes cambiar el estado manualmente desde Directus para hacer seguimiento
- El formulario valida que:
  - La descripción tenga mínimo 50 caracteres
  - Las actividades tengan mínimo 50 caracteres
  - El email sea válido
  - El sitio web sea una URL válida (si se proporciona)
  - El teléfono tenga al menos 8 caracteres
