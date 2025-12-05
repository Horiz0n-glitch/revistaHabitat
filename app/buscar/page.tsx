import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Badge } from "@/components/ui/badge"
import Image from "next/image"
import Link from "next/link"
import { Clock, Search } from "lucide-react"
import { getArticulos } from "@/lib/directus/queries"
import { getAssetUrl } from "@/lib/directus/client"
import type { Articulo } from "@/lib/directus/types"
import { getCategoryDisplayName } from "@/lib/category-descriptions"

export default async function SearchPage({ searchParams }: { searchParams: Promise<{ q?: string }> }) {
  const params = await searchParams
  const query = params.q || ""

  let results: Articulo[] = []

  if (query.length >= 2) {
    try {
      const allArticulos = await getArticulos({ limit: 100 })
      const lowerQuery = query.toLowerCase()

      results = allArticulos.filter((articulo) => {
        return (
          articulo.titulo.toLowerCase().includes(lowerQuery) ||
          articulo.extracto?.toLowerCase().includes(lowerQuery) ||
          articulo.contenido?.toLowerCase().includes(lowerQuery)
        )
      })
    } catch (error) {
      console.error("[v0] Error searching articles:", error)
    }
  }

  const totalResults = results.length

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1">
        <section className="border-b border-border bg-background">
          <div className="container mx-auto px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 2xl:px-24 py-16">
            <div className="flex items-center gap-3 mb-4">
              <Search className="h-8 w-8 text-muted-foreground" />
              <h1 className="font-serif text-3xl md:text-5xl font-bold">Resultados de búsqueda</h1>
            </div>
            {query && (
              <p className="text-xl text-muted-foreground">
                {totalResults} resultado{totalResults !== 1 ? "s" : ""} para "{query}"
              </p>
            )}
          </div>
        </section>

        <section className="container mx-auto px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 2xl:px-24 py-16">
          {!query || query.length < 2 ? (
            <div className="text-center py-16">
              <p className="text-muted-foreground">Ingresa al menos 2 caracteres para buscar</p>
            </div>
          ) : totalResults === 0 ? (
            <div className="text-center py-16 space-y-4">
              <p className="text-xl font-medium">No se encontraron resultados</p>
              <p className="text-muted-foreground">Intenta con otros términos de búsqueda</p>
            </div>
          ) : (
            <div className="space-y-12">
              <div className="space-y-6">
                <h2 className="font-serif text-2xl font-bold">Artículos ({totalResults})</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {results.map((articulo) => {
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
                                {getCategoryDisplayName(categoria.nombre)}
                              </Badge>
                            )}
                            <h3 className="font-serif text-xl font-bold group-hover:text-accent transition-colors text-balance">
                              {articulo.titulo}
                            </h3>
                            <p className="text-sm text-muted-foreground leading-relaxed text-pretty line-clamp-2">
                              {articulo.extracto}
                            </p>
                            <div className="flex items-center gap-4 text-xs text-muted-foreground">
                              {autor && <span>Por {autor.nombre}</span>}
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
              </div>
            </div>
          )}
        </section>
      </main>

      <Footer />
    </div>
  )
}
