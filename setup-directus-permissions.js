/**
 * Script para configurar permisos de registro público en Directus
 * 
 * INSTRUCCIONES:
 * 1. Obtén tu Admin Token de Directus:
 *    - Ve a tu perfil de usuario en Directus
 *    - Settings → Access Tokens
 *    - Crea un nuevo token con permisos de administrador
 * 
 * 2. Ejecuta este script:
 *    node setup-directus-permissions.js YOUR_ADMIN_TOKEN
 */

const DIRECTUS_URL = process.env.NEXT_PUBLIC_DIRECTUS_URL || "https://habitat.horizontsoftware.com.ar"

async function setupPublicRegistration(adminToken) {
    if (!adminToken) {
        console.error("❌ Error: Debes proporcionar un Admin Token")
        console.log("Uso: node setup-directus-permissions.js YOUR_ADMIN_TOKEN")
        process.exit(1)
    }

    console.log("🔧 Configurando permisos de registro público en Directus...")
    console.log("📍 URL:", DIRECTUS_URL)

    try {
        // 1. Obtener el ID del rol "Public"
        console.log("\n1️⃣ Buscando rol 'Public'...")
        const rolesResponse = await fetch(`${DIRECTUS_URL}/roles?filter[name][_eq]=Public`, {
            headers: {
                "Authorization": `Bearer ${adminToken}`,
            },
        })

        if (!rolesResponse.ok) {
            throw new Error(`Error al obtener roles: ${rolesResponse.status} ${rolesResponse.statusText}`)
        }

        const rolesData = await rolesResponse.json()
        const publicRole = rolesData.data?.[0]

        if (!publicRole) {
            throw new Error("No se encontró el rol 'Public'")
        }

        console.log(`✅ Rol 'Public' encontrado (ID: ${publicRole.id})`)

        // 2. Crear o actualizar la policy para registro de usuarios
        console.log("\n2️⃣ Configurando policy de registro...")

        const policyData = {
            name: "User Registration",
            icon: "badge",
            description: "Permite a usuarios públicos registrarse",
            permissions: [
                {
                    collection: "directus_users",
                    action: "create",
                    fields: ["email", "password", "first_name", "last_name"],
                    presets: {
                        role: publicRole.id,
                        status: "active",
                    },
                },
            ],
            roles: [publicRole.id],
        }

        // Intentar crear la policy
        const createPolicyResponse = await fetch(`${DIRECTUS_URL}/policies`, {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${adminToken}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify(policyData),
        })

        if (createPolicyResponse.ok) {
            const policy = await createPolicyResponse.json()
            console.log(`✅ Policy creada exitosamente (ID: ${policy.data.id})`)
        } else if (createPolicyResponse.status === 400) {
            console.log("⚠️  La policy ya existe, intentando actualizar...")
            // Si ya existe, intentar actualizarla
            // Nota: Necesitarías el ID de la policy existente para actualizarla
        } else {
            const error = await createPolicyResponse.text()
            throw new Error(`Error al crear policy: ${createPolicyResponse.status} - ${error}`)
        }

        // 3. Verificar configuración de registro público
        console.log("\n3️⃣ Verificando configuración de proyecto...")

        const settingsResponse = await fetch(`${DIRECTUS_URL}/settings`, {
            headers: {
                "Authorization": `Bearer ${adminToken}`,
            },
        })

        if (settingsResponse.ok) {
            const settings = await settingsResponse.json()
            console.log("✅ Configuración actual:")
            console.log(`   - Registro público: ${settings.data.public_registration ? "✅ Habilitado" : "❌ Deshabilitado"}`)
            console.log(`   - Rol por defecto: ${settings.data.public_role || "No configurado"}`)

            // Actualizar si es necesario
            if (!settings.data.public_registration) {
                console.log("\n4️⃣ Habilitando registro público...")
                const updateResponse = await fetch(`${DIRECTUS_URL}/settings`, {
                    method: "PATCH",
                    headers: {
                        "Authorization": `Bearer ${adminToken}`,
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        public_registration: true,
                        public_role: publicRole.id,
                    }),
                })

                if (updateResponse.ok) {
                    console.log("✅ Registro público habilitado")
                }
            }
        }

        console.log("\n✨ ¡Configuración completada!")
        console.log("\n📝 Próximos pasos:")
        console.log("1. Intenta registrarte en /registro")
        console.log("2. Si aún hay problemas, crea un usuario manualmente en Directus")
        console.log("3. Prueba el login en /login")

    } catch (error) {
        console.error("\n❌ Error:", error.message)
        console.log("\n💡 Solución alternativa:")
        console.log("1. Ve a Directus Admin → User Directory")
        console.log("2. Crea un usuario manualmente")
        console.log("3. Asegúrate de que Status = 'active'")
        console.log("4. Prueba el login con ese usuario")
    }
}

// Ejecutar el script
const adminToken = process.argv[2]
setupPublicRegistration(adminToken)
