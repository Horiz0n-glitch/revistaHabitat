import { NextRequest, NextResponse } from "next/server"
import { createDirectus, rest, staticToken, createUser, readRoles } from "@directus/sdk"
import type { DirectusSchema } from "@/lib/directus/types"

const DIRECTUS_URL = process.env.NEXT_PUBLIC_DIRECTUS_URL || ""
const DIRECTUS_ADMIN_TOKEN = process.env.DIRECTUS_TOKEN || ""

export async function POST(request: NextRequest) {
    try {
        console.log("[API Register] Starting registration process...")

        const body = await request.json()
        const { email, password, fullName } = body

        console.log("[API Register] Request data:", { email, fullName })

        if (!email || !password || !fullName) {
            console.error("[API Register] Missing required fields")
            return NextResponse.json(
                { success: false, error: "Todos los campos son requeridos" },
                { status: 400 }
            )
        }

        if (!DIRECTUS_URL || !DIRECTUS_ADMIN_TOKEN) {
            console.error("[API Register] Missing Directus configuration")
            return NextResponse.json(
                { success: false, error: "Configuración de Directus no encontrada" },
                { status: 500 }
            )
        }

        // Split full name
        const nameParts = fullName.trim().split(" ")
        const firstName = nameParts[0] || ""
        const lastName = nameParts.slice(1).join(" ") || ""

        console.log("[API Register] Creating Directus client...")

        // Create Directus client with admin token
        const client = createDirectus<DirectusSchema>(DIRECTUS_URL)
            .with(rest())
            .with(staticToken(DIRECTUS_ADMIN_TOKEN))

        console.log("[API Register] Fetching Public role...")

        // Get the Public role ID
        let publicRoleId: string | undefined

        try {
            const roles = await client.request(readRoles({
                filter: { name: { _eq: "Public" } },
                limit: 1,
            }))

            publicRoleId = roles?.[0]?.id
            console.log("[API Register] Public role ID:", publicRoleId)
        } catch (roleError: any) {
            console.error("[API Register] Error fetching role:", roleError)
            // Continue without role - Directus might assign default
        }

        console.log("[API Register] Creating user...")

        // Create user with admin privileges
        const newUser = await client.request(
            createUser({
                email,
                password,
                first_name: firstName,
                last_name: lastName,
                role: publicRoleId,
                status: "active",
            })
        )

        console.log("[API Register] User created successfully:", newUser.id)

        return NextResponse.json({
            success: true,
            userId: newUser.id,
        })
    } catch (error: any) {
        console.error("[API Register] Error details:", {
            message: error?.message,
            errors: error?.errors,
            stack: error?.stack,
        })

        // Handle duplicate email
        if (error?.errors?.[0]?.extensions?.code === "RECORD_NOT_UNIQUE") {
            return NextResponse.json(
                { success: false, error: "Este email ya está registrado" },
                { status: 400 }
            )
        }

        return NextResponse.json(
            {
                success: false,
                error: error?.message || "Error al crear la cuenta",
            },
            { status: 500 }
        )
    }
}
