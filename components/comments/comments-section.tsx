
import { getCommentsByArticleId } from "@/lib/directus/queries"
import { CommentList } from "./comment-list"
import { CommentForm } from "./comment-form"

export async function CommentsSection({ articleId }: { articleId: number }) {
    const comments = await getCommentsByArticleId(articleId)

    return (
        <section className="py-12 border-t border-border mt-12">
            <div className="space-y-12">
                <CommentList comments={comments} />
                <CommentForm articleId={articleId} />
            </div>
        </section>
    )
}
