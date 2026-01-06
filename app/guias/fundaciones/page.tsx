import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { FundacionesDirectory } from "@/components/fundaciones-directory"
import { getFundaciones } from "@/lib/directus/queries"
import { Badge } from "@/components/ui/badge"

export const metadata = {
    title: "Guía de Fundaciones - Revista Habitat",
    description: "Directorio completo de fundaciones dedicadas al patrimonio, la arquitectura y el desarrollo cultural y social.",
}

export const revalidate = 3600 // Revalidate every hour

export default async function FundacionesPage() {
    // Fetch fundaciones specifically sorted by name alphabetically
    const fundaciones = await getFundaciones({
        limit: 100,
    })

    // Ensure they are sorted alphabetically by name as per user request
    const sortedFundaciones = [...fundaciones].sort((a, b) =>
        a.nombre.localeCompare(b.nombre, 'es', { sensitivity: 'base' })
    )

    return (
        <div className="min-h-screen flex flex-col">
            <Header />

            <main className="flex-1">
                {/* Breadcrumbs / Back navigation could go here */}

                <div className="container mx-auto px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 2xl:px-24 py-12">
                    <div className="mb-12">
                        <nav className="flex items-center gap-2 text-sm text-muted-foreground mb-6">
                            <a href="/" className="hover:text-accent transition-colors">Inicio</a>
                            <span>/</span>
                            <a href="/guias" className="hover:text-accent transition-colors">Guías</a>
                            <span>/</span>
                            <span className="text-foreground font-medium">Fundaciones</span>
                        </nav>

                        <div className="max-w-4xl">
                            <h1 className="font-serif text-4xl md:text-5xl font-bold mb-6 text-black">
                                Guía de Fundaciones
                            </h1>
                            <p className="text-xl text-muted-foreground leading-relaxed">
                                Un espacio dedicado a las organizaciones que trabajan por la preservación del patrimonio,
                                la difusión de la arquitectura y el impacto social positivo en nuestro entorno.
                            </p>
                        </div>
                    </div>

                    <FundacionesDirectory fundaciones={sortedFundaciones} />
                </div>

                {/* Support Banner */}

            </main>

            <Footer />
        </div>
    )
}
