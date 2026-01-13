"use client"

import { useState } from "react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Mail, Star, CheckCircle2, TrendingUp, Users, Eye, FileText, Download, X } from 'lucide-react'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

export default function PublicidadPage() {
  const [selectedPdf, setSelectedPdf] = useState<{ url: string, title: string } | null>(null)

  const pricingTiers = [
    {
      type: "Banner Superior (Leaderboard)",
      dimension: "1200x200 px",
      description: "Ubicado en la parte superior o secciones destacadas. Ideal para campañas institucionales o de alto impacto.",
      visibility: 4,
      price: "$720.000",
    },
    {
      type: "Cartelera (Billboard)",
      dimension: "970x300 px",
      description: "Gran formato intermedio o final de sección. Alta exposición dentro del flujo de lectura.",
      visibility: 4,
      price: "$940.000",
    },
    {
      type: "Rectángulo Mediano (Rectangle)",
      dimension: "336x280 px",
      description: "Versátil, ideal para promociones, productos o servicios destacados.",
      visibility: 3,
      price: "$470.000",
    },
    {
      type: "Cuadrado (Square)",
      dimension: "250x250 px",
      description: "Espacio compacto en barra lateral o secciones secundarias.",
      visibility: 2,
      price: "$400.000",
    },
    {
      type: "Rascacielos (Skyscraper)",
      dimension: "300x600 px",
      description: "Ubicación fija en la barra lateral. Alta visibilidad durante el desplazamiento del usuario.",
      visibility: 3,
      price: "$870.000",
    },
    {
      type: "Tarjeta de Artículo (Article Card)",
      dimension: "400x300 px",
      description: "Anuncio nativo integrado entre los artículos. Ideal para marcas con afinidad editorial.",
      visibility: 4,
      price: "$580.000",
    },
  ]

  const benefits = [
    {
      icon: Users,
      title: "Audiencia Especializada",
      description: "Acceso a profesionales de arquitectura, diseño, construcción y sectores afines.",
    },
    {
      icon: TrendingUp,
      title: "Alto Engagement",
      description: "Nuestra comunidad interactúa activamente con contenido de calidad y valor profesional.",
    },
    {
      icon: Eye,
      title: "Visibilidad Garantizada",
      description: "Formatos premium en ubicaciones estratégicas con máxima exposición.",
    },
    {
      icon: CheckCircle2,
      title: "Resultados Medibles",
      description: "Reportes detallados de impresiones, clicks y rendimiento de tu campaña.",
    },
  ]

  const revistaBimestralPricing = [
    {
      format: "Contratapa",
      price: "$1.740.000",
      description: "Aviso página entera",
      dimensions: "23 cm x 30 cm",
    },
    {
      format: "Retiraciones",
      price: "$1.350.000",
      description: "Aviso página entera",
      dimensions: "23 cm x 30 cm",
    },
    {
      format: "1 Página",
      price: "$1.110.000",
      description: "Aviso página entera",
      dimensions: "23 cm x 30 cm",
    },
    {
      format: "1/2 Página",
      price: "$664.000",
      description: "Aviso media página",
      dimensions: "23 cm x 15 cm",
    },
    {
      format: "1/4 Página",
      price: "$400.000",
      description: "Aviso 1/4 de página",
      dimensions: "11,5 cm x 15 cm",
    },
    {
      format: "1/8 Página",
      price: "$238.000",
      description: "Aviso 1/8 de página",
      dimensions: "11,5 cm x 7,5 cm",
    },
  ]

  const revistaSemestralPricing = [
    {
      format: "Contratapa",
      price: "$4.340.000",
      description: "Aviso página entera",
      dimensions: "23 cm x 30 cm",
    },
    {
      format: "Retiraciones",
      price: "$3.360.000",
      description: "Aviso página entera",
      dimensions: "23 cm x 30 cm",
    },
    {
      format: "1 Página",
      price: "$2.760.000",
      description: "Aviso página entera",
      dimensions: "23 cm x 30 cm",
    },
    {
      format: "1/2 Página",
      price: "$1.660.000",
      description: "Aviso media página",
      dimensions: "23 cm x 15 cm",
    },
    {
      format: "1/4 Página",
      price: "$995.000",
      description: "Aviso 1/4 de página",
      dimensions: "11,5 cm x 15 cm",
    },
    {
      format: "1/8 Página",
      price: "$595.000",
      description: "Aviso 1/8 de página",
      dimensions: "11,5 cm x 7,5 cm",
    },
  ]

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-muted py-16 md:py-24">
          <div className="container mx-auto px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 2xl:px-24">
            <div className="max-w-3xl">
              <h1 className="font-serif text-4xl md:text-6xl font-bold mb-6 text-balance">
                Publicidad en Revista Habitat
              </h1>
              <p className="text-xl text-muted-foreground leading-relaxed text-pretty">
                Conecta tu marca, tu empresa, tu oficio. Con las obras de puesta en valor y patrimonio que cada comunidad decidió preservar. Ofrecemos formatos publicitarios premium con ubicaciones estratégicas para maximizar el
                impacto de tu mensaje.
              </p>
            </div>
          </div>
        </section>

        {/* Benefits Section */}
        <section className="container mx-auto px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 2xl:px-24 py-16">
          <h2 className="font-serif text-3xl md:text-4xl font-bold mb-12 text-center">¿Por qué anunciarte con nosotros?</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {benefits.map((benefit, index) => (
              <Card key={index}>
                <CardContent className="p-6 text-center">
                  <benefit.icon className="h-12 w-12 text-accent mx-auto mb-4" />
                  <h3 className="font-serif text-xl font-bold mb-3">{benefit.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{benefit.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Media Kits Section */}
        <section className="bg-muted/50 py-16">
          <div className="container mx-auto px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 2xl:px-24">
            <h2 className="font-serif text-3xl md:text-4xl font-bold mb-12 text-center">Descarga nuestros Media Kits</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                {
                  title: "Publicidad Web",
                  description: "Especificaciones y tarifas para banners y anuncios en nuestro sitio web.",
                  url: "https://drive.google.com/file/d/16gWFDFFrUl5rSQdMr75gXLquT_V2bq8E/preview",
                },
                {
                  title: "Revista Digital Bimestral",
                  description: "Formatos y costos para publicidad en nuestra edición digital interactiva.",
                  url: "https://pub-58d5e70d4f5a4ae1a1c5f11307ac80cb.r2.dev/media%20kit/Media%20Kit%20revista%20Habitat%20N%C2%BA%201%20-%20Edici%C3%B3n%20Digital%20%20(3).pdf",
                },
                {
                  title: "Revista en papel Semestral",
                  description: "Tarifario y medidas para avisos en nuestra tradicional revista impresa.",
                  url: "https://pub-58d5e70d4f5a4ae1a1c5f11307ac80cb.r2.dev/media%20kit/Publicidad%20en%20la%20revista%20Habitat%20N%C2%BA%2082%20-%20Edici%C3%B3n%20en%20Papel%20(2).pdf",
                },
              ].map((kit, index) => (
                <Card key={index} className="flex flex-col h-full hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="w-12 h-12 rounded-lg bg-accent/10 flex items-center justify-center mb-4">
                      <FileText className="h-6 w-6 text-accent" />
                    </div>
                    <CardTitle className="font-serif text-xl">{kit.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="flex-1 flex flex-col justify-between">
                    <p className="text-sm text-muted-foreground mb-6">{kit.description}</p>
                    <div className="space-y-3">
                      <Button
                        variant="outline"
                        className="w-full gap-2"
                        onClick={() => setSelectedPdf({ url: kit.url, title: kit.title })}
                      >
                        <Eye className="h-4 w-4" />
                        Ver Online
                      </Button>
                      <Button asChild className="w-full gap-2">
                        <a href={kit.url} target="_blank" rel="noopener noreferrer">
                          <Download className="h-4 w-4" />
                          Descargar PDF
                        </a>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <Dialog open={selectedPdf !== null} onOpenChange={(open) => !open && setSelectedPdf(null)}>
          <DialogContent className="max-w-5xl h-[90vh] flex flex-col p-0">
            <div className="p-4 border-b flex items-center justify-between">
              <DialogTitle className="font-serif">{selectedPdf?.title}</DialogTitle>
            </div>
            <div className="flex-1 w-full h-full bg-muted/20">
              {selectedPdf && (
                <iframe
                  src={selectedPdf.url}
                  className="w-full h-full"
                  title={selectedPdf.title}
                />
              )}
            </div>
          </DialogContent>
        </Dialog>

        {/* Pricing Table Section */}
        <section className="bg-muted py-16">
          <div className="container mx-auto px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 2xl:px-24">
            <h2 className="font-serif text-3xl md:text-4xl font-bold mb-4 text-center">
              Tarifas Publicitarias
            </h2>
            <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
              Elige el formato que mejor se adapte a tus objetivos de marketing. Todos los precios están expresados en pesos argentinos (ARS).
            </p>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Web Pricing Card */}
              <Card className="flex flex-col">
                <CardHeader className="bg-accent text-accent-foreground rounded-t-lg">
                  <CardTitle className="font-serif text-xl text-center">Web. Tipo de anuncio</CardTitle>
                  <p className="text-sm text-center opacity-90">Precios mensuales</p>
                </CardHeader>
                <CardContent className="flex-1 p-0">
                  <div className="divide-y divide-gray-200">
                    {pricingTiers.map((tier, index) => (
                      <div key={index} className="p-4 hover:bg-gray-50 transition-colors">
                        <div className="flex justify-between items-start mb-1">
                          <span className="font-medium text-sm">{tier.type}</span>
                          <span className="font-bold text-accent whitespace-nowrap">{tier.price}</span>
                        </div>
                        <p className="text-xs text-muted-foreground">{tier.dimension}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Revista Digital Bimestral Card */}
              <Card className="flex flex-col">
                <CardHeader className="bg-accent text-accent-foreground rounded-t-lg">
                  <CardTitle className="font-serif text-xl text-center">Revista Digital Bimestral</CardTitle>
                  <p className="text-sm text-center opacity-90">Edición digital interactiva</p>
                </CardHeader>
                <CardContent className="flex-1 p-0">
                  <div className="divide-y divide-gray-200">
                    {revistaBimestralPricing.map((item, index) => (
                      <div key={index} className="p-4 hover:bg-gray-50 transition-colors">
                        <div className="flex justify-between items-start mb-1">
                          <span className="font-medium text-sm">{item.format}</span>
                          <span className="font-bold text-accent whitespace-nowrap">{item.price}</span>
                        </div>
                        <p className="text-xs text-muted-foreground">{item.dimensions}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Revista en Papel Semestral Card */}
              <Card className="flex flex-col">
                <CardHeader className="bg-accent text-accent-foreground rounded-t-lg">
                  <CardTitle className="font-serif text-xl text-center">Revista en Papel Semestral</CardTitle>
                  <p className="text-sm text-center opacity-90">Revista impresa tradicional</p>
                </CardHeader>
                <CardContent className="flex-1 p-0">
                  <div className="divide-y divide-gray-200">
                    {revistaSemestralPricing.map((item, index) => (
                      <div key={index} className="p-4 hover:bg-gray-50 transition-colors">
                        <div className="flex justify-between items-start mb-1">
                          <span className="font-medium text-sm">{item.format}</span>
                          <span className="font-bold text-accent whitespace-nowrap">{item.price}</span>
                        </div>
                        <p className="text-xs text-muted-foreground">{item.dimensions}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="mt-8 bg-accent/5 p-6 rounded-lg max-w-4xl mx-auto">
              <h3 className="font-serif text-xl font-bold mb-3">Información Adicional</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-5 w-5 text-accent flex-shrink-0 mt-0.5" />
                  <span>
                    <strong>Descuentos por volumen:</strong> Consulta por paquetes trimestrales y anuales con
                    descuentos de hasta 20%.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-5 w-5 text-accent flex-shrink-0 mt-0.5" />
                  <span>
                    <strong>Reportes mensuales:</strong> Recibirás informes detallados con métricas de rendimiento de
                    tu campaña.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-5 w-5 text-accent flex-shrink-0 mt-0.5" />
                  <span>
                    <strong>Pago:</strong> Transferencia bancaria o depósito. Facturación disponible para empresas.
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* Custom Packages Section */}
        <section className="container mx-auto px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 2xl:px-24 py-16">
          <div className="max-w-4xl mx-auto">
            <h2 className="font-serif text-3xl md:text-4xl font-bold mb-8">Paquetes Personalizados</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="font-serif">Paquete Premium</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3 text-sm text-muted-foreground">
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-5 w-5 text-accent flex-shrink-0 mt-0.5" />
                      <span>Combinación de formatos estratégicos</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-5 w-5 text-accent flex-shrink-0 mt-0.5" />
                      <span>Difusión en redes sociales</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-5 w-5 text-accent flex-shrink-0 mt-0.5" />
                      <span>Reportes semanales de rendimiento</span>
                    </li>
                  </ul>
                  <p className="mt-6 text-sm text-muted-foreground">
                    Ideal para lanzamientos de productos o campañas de alto impacto.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="font-serif">Paquete Editorial</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3 text-sm text-muted-foreground">
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-5 w-5 text-accent flex-shrink-0 mt-0.5" />
                      <span>Tarjetas de artículo nativas</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-5 w-5 text-accent flex-shrink-0 mt-0.5" />
                      <span>Integración orgánica con el contenido</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-5 w-5 text-accent flex-shrink-0 mt-0.5" />
                      <span>Mayor credibilidad y engagement</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-5 w-5 text-accent flex-shrink-0 mt-0.5" />
                      <span>Ubicación en secciones afines</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-5 w-5 text-accent flex-shrink-0 mt-0.5" />
                      <span>Métricas de interacción detalladas</span>
                    </li>
                  </ul>
                  <p className="mt-6 text-sm text-muted-foreground">
                    Perfecto para marcas que buscan conexión auténtica con la audiencia.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Audience Stats */}
        <section className="bg-muted py-16">
          <div className="container mx-auto px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 2xl:px-24">
            <h2 className="font-serif text-3xl md:text-4xl font-bold mb-12 text-center">Nuestra Audiencia</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
              <Card>
                <CardContent className="p-6 text-center">
                  <p className="text-4xl font-bold text-accent mb-2">15 mil</p>
                  <p className="text-sm text-muted-foreground">Visitantes mensuales</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6 text-center">
                  <p className="text-4xl font-bold text-accent mb-2">75%</p>
                  <p className="text-sm text-muted-foreground">Profesionales del sector</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6 text-center">
                  <p className="text-4xl font-bold text-accent mb-2">3:45</p>
                  <p className="text-sm text-muted-foreground">Tiempo promedio de sesión</p>
                </CardContent>
              </Card>
            </div>
            <p className="text-center text-muted-foreground mt-8 max-w-2xl mx-auto">
              Nuestra audiencia está compuesta por arquitectos, diseñadores, constructores, desarrolladores inmobiliarios
              y estudiantes de arquitectura, todos ellos tomadores de decisión o influenciadores en sus campos.
            </p>
          </div>
        </section>

        {/* CTA Section */}
        <section className="container mx-auto px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 2xl:px-24 py-16">
          <div className="bg-accent text-accent-foreground p-12 md:p-16 text-center space-y-6 rounded-lg">
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-balance">
              ¿Listo para impulsar tu marca?
            </h2>
            <p className="text-lg max-w-2xl mx-auto leading-relaxed text-pretty">
              Nuestro equipo de publicidad está listo para ayudarte a diseñar la campaña perfecta para tus objetivos.
              Contáctanos hoy mismo para obtener una cotización personalizada.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <a
                href="mailto:publicidad@revistahabitat.com"
                className="inline-flex items-center gap-2 bg-accent-foreground text-accent px-6 py-3 font-medium hover:opacity-90 transition-opacity rounded-md"
              >
                <Mail className="h-5 w-5" />
                publicidad@revistahabitat.com
              </a>
            </div>
            <p className="text-sm opacity-90">Tiempo de respuesta promedio: 24 horas hábiles</p>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
