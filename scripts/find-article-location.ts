
import * as fs from 'fs';
import * as path from 'path';

// Load environment variables
const loadEnv = () => {
    const envFiles = ['.env.local', '.env'];
    for (const file of envFiles) {
        const filePath = path.join(process.cwd(), file);
        if (fs.existsSync(filePath)) {
            const content = fs.readFileSync(filePath, 'utf-8');
            content.split('\n').forEach(line => {
                const match = line.match(/^([^#=]+)=(.*)$/);
                if (match) {
                    const key = match[1].trim();
                    const value = match[2].trim().replace(/^['"]|['"]$/g, '');
                    if (!process.env[key]) {
                        process.env[key] = value;
                    }
                }
            });
        }
    }
};

loadEnv();

async function findArticle() {
    try {
        const { getDirectusClient } = await import("../lib/directus/client");
        const { readItems } = await import("@directus/sdk");
        const client = getDirectusClient();

        console.log("Searching for article 'Se creó el Plan “Alumbrado Eficiente”'...");

        const items = await client.request(readItems('articulos', {
            search: "Alumbrado Eficiente", // Search by partial text
            fields: [
                'id',
                'titulo',
                'estado',
                'fecha_publicacion',
                'categoria.id',
                'categoria.nombre',
                'categoria.slug',
                'subcategoria.id',
                'subcategoria.nombre',
                'subcategoria.slug'
            ]
        })) as any[];

        if (items.length === 0) {
            console.log("Article NOT FOUND.");
        } else {
            console.log(`Found ${items.length} potential matches:\n`);
            items.forEach(item => {
                console.log(`Title: ${item.titulo}`);
                console.log(`Status: ${item.estado}`);
                console.log(`Published Date: ${item.fecha_publicacion}`);
                console.log(`Category: ${item.categoria?.nombre} (Slug: ${item.categoria?.slug})`);
                console.log(`Subcategory: ${item.subcategoria?.nombre} (Slug: ${item.subcategoria?.slug})`);
                console.log('-----------------------------------');
            });
        }

    } catch (error) {
        console.error("Error searching article:", error);
    }
}

findArticle();
