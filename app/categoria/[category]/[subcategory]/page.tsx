import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import Image from "next/image"
import { Clock, ChevronRight } from "lucide-react"
import { notFound } from "next/navigation"
import { getCategorias, getArticulos, getFundaciones, getInterviews } from "@/lib/directus/queries"
import { getAssetUrl } from "@/lib/directus/client"
import type { Articulo, Categoria, Fundacion, Entrevista } from "@/lib/directus/types"

import { FundacionesDirectory } from "@/components/fundaciones-directory"
import { categoryDescriptions, getCategoryDisplayName } from "@/lib/category-descriptions"
import { navigationCategories } from "@/lib/mock-data"

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
  let items: (Articulo | Entrevista)[] = []
  let fundaciones: Fundacion[] = []

  try {
    const categorias = await getCategorias()

    // Find the parent category
    categoria = categorias.find((cat) => cat.slug === categorySlug) || null
    if (!categoria) {
      notFound()
    }

    // Special handling for "entrevistas" virtual subcategory
    if (subcategorySlug === 'entrevistas') {
      subcategoria = {
        id: 999999, // Virtual ID
        nombre: "Entrevistas",
        slug: "entrevistas",
        estado: "publicado"
      } as Categoria

      const entrevistas = await getInterviews({ limit: 100 })
      items = entrevistas
    } else {
      // Find the subcategory in DB
      subcategoria = categorias.find((cat) => cat.slug === subcategorySlug) || null

      // If not found by slug, try to find by name matching the URL slug (fuzzy match attempt)
      if (!subcategoria) {
        const knownCategory = navigationCategories.find(c => c.slug === categorySlug);
        const knownSubcategory = knownCategory?.subcategories?.find(s => s.slug === subcategorySlug);

        if (knownSubcategory) {
          // Try to find in DB by name if we have a known name
          subcategoria = categorias.find((cat) =>
            cat.nombre.toLowerCase() === knownSubcategory.name.toLowerCase() ||
            cat.slug.replace(/-/g, '') === subcategorySlug.replace(/-/g, '')
          ) || null;
        }
      }

      if (!subcategoria) {
        // Special handling for virtual pages like fundaciones directory if handled via subcategory slug
        if (subcategorySlug === 'fundaciones') {
          // Mock subcategory for fundaciones directory logic below
          subcategoria = {
            id: 888888,
            nombre: "Fundaciones",
            slug: "fundaciones",
            estado: "publicado"
          } as Categoria
        } else {
          // Check if it exists in mock navigation structure (hybrid mode support)
          // This allows navigation to work even if the subcategory hasn't been created in DB yet
          const knownCategory = navigationCategories.find(c => c.slug === categorySlug);
          const knownSubcategory = knownCategory?.subcategories?.find(s => s.slug === subcategorySlug);

          if (knownSubcategory) {
            subcategoria = {
              id: 0, // Virtual ID indicating no DB record yet
              nombre: knownSubcategory.name,
              slug: knownSubcategory.slug,
              estado: "publicado",
              categoria_padre: categoria.id
            } as Categoria
          } else {
            notFound()
          }
        }
      }

      if (subcategoria!.slug !== 'fundaciones') {
        // Get all articles and filter by subcategory
        const allArticulos = await getArticulos({ limit: 100 })
        items = allArticulos.filter((art) => {
          const subcatObj = typeof art.subcategoria === "object" ? art.subcategoria : null;
          const catObj = typeof art.categoria === "object" ? art.categoria : null;

          const subId = subcatObj?.id || art.subcategoria;
          const catId = catObj?.id || art.categoria;

          // Check by ID
          const matchesId = subId === subcategoria!.id || catId === subcategoria!.id;

          // Check by Slug (more robust if IDs fail or are virtual)
          const matchesSlug =
            (subcatObj?.slug === subcategorySlug) ||
            (catObj?.slug === subcategorySlug) ||
            (subcatObj?.slug === subcategoria!.slug) ||
            (catObj?.slug === subcategoria!.slug);

          // Check by Name (backup for minor discrepancies)
          const matchesName =
            (subcatObj?.nombre?.toLowerCase() === subcategoria!.nombre?.toLowerCase()) ||
            (catObj?.nombre?.toLowerCase() === subcategoria!.nombre?.toLowerCase());

          return matchesId || matchesSlug || matchesName;
        })
      }
    }

    // If this is the fundaciones subcategory, fetch fundaciones
    if (subcategorySlug === 'fundaciones') {
      fundaciones = await getFundaciones()
    }
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
                {getCategoryDisplayName(categoria?.nombre)}
              </Link>
              <ChevronRight className="h-4 w-4" />
              <span className="text-foreground">{getCategoryDisplayName(subcategoria?.nombre)}</span>
            </nav>
          </div>
        </section>

        {/* Header */}
        <section className="border-b border-border py-12 md:py-16">
          <div className="container mx-auto px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 2xl:px-24">
            <Badge variant="secondary" className="mb-4">
              {getCategoryDisplayName(categoria?.nombre)}
            </Badge>
            <h1 className="font-serif text-4xl md:text-6xl font-bold mb-4">{getCategoryDisplayName(subcategoria?.nombre)}</h1>
            <p className="text-lg text-muted-foreground max-w-2xl">
              {categoryDescriptions[subcategoria?.slug || ''] || `Explora artículos sobre ${subcategoria?.nombre?.toLowerCase()}`}
            </p>
          </div>
        </section>



        {/* Fundaciones Directory - Only for fundaciones subcategory */}
        {subcategorySlug === 'fundaciones' && (
          <section className="container mx-auto px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 2xl:px-24 py-12 md:py-16 bg-muted/30">
            <FundacionesDirectory fundaciones={fundaciones} />
          </section>
        )}

        {/* Content Grid */}
        <section className="container mx-auto px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 2xl:px-24 py-12">
          {items.length === 0 ? (
            <div className="text-center py-16">
              <p className="text-muted-foreground mb-4">No hay contenido disponible en esta subcategoría todavía.</p>
              <Link href={`/categoria/${categorySlug}`}>
                <Badge variant="outline" className="cursor-pointer hover:bg-accent">
                  Ver todo en {getCategoryDisplayName(categoria?.nombre)}
                </Badge>
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {items.map((item) => {
                const isInterview = 'nombre_entrevistado' in item;
                const cat = typeof (item as Articulo).categoria === "object" ? (item as Articulo).categoria : null
                const autor = typeof item.autor === "object" ? item.autor : null
                const linkHref = isInterview ? `/entrevistas/${item.slug}` : `/articulos/${item.slug}`;

                return (
                  <Link key={item.id} href={linkHref} className="group">
                    <article className="space-y-4">
                      <div className="relative aspect-[4/3] overflow-hidden bg-muted">
                        <Image
                          src={getAssetUrl(isInterview ? (item as any).imagen_destacada : (item as any).imagen_principal) || "/placeholder.svg"}
                          alt={item.titulo}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                      </div>
                      <div className="space-y-2">
                        <Badge variant="secondary" className="text-xs">
                          {isInterview ? 'Entrevistas' : subcategoria?.nombre}
                        </Badge>
                        <h3 className="font-serif text-xl font-bold group-hover:text-accent transition-colors text-balance">
                          {item.titulo}
                        </h3>
                        <p className="text-sm text-muted-foreground leading-relaxed text-pretty line-clamp-2">
                          {item.extracto}
                        </p>
                        <div className="flex items-center gap-4 text-xs text-muted-foreground">
                          {autor && <span>{autor.nombre}</span>}
                          <span className="flex items-center gap-1">
                            <Clock className="h-3 w-3" />
                            {new Date(item.fecha_publicacion).toLocaleDateString("es-ES", {
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
