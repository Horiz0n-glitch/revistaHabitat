import { mockInterviews } from "@/lib/mock-data"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import { Plus, Edit, Trash2, Eye } from "lucide-react"

export default function AdminInterviewsPage() {
  const interviews = mockInterviews

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div className="space-y-2">
          <h1 className="font-serif text-3xl md:text-4xl font-bold">Entrevistas</h1>
          <p className="text-muted-foreground">Gestiona todas las entrevistas publicadas</p>
        </div>
        <Link href="/admin/entrevistas/nueva">
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Nueva Entrevista
          </Button>
        </Link>
      </div>

      {interviews.length === 0 ? (
        <div className="text-center py-16 space-y-4">
          <p className="text-muted-foreground">No hay entrevistas publicadas</p>
          <Link href="/admin/entrevistas/nueva">
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Crear primera entrevista
            </Button>
          </Link>
        </div>
      ) : (
        <div className="space-y-4">
          {interviews.map((interview: any) => {
            const authorName = interview.author?.full_name || "Anónimo"

            return (
              <div
                key={interview.id}
                className="flex items-center justify-between p-6 border border-border rounded-lg hover:bg-muted/50 transition-colors"
              >
                <div className="flex-1 space-y-2">
                  <div className="flex items-center gap-3">
                    <h3 className="font-serif text-xl font-bold">{interview.title}</h3>
                    <Badge variant="default">Publicado</Badge>
                  </div>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <span>Entrevistado: {interview.interviewee_name}</span>
                    <span>• Por {authorName}</span>
                    <span>• {new Date(interview.published_at).toLocaleDateString("es-ES")}</span>
                    <span className="flex items-center gap-1">
                      <Eye className="h-3 w-3" />
                      {interview.views} vistas
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Link href={`/entrevistas/${interview.slug}`} target="_blank">
                    <Button variant="ghost" size="icon">
                      <Eye className="h-4 w-4" />
                      <span className="sr-only">Ver</span>
                    </Button>
                  </Link>
                  <Link href={`/admin/entrevistas/${interview.id}/editar`}>
                    <Button variant="ghost" size="icon">
                      <Edit className="h-4 w-4" />
                      <span className="sr-only">Editar</span>
                    </Button>
                  </Link>
                  <Button variant="ghost" size="icon" className="text-destructive hover:text-destructive">
                    <Trash2 className="h-4 w-4" />
                    <span className="sr-only">Eliminar</span>
                  </Button>
                </div>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}
