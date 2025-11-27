"use client"

import { useState, useEffect } from "react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Image from "next/image"
import Link from "next/link"
import { Clock, Lock, FileText, Archive } from "lucide-react"
import { getAssetUrl } from "@/lib/directus/client"
import type { Articulo } from "@/lib/directus/types"
import { ClickableCategoryBadge } from "@/components/clickable-category-badge"

const ACCESS_CODE = "borrador"
const STORAGE_KEY = "draft_access"

export default function BorradoresPage() {
    const [isAuthenticated, setIsAuthenticated] = useState(false)
    const [code, setCode] = useState("")
    const [error, setError] = useState("")
    const [loading, setLoading] = useState(true)
    const [borradores, setBorradores] = useState<Articulo[]>([])
    const [archivados, setArchivados] = useState<Articulo[]>([])

    // Check if user has access on mount
    useEffect(() => {
        const hasAccess = sessionStorage.getItem(STORAGE_KEY) === "true"
        setIsAuthenticated(hasAccess)
        setLoading(false)

        if (hasAccess) {
            loadArticles()
        }
    }, [])

    const loadArticles = async () => {
        try {
            const response = await fetch(`/api/borradores?code=${ACCESS_CODE}`)

            if (!response.ok) {
                throw new Error("Failed to fetch articles")
            }

            const data = await response.json()
            setBorradores(data.borradores || [])
            setArchivados(data.archivados || [])
        } catch (error) {
            console.error("Error loading articles:", error)
        }
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        if (code === ACCESS_CODE) {
            sessionStorage.setItem(STORAGE_KEY, "true")
            setIsAuthenticated(true)
            setError("")
            loadArticles()
        } else {
            setError("Código incorrecto. Intenta nuevamente.")
        }
    }

    const handleLogout = () => {
        sessionStorage.removeItem(STORAGE_KEY)
        setIsAuthenticated(false)
        setCode("")
        setBorradores([])
        setArchivados([])
    }

    if (loading) {
        return (
            <div className="min-h-screen flex flex-col">
                <Header />
                <main className="flex-1 flex items-center justify-center">
                    <p className="text-muted-foreground">Cargando...</p>
                </main>
                <Footer />
            </div>
        )
    }

    if (!isAuthenticated) {
        return (
            <div className="min-h-screen flex flex-col">
                <Header />
                <main className="flex-1 flex items-center justify-center p-4">
                    <Card className="w-full max-w-md">
                        <CardHeader className="text-center">
                            <div className="flex justify-center mb-4">
                                <div className="rounded-full bg-primary/10 p-3">
                                    <Lock className="h-8 w-8 text-primary" />
                                </div>
                            </div>
                            <CardTitle className="font-serif text-2xl">Área Restringida</CardTitle>
                            <CardDescription>Ingresa el código de acceso para ver los artículos en borrador</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <form onSubmit={handleSubmit} className="space-y-4">
                                <div className="space-y-2">
                                    <Input
                                        type="text"
                                        placeholder="Código de acceso"
                                        value={code}
                                        onChange={(e) => setCode(e.target.value)}
                                        className="text-center"
                                        autoFocus
                                    />
                                    {error && <p className="text-sm text-destructive text-center">{error}</p>}
                                </div>
                                <Button type="submit" className="w-full">
                                    Acceder
                                </Button>
                            </form>
                        </CardContent>
                    </Card>
                </main>
                <Footer />
            </div>
        )
    }

    const ArticleCard = ({ articulo }: { articulo: Articulo }) => {
        const categoria = typeof articulo.categoria === "object" ? articulo.categoria : null
        const autor = typeof articulo.autor === "object" ? articulo.autor : null

        return (
            <div className="group">
                <article className="space-y-4">
                    {/* Image */}
                    <Link href={`/articulos/${articulo.slug}`} className="block relative aspect-[4/3] overflow-hidden bg-muted">
                        <Image
                            src={getAssetUrl(articulo.imagen_principal) || "/placeholder.svg"}
                            alt={articulo.titulo}
                            fill
                            className="object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                    </Link>

                    {/* Content */}
                    <div className="space-y-3">
                        <div className="flex items-center gap-2">
                            {categoria && <ClickableCategoryBadge categorySlug={categoria.slug} categoryName={categoria.nombre} />}
                            <Badge variant="outline" className="text-xs">
                                {articulo.estado === "borrador" ? "Borrador" : "Archivado"}
                            </Badge>
                        </div>

                        <Link href={`/articulos/${articulo.slug}`} className="block">
                            <h2 className="font-serif text-xl font-bold group-hover:text-accent transition-colors text-balance line-clamp-2">
                                {articulo.titulo}
                            </h2>
                        </Link>

                        <p className="text-muted-foreground text-sm line-clamp-3">{articulo.extracto}</p>

                        <div className="flex items-center justify-between text-sm text-muted-foreground pt-2">
                            {autor && <span>{autor.nombre}</span>}
                            <span className="flex items-center gap-1">
                                <Clock className="h-3 w-3" />
                                {new Date(articulo.fecha_publicacion).toLocaleDateString("es-ES", {
                                    day: "numeric",
                                    month: "short",
                                    year: "numeric",
                                })}
                            </span>
                        </div>
                    </div>
                </article>
            </div>
        )
    }

    return (
        <div className="min-h-screen flex flex-col">
            <Header />

            <main className="flex-1">
                <section className="border-b border-border bg-background">
                    <div className="container mx-auto px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 2xl:px-24 py-8">
                        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
                            <div>
                                <h1 className="font-serif text-3xl md:text-4xl font-bold mb-2">Artículos en Borrador</h1>
                                <p className="text-muted-foreground max-w-2xl leading-relaxed">
                                    Vista previa de artículos en estado de borrador y archivados
                                </p>
                            </div>

                            <Button variant="outline" onClick={handleLogout}>
                                Cerrar Sesión
                            </Button>
                        </div>
                    </div>
                </section>

                <section className="container mx-auto px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 2xl:px-24 py-12">
                    <Tabs defaultValue="borradores" className="w-full">
                        <TabsList className="grid w-full max-w-md grid-cols-2">
                            <TabsTrigger value="borradores" className="flex items-center gap-2">
                                <FileText className="h-4 w-4" />
                                Borradores ({borradores.length})
                            </TabsTrigger>
                            <TabsTrigger value="archivados" className="flex items-center gap-2">
                                <Archive className="h-4 w-4" />
                                Archivados ({archivados.length})
                            </TabsTrigger>
                        </TabsList>

                        <TabsContent value="borradores" className="mt-8">
                            {borradores.length > 0 ? (
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                                    {borradores.map((articulo) => (
                                        <ArticleCard key={articulo.id} articulo={articulo} />
                                    ))}
                                </div>
                            ) : (
                                <div className="text-center py-20">
                                    <FileText className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                                    <p className="text-muted-foreground text-lg">No hay artículos en borrador en este momento.</p>
                                </div>
                            )}
                        </TabsContent>

                        <TabsContent value="archivados" className="mt-8">
                            {archivados.length > 0 ? (
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                                    {archivados.map((articulo) => (
                                        <ArticleCard key={articulo.id} articulo={articulo} />
                                    ))}
                                </div>
                            ) : (
                                <div className="text-center py-20">
                                    <Archive className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                                    <p className="text-muted-foreground text-lg">No hay artículos archivados en este momento.</p>
                                </div>
                            )}
                        </TabsContent>
                    </Tabs>
                </section>
            </main>

            <Footer />
        </div>
    )
}
