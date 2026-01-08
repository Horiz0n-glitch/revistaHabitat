
import { Comentario } from "@/lib/directus/types"
import { Clock, User } from "lucide-react"

interface CommentListProps {
    comments: Comentario[]
}

export function CommentList({ comments }: CommentListProps) {
    if (comments.length === 0) {
        return (
            <div className="text-center py-8 text-muted-foreground bg-muted/30 rounded-lg">
                <p>No hay comentarios aún. ¡Sé el primero en comentar!</p>
            </div>
        )
    }

    return (
        <div className="space-y-6">
            <h3 className="font-serif text-2xl font-bold">Comentarios ({comments.length})</h3>
            <div className="space-y-6">
                {comments.map((comment) => (
                    <div key={comment.id} className="bg-muted/30 p-4 rounded-lg border border-border">
                        <div className="flex items-center gap-2 mb-2">
                            <div className="h-8 w-8 rounded-full bg-accent/20 flex items-center justify-center">
                                <User className="h-4 w-4 text-accent" />
                            </div>
                            <div>
                                <p className="font-bold text-sm">{comment.author_name}</p>
                                <p className="text-xs text-muted-foreground flex items-center gap-1">
                                    <Clock className="h-3 w-3" />
                                    {new Date(comment.date_created).toLocaleDateString("es-ES", {
                                        day: "numeric",
                                        month: "long",
                                        hour: "2-digit",
                                        minute: "2-digit"
                                    })}
                                </p>
                            </div>
                        </div>
                        <p className="text-gray-700 dark:text-gray-300 leading-relaxed pl-10">
                            {comment.content}
                        </p>
                    </div>
                ))}
            </div>
        </div>
    )
}
