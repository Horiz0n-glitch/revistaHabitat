import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Badge } from "@/components/ui/badge"
import Image from "next/image"
import Link from "next/link"
import { Clock, Construction, ArrowLeft, ArrowRight } from 'lucide-react'
import { AdBanner } from "@/components/ads/ad-banner"
import { getRandomAd } from "@/lib/mock-ads"
import { Button } from "@/components/ui/button"
import { getInterviews } from "@/lib/directus/queries"
import { getAssetUrl } from "@/lib/directus/client"
import { getCategoryDisplayName } from "@/lib/category-descriptions"

export const revalidate = 60

export default async function InterviewsPage() {
  const interviews = await getInterviews({ limit: 50 })

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1">
        {/* Page Header */}
        <section className="border-b border-border bg-background">
          <div className="container mx-auto px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 2xl:px-24 py-16">
            <h1 className="font-serif text-4xl md:text-6xl font-bold mb-6">Entrevistas</h1>
            <p className="text-xl text-muted-foreground max-w-3xl leading-relaxed">
              Conversaciones con profesionales, restauradores e historiadores destacados.
            </p>
          </div>
        </section>

        <section className="container mx-auto px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 2xl:px-24 pt-8">
          <AdBanner {...getRandomAd("leaderboard")} size="leaderboard" />
        </section>

        {/* Interviews Grid */}
        <section className="container mx-auto px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 2xl:px-24 py-12 md:py-20">
          {interviews.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {interviews.map((interview) => (
                <Link key={interview.id} href={`/entrevistas/${interview.slug}`} className="group">
                  <article className="flex flex-col h-full bg-background rounded-lg border border-border overflow-hidden hover:shadow-lg transition-shadow">
                    <div className="relative aspect-video overflow-hidden bg-muted">
                      <Image
                        src={getAssetUrl(interview.imagen_principal) || "/placeholder.svg"}
                        alt={interview.titulo}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                    <div className="flex-1 p-6 space-y-4">
                      <div className="flex gap-2">
                        <Badge variant="secondary" className="text-xs">
                          {typeof interview.categoria === 'object' && interview.categoria ? getCategoryDisplayName(interview.categoria.nombre) : 'Entrevista'}
                        </Badge>
                      </div>

                      <div className="space-y-2">
                        <h3 className="font-serif text-xl font-bold group-hover:text-accent transition-colors text-balance line-clamp-3">
                          {interview.titulo}
                        </h3>
                        <p className="text-sm text-muted-foreground leading-relaxed text-pretty line-clamp-3">
                          {interview.extracto}
                        </p>
                      </div>

                      <div className="pt-4 mt-auto flex items-center justify-between text-muted-foreground">
                        <div className="flex items-center gap-2 text-xs">
                          {typeof interview.autor === 'object' && interview.autor && (
                            <span>Por {interview.autor.nombre}</span>
                          )}
                        </div>
                        <span className="flex items-center gap-1 text-xs">
                          <Clock className="h-3 w-3" />
                          {new Date(interview.fecha_publicacion).toLocaleDateString("es-ES", {
                            day: "numeric",
                            month: "short",
                            year: "numeric",
                          })}
                        </span>
                      </div>
                    </div>
                  </article>
                </Link>
              ))}
            </div>
          ) : (
            <div className="max-w-2xl mx-auto text-center space-y-8">
              <div className="flex justify-center">
                <div className="h-20 w-20 rounded-full bg-accent/10 flex items-center justify-center">
                  <Construction className="h-10 w-10 text-accent" />
                </div>
              </div>

              <div className="space-y-4">
                <h2 className="font-serif text-3xl md:text-4xl font-bold">
                  Contenido en Preparación
                </h2>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  Estamos cargando nuevas entrevistas desde nuestro sistema. Pronto tendrás acceso a todo nuestro contenido actualizado.
                </p>
              </div>

              <Button variant="outline" size="lg" className="group" asChild>
                <Link href="/">
                  <ArrowLeft className="mr-2 h-4 w-4 group-hover:-translate-x-1 transition-transform" />
                  Volver al inicio
                </Link>
              </Button>
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
