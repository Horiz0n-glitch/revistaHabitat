import { Header } from "@/components/header"
import { Footer } from "@/components/footer"

export default function StaffPage() {
  const management = [
    { title: "Director General", name: "Eduardo Leguizamón", email: "eleguizamon@revistahabitat.com" },
    { title: "Directora Editorial", name: "María Emilia Echezarreta", email: "cm.emiliaechezarreta@gmail.com" },
    { title: "Director Periodístico", name: "Arq. Alberto Alfaro", email: "alfaroarq@yahoo.com.ar" },
    { title: "Director Adjunto", name: "Dr. Oscar Andrés De Masi", email: "oademasi@gmail.com" },
    { title: "Editor Asistente", name: "Miriam Blas", email: "miriam.e.blas@revistahabitat.com" },
    { title: "Editor Web", name: "Gonzalo Galeano", email: "gonzalo.galeano@revistahabitat.com" },
    { title: "Diseño Web", name: "Yosuan Damian Maciel", email: "yosuanmultineddu@gmail.com" },
    { title: "Diseño Gráfico", name: "Carla Juliana Vidal", email: "carlajulianavidal@gmail.com" },
    { title: "Sección Turismo Cultural", name: "Arq. Tito Gastaldi", email: "titogastaldi@revistahabitat.com" },
    { title: "Sección Capacitación", name: "Juan José López", email: "jjlopez@revistahabitat.com" },
  ]

  const pressAndRedaction = {
    title: "Prensa y Redacción",
    email: "articulos@revistahabitat.com",
    members: [
      { name: "Arq. Jorge Puglisi", email: "jorgearielpuglisi@gmail.com" },
      { name: "Eduardo López", email: "lopezedu@yahoo.com" },
    ]
  }

  const contactSections = [
    { title: "Publicidad", email: "publicidad@revistahabitat.com" },
    { title: "Suscripciones y distribución", email: "suscripciones@revistahabitat.com" },
  ]

  const representatives = {
    title: "REPRESENTANTES",
    groups: [
      { location: "San Juan", name: "Arq. Jorge Alberto Martín", email: "jmartin_1962@yahoo.com.ar" },
      { location: "Entre Rios", name: "Arq. Hugo Lezcano", email: "lhugar@hotmail.com" },
      { location: "Pcia. de Buenos Aires - La Plata", name: "Arq. Jorge Puglisi", email: "jorgearielpuglisi@gmail.com" },
    ]
  }

  const correspondents = {
    title: "CORRESPONSALES",
    groups: [
      { location: "Miami - Orlando - Florida - EEUU", name: "Arq. Jorge Puglisi", email: "jorgearielpuglisi@gmail.com" },
      { location: "Argentina", name: "Arq. Enrique Madia", email: "emadia@aol.com" },
      { location: "España", name: "Dr. Ing. Ignacio Yusim", email: "ingyusim@yahoo.com.ar" },
      { location: "Italia", name: "Lic. Sebastián Pacheco", email: "sebastianpach27@gmail.com" },
      { location: "Uruguay", name: "Arq. Eduardo Montemuiño", email: "arqtema@gmail.com" },
    ]
  }

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />

      <main className="flex-1 container mx-auto px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 2xl:px-24 py-16 md:py-24">

        {/* Page Title */}
        <div className="flex justify-center mb-16 md:mb-24">
          <h1 className="font-serif text-4xl md:text-5xl font-bold">Sobre nosotros</h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24">

          {/* Left Column: About Us Content */}
          <div className="lg:col-span-7">
            <h2 className="font-serif text-3xl md:text-4xl font-normal leading-tight text-balance mb-12">
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
              <p className="border-l-4 border-black pl-4 italic text-foreground text-base pt-2">
                Noviembre de 2025. Habitat vuelve a ocupar su lugar cultural conseguido en estos años impulsando la web y dentro de la web tendrá su lugar como publicación digital, y en un futuro regresar con 2 ediciones en papel por año.
              </p>
            </div>
          </div>

          {/* Right Column: Main Staff Section (Two columns) */}
          <div className="lg:col-span-5">
            <h3 className="font-bold text-xl mb-10 border-b border-black/10 pb-2">Nuestro equipo:</h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-10">
              {/* Management & Sections */}
              {management.map((member, i) => (
                <div key={i} className="flex flex-col">
                  <p className="font-bold text-[10px] uppercase tracking-wider text-neutral-500 mb-1">{member.title}</p>
                  {member.name && <p className="text-base text-black font-medium leading-snug">{member.name}</p>}
                  <a href={`mailto:${member.email}`} className="text-xs text-neutral-400 hover:text-black hover:underline transition-colors mt-0.5 break-all">
                    {member.email}
                  </a>
                </div>
              ))}

              {/* Press Header */}
              <div className="col-span-1 sm:col-span-2 pt-6 mt-2 border-t border-black/5">
                <p className="font-bold text-[10px] uppercase tracking-wider text-neutral-500 mb-1">{pressAndRedaction.title}</p>
                <a href={`mailto:${pressAndRedaction.email}`} className="text-sm text-black hover:underline font-medium break-all">
                  {pressAndRedaction.email}
                </a>
              </div>

              {/* Press Members */}
              {pressAndRedaction.members.map((member, i) => (
                <div key={i} className="flex flex-col">
                  <p className="text-base text-black font-medium leading-snug">{member.name}</p>
                  <a href={`mailto:${member.email}`} className="text-xs text-neutral-400 hover:text-black hover:underline transition-colors mt-0.5 break-all">
                    {member.email}
                  </a>
                </div>
              ))}

              {/* Contact Sections (Publicidad & Suscripciones) */}
              <div className="col-span-1 sm:col-span-2 pt-6 mt-2 border-t border-black/5">
                <p className="font-bold text-xs uppercase tracking-wider text-neutral-900 mb-6">Contacto Comercial</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                  {contactSections.map((section, i) => (
                    <div key={i} className="flex flex-col">
                      <p className="font-bold text-[10px] uppercase tracking-wider text-neutral-500 mb-1">{section.title}</p>
                      <a href={`mailto:${section.email}`} className="text-sm text-black hover:underline font-medium break-all">
                        {section.email}
                      </a>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section: Representatives (Full width) */}
        <div className="mt-20 pt-16 border-t border-black/10">
          <h3 className="font-serif text-2xl font-bold mb-10 text-center">{representatives.title}</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-4xl mx-auto">
            {representatives.groups.map((item, i) => (
              <div key={i} className="flex flex-col p-4 bg-neutral-50 rounded-lg hover:bg-neutral-100 transition-all duration-300 border border-neutral-100 italic">
                <p className="font-bold text-[11px] uppercase tracking-wider text-neutral-600 mb-2 not-italic">{item.location}</p>
                {item.name && <p className="text-base text-black font-serif mb-1 leading-tight">{item.name}</p>}
                <a href={`mailto:${item.email}`} className="text-[10px] text-neutral-500 hover:text-black hover:underline transition-colors mt-auto break-all not-italic">
                  {item.email}
                </a>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Section: Correspondents (Full width) */}
        <div className="mt-12 pt-12 border-t border-black/5">
          <h3 className="font-serif text-2xl font-bold mb-10 text-center">{correspondents.title}</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {correspondents.groups.map((item, i) => (
              <div key={i} className="flex flex-col p-4 bg-neutral-50 rounded-lg hover:bg-neutral-100 transition-all duration-300">
                <p className="font-bold text-[11px] uppercase tracking-wider text-neutral-600 mb-2">{item.location}</p>
                <p className="text-base text-black font-serif italic mb-1 leading-tight">{item.name}</p>
                <a href={`mailto:${item.email}`} className="text-[10px] text-neutral-500 hover:text-black hover:underline transition-colors mt-auto break-all">
                  {item.email}
                </a>
              </div>
            ))}
          </div>
        </div>

        {/* ALADI Logo Section */}
        <div className="mt-24 pt-12 flex justify-center">
          <div className="max-w-md w-full">
            <img
              src="/sello-aladi.jpg"
              alt="Sello de Respaldo ALADI - Asociación Latinoamericana de Diseño"
              className="w-full h-auto"
            />
          </div>
        </div>

      </main>

      <Footer />
    </div>
  )
}
