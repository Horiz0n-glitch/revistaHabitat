
import { createDirectus, staticToken, rest, createCollection, createField } from '@directus/sdk';
import 'dotenv/config';

const DIRECTUS_URL = process.env.NEXT_PUBLIC_DIRECTUS_URL || process.env.DIRECTUS_URL;
const DIRECTUS_TOKEN = process.env.DIRECTUS_TOKEN;

if (!DIRECTUS_URL || !DIRECTUS_TOKEN) {
    console.error('Error: DIRECTUS_URL or DIRECTUS_TOKEN env vars are missing');
    process.exit(1);
}

const client = createDirectus(DIRECTUS_URL)
    .with(staticToken(DIRECTUS_TOKEN))
    .with(rest());

async function main() {
    console.log('Starting Directus schema update...');

    try {
        // 1. Create collection
        console.log('Creating "comentarios" collection...');
        try {
            await client.request(createCollection({
                collection: 'comentarios',
                schema: {
                    name: 'comentarios'
                },
                meta: {
                    note: 'User comments for articles',
                    display_template: '{{author_name}}: {{content}}',
                    hidden: false,
                    singleton: false,
                    archive_app_filter: true,
                    archive_field: 'status',
                    archive_value: 'archived',
                    unarchive_value: 'draft',
                    sort_field: 'date_created'
                }
            }));
            console.log('Collection created.');
        } catch (e) {
            if (e.errors?.[0]?.extensions?.code === 'RpDuplicateException') {
                console.log('Collection "comentarios" already exists, skipping creation.');
            } else {
                throw e;
            }
        }

        // 2. Create fields
        const fields = [
            {
                collection: 'comentarios',
                field: 'id',
                type: 'integer',
                schema: { is_primary_key: true, has_auto_increment: true },
                meta: { hidden: true }
            },
            {
                collection: 'comentarios',
                field: 'status',
                type: 'string',
                schema: { default_value: 'draft' },
                meta: {
                    interface: 'select-dropdown',
                    options: {
                        choices: [
                            { text: 'Published', value: 'published' },
                            { text: 'Draft', value: 'draft' },
                            { text: 'Archived', value: 'archived' }
                        ]
                    }
                }
            },
            {
                collection: 'comentarios',
                field: 'author_name',
                type: 'string',
                schema: {},
                meta: { interface: 'input', display: 'raw', required: true }
            },
            {
                collection: 'comentarios',
                field: 'content',
                type: 'text',
                schema: {},
                meta: { interface: 'input-multiline', display: 'raw', required: true }
            },
            {
                collection: 'comentarios',
                field: 'date_created',
                type: 'timestamp',
                schema: { default_value: 'CURRENT_TIMESTAMP' },
                meta: { interface: 'datetime', readonly: true, special: ['date-created'] }
            },
            {
                collection: 'comentarios',
                field: 'article_id',
                type: 'integer', // Assuming article IDs are integers based on previous context
                schema: {},
                meta: { interface: 'input', required: true } // Simplified for now, relation setup is complex via script without knowing target types
            }
        ];

        for (const field of fields) {
            try {
                console.log(`Creating field "${field.field}"...`);
                await client.request(createField(field.collection, field));
                console.log(`Field "${field.field}" created.`);
            } catch (e) {
                if (e.errors?.[0]?.extensions?.code === 'RpDuplicateException' || e.errors?.[0]?.extensions?.code === 'INVALID_PAYLOAD') { // Invalid payload often means field exists regarding primary key
                    console.log(`Field "${field.field}" likely already exists, skipping.`);
                } else {
                    console.error(`Error creating field ${field.field}:`, e);
                    // Don't throw, try to continue
                }
            }
        }

        console.log('Done.');

    } catch (error) {
        console.error('Failed to update schema:', error);
        process.exit(1);
    }
}

main();
