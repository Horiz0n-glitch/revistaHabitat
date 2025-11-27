import { getArticulos } from "@/lib/directus/queries"
import { getAssetUrl } from "@/lib/directus/client"

export const revalidate = 0

export default async function DebugPage() {
    let articulos = []
    try {
        articulos = await getArticulos({ limit: 5 })
    } catch (e) {
        return <div>Error fetching articles: {JSON.stringify(e)}</div>
    }

    return (
        <div className="p-8 space-y-8">
            <h1 className="text-2xl font-bold">Image Debugger</h1>

            <div className="p-4 border rounded bg-gray-100">
                <h2 className="font-bold">Environment</h2>
                <pre>NEXT_PUBLIC_DIRECTUS_URL: {process.env.NEXT_PUBLIC_DIRECTUS_URL}</pre>
            </div>

            <div className="grid gap-8">
                {articulos.map((articulo) => {
                    const rawUrl = getAssetUrl(articulo.imagen_principal)
                    return (
                        <div key={articulo.id} className="border p-4 rounded space-y-4">
                            <h3 className="font-bold">{articulo.titulo}</h3>

                            <div className="space-y-2">
                                <p className="font-mono text-sm break-all bg-slate-100 p-2">
                                    URL: <a href={rawUrl} target="_blank" className="text-blue-600 underline">{rawUrl}</a>
                                </p>
                            </div>

                            <div className="grid grid-cols-3 gap-4">
                                <div>
                                    <p className="mb-2 font-semibold">Standard HTML &lt;img&gt;</p>
                                    {/* eslint-disable-next-line @next/next/no-img-element */}
                                    <img
                                        src={rawUrl}
                                        alt="Standard HTML"
                                        className="w-full h-auto border-2 border-green-500"
                                    />
                                </div>
                                <div>
                                    <p className="mb-2 font-semibold">No-Referrer Policy</p>
                                    {/* eslint-disable-next-line @next/next/no-img-element */}
                                    <img
                                        src={rawUrl}
                                        alt="No Referrer"
                                        referrerPolicy="no-referrer"
                                        className="w-full h-auto border-2 border-blue-500"
                                    />
                                </div>
                                <div>
                                    <p className="mb-2 font-semibold">Via Proxy (Server-side)</p>
                                    {/* eslint-disable-next-line @next/next/no-img-element */}
                                    <img
                                        src={`/api/debug-proxy?url=${encodeURIComponent(rawUrl)}`}
                                        alt="Proxy"
                                        className="w-full h-auto border-2 border-purple-500"
                                    />
                                </div>
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}
