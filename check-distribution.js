// Check article distribution across categories and subcategories
require('dotenv').config({ path: '.env.local' });
const { createDirectus, rest, readItems } = require('@directus/sdk');

const DIRECTUS_URL = process.env.NEXT_PUBLIC_DIRECTUS_URL;

if (!DIRECTUS_URL) {
    console.error('❌ NEXT_PUBLIC_DIRECTUS_URL is not configured');
    process.exit(1);
}

const client = createDirectus(DIRECTUS_URL).with(rest());

async function checkDistribution() {
    try {
        console.log('🔍 Checking article distribution...\n');

        // Get all categories
        const categorias = await client.request(
            readItems('categorias', {
                filter: { estado: { _eq: 'publicado' } },
                sort: ['orden', 'nombre'],
            })
        );

        console.log(`📁 Total categories: ${categorias.length}\n`);

        // Get all articles with category and subcategory info
        const articulos = await client.request(
            readItems('articulos', {
                filter: { estado: { _eq: 'publicado' } },
                fields: [
                    'id',
                    'titulo',
                    'slug',
                    'categoria.id',
                    'categoria.nombre',
                    'categoria.slug',
                    'subcategoria.id',
                    'subcategoria.nombre',
                    'subcategoria.slug',
                ],
                limit: 200,
            })
        );

        console.log(`📄 Total articles: ${articulos.length}\n`);

        // Group articles by category
        const articulosPorCategoria = {};
        const articulosPorSubcategoria = {};

        articulos.forEach(art => {
            const catNombre = art.categoria?.nombre || 'Sin categoría';
            const catSlug = art.categoria?.slug || 'sin-categoria';
            const subNombre = art.subcategoria?.nombre || 'Sin subcategoría';
            const subSlug = art.subcategoria?.slug || 'sin-subcategoria';

            // Count by category
            if (!articulosPorCategoria[catSlug]) {
                articulosPorCategoria[catSlug] = {
                    nombre: catNombre,
                    count: 0,
                    articulos: []
                };
            }
            articulosPorCategoria[catSlug].count++;
            articulosPorCategoria[catSlug].articulos.push(art.titulo);

            // Count by subcategory
            const subKey = `${catSlug}/${subSlug}`;
            if (!articulosPorSubcategoria[subKey]) {
                articulosPorSubcategoria[subKey] = {
                    categoria: catNombre,
                    subcategoria: subNombre,
                    count: 0,
                    articulos: []
                };
            }
            articulosPorSubcategoria[subKey].count++;
            articulosPorSubcategoria[subKey].articulos.push(art.titulo);
        });

        // Display results
        console.log('═══════════════════════════════════════════════════════════');
        console.log('📊 DISTRIBUCIÓN POR CATEGORÍA');
        console.log('═══════════════════════════════════════════════════════════\n');

        Object.entries(articulosPorCategoria)
            .sort((a, b) => b[1].count - a[1].count)
            .forEach(([slug, data]) => {
                console.log(`📁 ${data.nombre} (${slug})`);
                console.log(`   Artículos: ${data.count}`);
                data.articulos.forEach(titulo => {
                    console.log(`   • ${titulo}`);
                });
                console.log('');
            });

        console.log('═══════════════════════════════════════════════════════════');
        console.log('📊 DISTRIBUCIÓN POR SUBCATEGORÍA');
        console.log('═══════════════════════════════════════════════════════════\n');

        Object.entries(articulosPorSubcategoria)
            .sort((a, b) => b[1].count - a[1].count)
            .forEach(([key, data]) => {
                console.log(`📂 ${data.categoria} → ${data.subcategoria}`);
                console.log(`   Artículos: ${data.count}`);
                data.articulos.forEach(titulo => {
                    console.log(`   • ${titulo}`);
                });
                console.log('');
            });

        // Summary
        console.log('═══════════════════════════════════════════════════════════');
        console.log('📈 RESUMEN');
        console.log('═══════════════════════════════════════════════════════════\n');
        console.log(`Total de categorías con artículos: ${Object.keys(articulosPorCategoria).length}`);
        console.log(`Total de subcategorías con artículos: ${Object.keys(articulosPorSubcategoria).length}`);
        console.log(`Total de artículos: ${articulos.length}`);

        const sinSubcategoria = articulos.filter(a => !a.subcategoria).length;
        if (sinSubcategoria > 0) {
            console.log(`\n⚠️  Artículos sin subcategoría: ${sinSubcategoria}`);
        }

        const sinCategoria = articulos.filter(a => !a.categoria).length;
        if (sinCategoria > 0) {
            console.log(`\n❌ Artículos sin categoría: ${sinCategoria}`);
        }

    } catch (error) {
        console.error('❌ Error:', error.message);
        if (error.errors) {
            console.error('Details:', error.errors);
        }
    }
}

checkDistribution();
