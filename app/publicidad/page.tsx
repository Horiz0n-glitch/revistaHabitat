import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Mail, Star, CheckCircle2, TrendingUp, Users, Eye } from 'lucide-react'

export default function PublicidadPage() {
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
                Conecta tu marca con una audiencia de profesionales y entusiastas del diseño, la arquitectura y la
                construcción. Ofrecemos formatos publicitarios premium con ubicaciones estratégicas para maximizar el
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

        {/* Pricing Table Section */}
        <section className="bg-muted py-16">
          <div className="container mx-auto px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 2xl:px-24">
            <div className="max-w-5xl mx-auto">
              <h2 className="font-serif text-3xl md:text-4xl font-bold mb-4 text-center">
                Formatos y Tarifas Publicitarias
              </h2>
              <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
                Elige el formato que mejor se adapte a tus objetivos de marketing. Todos los precios son mensuales y
                están expresados en pesos argentinos (ARS).
              </p>

              <div className="bg-white rounded-lg shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="bg-accent text-accent-foreground">
                        <th className="px-6 py-4 text-left font-semibold">Tipo de Anuncio</th>
                        <th className="px-6 py-4 text-left font-semibold">Dimensión</th>
                        <th className="px-6 py-4 text-left font-semibold">Descripción</th>
                        <th className="px-6 py-4 text-center font-semibold">Visibilidad</th>
                        <th className="px-6 py-4 text-right font-semibold">Precio Mensual</th>
                      </tr>
                    </thead>
                    <tbody>
                      {pricingTiers.map((tier, index) => (
                        <tr key={index} className="border-b border-gray-200 hover:bg-gray-50 transition-colors">
                          <td className="px-6 py-4 font-medium">{tier.type}</td>
                          <td className="px-6 py-4 text-sm text-muted-foreground whitespace-nowrap">{tier.dimension}</td>
                          <td className="px-6 py-4 text-sm text-muted-foreground max-w-xs">{tier.description}</td>
                          <td className="px-6 py-4">
                            <div className="flex items-center justify-center gap-0.5">
                              {[...Array(4)].map((_, i) => (
                                <Star
                                  key={i}
                                  className={`h-4 w-4 ${
                                    i < tier.visibility ? "fill-amber-400 text-amber-400" : "text-gray-300"
                                  }`}
                                />
                              ))}
                            </div>
                          </td>
                          <td className="px-6 py-4 text-right font-bold text-lg whitespace-nowrap">{tier.price}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              <div className="mt-8 bg-accent/5 p-6 rounded-lg">
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
