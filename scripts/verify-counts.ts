
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

async function verifyAppLogic() {
    try {
        // Use the actual application queries
        const { getArticulos, getCategorias } = await import("../lib/directus/queries");
        const { navigationCategories } = await import("../lib/mock-data");

        // 1. Get Sustentable category from DB logic
        console.log("Fetching 'Sustentable' via application query...");
        const categories = await getCategorias();
        const sustentable = categories.find(c => c.slug === 'sustentable');

        if (!sustentable) {
            console.error("Could not find 'Sustentable' category using getCategorias()");
            return;
        }

        console.log(`Found category: ${sustentable.nombre} (ID: ${sustentable.id})`);

        // 2. Fetch all articles using application logic
        const allArticulos = await getArticulos({ limit: 1000 }); // Increase limit to be safe
        console.log(`Fetched total ${allArticulos.length} articles via getArticulos(limit: 1000)`);

        // 3. Match against navigation structure
        const sustentableNav = navigationCategories.find(c => c.slug === 'sustentable');
        if (!sustentableNav) {
            console.error("Sustentable missing from navigationCategories (mock-data)!");
            return;
        }

        console.log("\nVerifying counts for each subcategory in navigation:");
        console.log("---------------------------------------------------");

        for (const navSub of sustentableNav.subcategories) {
            // Find corresponding DB subcategory to get ID
            const dbSub = categories.find(c =>
                c.slug === navSub.slug ||
                (c.categoria_padre === sustentable.id && c.nombre.toLowerCase() === navSub.name.toLowerCase())
            );

            // Log details for debugging matching logic
            // console.log(`Checking ${navSub.name} (Slug: ${navSub.slug}) - DB match: ${dbSub?.id}`);

            // Simulate the filter logic used in CategoryPage/SubcategoryPage
            const filtered = allArticulos.filter(art => {
                const subCatObj = typeof art.subcategoria === "object" ? art.subcategoria : null;
                const catObj = typeof art.categoria === "object" ? art.categoria : null;

                const subId = subCatObj?.id || art.subcategoria;
                const catId = catObj?.id || art.categoria;

                // Match by ID if we found the DB subcategory
                if (dbSub) {
                    if (subId === dbSub.id || catId === dbSub.id) return true;
                }

                // Match by Slug (robust fallback)
                const matchesSlug =
                    (subCatObj?.slug === navSub.slug) ||
                    (catObj?.slug === navSub.slug);

                return matchesSlug;
            });

            console.log(`Subcategory: ${navSub.name.padEnd(25)} | Count: ${filtered.length}`);
        }
        console.log("---------------------------------------------------");

    } catch (error) {
        console.error("Error verifying app logic:", error);
    }
}

verifyAppLogic();
