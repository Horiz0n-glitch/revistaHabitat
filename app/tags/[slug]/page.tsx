import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Badge } from "@/components/ui/badge"
import Image from "next/image"
import Link from "next/link"
import { Clock, Tag } from "lucide-react"
import { notFound } from "next/navigation"
import { getArticulos } from "@/lib/directus/queries"
import { getAssetUrl } from "@/lib/directus/client"
import type { Articulo } from "@/lib/directus/types"
import { getCategoryDisplayName } from "@/lib/category-descriptions"

export const revalidate = 60

export default async function TagPage({ params }: { params: { slug: string } }) {
  const { slug } = params

  let articulos: Articulo[] = []

  try {
    const allArticulos = await getArticulos({ limit: 100 })
    articulos = allArticulos.filter((articulo) =>
      articulo.etiquetas?.some((tag) => (typeof tag === "string" ? tag === slug : tag.slug === slug)),
    )
  } catch (error) {
    console.error("[v0] Error fetching tagged articles:", error)
  }

  if (articulos.length === 0) {
    notFound()
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1">
        <section className="border-b border-border bg-background">
          <div className="container mx-auto px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 2xl:px-24 py-16">
            <div className="flex items-center gap-3 mb-4">
              <Tag className="h-8 w-8 text-accent" />
              <h1 className="font-serif text-3xl md:text-5xl font-bold capitalize">{slug.replace("-", " ")}</h1>
            </div>
            <p className="text-xl text-muted-foreground">
              {articulos.length} artículo{articulos.length !== 1 ? "s" : ""}
            </p>
          </div>
        </section>

        <section className="container mx-auto px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 2xl:px-24 py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {articulos.map((articulo) => {
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
        </section>
      </main>

      <Footer />
    </div>
  )
}
