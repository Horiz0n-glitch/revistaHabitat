import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { RegisterForm } from "@/components/register-form"
import Link from "next/link"

export default function RegisterPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1 flex items-center justify-center py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-md mx-auto space-y-8">
            <div className="text-center space-y-2">
              <h1 className="font-serif text-3xl md:text-4xl font-bold">Crear Cuenta</h1>
              <p className="text-muted-foreground">Únete a la comunidad de Revista Habitat</p>
            </div>

            <RegisterForm />

            <div className="text-center text-sm">
              <span className="text-muted-foreground">¿Ya tienes cuenta? </span>
              <Link href="/login" className="text-accent hover:underline font-medium">
                Inicia sesión aquí
              </Link>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
