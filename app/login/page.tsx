import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { LoginForm } from "@/components/login-form"
import Link from "next/link"

export default function LoginPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1 flex items-center justify-center py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-md mx-auto space-y-8">
            <div className="text-center space-y-2">
              <h1 className="font-serif text-3xl md:text-4xl font-bold">Iniciar Sesión</h1>
              <p className="text-muted-foreground">Accede a tu cuenta de Revista Habitat</p>
            </div>

            <LoginForm />

            <div className="text-center text-sm">
              <span className="text-muted-foreground">¿No tienes cuenta? </span>
              <Link href="/registro" className="text-accent hover:underline font-medium">
                Regístrate aquí
              </Link>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
