import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ArrowLeft, Construction } from "lucide-react"
import { getInterviewBySlug } from "@/lib/mock-data"
import { notFound } from "next/navigation"

export async function generateStaticParams() {
  return [] // Removed mock interviews for construction message
}

export default async function InterviewPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const interview = getInterviewBySlug(slug)

  if (!interview) {
    notFound()
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1">
        {/* Back Button */}
        <div className="container mx-auto px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 2xl:px-24 py-8">
          <Link href="/entrevistas">
            <Button variant="ghost" className="group">
              <ArrowLeft className="mr-2 h-4 w-4 group-hover:-translate-x-1 transition-transform" />
              Volver a entrevistas
            </Button>
          </Link>
        </div>

        {/* Construction Message */}
        <section className="container mx-auto px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 2xl:px-24 py-20">
          <div className="max-w-2xl mx-auto text-center space-y-8">
            <div className="flex justify-center">
              <div className="h-20 w-20 rounded-full bg-accent/10 flex items-center justify-center">
                <Construction className="h-10 w-10 text-accent" />
              </div>
            </div>

            <div className="space-y-4">
              <h2 className="font-serif text-3xl md:text-4xl font-bold">Contenido en Preparación</h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Esta entrevista está siendo migrada a nuestro nuevo sistema. Pronto estará disponible.
              </p>
            </div>

            <Button variant="outline" size="lg" className="group bg-transparent" asChild>
              <Link href="/">
                <ArrowLeft className="mr-2 h-4 w-4 group-hover:-translate-x-1 transition-transform" />
                Volver al inicio
              </Link>
            </Button>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
