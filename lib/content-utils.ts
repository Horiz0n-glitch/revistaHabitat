import { getAssetUrl } from "@/lib/directus/client"

export function processContent(content: string): string {
    if (!content) return ""

    let processedContent = content

    // Replace image URLs that point to Directus assets (both relative and absolute)
    processedContent = processedContent.replace(/src=["']([^"']+\/assets\/[^"']+)["']/g, (match, url) => {
        let assetIdOrUrl = url

        // If it's a relative path starting with /assets/, extract the ID
        if (url.startsWith("/assets/")) {
            assetIdOrUrl = url.replace("/assets/", "")
        }

        const newUrl = getAssetUrl(assetIdOrUrl)
        return `src="${newUrl}"`
    })

    // Add styling to images if they don't already have classes
    processedContent = processedContent.replace(
        /<img(?![^>]*class=)/g,
        '<img class="rounded-lg shadow-lg my-8 w-full h-auto object-cover border border-border/50" '
    )

    // Add styling to captions (usually in <sub> tags)
    processedContent = processedContent.replace(
        /<sub(?![^>]*class=)>/g,
        '<sub class="block text-center text-sm text-muted-foreground mt-3 mb-10 font-medium leading-relaxed italic">'
    )

    // Ensure paragraphs have proper spacing
    processedContent = processedContent.replace(
        /<p(?![^>]*class=)>/g,
        '<p class="mb-4 leading-relaxed text-lg">'
    )

    // Style headings if they don't have classes
    processedContent = processedContent.replace(
        /<h2(?![^>]*class=)>/g,
        '<h2 class="text-3xl font-bold mt-10 mb-6 font-serif">'
    )

    processedContent = processedContent.replace(
        /<h3(?![^>]*class=)>/g,
        '<h3 class="text-2xl font-bold mt-8 mb-4 font-serif">'
    )

    // Style lists
    processedContent = processedContent.replace(
        /<ul(?![^>]*class=)>/g,
        '<ul class="list-disc list-outside ml-6 mb-6 space-y-2">'
    )

    processedContent = processedContent.replace(
        /<ol(?![^>]*class=)>/g,
        '<ol class="list-decimal list-outside ml-6 mb-6 space-y-2">'
    )

    processedContent = processedContent.replace(
        /<li(?![^>]*class=)>/g,
        '<li class="pl-1 leading-relaxed">'
    )

    // Style blockquotes
    processedContent = processedContent.replace(
        /<blockquote(?![^>]*class=)>/g,
        '<blockquote class="border-l-4 border-accent pl-4 italic my-6 text-muted-foreground">'
    )

    // Preserve line breaks
    processedContent = processedContent.replace(/<br\s*\/?>/g, '<br class="my-2" />')

    // Style strong/bold text
    processedContent = processedContent.replace(
        /<strong(?![^>]*class=)>/g,
        '<strong class="font-bold">'
    )

    // Style emphasis/italic text
    processedContent = processedContent.replace(
        /<em(?![^>]*class=)>/g,
        '<em class="italic">'
    )

    // Style links
    processedContent = processedContent.replace(
        /<a /g,
        '<a class="text-accent hover:underline" '
    )

    return processedContent
}
