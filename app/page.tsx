import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import Image from "next/image"
import { ArrowRight, Clock } from "lucide-react"
import { AdBanner } from "@/components/ads/ad-banner"
import { getRandomAd } from "@/lib/mock-ads"
import { getArticulos } from "@/lib/directus/queries"
import { getAssetUrl } from "@/lib/directus/client"
import type { Articulo } from "@/lib/directus/types"

export const revalidate = 60

export default async function HomePage() {
  let articulos: Articulo[] = []

  try {
    articulos = await getArticulos({ limit: 10 })
  } catch (error) {
    console.error("[v0] Error fetching articles:", error)
  }

  const featuredArticle = articulos[0]
  const recentArticles = articulos.slice(1, 4)
  const moreArticles = articulos.slice(4, 10)

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1">
        {articulos.length > 0 ? (
          <>
            {/* Hero Section - Featured Article */}
            {featuredArticle && (
              <section className="container mx-auto px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 2xl:px-24 py-12">
                <Link href={`/articulos/${featuredArticle.slug}`} className="group block">
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                    <div className="relative aspect-[4/3] overflow-hidden bg-muted">
                      <Image
                        src={getAssetUrl(featuredArticle.imagen_principal) || "/placeholder.svg"}
                        alt={featuredArticle.titulo}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-700"
                        priority
                      />
                    </div>
                    <div className="space-y-6">
                      {typeof featuredArticle.categoria === "object" && (
                        <Badge variant="secondary">{featuredArticle.categoria.nombre}</Badge>
                      )}
                      <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold leading-tight text-balance group-hover:text-accent transition-colors">
                        {featuredArticle.titulo}
                      </h1>
                      <p className="text-xl text-muted-foreground leading-relaxed line-clamp-3">
                        {featuredArticle.extracto}
                      </p>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        {typeof featuredArticle.autor === "object" && <span>{featuredArticle.autor.nombre}</span>}
                        <span className="flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          {new Date(featuredArticle.fecha_publicacion).toLocaleDateString("es-ES", {
                            day: "numeric",
                            month: "long",
                            year: "numeric",
                          })}
                        </span>
                      </div>
                    </div>
                  </div>
                </Link>
              </section>
            )}

            {/* Ad Banner */}
            <section className="container mx-auto px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 2xl:px-24 py-8">
              <AdBanner {...getRandomAd("leaderboard")} size="leaderboard" />
            </section>

            {/* Recent Articles */}
            {recentArticles.length > 0 && (
              <section className="container mx-auto px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 2xl:px-24 py-12">
                <div className="flex items-center justify-between mb-8">
                  <h2 className="font-serif text-3xl font-bold">Artículos Recientes</h2>
                  <Button variant="ghost" className="group" asChild>
                    <Link href="/articulos">
                      Ver todos
                      <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </Button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  {recentArticles.map((articulo) => {
                    const categoria = typeof articulo.categoria === "object" ? articulo.categoria : null
                    const autor = typeof articulo.autor === "object" ? articulo.autor : null

                    return (
                      <Link key={articulo.id} href={`/articulos/${articulo.slug}`} className="group">
                        <article className="space-y-4">
                          <div className="relative aspect-[4/3] overflow-hidden bg-muted">
                            <Image
                              src={getAssetUrl(articulo.imagen_principal) || "/placeholder.svg"}
                              alt={articulo.titulo}
                              fill
                              className="object-cover group-hover:scale-105 transition-transform duration-500"
                            />
                          </div>
                          <div className="space-y-3">
                            {categoria && (
                              <Badge variant="secondary" className="text-xs">
                                {categoria.nombre}
                              </Badge>
                            )}
                            <h3 className="font-serif text-xl font-bold group-hover:text-accent transition-colors text-balance line-clamp-2">
                              {articulo.titulo}
                            </h3>
                            <p className="text-muted-foreground text-sm line-clamp-2">{articulo.extracto}</p>
                            <div className="flex items-center justify-between text-sm text-muted-foreground">
                              {autor && <span>{autor.nombre}</span>}
                              <span className="flex items-center gap-1">
                                <Clock className="h-3 w-3" />
                                {new Date(articulo.fecha_publicacion).toLocaleDateString("es-ES", {
                                  day: "numeric",
                                  month: "short",
                                })}
                              </span>
                            </div>
                          </div>
                        </article>
                      </Link>
                    )
                  })}
                </div>
              </section>
            )}

            {/* More Articles */}
            {moreArticles.length > 0 && (
              <section className="bg-muted py-16">
                <div className="container mx-auto px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 2xl:px-24">
                  <h2 className="font-serif text-3xl font-bold mb-8">Más Contenido</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {moreArticles.map((articulo) => {
                      const categoria = typeof articulo.categoria === "object" ? articulo.categoria : null

                      return (
                        <Link key={articulo.id} href={`/articulos/${articulo.slug}`} className="group">
                          <article className="flex gap-4 items-start">
                            <div className="relative w-24 h-24 flex-shrink-0 overflow-hidden bg-background">
                              <Image
                                src={getAssetUrl(articulo.imagen_principal) || "/placeholder.svg"}
                                alt={articulo.titulo}
                                fill
                                className="object-cover group-hover:scale-105 transition-transform duration-500"
                              />
                            </div>
                            <div className="flex-1 space-y-2">
                              {categoria && (
                                <Badge variant="outline" className="text-xs">
                                  {categoria.nombre}
                                </Badge>
                              )}
                              <h3 className="font-serif font-bold group-hover:text-accent transition-colors line-clamp-2">
                                {articulo.titulo}
                              </h3>
                            </div>
                          </article>
                        </Link>
                      )
                    })}
                  </div>
                </div>
              </section>
            )}

            {/* Bottom Ad */}
            <section className="container mx-auto px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 2xl:px-24 py-12">
              <AdBanner {...getRandomAd("billboard")} size="billboard" />
            </section>
          </>
        ) : (
          /* Empty state */
          <section className="container mx-auto px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 2xl:px-24 py-20 md:py-32">
            <div className="max-w-3xl mx-auto text-center space-y-8">
              <div className="space-y-4">
                <h1 className="font-serif text-4xl md:text-6xl font-bold text-balance">Revista Habitat</h1>
                <p className="text-xl text-muted-foreground leading-relaxed text-pretty">
                  Arquitectura, diseño y patrimonio cultural. Estamos cargando el contenido desde Directus.
                </p>
              </div>

              <div className="pt-8 space-y-4">
                <Button size="lg" className="group" asChild>
                  <Link href="/staff">
                    Ver nuestro equipo
                    <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </Button>
              </div>
            </div>
          </section>
        )}
      </main>

      <Footer />
    </div>
  )
}
