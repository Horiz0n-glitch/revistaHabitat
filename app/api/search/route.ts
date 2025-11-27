import { type NextRequest, NextResponse } from "next/server"
import { searchContent } from "@/lib/mock-data"

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const query = searchParams.get("q")

    if (!query || query.length < 2) {
      return NextResponse.json({ results: [] })
    }

    const results = searchContent(query)

    return NextResponse.json({ results })
  } catch (error) {
    console.error("[v0] Search error:", error)
    return NextResponse.json({ error: "Error al buscar" }, { status: 500 })
  }
}
