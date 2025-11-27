import { mockArticles } from "@/lib/mock-data"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import { Plus, Edit, Trash2, Eye } from "lucide-react"

export default function AdminArticlesPage() {
  const articles = mockArticles

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div className="space-y-2">
          <h1 className="font-serif text-3xl md:text-4xl font-bold">Artículos</h1>
          <p className="text-muted-foreground">Gestiona todos los artículos publicados</p>
        </div>
        <Link href="/admin/articulos/nuevo">
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Nuevo Artículo
          </Button>
        </Link>
      </div>

      {articles.length === 0 ? (
        <div className="text-center py-16 space-y-4">
          <p className="text-muted-foreground">No hay artículos publicados</p>
          <Link href="/admin/articulos/nuevo">
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Crear primer artículo
            </Button>
          </Link>
        </div>
      ) : (
        <div className="space-y-4">
          {articles.map((article: any) => {
            const authorName = article.author?.full_name || "Anónimo"

            return (
              <div
                key={article.id}
                className="flex items-center justify-between p-6 border border-border rounded-lg hover:bg-muted/50 transition-colors"
              >
                <div className="flex-1 space-y-2">
                  <div className="flex items-center gap-3">
                    <h3 className="font-serif text-xl font-bold">{article.title}</h3>
                    <Badge variant="default">Publicado</Badge>
                  </div>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <span>Por {authorName}</span>
                    <span>• {article.category.name}</span>
                    <span>• {new Date(article.published_at).toLocaleDateString("es-ES")}</span>
                    <span className="flex items-center gap-1">
                      <Eye className="h-3 w-3" />
                      {article.views} vistas
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Link href={`/articulos/${article.slug}`} target="_blank">
                    <Button variant="ghost" size="icon">
                      <Eye className="h-4 w-4" />
                      <span className="sr-only">Ver</span>
                    </Button>
                  </Link>
                  <Link href={`/admin/articulos/${article.id}/editar`}>
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
