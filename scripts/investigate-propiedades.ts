
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

async function checkPropiedades() {
    try {
        const { getDirectusClient } = await import("../lib/directus/client");
        const { readItems } = await import("@directus/sdk");

        const client = getDirectusClient() as any;

        console.log("Investigating 'Propiedades' subcategories in Directus...");

        // target slugs from the site
        const targetSubSlugs = [
            'desarrollo-inmobiliario',
            'barrios-cerrados',
            'edificios',
            'hoteles',
            'oficinas',
            'casas',
            'copropietarios',
            'construccion'
        ];

        // 1. Fetch all categories and parents
        const categories = await client.request(readItems('categorias' as any, {
            fields: ['id', 'nombre', 'slug', 'categoria_padre.*'],
            filter: {
                slug: { _in: targetSubSlugs }
            }
        } as any)) as any[];

        if (categories.length === 0) {
            console.log("No matching subcategories found in Directus.");
            return;
        }

        console.log("\nSubcategories Found:");
        const parentIds = new Set<number>();

        categories.forEach(cat => {
            const parent = cat.categoria_padre;
            console.log(`- Sub: ${cat.nombre} (slug: ${cat.slug}) -> Parent: ${parent ? `${parent.nombre} (slug: ${parent.slug}, id: ${parent.id})` : 'NONE'}`);
            if (parent && parent.id) {
                parentIds.add(parent.id);
            }
        });

        if (parentIds.size > 0) {
            console.log("\nSummary of Parent Categories:");
            const parents = await client.request(readItems('categorias' as any, {
                fields: ['id', 'nombre', 'slug'],
                filter: {
                    id: { _in: Array.from(parentIds) }
                }
            } as any)) as any[];

            parents.forEach(p => {
                console.log(`- ${p.nombre} (slug: ${p.slug}, id: ${p.id})`);
            });
        } else {
            console.log("\nThe subcategories don't seem to have a parent in Directus (they are top-level).");
        }

    } catch (error) {
        console.error("Error investigating properties:", error);
    }
}

checkPropiedades();
