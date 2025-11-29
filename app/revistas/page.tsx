import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import Link from "next/link"
import { Calendar } from 'lucide-react'
import { mockMagazines } from "@/lib/mock-data"
import { AdBanner } from "@/components/ads/ad-banner"
import { getRandomAd } from "@/lib/mock-ads"
import { formatARS } from "@/lib/utils" // importing ARS formatter
import { Construction, ArrowLeft } from 'lucide-react'

export default function MagazinesPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1">
        {/* Page Header */}
        <section className="border-b border-border bg-background">
          <div className="container mx-auto px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 2xl:px-24 py-16">
            <h1 className="font-serif text-4xl md:text-6xl font-bold mb-6">Revistas Digitales</h1>
            <p className="text-xl text-muted-foreground max-w-3xl leading-relaxed">
              Accede a nuestra colección de revistas digitales. Contenido exclusivo, proyectos destacados y análisis en
              profundidad sobre arquitectura y diseño.
            </p>
          </div>
        </section>

        {/* Ad Banner */}
        <section className="container mx-auto px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 2xl:px-24 py-8">
          <AdBanner {...getRandomAd("leaderboard")} size="leaderboard" />
        </section>

        {/* Magazines Grid */}
        <section className="container mx-auto px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 2xl:px-24 py-20">
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
                Estamos cargando nuevas revistas digitales. Pronto tendrás acceso a todo nuestro catálogo actualizado.
              </p>
            </div>

            <Button variant="outline" size="lg" className="group" asChild>
              <Link href="/">
                <ArrowLeft className="mr-2 h-4 w-4 group-hover:-translate-x-1 transition-transform" />
                Volver al inicio
              </Link>
            </Button>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
