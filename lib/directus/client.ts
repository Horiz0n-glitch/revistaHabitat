import { createDirectus, rest, authentication, staticToken } from "@directus/sdk"
import type { DirectusSchema } from "./types"

const DIRECTUS_URL = process.env.NEXT_PUBLIC_DIRECTUS_URL || ""
const DIRECTUS_TOKEN = process.env.DIRECTUS_TOKEN || ""

// Create Directus client with singleton pattern
let directusClient: ReturnType<typeof createDirectus<DirectusSchema>> | null = null

export function getDirectusClient() {
  if (!DIRECTUS_URL) {
    console.error("[v0] NEXT_PUBLIC_DIRECTUS_URL is not configured")
    throw new Error("Directus URL not configured")
  }

  if (!directusClient) {
    console.log("[v0] Creating Directus client with URL:", DIRECTUS_URL)
    directusClient = createDirectus<DirectusSchema>(DIRECTUS_URL)
      .with(rest())
      .with(authentication())
      .with(staticToken(DIRECTUS_TOKEN))
  }

  return directusClient
}

// Helper to get authenticated client with static token
export async function getAuthenticatedClient() {
  return getDirectusClient()
}

export function getDirectusUrl(): string {
  return DIRECTUS_URL
}

// Asset URL helper - converts Directus file ID to proxy URL
export function getAssetUrl(fileId?: string | null): string {
  if (!fileId) return "/placeholder.svg"

  // If it's already a full URL, proxy it
  if (fileId.startsWith("http")) {
    return `/api/image-proxy?url=${encodeURIComponent(fileId)}`
  }

  if (!DIRECTUS_URL) return "/placeholder.svg"

  const directusUrl = `${DIRECTUS_URL}/assets/${fileId}`
  return `/api/image-proxy?url=${encodeURIComponent(directusUrl)}`
}

// Asset URL with transformations (resize, format, etc.)
export function getAssetUrlWithTransforms(
  fileId?: string | null,
  options?: {
    width?: number
    height?: number
    quality?: number
    format?: "jpg" | "png" | "webp"
    fit?: "cover" | "contain" | "inside" | "outside"
  },
): string {
  if (!fileId) return "/placeholder.svg"

  if (fileId.startsWith("http")) {
    return `/api/image-proxy?url=${encodeURIComponent(fileId)}`
  }

  if (!DIRECTUS_URL) return "/placeholder.svg"

  const params = new URLSearchParams()

  if (options?.width) params.append("width", options.width.toString())
  if (options?.height) params.append("height", options.height.toString())
  if (options?.quality) params.append("quality", options.quality.toString())
  if (options?.format) params.append("format", options.format)
  if (options?.fit) params.append("fit", options.fit)

  const queryString = params.toString()
  const directusUrl = `${DIRECTUS_URL}/assets/${fileId}${queryString ? `?${queryString}` : ""}`
  return `/api/image-proxy?url=${encodeURIComponent(directusUrl)}`
}
