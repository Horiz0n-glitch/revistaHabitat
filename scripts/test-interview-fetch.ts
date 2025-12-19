import 'dotenv/config';
import { createDirectus, rest, authentication, staticToken, readItems } from "@directus/sdk";

const DIRECTUS_URL = process.env.NEXT_PUBLIC_DIRECTUS_URL || process.env.DIRECTUS_URL;
const DIRECTUS_TOKEN = process.env.DIRECTUS_TOKEN;

console.log("URL:", DIRECTUS_URL);
console.log("Token:", DIRECTUS_TOKEN ? "Present" : "Missing");

async function main() {
    if (!DIRECTUS_URL) {
        console.error("No Directus URL");
        return;
    }

    const client = createDirectus(DIRECTUS_URL)
        .with(rest())
        .with(authentication())
        .with(staticToken(DIRECTUS_TOKEN || ""));

    try {
        console.log("Fetching interviews...");
        const result = await client.request(
            readItems("entrevistas", {
                limit: 1,
                fields: ["*", "galeria.*"], // Fetch deep gallery fields
            })
        );

        if (result.length > 0) {
            console.log("First Interview Data Keys:", Object.keys(result[0]));
            console.log("First Interview Data:", JSON.stringify(result[0], null, 2));
        } else {
            console.log("No interviews found.");
        }

    } catch (error) {
        console.error("Error:", error);
    }
}

main();
