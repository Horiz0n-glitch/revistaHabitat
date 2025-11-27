import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import Image from "next/image"
import { Clock, ChevronRight } from "lucide-react"
import { notFound } from "next/navigation"
import { getCategorias, getArticulos } from "@/lib/directus/queries"
import { getAssetUrl } from "@/lib/directus/client"
import type { Articulo, Categoria } from "@/lib/directus/types"

export const revalidate = 60

export async function generateStaticParams() {
  // Return empty array to generate pages on-demand with ISR
  // This avoids build-time errors when categoria_padre relationships aren't fully populated
  return []
}

export default async function SubcategoryPage({
  params,
}: {
  params: Promise<{ category: string; subcategory: string }>
}) {
  const { category: categorySlug, subcategory: subcategorySlug } = await params

  let categoria: Categoria | null = null
  let subcategoria: Categoria | null = null
  let articulos: Articulo[] = []

  try {
    const categorias = await getCategorias()

    // Find the parent category
    categoria = categorias.find((cat) => cat.slug === categorySlug) || null
    if (!categoria) {
      notFound()
    }

    // Find the subcategory
    subcategoria = categorias.find((cat) => cat.slug === subcategorySlug) || null
    if (!subcategoria) {
      notFound()
    }

    // Get all articles and filter by subcategory
    const allArticulos = await getArticulos({ limit: 100 })
    articulos = allArticulos.filter((art) => {
      const subId = typeof art.subcategoria === "object" ? art.subcategoria?.id : art.subcategoria
      const catId = typeof art.categoria === "object" ? art.categoria?.id : art.categoria

      // Check if article belongs to this subcategory either via subcategoria field OR categoria field
      return subId === subcategoria!.id || catId === subcategoria!.id
    })
  } catch (error) {
    console.error("[v0] Error fetching subcategory data:", error)
    notFound()
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1">
        {/* Breadcrumb */}
        <section className="border-b border-border py-4">
          <div className="container mx-auto px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 2xl:px-24">
            <nav className="flex items-center gap-2 text-sm text-muted-foreground">
              <Link href="/" className="hover:text-foreground transition-colors">
                Inicio
              </Link>
              <ChevronRight className="h-4 w-4" />
              <Link href={`/categoria/${categorySlug}`} className="hover:text-foreground transition-colors">
                {categoria?.nombre}
              </Link>
              <ChevronRight className="h-4 w-4" />
              <span className="text-foreground">{subcategoria?.nombre}</span>
            </nav>
          </div>
        </section>

        {/* Header */}
        <section className="border-b border-border py-12 md:py-16">
          <div className="container mx-auto px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 2xl:px-24">
            <Badge variant="secondary" className="mb-4">
              {categoria?.nombre}
            </Badge>
            <h1 className="font-serif text-4xl md:text-6xl font-bold mb-4">{subcategoria?.nombre}</h1>
            <p className="text-lg text-muted-foreground max-w-2xl">
              Explora artículos sobre {subcategoria?.nombre?.toLowerCase()}
            </p>
          </div>
        </section>

        {/* Content Grid */}
        <section className="container mx-auto px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 2xl:px-24 py-12">
          {articulos.length === 0 ? (
            <div className="text-center py-16">
              <p className="text-muted-foreground mb-4">No hay contenido disponible en esta subcategoría todavía.</p>
              <Link href={`/categoria/${categorySlug}`}>
                <Badge variant="outline" className="cursor-pointer hover:bg-accent">
                  Ver todo en {categoria?.nombre}
                </Badge>
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {articulos.map((articulo) => {
                const cat = typeof articulo.categoria === "object" ? articulo.categoria : null
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
                      <div className="space-y-2">
                        <Badge variant="secondary" className="text-xs">
                          {subcategoria?.nombre}
                        </Badge>
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
          )}
        </section>
      </main>

      <Footer />
    </div>
  )
}
