import { mockMagazines } from "@/lib/mock-data"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import Image from "next/image"
import Link from "next/link"
import { Plus, Edit, Trash2, Eye } from "lucide-react"
import { formatARS } from "@/lib/utils"

export default function AdminMagazinesPage() {
  const magazines = mockMagazines

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div className="space-y-2">
          <h1 className="font-serif text-3xl md:text-4xl font-bold">Revistas</h1>
          <p className="text-muted-foreground">Gestiona todas las ediciones digitales</p>
        </div>
        <Link href="/admin/revistas/nueva">
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Nueva Revista
          </Button>
        </Link>
      </div>

      {magazines.length === 0 ? (
        <div className="text-center py-16 space-y-4">
          <p className="text-muted-foreground">No hay revistas publicadas</p>
          <Link href="/admin/revistas/nueva">
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Crear primera revista
            </Button>
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {magazines.map((magazine: any) => (
            <div
              key={magazine.id}
              className="space-y-4 p-4 border border-border rounded-lg hover:bg-muted/50 transition-colors"
            >
              <div className="relative aspect-[3/4] overflow-hidden bg-muted rounded">
                <Image
                  src={magazine.cover_image || "/placeholder.svg"}
                  alt={magazine.title}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <Badge variant="outline">Edición {magazine.issue_number}</Badge>
                  <Badge variant="default">Disponible</Badge>
                </div>
                <h3 className="font-serif text-lg font-bold">{magazine.title}</h3>
                <div className="flex items-center justify-between text-sm text-muted-foreground">
                  <span>{formatARS(magazine.price)}</span>
                  <span>
                    {new Date(magazine.publication_date).toLocaleDateString("es-ES", {
                      month: "short",
                      year: "numeric",
                    })}
                  </span>
                </div>
                <div className="flex items-center gap-2 pt-2">
                  <Link href={`/revistas/${magazine.id}`} target="_blank" className="flex-1">
                    <Button variant="outline" size="sm" className="w-full bg-transparent">
                      <Eye className="mr-2 h-4 w-4" />
                      Ver
                    </Button>
                  </Link>
                  <Link href={`/admin/revistas/${magazine.id}/editar`}>
                    <Button variant="outline" size="sm">
                      <Edit className="h-4 w-4" />
                      <span className="sr-only">Editar</span>
                    </Button>
                  </Link>
                  <Button
                    variant="outline"
                    size="sm"
                    className="text-destructive hover:text-destructive bg-transparent"
                  >
                    <Trash2 className="h-4 w-4" />
                    <span className="sr-only">Eliminar</span>
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
