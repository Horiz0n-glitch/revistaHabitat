
import 'dotenv/config'
import { getCategorias, getSubcategorias } from "@/lib/directus/queries"
import { navigationCategories } from "@/lib/mock-data"

async function compareCategories() {
    try {
        console.log("Fetching categories from Directus...")
        const dbCategories = await getCategorias()
        const dbSubcategories = await getSubcategorias()

        // Flatten DB categories for easier comparison
        // Categories with no parent are top-level
        const dbTopLevel = dbCategories.filter(c => !c.categoria_padre)

        // Create a map of DB categories
        const dbStructure = dbTopLevel.map(cat => {
            const subs = dbCategories.filter(sub => sub.categoria_padre === cat.id)
            return {
                name: cat.nombre,
                slug: cat.slug,
                subcategories: subs.map(s => ({
                    name: s.nombre,
                    slug: s.slug
                }))
            }
        })

        // Flatten Site categories (navigationCategories from mock-data)
        const siteStructure = navigationCategories.map(cat => ({
            name: cat.name,
            slug: cat.slug,
            subcategories: cat.subcategories?.map(s => ({
                name: s.name,
                slug: s.slug
            })) || []
        }))

        const discrepancies: string[] = []

        console.log("\n--- DB STRUCTURE ---")
        console.log(JSON.stringify(dbStructure, null, 2))

        console.log("\n--- SITE STRUCTURE ---")
        console.log(JSON.stringify(siteStructure, null, 2))

        dbStructure.forEach(dbCat => {
            // Find matching category in site
            const siteCat = siteStructure.find(sc => sc.slug === dbCat.slug || sc.name.toLowerCase() === dbCat.name.toLowerCase())

            if (!siteCat) {
                discrepancies.push(`[MISSING CATEGORY] DB has '${dbCat.name}' (slug: ${dbCat.slug}) which is not in the site navigation.`)
            } else {
                // Check subcategories
                dbCat.subcategories.forEach(dbSub => {
                    const siteSub = siteCat.subcategories.find(ss => ss.slug === dbSub.slug || ss.name.toLowerCase() === dbSub.name.toLowerCase())
                    if (!siteSub) {
                        discrepancies.push(`[MISSING SUBCATEGORY] Category '${dbCat.name}' has subcategory '${dbSub.name}' (slug: ${dbSub.slug}) in DB but not in site navigation.`)
                    }
                })
            }
        })

        const fs = require('fs')
        fs.writeFileSync('scripts/discrepancies.json', JSON.stringify({ dbStructure, siteStructure, discrepancies }, null, 2))
        console.log("Results written to scripts/discrepancies.json")

    } catch (error) {
        console.error("Error comparing categories:", error)
    }
}

compareCategories()
