import { getCurrentUser } from "@/lib/mock-auth"
import { redirect } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Download, ExternalLink, Calendar } from "lucide-react"

export default async function LibraryPage() {
  const userResult = await getCurrentUser()

  if (!userResult.success || !userResult.data) {
    redirect("/login")
  }

  const user = userResult.data

  const completedPurchases: any[] = []

  return (
    <div className="space-y-8">
      <div className="space-y-2">
        <h1 className="font-serif text-3xl md:text-4xl font-bold">Mi Biblioteca</h1>
        <p className="text-muted-foreground">Accede a todas tus revistas digitales en cualquier momento</p>
      </div>

      {completedPurchases.length === 0 ? (
        <div className="text-center py-16 space-y-6">
          <div className="space-y-2">
            <h2 className="font-serif text-2xl font-bold">Tu biblioteca está vacía</h2>
            <p className="text-muted-foreground max-w-md mx-auto">
              Comienza a construir tu colección de revistas digitales de arquitectura y diseño
            </p>
          </div>
          <Link href="/revistas">
            <Button size="lg">Explorar Revistas</Button>
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {completedPurchases.map((purchase: any) => {
            const magazine = typeof purchase.magazine === "object" ? purchase.magazine : null
            if (!magazine) return null

            return (
              <article key={purchase.id} className="space-y-4 group">
                <div className="relative aspect-[3/4] overflow-hidden bg-muted">
                  <Image
                    src={magazine.cover_image || "/placeholder.svg"}
                    alt={magazine.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <Badge variant="outline" className="text-xs">
                      Edición {magazine.issue_number}
                    </Badge>
                    <span className="text-xs text-muted-foreground flex items-center gap-1">
                      <Calendar className="h-3 w-3" />
                      {new Date(purchase.purchased_at).toLocaleDateString("es-ES", {
                        month: "short",
                        year: "numeric",
                      })}
                    </span>
                  </div>
                  <h2 className="font-serif text-xl font-bold text-balance">{magazine.title}</h2>
                  <div className="flex gap-2">
                    <Button className="flex-1 group/btn" asChild>
                      <a href={magazine.pdf_url || "#"} download target="_blank" rel="noopener noreferrer">
                        <Download className="mr-2 h-4 w-4 group-hover/btn:scale-110 transition-transform" />
                        Descargar
                      </a>
                    </Button>
                    <Button variant="outline" size="icon" asChild>
                      <Link href={`/revistas/${magazine.id}`}>
                        <ExternalLink className="h-4 w-4" />
                        <span className="sr-only">Ver detalles</span>
                      </Link>
                    </Button>
                  </div>
                </div>
              </article>
            )
          })}
        </div>
      )}
    </div>
  )
}
