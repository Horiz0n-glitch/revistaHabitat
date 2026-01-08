
import { getDirectusClient } from "../lib/directus/client"
import { readItems } from "@directus/sdk"

async function main() {
  const client = getDirectusClient()
  const titlePart = "El diseño interior como lenguaje emocional"
  
  try {
    const articles = await client.request(readItems("articulos", {
      filter: {
        titulo: { _contains: titlePart }
      },
      fields: ["*", "imagen_principal"]
    }))
    
    console.log("Found articles:", JSON.stringify(articles, null, 2))
  } catch (error) {
    console.error("Error:", error)
  }
}

main()
