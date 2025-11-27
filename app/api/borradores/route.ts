import { NextResponse } from "next/server"
import { getArticulosBorrador, getArticulosArchivados } from "@/lib/directus/queries"

export async function GET(request: Request) {
    try {
        const { searchParams } = new URL(request.url)
        const code = searchParams.get("code")

        // Validate access code
        if (code !== "borrador") {
            return NextResponse.json({ error: "Código incorrecto" }, { status: 401 })
        }

        // Fetch both draft and archived articles
        const [borradores, archivados] = await Promise.all([
            getArticulosBorrador({ limit: 100 }),
            getArticulosArchivados({ limit: 100 }),
        ])

        return NextResponse.json({
            borradores: borradores || [],
            archivados: archivados || [],
        })
    } catch (error) {
        console.error("Error fetching draft articles:", error)
        return NextResponse.json({ error: "Error al obtener artículos" }, { status: 500 })
    }
}
