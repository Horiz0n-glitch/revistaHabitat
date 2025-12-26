import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import Image from "next/image"
import { ImageWithLoader } from "@/components/ui/image-with-loader"
import { Clock } from "lucide-react"
import { notFound } from "next/navigation"
import { AdBanner } from "@/components/ads/ad-banner"
import { getRandomAd } from "@/lib/mock-ads"
import { getArticulos, getCategorias } from "@/lib/directus/queries"
import { getAssetUrl } from "@/lib/directus/client"
import type { Articulo, Categoria } from "@/lib/directus/types"
import { categoryDescriptions, getCategoryDisplayName } from "@/lib/category-descriptions"
import { navigationCategories } from "@/lib/mock-data"

export const revalidate = 60

export async function generateStaticParams() {
  try {
    const categorias = await getCategorias()
    return categorias.map((categoria) => ({
      category: categoria.slug,
    }))
  } catch {
    return []
  }
}

export default async function CategoryPage({ params }: { params: Promise<{ category: string }> }) {
  const { category: categorySlug } = await params

  let categoria: Categoria | null = null
  let articulos: Articulo[] = []

  try {
    const categorias = await getCategorias()
    categoria = categorias.find((cat) => cat.slug === categorySlug) || null

    if (!categoria) {
      // Check if it exists in mock navigation structure (hybrid mode support)
      // This allows navigation to work even if the category hasn't been created in DB yet
      const knownCategory = navigationCategories.find(c => c.slug === categorySlug);

      if (knownCategory) {
        categoria = {
          id: 0, // Virtual ID
          nombre: knownCategory.name,
          slug: knownCategory.slug,
          estado: "publicado"
        } as Categoria
      } else {
        notFound()
      }
    }

    const allArticulos = await getArticulos({ limit: 100 })

    // Filter articles that belong to this category OR have this category as their subcategory's parent
    articulos = allArticulos.filter((art) => {
      const cat = typeof art.categoria === "object" ? art.categoria : null
      const catId = cat ? cat.id : art.categoria

      const subCat = typeof art.subcategoria === "object" ? art.subcategoria : null

      // 1. Article's main category matches this category
      const isDirectCategory = catId === categoria!.id

      // 2. Article's main category is a child of this category (e.g. Monumentos -> Restauración)
      const isChildCategory = cat && typeof cat === 'object' && cat.categoria_padre === categoria!.id

      // 3. Article's subcategory has this category as parent
      const isChildSubcategory = subCat && subCat.categoria_padre === categoria!.id

      return isDirectCategory || isChildCategory || isChildSubcategory
    })
  } catch (error) {
    console.error("[v0] Error fetching category data:", error)
    notFound()
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1">
        <section className="border-b border-border py-12 md:py-16">
          <div className="container mx-auto px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 2xl:px-24">
            <Badge variant="secondary" className="mb-4">
              Categoría
            </Badge>
            <h1 className="font-serif text-4xl md:text-6xl font-bold mb-4">{getCategoryDisplayName(categoria?.nombre)}</h1>
            <p className="text-lg text-muted-foreground max-w-2xl">
              {categoryDescriptions[categoria?.slug || ''] || `Explora artículos sobre ${categoria?.nombre?.toLowerCase()}`}
            </p>
          </div>
        </section>

        <section className="container mx-auto px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 2xl:px-24 pt-8">
          <AdBanner {...getRandomAd("leaderboard")} size="leaderboard" />
        </section>

        <section className="container mx-auto px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 2xl:px-24 py-12">
          {articulos.length === 0 ? (
            <div className="text-center py-16">
              <p className="text-muted-foreground">No hay contenido disponible en esta categoría.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-[1fr_320px] gap-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {articulos.map((articulo) => {
                  const cat = typeof articulo.categoria === "object" ? articulo.categoria : null
                  const autor = typeof articulo.autor === "object" ? articulo.autor : null

                  return (
                    <Link key={articulo.id} href={`/articulos/${articulo.slug}`} className="group">
                      <article className="space-y-4">
                        <div className="relative aspect-[4/3] overflow-hidden bg-muted">
                          <ImageWithLoader
                            src={getAssetUrl(articulo.imagen_principal) || "/placeholder.svg"}
                            alt={articulo.titulo}
                            fill
                            className="object-cover group-hover:scale-105 transition-transform duration-500"
                          />
                        </div>
                        <div className="space-y-2">
                          {cat && (
                            <Badge variant="secondary" className="text-xs">
                              {cat.nombre}
                            </Badge>
                          )}
                          <h3 className="font-serif text-xl font-bold group-hover:text-accent transition-colors text-balance">
                            {articulo.titulo}
                          </h3>
                          <p className="text-sm text-muted-foreground leading-relaxed text-pretty line-clamp-2">
                            {articulo.extracto}
                          </p>
                          <div className="flex items-center gap-4 text-xs text-muted-foreground">
                            {autor && <span>{autor.nombre}</span>}
                            <span className="flex items-center gap-1">
                              <Clock className="h-3 w-3" />
                              {new Date(articulo.fecha_publicacion).toLocaleDateString("es-ES", {
                                day: "numeric",
                                month: "long",
                                year: "numeric",
                              })}
                            </span>
                          </div>
                        </div>
                      </article>
                    </Link>
                  )
                })}
              </div>

              <aside className="hidden lg:block">
                <div className="sticky top-8 space-y-8">
                  <AdBanner {...getRandomAd("rectangle")} size="rectangle" />
                  <AdBanner {...getRandomAd("square")} size="square" />
                </div>
              </aside>
            </div>
          )}
        </section>

        <section className="container mx-auto px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 2xl:px-24 pb-16">
          <AdBanner {...getRandomAd("billboard")} size="billboard" />
        </section>
      </main>

      <Footer />
    </div>
  )
}
