import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Mail } from 'lucide-react'
import { Card, CardContent } from "@/components/ui/card"

export default function StaffPage() {
  const editorialTeam = [
    {
      title: "Director General",
      name: "Eduardo Leguizamón",
      email: "eleguizamon@revistahabitat.com",
    },
    {
      title: "Directora Editorial",
      name: "Miriam Blas",
      email: "miriam.e.blas@revistahabitat.com",
    },
    {
      title: "Editor Web",
      name: "Gonzalo Galeano",
      email: "gonzalo.galeano@revistahabitat.com",
    },
    {
      title: "Director Periodístico",
      name: "Arq. Guillermo R. García",
      email: "arqguillermogarcia@gmail.com",
    },
    {
      title: "Diseño Web",
      name: "Yosuan Damian Maciel",
      email: "yosuanmultineddu@gmail.com",
    },
    {
      title: "Diseño Gráfico",
      name: "Carla Juliana Vidal",
      email: "carlajulianavidal@gmail.com",
    },
  ]

  const sections = [
    {
      title: "Sección Turismo Cultural",
      name: "Arq. Tito Gastaldi",
      email: "titogastaldi@revistahabitat.com",
    },
    {
      title: "Sección Capacitación",
      name: "Juan José López",
      email: "jjlopez@revistahabitat.com",
    },
  ]

  const press = [
    {
      name: "Prensa y Redacción",
      email: "articulos@revistahabitat.com",
      isMain: true,
    },
    {
      name: "Dr. Oscar De Masi",
      email: "oademasi@gmail.com",
    },
    {
      name: "Arq. Jorge Puglisi",
      email: "jorgearielpuglisi@gmail.com",
    },
    {
      name: "Eduardo López",
      email: "lopezedu@yahoo.com",
    },
  ]

  const correspondents = [
    {
      country: "Argentina / EEUU",
      name: "Enrique Madia",
      email: "emadia@aol.com",
    },
    {
      country: "España",
      name: "Dr. Ing. Ignacio Yusim",
      email: "ingyusim@yahoo.com.ar",
    },
    {
      country: "Italia",
      name: "Lic. Sebastián Pacheco",
      email: "sebastian.pach@yahoo.com.ar",
    },
    {
      country: "Uruguay",
      name: "Arq. Eduardo Montemuiño",
      email: "arqtema@gmail.com",
    },
  ]

  const contactSections = [
    {
      title: "Publicidad",
      email: "publicidad@revistahabitat.com",
    },
    {
      title: "Suscripciones y distribución",
      email: "suscripciones@revistahabitat.com",
    },
  ]

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-muted py-16 md:py-24">
          <div className="container mx-auto px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 2xl:px-24">
            <div className="max-w-4xl">
              <h1 className="font-serif text-4xl md:text-6xl font-bold mb-8 text-balance">Sobre Nosotros</h1>
              <div className="space-y-6 text-lg text-muted-foreground leading-relaxed text-pretty">
                <p>
                  Habitat es una revista de arquitectura especializada desde 1994 en publicar obras de conservación de
                  edificios, muebles, esculturas, pinturas, etc., de todo aquello que para el ciudadano es su
                  patrimonio. Mostrando los procesos, del antes, durante y después.
                </p>
                <p>
                  Artículos realizados por los especialistas que intervienen en las obras, profesionales, maestros
                  artesanos en las distintas disciplinas del restauro, la conservación y el mantenimiento. Se completa
                  con obras de reciclaje, refuncionalización, completamiento, restauración, reposición de muebles,
                  esculturas, pinturas, relojes, campanarios, faros y todo lo que requiere la puesta en valor de un bien
                  patrimonial.
                </p>
                <p>
                  Especialistas e instituciones escriben de historia y patrimonio, memoria, identidad, las huellas del
                  pasado de cada comunidad que quedan plasmados a través de estos bienes materiales.
                </p>
                <p>
                  Paralelamente coexiste la web revistahabitat.com con publicaciones de eventos, exposiciones,
                  novedades, artículos, información de empresas. Un buen complemento del día a día.
                </p>
                <p className="font-medium text-foreground">
                  Noviembre de 2025. Habitat vuelve a ocupar su lugar cultural conseguido en estos años impulsando la
                  web y dentro de la web tendrá su lugar como publicación digital, y en un futuro regresar con 2
                  ediciones en papel por año.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Editorial Team */}
        <section className="container mx-auto px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 2xl:px-24 py-16">
          <h2 className="font-serif text-3xl md:text-4xl font-bold mb-12">Equipo Editorial</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {editorialTeam.map((member, index) => (
              <Card key={index}>
                <CardContent className="p-6">
                  <p className="text-sm font-medium text-muted-foreground mb-2">{member.title}</p>
                  {member.name && <p className="font-serif text-xl font-bold mb-3">{member.name}</p>}
                  {member.email && (
                    <a
                      href={`mailto:${member.email}`}
                      className="text-sm text-accent hover:underline flex items-center gap-2"
                    >
                      <Mail className="h-4 w-4" />
                      {member.email}
                    </a>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Sections */}
        <section className="container mx-auto px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 2xl:px-24 py-16">
          <h2 className="font-serif text-3xl md:text-4xl font-bold mb-12">Secciones Especiales</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {sections.map((section, index) => (
              <Card key={index}>
                <CardContent className="p-6">
                  <p className="text-sm font-medium text-muted-foreground mb-2">{section.title}</p>
                  <p className="font-serif text-xl font-bold mb-3">{section.name}</p>
                  {section.email && (
                    <a
                      href={`mailto:${section.email}`}
                      className="text-sm text-accent hover:underline flex items-center gap-2"
                    >
                      <Mail className="h-4 w-4" />
                      {section.email}
                    </a>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Press and Writing */}
        <section className="container mx-auto px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 2xl:px-24 py-16">
          <h2 className="font-serif text-3xl md:text-4xl font-bold mb-12">Prensa y Redacción</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {press.map((member, index) => (
              <Card key={index} className={member.isMain ? "border-accent/50 bg-accent/5" : ""}>
                <CardContent className="p-6">
                  <p className="font-serif text-lg font-bold mb-3">{member.name}</p>
                  {member.email && (
                    <a
                      href={`mailto:${member.email}`}
                      className="text-sm text-accent hover:underline flex items-center gap-2"
                    >
                      <Mail className="h-4 w-4" />
                      {member.email}
                    </a>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Correspondents */}
        <section className="bg-muted py-16">
          <div className="container mx-auto px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 2xl:px-24">
            <h2 className="font-serif text-3xl md:text-4xl font-bold mb-12">Corresponsales</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {correspondents.map((correspondent, index) => (
                <Card key={index}>
                  <CardContent className="p-6">
                    <p className="text-sm font-medium text-muted-foreground mb-2">{correspondent.country}</p>
                    <p className="font-serif text-lg font-bold mb-3">{correspondent.name}</p>
                    {correspondent.email && (
                      <a
                        href={`mailto:${correspondent.email}`}
                        className="text-sm text-accent hover:underline flex items-center gap-2"
                      >
                        <Mail className="h-4 w-4" />
                        {correspondent.email}
                      </a>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <section className="container mx-auto px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 2xl:px-24 py-16">
          <h2 className="font-serif text-3xl md:text-4xl font-bold mb-12">Contacto</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {contactSections.map((section, index) => (
              <Card key={index}>
                <CardContent className="p-6">
                  <p className="font-serif text-xl font-bold mb-3">{section.title}</p>
                  <a
                    href={`mailto:${section.email}`}
                    className="text-sm text-accent hover:underline flex items-center gap-2"
                  >
                    <Mail className="h-4 w-4" />
                    {section.email}
                  </a>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Contact CTA */}
        <section className="container mx-auto px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 2xl:px-24 py-16">
          <div className="bg-accent text-accent-foreground p-12 md:p-16 text-center space-y-6">
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-balance">¿Tienes una historia que contar?</h2>
            <p className="text-lg max-w-2xl mx-auto leading-relaxed text-pretty">
              Nuestro equipo está siempre abierto a recibir propuestas de artículos, entrevistas y colaboraciones.
            </p>
            <a
              href="mailto:articulos@revistahabitat.com"
              className="inline-flex items-center gap-2 bg-accent-foreground text-accent px-6 py-3 font-medium hover:opacity-90 transition-opacity"
            >
              <Mail className="h-5 w-5" />
              Contáctanos
            </a>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
