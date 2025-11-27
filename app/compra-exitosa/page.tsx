import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { CheckCircle, Library } from "lucide-react"

export default function PurchaseSuccessPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1 flex items-center justify-center py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center space-y-8">
            <div className="flex justify-center">
              <CheckCircle className="h-20 w-20 text-accent" />
            </div>

            <div className="space-y-4">
              <h1 className="font-serif text-4xl md:text-5xl font-bold">¡Compra Exitosa!</h1>
              <p className="text-xl text-muted-foreground leading-relaxed">
                Tu revista digital ya está disponible en tu biblioteca. Puedes descargarla y leerla en cualquier
                momento.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-8">
              <Link href="/dashboard/biblioteca">
                <Button size="lg" className="group">
                  <Library className="mr-2 h-5 w-5" />
                  Ir a mi biblioteca
                </Button>
              </Link>
              <Link href="/revistas">
                <Button size="lg" variant="outline">
                  Ver más revistas
                </Button>
              </Link>
            </div>

            <div className="pt-8 border-t border-border">
              <p className="text-sm text-muted-foreground">
                Recibirás un correo de confirmación con los detalles de tu compra.
              </p>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
