
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

async function compareCategories() {
    try {
        const { getDirectusClient } = await import("../lib/directus/client");
        const { readItems } = await import("@directus/sdk");
        const { navigationCategories } = await import("../lib/mock-data");

        const client = getDirectusClient() as any;

        console.log("Fetching categories from Directus...");
        // 1. Fetch from Directus
        const directusRaw = await client.request(readItems('categorias' as any, {
            fields: ['id', 'nombre', 'slug', 'categoria_padre', 'estado'] as any,
            limit: -1
        } as any)) as any[];

        // 2. Process Site Categories (Mock Data)
        const siteData: { name: string, slug: string, isSub: boolean, parentSlug?: string }[] = [];
        navigationCategories.forEach((cat: any) => {
            siteData.push({ name: cat.name, slug: cat.slug, isSub: false });
            if (cat.subcategories) {
                cat.subcategories.forEach((sub: any) => {
                    // Skip if subcategory slug is same as parent slug (sometimes used for "All" view)
                    if (sub.slug === cat.slug) return;
                    siteData.push({ name: sub.name, slug: sub.slug, isSub: true, parentSlug: cat.slug });
                });
            }
        });

        // 3. Process Directus Categories
        const dbData: { name: string, slug: string, isSub: boolean, parentSlug?: string, estado: string }[] = [];
        directusRaw.forEach((cat: any) => {
            const isSub = cat.categoria_padre !== null;
            let parentSlug = undefined;
            if (isSub) {
                const parentId = typeof cat.categoria_padre === 'object' ? cat.categoria_padre.id : cat.categoria_padre;
                const parent = directusRaw.find(p => p.id === parentId);
                parentSlug = parent?.slug;
            }
            dbData.push({ name: cat.nombre, slug: cat.slug, isSub, parentSlug, estado: cat.estado });
        });

        // 4. Comparison
        const allSlugs = Array.from(new Set([...siteData.map(s => s.slug), ...dbData.map(d => d.slug)]));

        console.log("\n| Categoría/Subcategoría | Slug | En el Sitio | En Directus | Estado DB |");
        console.log("|---|-|:---:|:---:|:---:|");

        allSlugs.sort().forEach(slug => {
            const site = siteData.find(s => s.slug === slug);
            const db = dbData.find(d => d.slug === slug);

            const name = site?.name || db?.name || slug;
            const inSite = site ? "✅" : "❌";
            const inDb = db ? "✅" : "❌";
            const dbStatus = db ? db.estado : "-";
            const prefix = (site?.isSub || db?.isSub) ? "  └─ " : "";

            console.log(`| ${prefix}${name} | ${slug} | ${inSite} | ${inDb} | ${dbStatus} |`);
        });

        console.log("\nTotal en el Sitio:", siteData.length);
        console.log("Total en Directus:", dbData.length);

    } catch (error) {
        console.error("Error comparing categories:", error);
    }
}

compareCategories();
