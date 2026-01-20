import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import Image from "next/image"
import { ImageWithLoader } from "@/components/ui/image-with-loader"
import { ArrowRight, Clock, BookOpen } from "lucide-react"
import { AdBanner } from "@/components/ads/ad-banner"
import { getRandomAd } from "@/lib/mock-ads"
import { getMixedContent } from "@/lib/directus/queries"
import { getAssetUrl } from "@/lib/directus/client"
import type { Articulo, Entrevista } from "@/lib/directus/types"
import { getCategoryDisplayName } from "@/lib/category-descriptions"

export const revalidate = 0

export default async function HomePage() {
  let items: (Articulo | Entrevista)[] = []

  try {
    items = await getMixedContent(30)
    console.log(`[HomePage] Fetched ${items.length} items`)
  } catch (error) {
    console.error("[HomePage] Error fetching content:", error)
  }

  // Renaming to match existing logic's expected variable name, but now it contains mixed content
  // We need to cast or guard when accessing specific article properties later if they don't exist on Entrevista
  const articulos = items as (Articulo | Entrevista)[]

  // Helper to safely get category name
  const getCategoryName = (item: Articulo | Entrevista) => {
    if ('nombre_entrevistado' in item) return "Entrevista"
    return getCategoryDisplayName(typeof (item as Articulo).categoria === "object" && (item as Articulo).categoria ? (item as Articulo).categoria.nombre : "General")
  }

  const getCategorySlug = (item: Articulo | Entrevista) => {
    if ('nombre_entrevistado' in item) return "entrevistas"
    return typeof (item as Articulo).categoria === "object" && (item as Articulo).categoria ? (item as Articulo).categoria.slug : "general"
  }

  const getSubcategoryName = (item: Articulo | Entrevista) => {
    if ('nombre_entrevistado' in item) return null
    const nombre = typeof (item as Articulo).subcategoria === "object" && (item as Articulo).subcategoria ? (item as Articulo).subcategoria.nombre : null
    return nombre ? getCategoryDisplayName(nombre) : null
  }

  const getSubcategorySlug = (item: Articulo | Entrevista) => {
    if ('nombre_entrevistado' in item) return null
    return typeof (item as Articulo).subcategoria === "object" && (item as Articulo).subcategoria ? (item as Articulo).subcategoria.slug : null
  }

  const getAuthorName = (item: Articulo | Entrevista) =>
    typeof item.autor === "object" && item.autor ? item.autor.nombre : "Revista Habitat"

  // --- Data Distribution ---

  // 1. Featured Article (Hero) - Prefer an Article for hero if possible, or just the first item
  const featuredArticle = articulos[0]

  // 2. Recent Articles (3 items)
  const recentArticles = articulos.slice(1, 4)

  // 3. Featured Interview (1 item)
  // Try to find an interview that is NOT in the first 4 items
  let featuredInterview = articulos.find((a, i) => i > 3 && 'nombre_entrevistado' in a) as Articulo | Entrevista | undefined
  // If not found, look for ANY interview
  if (!featuredInterview) {
    featuredInterview = articulos.find(a => 'nombre_entrevistado' in a)
  }

  // If still not found (no interviews), just grab the 5th item
  if (!featuredInterview) {
    featuredInterview = articulos[4]
  }

  // 4. Magazines (Placeholder - skipping for now as we don't have magazine data yet)
  // const featuredMagazines = ...

  // 5. More Articles (6 items for the grid)
  // Filter out already used items
  const usedIds = new Set([
    featuredArticle?.id,
    ...recentArticles.map(a => a.id),
    featuredInterview?.id
  ].filter(Boolean))

  const remainingArticles = articulos.filter(a => !usedIds.has(a.id))
  const moreArticles = remainingArticles.slice(0, 6)

  // 6. Recent Interviews (3 items for sidebar/bottom)
  // Try to find more interviews, otherwise take next available
  const remainingAfterMore = remainingArticles.slice(6)

  // Explicitly look for interviews for this section if possible
  let recentInterviews = remainingAfterMore.filter(a => 'nombre_entrevistado' in a).slice(0, 3) as (Articulo | Entrevista)[]

  if (recentInterviews.length < 3) {
    const needed = 3 - recentInterviews.length
    const extras = remainingAfterMore.filter(a => !('nombre_entrevistado' in a) && !recentInterviews.includes(a)).slice(0, needed)
    recentInterviews = [...recentInterviews, ...extras]
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1">
        {articulos.length > 0 ? (
          <>
            {/* Hero Section */}
            {featuredArticle && (
              <section className="container mx-auto px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 2xl:px-24 py-12 md:py-20">
                <Link href={'nombre_entrevistado' in featuredArticle ? `/entrevistas/${featuredArticle.slug}` : `/articulos/${featuredArticle.slug}`} className="block group cursor-pointer">
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                    <div className="space-y-6">
                      <div className="flex gap-2">
                        <Badge variant="secondary" className="text-xs">
                          {getCategoryName(featuredArticle)}
                        </Badge>
                        {getSubcategoryName(featuredArticle) && (
                          <Badge variant="outline" className="text-xs">
                            {getSubcategoryName(featuredArticle)}
                          </Badge>
                        )}
                      </div>
                      <h1 className="font-serif text-4xl md:text-5xl font-bold leading-tight text-balance group-hover:text-accent transition-colors">
                        {featuredArticle.titulo}
                      </h1>
                      <p className="text-xl text-muted-foreground leading-relaxed text-pretty">
                        {featuredArticle.extracto}
                      </p>
                      <div className="flex items-center gap-6 text-sm text-muted-foreground">
                        <span>Por {getAuthorName(featuredArticle)}</span>
                        <span className="flex items-center gap-1">
                          <Clock className="h-4 w-4" />
                          {new Date(featuredArticle.fecha_publicacion).toLocaleDateString("es-ES", {
                            day: "numeric",
                            month: "long",
                            year: "numeric",
                          })}
                        </span>
                      </div>
                      <div className="inline-flex">
                        <Button size="lg" className="group/button pointer-events-none">
                          Leer artículo
                          <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                        </Button>
                      </div>
                    </div>
                    <div className="relative aspect-4/3 overflow-hidden bg-muted rounded-lg">
                      <ImageWithLoader
                        src={getAssetUrl('imagen_destacada' in featuredArticle ? featuredArticle.imagen_destacada : featuredArticle.imagen_principal) || "/placeholder.svg"}
                        alt={featuredArticle.titulo}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                        priority
                      />
                    </div>
                  </div>
                </Link>
              </section>
            )}

            {/* Leaderboard Ad Banner */}
            <section className="container mx-auto px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 2xl:px-24 py-8">
              <AdBanner {...getRandomAd("leaderboard")} size="leaderboard" />
            </section>

            {/* Recent Articles & Interviews */}
            {recentArticles.length > 0 && (
              <section className="container mx-auto px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 2xl:px-24 py-16">
                <div className="flex items-center justify-between mb-12">
                  <h2 className="font-serif text-3xl md:text-4xl font-bold">Lo último</h2>
                  <Button variant="ghost" className="group" asChild>
                    <Link href="/articulos">
                      Ver todos
                      <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </Button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  {recentArticles.map((item) => {
                    const isInterview = 'nombre_entrevistado' in item;
                    const linkHref = isInterview ? `/entrevistas/${item.slug}` : `/articulos/${item.slug}`;
                    return (
                      <Link key={item.id} href={linkHref} className="group">
                        <article className="space-y-4">
                          <div className="relative aspect-4/3 overflow-hidden bg-muted rounded-lg">
                            <ImageWithLoader
                              src={getAssetUrl('imagen_destacada' in item ? item.imagen_destacada : item.imagen_principal) || "/placeholder.svg"}
                              alt={item.titulo}
                              fill
                              className="object-cover group-hover:scale-105 transition-transform duration-500"
                            />
                          </div>
                          <div className="space-y-2">
                            <div className="flex gap-2">
                              <Badge variant="secondary" className="text-xs">
                                {getCategoryName(item)}
                              </Badge>
                              {getSubcategoryName(item) && (
                                <Badge variant="outline" className="text-xs">
                                  {getSubcategoryName(item)}
                                </Badge>
                              )}
                            </div>
                            <h3 className="font-serif text-xl font-bold group-hover:text-accent transition-colors text-balance line-clamp-2">
                              {item.titulo}
                            </h3>
                            <p className="text-sm text-muted-foreground leading-relaxed text-pretty line-clamp-3">
                              {item.extracto}
                            </p>
                            <p className="text-xs text-muted-foreground">
                              {new Date(item.fecha_publicacion).toLocaleDateString("es-ES", {
                                day: "numeric",
                                month: "long",
                                year: "numeric",
                              })}
                            </p>
                          </div>
                        </article>
                      </Link>
                    )
                  })}
                </div>
              </section>
            )}

            {/* Billboard Ad Banner */}
            <section className="container mx-auto px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 2xl:px-24 py-8">
              <AdBanner {...getRandomAd("billboard")} size="billboard" />
            </section>

            {/* Featured Interview */}
            {featuredInterview && (
              <section className="bg-muted py-16">
                <div className="container mx-auto px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 2xl:px-24">
                  <Link href={'nombre_entrevistado' in featuredInterview ? `/entrevistas/${featuredInterview.slug}` : `/articulos/${featuredInterview.slug}`} className="block group cursor-pointer">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                      <div className="relative aspect-4/3 overflow-hidden order-2 lg:order-1 bg-background rounded-lg">
                        <ImageWithLoader
                          src={getAssetUrl('imagen_destacada' in featuredInterview ? featuredInterview.imagen_destacada : featuredInterview.imagen_principal) || "/placeholder.svg"}
                          alt={featuredInterview.titulo}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                      </div>
                      <div className="space-y-6 order-1 lg:order-2">
                        <div className="flex gap-2">
                          <Badge variant="secondary" className="text-xs">
                            {getCategoryName(featuredInterview)}
                          </Badge>
                          {getSubcategoryName(featuredInterview) && (
                            <Badge variant="outline" className="text-xs">
                              {getSubcategoryName(featuredInterview)}
                            </Badge>
                          )}
                        </div>
                        <h2 className="font-serif text-3xl md:text-4xl font-bold text-balance group-hover:text-accent transition-colors">
                          {featuredInterview.titulo}
                        </h2>
                        <div className="space-y-2">
                          <p className="font-medium">{getAuthorName(featuredInterview)}</p>
                        </div>
                        <p className="text-muted-foreground leading-relaxed text-pretty">
                          {featuredInterview.extracto}
                        </p>
                        <div className="inline-flex">
                          <Button variant="outline" size="lg" className="group/button bg-transparent pointer-events-none">
                            Leer nota
                            <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </Link>
                </div>
              </section>
            )}

            {/* Magazine Section (Placeholder/Hidden if no data) */}
            {/* 
            <section className="container mx-auto px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 2xl:px-24 py-16">
               ... Magazines ...
            </section> 
            */}

            {/* Leaderboard Ad Banner */}
            <section className="container mx-auto px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 2xl:px-24 py-8">
              <AdBanner {...getRandomAd("leaderboard")} size="leaderboard" />
            </section>

            {/* More Content & Sidebar */}
            <section className="bg-muted/30 py-16">
              <div className="container mx-auto px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 2xl:px-24">
                <div className="flex items-center justify-between mb-12">
                  <h2 className="font-serif text-3xl md:text-4xl font-bold">Explora Más Contenido</h2>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                  {/* Left Column - Articles Grid */}
                  <div className="lg:col-span-2 space-y-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {moreArticles.map((item, index) => (
                        <div key={item.id}>
                          <Link href={'nombre_entrevistado' in item ? `/entrevistas/${item.slug}` : `/articulos/${item.slug}`} className="group">
                            <article className="space-y-3 bg-background p-4 rounded-lg border border-border hover:shadow-lg transition-shadow h-full">
                              <div className="relative aspect-video overflow-hidden rounded-md bg-muted">
                                <ImageWithLoader
                                  src={getAssetUrl('imagen_destacada' in item ? item.imagen_destacada : item.imagen_principal) || "/placeholder.svg"}
                                  alt={item.titulo}
                                  fill
                                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                                />
                              </div>
                              <div className="space-y-2">
                                <div className="flex gap-2">
                                  <Badge variant="secondary" className="text-xs">
                                    {getCategoryName(item)}
                                  </Badge>
                                  {getSubcategoryName(item) && (
                                    <Badge variant="outline" className="text-xs">
                                      {getSubcategoryName(item)}
                                    </Badge>
                                  )}
                                </div>
                                <h3 className="font-serif text-lg font-bold group-hover:text-accent transition-colors text-balance line-clamp-2">
                                  {item.titulo}
                                </h3>
                                <p className="text-sm text-muted-foreground leading-relaxed text-pretty line-clamp-2">
                                  {item.extracto}
                                </p>
                                <div className="flex items-center gap-4 text-xs text-muted-foreground pt-1">
                                  <span>{getAuthorName(item)}</span>
                                  <span className="flex items-center gap-1">
                                    <Clock className="h-3 w-3" />
                                    {new Date(item.fecha_publicacion).toLocaleDateString("es-ES", {
                                      day: "numeric",
                                      month: "short",
                                    })}
                                  </span>
                                </div>
                              </div>
                            </article>
                          </Link>
                          {index === 1 && (
                            <div className="mt-6 md:hidden">
                              <AdBanner {...getRandomAd("rectangle")} size="rectangle" />
                            </div>
                          )}
                        </div>
                      ))}
                    </div>

                    <div className="pt-4 hidden md:block">
                      <AdBanner {...getRandomAd("billboard")} size="billboard" />
                    </div>

                    <div className="pt-8">
                      <h3 className="font-serif text-2xl font-bold mb-6">Otras Notas de Interés</h3>
                      <div className="grid grid-cols-1 gap-6">
                        {recentInterviews.map((interview) => (
                          <Link key={interview.id} href={'nombre_entrevistado' in interview ? `/entrevistas/${interview.slug}` : `/articulos/${interview.slug}`} className="group">
                            <article className="bg-background p-6 rounded-lg border border-border hover:shadow-lg transition-shadow">
                              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                                <div className="relative aspect-4/3 overflow-hidden rounded-md bg-muted">
                                  <ImageWithLoader
                                    src={getAssetUrl('imagen_destacada' in interview ? interview.imagen_destacada : (interview as any).imagen_principal) || "/placeholder.svg"}
                                    alt={interview.titulo}
                                    fill
                                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                                  />
                                </div>
                                <div className="sm:col-span-2 space-y-3">
                                  <div className="flex gap-2">
                                    <Badge variant="secondary" className="text-xs">
                                      {getCategoryName(interview)}
                                    </Badge>
                                    {getSubcategoryName(interview) && (
                                      <Badge variant="outline" className="text-xs">
                                        {getSubcategoryName(interview)}
                                      </Badge>
                                    )}
                                  </div>
                                  <h4 className="font-serif text-xl font-bold group-hover:text-accent transition-colors text-balance">
                                    {interview.titulo}
                                  </h4>
                                  <div className="space-y-1">
                                    <p className="font-medium text-sm">{getAuthorName(interview)}</p>
                                  </div>
                                  <p className="text-sm text-muted-foreground leading-relaxed text-pretty line-clamp-2">
                                    {interview.extracto}
                                  </p>
                                </div>
                              </div>
                            </article>
                          </Link>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Right Sidebar - Ads and Quick Links */}
                  <div className="space-y-6">
                    <div className="sticky top-24 space-y-6">
                      <AdBanner {...getRandomAd("skyscraper")} size="skyscraper" />

                      <div className="bg-background p-6 rounded-lg border border-border">
                        <h3 className="font-serif text-xl font-bold mb-4">Categorías Populares</h3>
                        <div className="space-y-2">
                          {[
                            { name: "Artículos", slug: "articulos" },
                            { name: "Cultura y Patrimonio", slug: "cultura-y-patrimonio" },
                            { name: "Sustentabilidad", slug: "sustentable" },
                            { name: "Restauración", slug: "restauracion" },
                            { name: "Turismo Cultural", slug: "turismo-cultural" },
                            { name: "Eventos y Cursos", slug: "eventos-cursos" },
                            { name: "Arq. y Const.", slug: "arq-y-const" },
                            { name: "Resp. Social", slug: "rse" },
                          ].map((category) => (
                            <Link
                              key={category.slug}
                              href={`/categoria/${category.slug}`}
                              className="block px-3 py-2 text-sm hover:bg-muted rounded-md transition-colors"
                            >
                              {category.name}
                            </Link>
                          ))}
                        </div>
                      </div>

                      <AdBanner {...getRandomAd("square")} size="square" />

                      <div className="bg-accent text-accent-foreground p-6 rounded-lg">
                        <h3 className="font-serif text-xl font-bold mb-2">¿Querés publicitar con nosotros?</h3>
                        <p className="text-sm mb-4 leading-relaxed">
                          Conocé nuestras opciones para destacar tu marca en Revista Habitat.
                        </p>
                        <Button variant="secondary" size="sm" className="w-full" asChild>
                          <Link href="/publicidad">Ver opciones</Link>
                        </Button>
                      </div>

                      <AdBanner {...getRandomAd("rectangle")} size="rectangle" />
                    </div>
                  </div>
                </div>
              </div>
            </section>

            <section className="container mx-auto px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 2xl:px-24 py-8">
              <AdBanner {...getRandomAd("leaderboard")} size="leaderboard" />
            </section>

            {/* Magazine CTA (Keep this as it's a static CTA) */}
            <section className="container mx-auto px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 2xl:px-24 py-16">
              <div className="bg-accent text-accent-foreground p-12 md:p-16 text-center space-y-6 rounded-lg">
                <h2 className="font-serif text-3xl md:text-5xl font-bold text-balance">Descubre Nuestra Revista Digital</h2>
                <p className="text-lg max-w-2xl mx-auto leading-relaxed text-pretty">
                  Accede a contenido exclusivo, proyectos destacados y análisis en profundidad en nuestras ediciones
                  digitales.
                </p>
                <Button size="lg" variant="secondary" className="group" asChild>
                  <Link href="/revistas">
                    Explorar revistas
                    <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </Button>
              </div>
            </section>
          </>
        ) : (
          /* Empty state */
          <section className="container mx-auto px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 2xl:px-24 py-20 md:py-32">
            <div className="max-w-3xl mx-auto text-center space-y-8">
              <div className="space-y-4">
                <h1 className="font-serif text-4xl md:text-6xl font-bold text-balance">Revista Habitat</h1>
                <p className="text-xl text-muted-foreground leading-relaxed text-pretty">
                  Cargando contenido...
                </p>
              </div>
            </div>
          </section>
        )}
      </main>

      <Footer />
    </div>
  )
}
