
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

async function checkSlug() {
    try {
        const { getCategorias } = await import("../lib/directus/queries");
        const categories = await getCategorias();

        const sustentable = categories.find(c => c.slug === 'sustentable');
        if (!sustentable) return;

        const subcats = categories.filter(c => c.categoria_padre === sustentable.id);

        console.log("DB Subcategories for Sustentable:");
        subcats.forEach(s => {
            console.log(`- Name: "${s.nombre}", Slug: "${s.slug}"`);
        });

    } catch (error) {
        console.error(error);
    }
}
checkSlug();
