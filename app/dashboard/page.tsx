import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Construction, Bell, ArrowLeft } from "lucide-react"
import Link from "next/link"

export default function DashboardPage() {
  return (
    <div className="min-h-[80vh] flex items-center justify-center p-4">
      <Card className="max-w-md w-full text-center border-none shadow-none bg-transparent">
        <CardContent className="space-y-8 pt-6">
          <div className="relative mx-auto w-24 h-24 flex items-center justify-center rounded-full bg-muted/30 mb-6">
            <Construction className="h-12 w-12 text-muted-foreground" />
            <div className="absolute -top-2 -right-2 bg-accent text-accent-foreground p-2 rounded-full shadow-lg animate-bounce">
              <Bell className="h-4 w-4" />
            </div>
          </div>

          <div className="space-y-4">
            <h1 className="font-serif text-3xl md:text-4xl font-bold text-foreground">
              Estamos trabajando en esto
            </h1>
            <p className="text-muted-foreground text-lg leading-relaxed">
              Estamos construyendo una experiencia increíble para ti. Te notificaremos en cuanto tu panel de usuario esté listo.
            </p>
          </div>

          <div className="pt-4">
            <Link href="/">
              <Button variant="outline" className="gap-2">
                <ArrowLeft className="h-4 w-4" />
                Volver al inicio
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
