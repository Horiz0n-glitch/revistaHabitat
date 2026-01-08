"use server"

import { revalidatePath } from "next/cache"
import { createComment } from "@/lib/directus/queries"

export type CommentState = {
    success?: boolean
    message?: string
    errors?: {
        author_name?: string[]
        content?: string[]
    }
}

export async function submitComment(prevState: CommentState | null, formData: FormData): Promise<CommentState> {
    const articleId = Number(formData.get("article_id"))
    const authorName = formData.get("author_name") as string
    const content = formData.get("content") as string
    const currentPath = formData.get("current_path") as string

    // Simple validation
    const errors: CommentState["errors"] = {}

    if (!authorName || authorName.trim() === "") {
        errors.author_name = ["El nombre es requerido"]
    }

    if (!content || content.trim() === "") {
        errors.content = ["El comentario no puede estar vacío"]
    }

    if (Object.keys(errors).length > 0) {
        return { success: false, errors }
    }

    try {
        await createComment({
            article_id: articleId,
            author_name: authorName,
            content: content,
            status: "published" // Auto-publish by default as requested
        })

        if (currentPath) {
            revalidatePath(currentPath)
        }

        return {
            success: true,
            message: "¡Gracias! Tu comentario ha sido publicado."
        }
    } catch (error) {
        console.error("Failed to post comment:", error)
        return {
            success: false,
            message: "Hubo un error al enviar tu comentario. Por favor intenta nuevamente."
        }
    }
}
