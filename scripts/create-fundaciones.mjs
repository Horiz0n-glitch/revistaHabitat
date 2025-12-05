// Script para crear la colección "fundaciones" en Directus
const DIRECTUS_URL = 'https://habitat.horizontsoftware.com.ar';
const DIRECTUS_TOKEN = '2jRQBM5hlFHSjGpQo39wWGTJFxIiT_R1';

async function createFundacionesCollection() {
    const headers = {
        'Authorization': `Bearer ${DIRECTUS_TOKEN}`,
        'Content-Type': 'application/json'
    };

    console.log('🚀 Creando colección "fundaciones" en Directus...\n');

    try {
        // 1. Crear la colección
        console.log('📦 Paso 1: Creando colección...');
        const collectionResponse = await fetch(`${DIRECTUS_URL}/collections`, {
            method: 'POST',
            headers,
            body: JSON.stringify({
                collection: 'fundaciones',
                meta: {
                    collection: 'fundaciones',
                    icon: 'business',
                    note: 'Directorio de fundaciones dedicadas al patrimonio y la arquitectura',
                    display_template: '{{nombre}}',
                    hidden: false,
                    singleton: false,
                    translations: null,
                    archive_field: 'estado',
                    archive_value: 'archivado',
                    unarchive_value: 'borrador',
                    sort_field: 'orden'
                },
                schema: {
                    name: 'fundaciones'
                }
            })
        });

        if (!collectionResponse.ok) {
            const error = await collectionResponse.json();
            if (error.errors?.[0]?.extensions?.code === 'INVALID_PAYLOAD' &&
                error.errors?.[0]?.message?.includes('already exists')) {
                console.log('   ⚠️ La colección ya existe, continuando con los campos...');
            } else {
                throw new Error(JSON.stringify(error));
            }
        } else {
            console.log('   ✅ Colección creada exitosamente');
        }

        // 2. Crear los campos
        console.log('\n📝 Paso 2: Creando campos...');

        const fields = [
            {
                field: 'id',
                type: 'integer',
                meta: { hidden: true, interface: 'input', readonly: true },
                schema: { is_primary_key: true, has_auto_increment: true }
            },
            {
                field: 'nombre',
                type: 'string',
                meta: { interface: 'input', display: 'raw', required: true, note: 'Nombre de la fundación' },
                schema: { is_nullable: false }
            },
            {
                field: 'slug',
                type: 'string',
                meta: { interface: 'input', display: 'raw', required: true, note: 'URL amigable (único)' },
                schema: { is_nullable: false, is_unique: true }
            },
            {
                field: 'logo',
                type: 'uuid',
                meta: { interface: 'file-image', display: 'image', note: 'Logo de la fundación' },
                schema: { is_nullable: true }
            },
            {
                field: 'descripcion',
                type: 'text',
                meta: { interface: 'input-multiline', display: 'raw', note: 'Descripción breve' },
                schema: { is_nullable: true }
            },
            {
                field: 'biografia',
                type: 'text',
                meta: { interface: 'input-rich-text-html', display: 'raw', note: 'Biografía extendida' },
                schema: { is_nullable: true }
            },
            {
                field: 'sitio_web',
                type: 'string',
                meta: { interface: 'input', display: 'raw', note: 'URL del sitio web' },
                schema: { is_nullable: true }
            },
            {
                field: 'email',
                type: 'string',
                meta: { interface: 'input', display: 'raw', note: 'Email de contacto' },
                schema: { is_nullable: true }
            },
            {
                field: 'telefono',
                type: 'string',
                meta: { interface: 'input', display: 'raw', note: 'Teléfono de contacto' },
                schema: { is_nullable: true }
            },
            {
                field: 'direccion',
                type: 'string',
                meta: { interface: 'input', display: 'raw', note: 'Dirección física' },
                schema: { is_nullable: true }
            },
            {
                field: 'instagram',
                type: 'string',
                meta: { interface: 'input', display: 'raw', note: 'Usuario o URL de Instagram' },
                schema: { is_nullable: true }
            },
            {
                field: 'facebook',
                type: 'string',
                meta: { interface: 'input', display: 'raw', note: 'Usuario o URL de Facebook' },
                schema: { is_nullable: true }
            },
            {
                field: 'linkedin',
                type: 'string',
                meta: { interface: 'input', display: 'raw', note: 'Usuario o URL de LinkedIn' },
                schema: { is_nullable: true }
            },
            {
                field: 'twitter',
                type: 'string',
                meta: { interface: 'input', display: 'raw', note: 'Usuario o URL de Twitter' },
                schema: { is_nullable: true }
            },
            {
                field: 'estado',
                type: 'string',
                meta: {
                    interface: 'select-dropdown',
                    display: 'labels',
                    options: {
                        choices: [
                            { text: 'Publicado', value: 'publicado' },
                            { text: 'Borrador', value: 'borrador' },
                            { text: 'Archivado', value: 'archivado' }
                        ]
                    },
                    default_value: 'borrador',
                    note: 'Estado de publicación'
                },
                schema: { is_nullable: false, default_value: 'borrador' }
            },
            {
                field: 'orden',
                type: 'integer',
                meta: { interface: 'input', display: 'raw', note: 'Orden de aparición' },
                schema: { is_nullable: true }
            },
            {
                field: 'date_created',
                type: 'timestamp',
                meta: { interface: 'datetime', display: 'datetime', readonly: true, hidden: true, special: ['date-created'] },
                schema: { is_nullable: true }
            }
        ];

        for (const field of fields) {
            try {
                const fieldResponse = await fetch(`${DIRECTUS_URL}/fields/fundaciones`, {
                    method: 'POST',
                    headers,
                    body: JSON.stringify(field)
                });

                if (!fieldResponse.ok) {
                    const error = await fieldResponse.json();
                    if (error.errors?.[0]?.message?.includes('already exists')) {
                        console.log(`   ⏭️ Campo "${field.field}" ya existe, saltando...`);
                    } else {
                        console.log(`   ❌ Error creando campo "${field.field}":`, error.errors?.[0]?.message || error);
                    }
                } else {
                    console.log(`   ✅ Campo "${field.field}" creado`);
                }
            } catch (err) {
                console.log(`   ❌ Error en campo "${field.field}":`, err.message);
            }
        }

        // 3. Configurar permisos públicos de lectura
        console.log('\n🔓 Paso 3: Configurando permisos públicos...');

        const permissionResponse = await fetch(`${DIRECTUS_URL}/permissions`, {
            method: 'POST',
            headers,
            body: JSON.stringify({
                role: null, // null = public role
                collection: 'fundaciones',
                action: 'read',
                fields: ['*'],
                permissions: {
                    estado: { _eq: 'publicado' }
                }
            })
        });

        if (!permissionResponse.ok) {
            const error = await permissionResponse.json();
            console.log('   ⚠️ Permisos:', error.errors?.[0]?.message || 'Ya configurados o error');
        } else {
            console.log('   ✅ Permisos públicos de lectura configurados');
        }

        console.log('\n🎉 ¡Proceso completado!');
        console.log('   La colección "fundaciones" está lista en Directus.');
        console.log('   Puedes agregar fundaciones desde: ' + DIRECTUS_URL + '/admin/content/fundaciones');

    } catch (error) {
        console.error('\n❌ Error general:', error.message);
    }
}

createFundacionesCollection();
