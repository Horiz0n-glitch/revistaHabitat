import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Home, ArrowLeft } from "lucide-react"

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1 flex items-center justify-center">
        <div className="container mx-auto px-4 text-center py-16">
          <h1 className="font-serif text-6xl md:text-8xl font-bold mb-4">404</h1>
          <h2 className="text-2xl md:text-3xl font-medium mb-4">Página no encontrada</h2>
          <p className="text-muted-foreground mb-8 max-w-md mx-auto">
            Lo sentimos, la página que buscas no existe o ha sido movida.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/">
              <Button className="gap-2">
                <Home className="h-4 w-4" />
                Ir al inicio
              </Button>
            </Link>
            <Link href="/articulos">
              <Button variant="outline" className="gap-2 bg-transparent">
                <ArrowLeft className="h-4 w-4" />
                Ver artículos
              </Button>
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
