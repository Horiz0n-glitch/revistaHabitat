import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Mail } from 'lucide-react'

export default function StaffPage() {
  const editorialTeam = [
    {
      title: "Director General",
      name: "Eduardo Leguizamón",
      email: "eleguizamon@revistahabitat.com",
    },
    {
      title: "Directora Editorial",
      name: "María Emilia Echezarreta",
      email: "cm.emiliaechezarreta@gmail.com",
    },
    {
      title: "Director Periodístico",
      name: "Arq, Alberto Alfaro",
      email: "alfaroarq@yahoo.com.ar",
    },
    {
      title: "Director Adjunto",
      name: "Dr. Oscar Andrés De Masi",
      email: "oademasi@gmail.com",
    },
    {
      title: "Editor Asistente",
      name: "Miriam Blas",
      email: "miriam.e.blas@revistahabitat.com",
    },
  ]

  const technicalTeam = [
    {
      title: "Editor Web",
      name: "Gonzalo Galeano",
      email: "gonzalo.galeano@revistahabitat.com",
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
      title: "Prensa y Redacción",
      email: "articulos@revistahabitat.com",
      isFullWidth: true, // Special flag for styling as a section title
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
      title: "Corresponsal Miami - Orlando - Florida - EEUU",
      name: "Arq. Jorge Puglisi",
      email: "jorgearielpuglisi@gmail.com",
    },
    {
      title: "Corresponsal Argentina",
      name: "Enrique Madia",
      email: "emadia@aol.com",
    },
    {
      title: "Corresponsal España",
      name: "Dr. Ing. Ignacio Yusim",
      email: "ingyusim@yahoo.com.ar",
    },
    {
      title: "Corresponsal Italia",
      name: "Lic. Sebastián Pacheco",
      email: "sebastian.pach@yahoo.com.ar",
    },
    {
      title: "Corresponsal Uruguay",
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

  // Combine all items into a single array for sequential grid rendering
  const allStaff = [
    ...editorialTeam,
    ...technicalTeam,
    ...sections,
    ...press,
    ...correspondents,
    ...contactSections
  ]

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />

      <main className="flex-1 container mx-auto px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 2xl:px-24 py-16 md:py-24">

        {/* Page Title */}
        <div className="flex justify-center mb-16 md:mb-24">
          <h1 className="font-serif text-4xl md:text-5xl font-bold">Quiénes somos</h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24">

          {/* Left Column: Description */}
          <div className="lg:col-span-7 space-y-8">
            <h2 className="font-serif text-3xl md:text-4xl font-normal leading-tight text-balance">
              Habitat es una revista de arquitectura especializada desde 1994 en publicar obras de conservación y patrimonio.
            </h2>

            <div className="space-y-6 text-lg text-muted-foreground leading-relaxed text-pretty font-light">
              <p>
                Nos dedicamos a todo aquello que para el ciudadano es su patrimonio, mostrando los procesos del antes, durante y después.
                Artículos realizados por los especialistas que intervienen en las obras, profesionales, maestros artesanos en las distintas disciplinas del restauro, la conservación y el mantenimiento.
              </p>
              <p>
                Se completa con obras de reciclaje, refuncionalización, completamiento, restauración, reposición de muebles, esculturas, pinturas, relojes, campanarios, faros y todo lo que requiere la puesta en valor de un bien patrimonial.
              </p>
              <p>
                Especialistas e instituciones escriben de historia y patrimonio, memoria, identidad, las huellas del pasado de cada comunidad que quedan plasmados a través de estos bienes materiales.
              </p>
              <p>
                Paralelamente coexiste la web revistahabitat.com con publicaciones de eventos, exposiciones, novedades, artículos, información de empresas. Un buen complemento del día a día.
              </p>
              <p className="border-l-4 border-black pl-4 italic text-foreground text-base">
                Noviembre de 2025. Habitat vuelve a ocupar su lugar cultural conseguido en estos años impulsando la web y dentro de la web tendrá su lugar como publicación digital, y en un futuro regresar con 2 ediciones en papel por año.
              </p>
            </div>
          </div>

          {/* Right Column: Staff List */}
          <div className="lg:col-span-5">
            <h3 className="font-bold text-xl mb-8 border-b border-black/10 pb-2">Nuestro equipo:</h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-8">
              {allStaff.map((member, i) => (
                <div key={i} className={`break-inside-avoid ${member.isFullWidth ? 'col-span-1 sm:col-span-2 pt-6 border-t border-black/10' : ''}`}>

                  {member.title && <p className="font-bold text-sm uppercase tracking-wide text-black mb-0.5">{member.title}</p>}
                  {member.name && <p className="text-base text-black mb-0.5">{member.name}</p>}
                  {member.email && (
                    <a href={`mailto:${member.email}`} className="text-sm text-neutral-500 hover:text-black hover:underline transition-colors block mt-0.5 break-all">
                      {member.email}
                    </a>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
