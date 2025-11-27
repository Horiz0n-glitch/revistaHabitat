'use client'

import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Mail, Loader2 } from 'lucide-react'
import { useActionState } from "react"
import { sendContactEmail } from "@/app/actions/contact"
import { useEffect } from "react"
import { toast } from "sonner"

const initialState = {
  success: false,
  message: '',
  errors: {} as Record<string, string[]>
}

export default function ContactoPage() {
  const [state, action, isPending] = useActionState(sendContactEmail, initialState)

  useEffect(() => {
    if (state.message) {
      if (state.success) {
        toast.success(state.message)
        // Reset form if needed, though native form reset happens on navigation or manual reset
        const form = document.querySelector('form') as HTMLFormElement
        if (form) form.reset()
      } else {
        toast.error(state.message)
      }
    }
  }, [state])

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-muted py-16 md:py-24">
          <div className="container mx-auto px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 2xl:px-24">
            <div className="max-w-3xl">
              <h1 className="font-serif text-4xl md:text-6xl font-bold mb-6 text-balance">Contacto</h1>
              <p className="text-xl text-muted-foreground leading-relaxed text-pretty">
                Estamos aquí para escucharte. Envíanos tus consultas, sugerencias o propuestas de colaboración.
              </p>
            </div>
          </div>
        </section>

        {/* Contact Form & Info */}
        <section className="container mx-auto px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 2xl:px-24 py-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
            {/* Form */}
            <div>
              <h2 className="font-serif text-3xl font-bold mb-8">Envíanos un mensaje</h2>
              <form action={action} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="name">Nombre completo</Label>
                  <Input 
                    id="name" 
                    name="name" 
                    type="text" 
                    placeholder="Tu nombre" 
                    required 
                    aria-describedby="name-error"
                  />
                  {state.errors?.name && (
                    <p id="name-error" className="text-sm text-red-500">{state.errors.name[0]}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input 
                    id="email" 
                    name="email" 
                    type="email" 
                    placeholder="tu@email.com" 
                    required 
                    aria-describedby="email-error"
                  />
                  {state.errors?.email && (
                    <p id="email-error" className="text-sm text-red-500">{state.errors.email[0]}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone">Teléfono (opcional)</Label>
                  <Input id="phone" name="phone" type="tel" placeholder="+54 11 1234-5678" />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="subject">Asunto</Label>
                  <Input
                    id="subject"
                    name="subject"
                    type="text"
                    placeholder="¿Sobre qué quieres contactarnos?"
                    required
                    aria-describedby="subject-error"
                  />
                  {state.errors?.subject && (
                    <p id="subject-error" className="text-sm text-red-500">{state.errors.subject[0]}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="message">Mensaje</Label>
                  <Textarea
                    id="message"
                    name="message"
                    placeholder="Escribe tu mensaje aquí..."
                    className="min-h-32"
                    required
                    aria-describedby="message-error"
                  />
                  {state.errors?.message && (
                    <p id="message-error" className="text-sm text-red-500">{state.errors.message[0]}</p>
                  )}
                </div>

                <Button type="submit" size="lg" className="w-full md:w-auto" disabled={isPending}>
                  {isPending ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Enviando...
                    </>
                  ) : (
                    'Enviar mensaje'
                  )}
                </Button>
              </form>
            </div>

            {/* Contact Info */}
            <div>
              <h2 className="font-serif text-3xl font-bold mb-8">Información de contacto</h2>

              <div className="space-y-8">
                <div className="space-y-4">
                  <h3 className="font-serif text-xl font-bold">Contactos directos</h3>
                  <div className="space-y-3">
                    <div className="flex items-start gap-3">
                      <Mail className="h-5 w-5 text-accent mt-0.5" />
                      <div>
                        <p className="font-medium">Prensa y Redacción</p>
                        <a
                          href="mailto:articulos@revistahabitat.com"
                          className="text-muted-foreground hover:text-accent transition-colors"
                        >
                          articulos@revistahabitat.com
                        </a>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <Mail className="h-5 w-5 text-accent mt-0.5" />
                      <div>
                        <p className="font-medium">Publicidad</p>
                        <a
                          href="mailto:publicidad@revistahabitat.com"
                          className="text-muted-foreground hover:text-accent transition-colors"
                        >
                          publicidad@revistahabitat.com
                        </a>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <Mail className="h-5 w-5 text-accent mt-0.5" />
                      <div>
                        <p className="font-medium">Suscripciones y distribución</p>
                        <a
                          href="mailto:suscripciones@revistahabitat.com"
                          className="text-muted-foreground hover:text-accent transition-colors"
                        >
                          suscripciones@revistahabitat.com
                        </a>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="font-serif text-xl font-bold">Áreas de interés</h3>
                  <ul className="space-y-2 text-muted-foreground">
                    <li className="flex items-start gap-2">
                      <span className="text-accent mt-1">•</span>
                      <span>Propuestas editoriales y artículos</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-accent mt-1">•</span>
                      <span>Entrevistas y reportajes</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-accent mt-1">•</span>
                      <span>Oportunidades de publicidad</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-accent mt-1">•</span>
                      <span>Eventos y colaboraciones</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-accent mt-1">•</span>
                      <span>Suscripciones y distribución</span>
                    </li>
                  </ul>
                </div>

                <div className="bg-accent/5 p-6 rounded-lg space-y-3">
                  <h3 className="font-serif text-xl font-bold">Horario de atención</h3>
                  <p className="text-muted-foreground">Lunes a Viernes: 9:00 - 18:00 hs</p>
                  <p className="text-sm text-muted-foreground">Responderemos tu consulta a la brevedad posible</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="bg-muted py-16">
          <div className="container mx-auto px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 2xl:px-24">
            <div className="max-w-3xl mx-auto text-center space-y-6">
              <h2 className="font-serif text-3xl md:text-4xl font-bold text-balance">
                ¿Tienes un proyecto para compartir?
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed text-pretty">
                Si eres arquitecto, diseñador o profesional del sector y tienes un proyecto que crees que puede
                interesar a nuestros lectores, nos encantaría conocerlo.
              </p>
              <a
                href="mailto:articulos@revistahabitat.com"
                className="inline-flex items-center gap-2 bg-accent text-accent-foreground px-6 py-3 font-medium hover:opacity-90 transition-opacity rounded-md"
              >
                <Mail className="h-5 w-5" />
                Envíanos tu propuesta
              </a>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
