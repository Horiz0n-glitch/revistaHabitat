import { getAssetUrl } from "@/lib/directus/client"

export function processContent(content: string): string {
    if (!content) return ""

    // Replace image URLs that point to Directus assets (both relative and absolute)
    // Matches src="..." where the URL contains /assets/
    let processedContent = content.replace(/src=["']([^"']+\/assets\/[^"']+)["']/g, (match, url) => {
        // url is the captured URL from the src attribute
        // It could be "/assets/..." or "https://domain.com/assets/..."

        // getAssetUrl handles both cases:
        // 1. If it starts with http, it proxies it.
        // 2. If it's just an ID (or relative path in our case), we might need to be careful.

        // getAssetUrl implementation:
        // if (fileId.startsWith("http")) -> proxies it
        // else -> appends DIRECTUS_URL/assets/fileId -> proxies it

        // If we pass "/assets/ID", getAssetUrl will append it to DIRECTUS_URL/assets/
        // Resulting in DIRECTUS_URL/assets//assets/ID -> WRONG

        // So we need to normalize the input to getAssetUrl.

        let assetIdOrUrl = url

        // If it's a relative path starting with /assets/, extract the ID
        if (url.startsWith("/assets/")) {
            assetIdOrUrl = url.replace("/assets/", "")
        }
        // If it's an absolute URL, we can pass it directly to getAssetUrl which handles http prefix

        const newUrl = getAssetUrl(assetIdOrUrl)
        return `src="${newUrl}"`
    })

    // Add styling to images
    // We use a negative lookahead to ensure we don't add the class if it's already there (simple check)
    // But since we are processing raw HTML from Directus which usually doesn't have these classes, we can just replace <img
    processedContent = processedContent.replace(
        /<img /g,
        '<img class="rounded-lg shadow-lg my-8 w-full h-auto object-cover border border-border/50" '
    )

    // Add styling to captions (usually in <sub> tags)
    processedContent = processedContent.replace(
        /<sub>/g,
        '<sub class="block text-center text-sm text-muted-foreground mt-3 mb-10 font-medium leading-relaxed italic">'
    )

    return processedContent
}
