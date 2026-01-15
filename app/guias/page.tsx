import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import { LayoutGrid, ArrowRight, Building2, BookOpen, MapPin } from "lucide-react"

export const metadata = {
    title: "Guías - Revista Habitat",
    description: "Explora nuestras guías especializadas en arquitectura, patrimonio y desarrollo social.",
}

export default function GuiasPage() {
    const guias = [
        {
            title: "Guía de Fundaciones",
            description: "Directorio completo de fundaciones dedicadas al patrimonio, la arquitectura y el desarrollo cultural.",
            href: "/guias/fundaciones",
            icon: Building2,
            color: "bg-blue-500/10 text-blue-600",
        },
        // Future guides can be added here
        /*
        {
          title: "Guía de Museos",
          description: "Recorrido por los museos más emblemáticos y sus colecciones de arquitectura y diseño.",
          href: "/guias/museos",
          icon: MapPin,
          color: "bg-amber-500/10 text-amber-600",
          comingSoon: true,
        },
        */
    ]

    return (
        <div className="min-h-screen flex flex-col">
            <Header />

            <main className="flex-1">
                {/* Hero Section */}
                <section className="bg-muted py-16 md:py-24">
                    <div className="container mx-auto px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 2xl:px-24">
                        <div className="max-w-3xl">
                            <Badge className="mb-4 uppercase tracking-wider" variant="outline">Recursos</Badge>
                            <h1 className="font-serif text-4xl md:text-6xl font-bold mb-6 text-balance text-black">
                                Nuestras Guías
                            </h1>
                            <p className="text-xl text-muted-foreground leading-relaxed text-pretty">
                                Explora nuestros directorios especializados.
                            </p>
                        </div>
                    </div>
                </section>

                {/* Guides Grid */}
                <section className="container mx-auto px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 2xl:px-24 py-16">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {guias.map((guia) => (
                            <Link key={guia.href} href={guia.href} className="group">
                                <Card className="h-full hover:shadow-xl transition-all duration-300 border-border group-hover:border-accent">
                                    <CardHeader>
                                        <div className={`w-12 h-12 rounded-lg ${guia.color} flex items-center justify-center mb-4 transition-transform group-hover:scale-110`}>
                                            <guia.icon className="h-6 w-6" />
                                        </div>
                                        <CardTitle className="font-serif text-2xl group-hover:text-accent transition-colors">
                                            {guia.title}
                                        </CardTitle>
                                        <CardDescription className="text-base">
                                            {guia.description}
                                        </CardDescription>
                                    </CardHeader>
                                    <CardContent>
                                        <Button variant="ghost" className="p-0 text-accent group-hover:gap-3 transition-all h-auto font-semibold">
                                            Explorar guía
                                            <ArrowRight className="h-4 w-4 ml-2" />
                                        </Button>
                                    </CardContent>
                                </Card>
                            </Link>
                        ))}
                    </div>
                </section>

                {/* CTA or Info Section */}
                <section className="bg-accent text-accent-foreground py-16">
                    <div className="container mx-auto px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 2xl:px-24">
                        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
                            <div className="max-w-2xl">
                                <h2 className="font-serif text-3xl font-bold mb-4">¿Te gustaría formar parte de nuestras guías?</h2>
                                <p className="text-lg opacity-90">
                                    Si representas a una institución, fundación o proyecto que debería estar en nuestros directorios, no dudes en contactarnos.
                                </p>
                            </div>
                            <Button size="lg" variant="secondary" asChild>
                                <Link href="/contacto">Contáctanos</Link>
                            </Button>
                        </div>
                    </div>
                </section>
            </main>

            <Footer />
        </div>
    )
}
