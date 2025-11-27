import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import Link from "next/link"
import { ArrowLeft, Calendar, FileText, Check } from "lucide-react"
import { getMagazineById, mockMagazines } from "@/lib/mock-data"
import { notFound } from "next/navigation"
import { formatARS } from "@/lib/utils" // importing ARS formatter
import { ShareButtons } from "@/components/share-buttons"

export async function generateStaticParams() {
  return mockMagazines.map((magazine) => ({
    id: magazine.id,
  }))
}

export default async function MagazineDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const magazine = getMagazineById(id)

  if (!magazine) {
    notFound()
  }

  const relatedMagazines = mockMagazines.filter((m) => m.id !== magazine.id).slice(0, 3)

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1">
        {/* Back Button */}
        <div className="container mx-auto px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 2xl:px-24 py-8">
          <Link href="/revistas">
            <Button variant="ghost" className="group">
              <ArrowLeft className="mr-2 h-4 w-4 group-hover:-translate-x-1 transition-transform" />
              Volver a revistas
            </Button>
          </Link>
        </div>

        {/* Magazine Detail */}
        <section className="container mx-auto px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 2xl:px-24 pb-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
            {/* Cover Image */}
            <div className="space-y-6">
              <div className="relative aspect-[3/4] overflow-hidden bg-muted sticky top-24">
                <Image
                  src={magazine.cover_image || "/placeholder.svg"}
                  alt={magazine.title}
                  fill
                  className="object-cover"
                  priority
                />
                {magazine.status === "coming_soon" && (
                  <div className="absolute inset-0 bg-background/80 flex items-center justify-center">
                    <Badge variant="secondary" className="text-lg px-6 py-2">
                      Próximamente
                    </Badge>
                  </div>
                )}
              </div>
            </div>

            {/* Details */}
            <div className="space-y-8">
              <div className="space-y-4">
                <div className="flex items-start justify-between gap-4">
                  <div className="space-y-4 flex-1">
                    <Badge variant="outline">Edición {magazine.issue_number}</Badge>
                    <h1 className="font-serif text-4xl md:text-5xl font-bold leading-tight">{magazine.title}</h1>
                    <div className="flex items-center gap-6 text-sm text-muted-foreground">
                      <span className="flex items-center gap-2">
                        <Calendar className="h-4 w-4" />
                        {new Date(magazine.publication_date).toLocaleDateString("es-ES", {
                          month: "long",
                          year: "numeric",
                        })}
                      </span>
                      {magazine.page_count > 0 && (
                        <span className="flex items-center gap-2">
                          <FileText className="h-4 w-4" />
                          {magazine.page_count} páginas
                        </span>
                      )}
                    </div>
                  </div>
                  <ShareButtons
                    url={`/revistas/${magazine.id}`}
                    title={magazine.title}
                    description={magazine.description}
                  />
                </div>
              </div>

              <p className="text-lg text-muted-foreground leading-relaxed">{magazine.description}</p>

              {/* Highlights */}
              {magazine.highlights && magazine.highlights.length > 0 && (
                <div className="space-y-4">
                  <h3 className="font-serif text-xl font-bold">En esta edición</h3>
                  <ul className="space-y-3">
                    {magazine.highlights.map((highlight, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <Check className="h-5 w-5 text-accent flex-shrink-0 mt-0.5" />
                        <span className="text-muted-foreground">{highlight}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Price & Demo Notice */}
              <div className="border-t border-border pt-8 space-y-6">
                <div className="flex items-baseline gap-2">
                  <span className="font-serif text-4xl font-bold">{formatARS(magazine.price)}</span>
                </div>

                <div className="bg-muted p-6 rounded-lg space-y-4">
                  <p className="font-medium">Versión Demo</p>
                  <p className="text-sm text-muted-foreground">
                    Esta es una versión de demostración. Para habilitar compras reales,
                  </p>
                  <Button size="lg" className="w-full" disabled>
                    Comprar ahora (Demo)
                  </Button>
                </div>

                <p className="text-xs text-muted-foreground">
                  Acceso inmediato al PDF digital. Compatible con todos los dispositivos.
                </p>
              </div>

              {/* Table of Contents */}
              {magazine.table_of_contents && magazine.table_of_contents.length > 0 && (
                <div className="border-t border-border pt-8 space-y-4">
                  <h3 className="font-serif text-xl font-bold">Tabla de Contenidos</h3>
                  <ul className="space-y-3">
                    {magazine.table_of_contents.map((item, index) => (
                      <li key={index} className="flex items-start justify-between gap-4 text-sm">
                        <span className="text-muted-foreground">{item.title}</span>
                        <span className="text-muted-foreground flex-shrink-0">Pág. {item.page}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        </section>

        {relatedMagazines.length > 0 && (
          <section className="bg-muted py-16">
            <div className="container mx-auto px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 2xl:px-24">
              <h2 className="font-serif text-3xl font-bold mb-8">Otras Ediciones</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl">
                {relatedMagazines.map((related) => (
                  <Link key={related.id} href={`/revistas/${related.id}`} className="group">
                    <article className="space-y-4">
                      <div className="relative aspect-[3/4] overflow-hidden bg-muted">
                        <Image
                          src={related.cover_image || "/placeholder.svg"}
                          alt={related.title}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                        {related.status === "coming_soon" && (
                          <div className="absolute inset-0 bg-background/80 flex items-center justify-center">
                            <Badge variant="secondary" className="text-sm">
                              Próximamente
                            </Badge>
                          </div>
                        )}
                      </div>
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <Badge variant="outline" className="text-xs">
                            Edición {related.issue_number}
                          </Badge>
                          <span className="font-serif text-lg font-bold">{formatARS(related.price)}</span>
                        </div>
                        <h3 className="font-serif text-xl font-bold group-hover:text-accent transition-colors text-balance">
                          {related.title}
                        </h3>
                      </div>
                    </article>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}
      </main>

      <Footer />
    </div>
  )
}
