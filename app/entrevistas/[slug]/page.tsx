import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import Link from "next/link"
import { Clock, ArrowLeft, User, Mic } from "lucide-react"
import { notFound } from "next/navigation"
import { AdBanner } from "@/components/ads/ad-banner"
import { getRandomAd } from "@/lib/mock-ads"
import { ShareButtons } from "@/components/share-buttons"
import { ArticleGallery } from "@/components/article-gallery"
import { getInterviewBySlug, getInterviews } from "@/lib/directus/queries"
import { getAssetUrl } from "@/lib/directus/client"
import { processContent } from "@/lib/content-utils"
import { getCategoryDisplayName } from "@/lib/category-descriptions"
import { type Metadata } from "next"
import { getAssetUrlWithTransforms } from '@/lib/directus/client'

export const revalidate = 60

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const interview = await getInterviewBySlug(decodeURIComponent(slug))

  if (!interview) {
    return {
      title: "Entrevista no encontrada - Revista Habitat",
    }
  }

  return {
    title: `${interview.titulo} - Revista Habitat`,
    description: interview.extracto,
    openGraph: {
      title: interview.titulo,
      description: interview.extracto,
      images: interview.imagen_destacada ? [getAssetUrlWithTransforms(interview.imagen_destacada, { width: 1200, height: 630, fit: "cover" })] : [],
    }
  }
}

export async function generateStaticParams() {
  const interviews = await getInterviews({ limit: 20 })
  return interviews.map((i) => ({ slug: i.slug }))
}

export default async function InterviewPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug: rawSlug } = await params
  const slug = decodeURIComponent(rawSlug)

  const interview = await getInterviewBySlug(slug)

  if (!interview) {
    notFound()
  }

  const categoria = typeof interview.categoria === 'object' ? interview.categoria : null;
  const autor = typeof interview.autor === 'object' ? interview.autor : null;

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1">
        {/* Back Button */}
        <div className="container mx-auto px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 2xl:px-24 py-8">
          <Link href="/entrevistas">
            <Button variant="ghost" className="group">
              <ArrowLeft className="mr-2 h-4 w-4 group-hover:-translate-x-1 transition-transform" />
              Volver a entrevistas
            </Button>
          </Link>
        </div>

        <div className="container mx-auto px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 2xl:px-24 pb-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            {/* Main Content */}
            <article className="lg:col-span-8 space-y-8">
              <div className="max-w-4xl space-y-8">
                {/* Header Info */}
                <div className="space-y-4">
                  <div className="flex gap-2">
                    <Badge variant="secondary" className="bg-accent/10 text-accent hover:bg-accent/20">
                      Entrevista
                    </Badge>
                    {categoria && <Badge variant="outline">{getCategoryDisplayName(categoria.nombre)}</Badge>}
                  </div>
                  <h1 className="font-serif text-4xl md:text-6xl font-bold leading-tight text-balance">
                    {interview.titulo}
                  </h1>

                  {/* Interviewee Info Card */}
                  <div className="bg-muted/50 border border-border rounded-lg p-6 flex flex-col md:flex-row gap-6 items-start md:items-center">
                    <div className="h-16 w-16 rounded-full bg-accent/20 flex items-center justify-center shrink-0">
                      <Mic className="h-8 w-8 text-accent" />
                    </div>
                    <div className="space-y-1">
                      <p className="text-sm text-muted-foreground uppercase tracking-wider font-semibold">Entrevistado</p>
                      <h3 className="text-xl font-bold font-serif">{interview.nombre_entrevistado}</h3>
                      {interview.cargo_entrevistado && (
                        <p className="text-muted-foreground">{interview.cargo_entrevistado}</p>
                      )}
                    </div>
                  </div>

                  {interview.extracto && (
                    <p className="md:text-xl text-muted-foreground leading-relaxed text-pretty">{interview.extracto}</p>
                  )}
                </div>

                {/* Author & Date */}
                <div className="flex items-center justify-between py-6 border-y border-border">
                  <div className="flex items-center gap-4">
                    {autor?.avatar && (
                      <div className="relative h-12 w-12 rounded-full overflow-hidden bg-muted">
                        <Image
                          src={getAssetUrl(autor.avatar)}
                          alt={autor.nombre}
                          fill
                          className="object-cover"
                        />
                      </div>
                    )}
                    <div>
                      <p className="font-medium"> <span className="font-light">Por:</span> {autor?.nombre || "Revista Habitat"}</p>
                      <p className="text-sm text-muted-foreground flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        {new Date(interview.fecha_publicacion).toLocaleDateString("es-ES", {
                          day: "numeric",
                          month: "long",
                          year: "numeric",
                        })}
                      </p>
                    </div>
                  </div>
                  <ShareButtons
                    url={`/entrevistas/${interview.slug}`}
                    title={interview.titulo}
                    description={interview.extracto}
                  />
                </div>

                {/* Cover Image */}
                <div className="space-y-2">
                  <div className="relative aspect-video overflow-hidden -mx-4 md:mx-0 rounded-lg bg-muted">
                    <Image
                      src={interview.imagen_destacada ? getAssetUrl(interview.imagen_destacada) : "/placeholder.svg"}
                      alt={interview.titulo}
                      fill
                      className="object-cover"
                      priority
                    />
                  </div>
                  {interview.Epigrafe && (
                    <p className="text-sm text-muted-foreground italic text-center">{interview.Epigrafe}</p>
                  )}
                </div>

                {/* Content */}
                <div
                  className="prose prose-lg max-w-none
                  prose-headings:font-serif prose-headings:font-bold
                  prose-h2:text-3xl prose-h2:mt-12 prose-h2:mb-6
                  prose-p:leading-relaxed prose-p:text-foreground
                  prose-a:text-accent prose-a:no-underline hover:prose-a:underline
                  prose-blockquote:border-l-accent prose-blockquote:text-xl prose-blockquote:italic prose-blockquote:my-8"
                  dangerouslySetInnerHTML={{ __html: processContent(interview.contenido || "") }}
                />

                {/* Gallery */}
                {interview.galeria && interview.galeria.length > 0 && (
                  <div className="pt-12 border-t border-border">
                    {interview.epigrafe_galeria && (
                      <p className="text-muted-foreground mb-6 italic">{interview.epigrafe_galeria}</p>
                    )}
                    <ArticleGallery
                      images={interview.galeria.map(item => getAssetUrl(item.directus_files_id))}
                      title={interview.titulo}
                    />
                  </div>
                )}
              </div>
            </article>

            {/* Sidebar */}
            <aside className="lg:col-span-4 space-y-8">
              <div className="lg:sticky lg:top-24 space-y-8">
                <AdBanner {...getRandomAd("square")} size="square" />
                <AdBanner {...getRandomAd("skyscraper")} size="skyscraper" />
              </div>
            </aside>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
