import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { FundacionesDirectory } from "@/components/fundaciones-directory"
import { Badge } from "@/components/ui/badge"

export const metadata = {
    title: "Guía de Instituciones - Revista Habitat",
    description: "Directorio de instituciones públicas y privadas relacionadas con la arquitectura y el urbanismo.",
}

export default function InstitucionesPage() {
    // Initialize as empty array until backend integration is ready
    const sortedInstituciones: any[] = []

    return (
        <div className="min-h-screen flex flex-col">
            <Header />

            <main className="flex-1">
                <div className="container mx-auto px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 2xl:px-24 py-12">
                    <div className="mb-12">
                        <nav className="flex items-center gap-2 text-sm text-muted-foreground mb-6">
                            <a href="/" className="hover:text-accent transition-colors">Inicio</a>
                            <span>/</span>
                            <a href="/guias" className="hover:text-accent transition-colors">Guías</a>
                            <span>/</span>
                            <span className="text-foreground font-medium">Instituciones</span>
                        </nav>

                        <div className="max-w-4xl">
                            <h1 className="font-serif text-4xl md:text-5xl font-bold mb-6 text-black">
                                Guía de Instituciones
                            </h1>
                            <p className="text-xl text-muted-foreground leading-relaxed">
                                Conecta con las principales entidades públicas y privadas que regulan, promueven y desarrollan la arquitectura y el urbanismo.
                            </p>
                        </div>
                    </div>

                    {/* Reusing FundacionesDirectory for now as cards are identical in structure */}
                    <FundacionesDirectory fundaciones={sortedInstituciones} />
                </div>


            </main>

            <Footer />
        </div>
    )
}
