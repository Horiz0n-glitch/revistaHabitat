"use client"

import { useActionState } from "react"
import { submitComment, CommentState } from "@/lib/actions/comments"
import { Button } from "@/components/ui/button"
import { Loader2 } from "lucide-react"

const initialState: CommentState = {
    message: "",
    errors: {}
}

export function CommentForm({ articleId }: { articleId: number }) {
    const [state, formAction, isPending] = useActionState(submitComment, initialState)

    return (
        <div className="bg-background border border-border rounded-lg p-6 shadow-sm">
            <h3 className="font-serif text-xl font-bold mb-4">Dejar un comentario</h3>

            <form action={formAction} className="space-y-4">
                <input type="hidden" name="article_id" value={articleId} />
                {/* Helper to revalidate current path in server action if needed, though we handle basic flow */}

                <div className="space-y-2">
                    <label htmlFor="author_name" className="text-sm font-medium">Nombre</label>
                    <input
                        type="text"
                        id="author_name"
                        name="author_name"
                        required
                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                        placeholder="Tu nombre"
                    />
                    {state?.errors?.author_name && (
                        <p className="text-sm text-destructive">{state.errors.author_name[0]}</p>
                    )}
                </div>

                <div className="space-y-2">
                    <label htmlFor="content" className="text-sm font-medium">Comentario</label>
                    <textarea
                        id="content"
                        name="content"
                        required
                        className="flex min-h-[120px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                        placeholder="Escribe tu comentario aquí..."
                    />
                    {state?.errors?.content && (
                        <p className="text-sm text-destructive">{state.errors.content[0]}</p>
                    )}
                </div>

                {state?.message && (
                    <div className={`p-3 rounded-md text-sm ${state.success ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' : 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400'}`}>
                        {state.message}
                    </div>
                )}

                <Button type="submit" disabled={isPending} className="w-full sm:w-auto">
                    {isPending ? (
                        <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            Enviando...
                        </>
                    ) : (
                        "Enviar Comentario"
                    )}
                </Button>
            </form>
        </div>
    )
}
