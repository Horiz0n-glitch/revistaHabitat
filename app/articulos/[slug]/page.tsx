import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import Link from "next/link"
import { Clock, ArrowLeft } from "lucide-react"
import { notFound } from "next/navigation"
import { AdBanner } from "@/components/ads/ad-banner"
import { getRandomAd } from "@/lib/mock-ads"
import { ArticleGallery } from "@/components/article-gallery"
import { ShareButtons } from "@/components/share-buttons"
import { getArticuloBySlug, getArticulos, getArticuloGaleria } from "@/lib/directus/queries"
import { getAssetUrl } from "@/lib/directus/client"
import { processContent } from "@/lib/content-utils"
import { getCategoryDisplayName } from "@/lib/category-descriptions"

export const revalidate = 60

export async function generateStaticParams() {
  try {
    const articulos = await getArticulos({ limit: 100 })
    return articulos.map((articulo) => ({
      slug: articulo.slug,
    }))
  } catch (error) {
    console.error("[Horizont] Error generating static params:", error)
    return []
  }
}

export default async function ArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug: rawSlug } = await params

  const slug = decodeURIComponent(rawSlug)

  console.log("[Horizont] ArticlePage loading for slug:", slug)

  let articulo = null
  let galeriaUrls: string[] = []

  try {
    articulo = await getArticuloBySlug(slug)
    console.log("[Horizont] Articulo result:", articulo ? "Found" : "Not found")

    if (articulo) {
      // Fetch gallery images
      try {
        const galeriaFiles = await getArticuloGaleria(articulo.id)
        console.log("[Horizont] Gallery files found:", galeriaFiles.length)
        galeriaUrls = galeriaFiles.map((file) => getAssetUrl(file.directus_files_id))
      } catch (galError) {
        console.error("[Horizont] Error fetching gallery:", galError)
      }
    }
  } catch (error) {
    console.error("[Horizont] Error fetching article:", error)
  }

  if (!articulo) {
    console.log("[Horizont] Articulo not found, calling notFound()")
    notFound()
  }

  const categoria = typeof articulo.categoria === "object" ? articulo.categoria : null
  const subcategoria = typeof articulo.subcategoria === "object" ? articulo.subcategoria : null
  const autor = typeof articulo.autor === "object" ? articulo.autor : null

  // Get related articles (same category)
  let relatedArticles: any[] = []
  try {
    if (categoria) {
      const related = await getArticulos({
        limit: 3,
        filter: {
          categoria: { _eq: categoria.id },
          slug: { _neq: articulo.slug },
        },
      })
      relatedArticles = related.slice(0, 2)
    }
  } catch (error) {
    console.error("[v0] Error fetching related articles:", error)
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1">
        {/* Back Button */}
        <div className="container mx-auto px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 2xl:px-24 py-8">
          <Link href="/articulos">
            <Button variant="ghost" className="group">
              <ArrowLeft className="mr-2 h-4 w-4 group-hover:-translate-x-1 transition-transform" />
              Volver a artículos
            </Button>
          </Link>
        </div>

        <div className="container mx-auto px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 2xl:px-24 pb-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            {/* Main Article Content */}
            <article className="lg:col-span-8 space-y-8">
              <div className="max-w-4xl space-y-8">
                {/* Meta */}
                <div className="space-y-4">
                  <div className="flex gap-2">
                    {categoria && <Badge variant="secondary">{getCategoryDisplayName(categoria.nombre)}</Badge>}
                    {subcategoria && <Badge variant="outline">{getCategoryDisplayName(subcategoria.nombre)}</Badge>}
                  </div>
                  <h1 className="font-serif text-4xl md:text-6xl font-bold leading-tight text-balance">
                    {articulo.titulo}
                  </h1>
                  {articulo.extracto && (
                    <p className="md:text-xl text-muted-foreground leading-relaxed text-pretty">{articulo.extracto}</p>
                  )}
                </div>

                {/* Author & Date */}
                <div className="flex items-center justify-between py-6 border-y border-border">
                  <div className="flex items-center gap-4">
                    <div className="relative h-12 w-12 rounded-full overflow-hidden bg-muted">
                      <Image
                        src={autor?.avatar ? getAssetUrl(autor.avatar) : "/placeholder.svg"}
                        alt={autor?.nombre || "Autor"}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div>
                      <p className="font-medium"> <span className="font-light">Por:</span> {autor?.nombre || "Equipo Editorial"}</p>
                      {autor?.email && <p className="text-sm text-muted-foreground">{autor.email}</p>}
                      <p className="text-sm text-muted-foreground flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        {new Date(articulo.fecha_publicacion).toLocaleDateString("es-ES", {
                          day: "numeric",
                          month: "long",
                          year: "numeric",
                        })}
                      </p>
                    </div>
                  </div>
                  <ShareButtons
                    url={`/articulos/${articulo.slug}`}
                    title={articulo.titulo}
                    description={articulo.extracto}
                  />
                </div>

                {/* Cover Image */}
                <div className="relative aspect-[16/9] overflow-hidden -mx-4 md:mx-0">
                  <Image
                    src={articulo.imagen_principal ? getAssetUrl(articulo.imagen_principal) : "/placeholder.svg"}
                    alt={articulo.titulo}
                    fill
                    className="object-cover"
                    priority
                  />
                  {articulo.Epigrafe && (
                    <p className="absolute bottom-0 left-0 right-0 bg-black/60 text-white text-sm px-4 py-2">
                      {articulo.Epigrafe}
                    </p>
                  )}
                </div>

                {/* Content */}
                <div
                  className="prose prose-lg max-w-none
                  prose-headings:font-serif prose-headings:font-bold
                  prose-h2:text-3xl prose-h2:mt-12 prose-h2:mb-6
                  prose-p:leading-relaxed prose-p:text-foreground
                  prose-a:text-accent prose-a:no-underline hover:prose-a:underline"
                  dangerouslySetInnerHTML={{ __html: processContent(articulo.contenido || "") }}
                />

                {/* Gallery Component */}
                {galeriaUrls.length > 0 && <ArticleGallery images={galeriaUrls} title={articulo.titulo} />}
              </div>
            </article>

            <aside className="lg:col-span-4 space-y-8">
              <div className="lg:sticky lg:top-24 space-y-8">
                <AdBanner {...getRandomAd("skyscraper")} size="skyscraper" />
              </div>
            </aside>
          </div>
        </div>

        <section className="container mx-auto px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 2xl:px-24 pb-8">
          <AdBanner {...getRandomAd("billboard")} size="billboard" />
        </section>

        {/* Related Articles */}
        {relatedArticles.length > 0 && (
          <section className="bg-muted py-16">
            <div className="container mx-auto px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 2xl:px-24">
              <h2 className="font-serif text-3xl font-bold mb-8">Artículos Relacionados</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl">
                {relatedArticles.map((related) => {
                  const relCategoria = typeof related.categoria === "object" ? related.categoria : null
                  return (
                    <Link key={related.id} href={`/articulos/${related.slug}`} className="group">
                      <article className="space-y-4">
                        <div className="relative aspect-[4/3] overflow-hidden">
                          <Image
                            src={related.imagen_principal ? getAssetUrl(related.imagen_principal) : "/placeholder.svg"}
                            alt={related.titulo}
                            fill
                            className="object-cover group-hover:scale-105 transition-transform duration-500"
                          />
                        </div>
                        <div className="space-y-2">
                          <div className="flex gap-2">
                            {relCategoria && (
                              <Badge variant="secondary" className="text-xs">
                                {getCategoryDisplayName(relCategoria.nombre)}
                              </Badge>
                            )}
                            {typeof related.subcategoria === "object" && related.subcategoria && (
                              <Badge variant="outline" className="text-xs">
                                {getCategoryDisplayName(related.subcategoria.nombre)}
                              </Badge>
                            )}
                          </div>
                          <h3 className="font-serif text-xl font-bold group-hover:text-accent transition-colors text-balance">
                            {related.titulo}
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
      </main>

      <Footer />
    </div>
  )
}
