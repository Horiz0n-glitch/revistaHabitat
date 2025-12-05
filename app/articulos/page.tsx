import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import Link from "next/link"
import { Clock } from "lucide-react"
import { AdBanner } from "@/components/ads/ad-banner"
import { getRandomAd } from "@/lib/mock-ads"
import { getArticulos, getCategorias } from "@/lib/directus/queries"
import { getAssetUrl } from "@/lib/directus/client"
import type { Articulo, Categoria } from "@/lib/directus/types"
import { ClickableCategoryBadge } from "@/components/clickable-category-badge"
import { getCategoryDisplayName } from "@/lib/category-descriptions"

export const revalidate = 60 // Revalidate every 60 seconds

export default async function ArticlesPage() {
  let articulos: Articulo[] = []
  let categorias: Categoria[] = []

  try {
    const [articulosData, categoriasData] = await Promise.all([getArticulos({ limit: 50 }), getCategorias()])
    articulos = articulosData || []
    categorias = categoriasData || []
  } catch (error) {
    console.error("[v0] Error fetching articles:", error)
  }

  // Get unique categories from articles for filter
  const categoriasConArticulos = categorias.filter((cat) =>
    articulos.some((art) => {
      const catId = typeof art.categoria === "object" ? art.categoria.id : art.categoria
      return catId === cat.id
    }),
  )

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1">
        <section className="border-b border-border bg-background sticky top-20 z-40">
          <div className="container mx-auto px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 2xl:px-24 py-8">
            <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
              <div>
                <h1 className="font-serif text-3xl md:text-4xl font-bold mb-2">Artículos</h1>
                <p className="text-muted-foreground max-w-2xl leading-relaxed">
                  Explorá artículos sobre patrimonio
                </p>
              </div>

              {/* Filters integrated */}
              <div className="flex gap-2 overflow-x-auto pb-2 md:pb-0">
                <Link href="/articulos">
                  <Button variant="default" size="sm" className="whitespace-nowrap">
                    Ver todo
                  </Button>
                </Link>
                {categoriasConArticulos.map((categoria) => (
                  <Link key={categoria.id} href={`/categoria/${categoria.slug}`}>
                    <Button variant="outline" size="sm" className="whitespace-nowrap bg-transparent">
                      {getCategoryDisplayName(categoria.nombre)}
                    </Button>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Ad Section */}
        <section className="container mx-auto px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 2xl:px-24 py-8">
          <AdBanner {...getRandomAd("leaderboard")} size="leaderboard" />
        </section>

        {/* Articles Grid */}
        <section className="container mx-auto px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 2xl:px-24 py-12">
          {articulos.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {articulos.map((articulo) => {
                const categoria = typeof articulo.categoria === "object" ? articulo.categoria : null
                const autor = typeof articulo.autor === "object" ? articulo.autor : null

                return (
                  <div key={articulo.id} className="group">
                    <article className="space-y-4">
                      {/* Image */}
                      <Link href={`/articulos/${articulo.slug}`} className="block relative aspect-[4/3] overflow-hidden bg-muted">
                        <Image
                          src={getAssetUrl(articulo.imagen_principal) || "/placeholder.svg"}
                          alt={articulo.titulo}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                      </Link>

                      {/* Content */}
                      <div className="space-y-3">
                        <div className="flex gap-2">
                          {categoria && (
                            <ClickableCategoryBadge
                              categorySlug={categoria.slug}
                              categoryName={categoria.nombre}
                            />
                          )}
                          {typeof articulo.subcategoria === "object" && articulo.subcategoria && (
                            <Badge variant="outline" className="text-xs">
                              {getCategoryDisplayName(articulo.subcategoria.nombre)}
                            </Badge>
                          )}
                        </div>

                        <Link href={`/articulos/${articulo.slug}`} className="block">
                          <h2 className="font-serif text-xl font-bold group-hover:text-accent transition-colors text-balance line-clamp-2">
                            {articulo.titulo}
                          </h2>
                        </Link>

                        <p className="text-muted-foreground text-sm line-clamp-3">{articulo.extracto}</p>

                        <div className="flex items-center justify-between text-sm text-muted-foreground pt-2">
                          {autor && <span>{autor.nombre}</span>}
                          <span className="flex items-center gap-1">
                            <Clock className="h-3 w-3" />
                            {new Date(articulo.fecha_publicacion).toLocaleDateString("es-ES", {
                              day: "numeric",
                              month: "short",
                              year: "numeric",
                            })}
                          </span>
                        </div>
                      </div>
                    </article>
                  </div>
                )
              })}
            </div>
          ) : (
            <div className="text-center py-20">
              <p className="text-muted-foreground text-lg">No hay artículos disponibles en este momento.</p>
            </div>
          )}
        </section>

        {/* Bottom Ad */}
        <section className="container mx-auto px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 2xl:px-24 pb-16">
          <AdBanner {...getRandomAd("billboard")} size="billboard" />
        </section>
      </main>

      <Footer />
    </div>
  )
}
