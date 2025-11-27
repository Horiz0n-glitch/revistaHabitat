import type React from "react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import Link from "next/link"
import { User, Library, Settings, LogOut } from "lucide-react"
import { Button } from "@/components/ui/button"
import { redirect } from "next/navigation"
import { isAuthenticated } from "@/lib/directus/auth"
import { LogoutButton } from "@/components/logout-button"

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  // Check if user is authenticated
  const authenticated = await isAuthenticated()

  if (!authenticated) {
    redirect("/login")
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <div className="flex-1 container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Sidebar */}
          <aside className="md:col-span-1">
            <nav className="space-y-2 sticky top-24">
              <Link href="/dashboard">
                <Button variant="ghost" className="w-full justify-start">
                  <User className="mr-2 h-4 w-4" />
                  Mi Perfil
                </Button>
              </Link>
              <Link href="/dashboard/biblioteca">
                <Button variant="ghost" className="w-full justify-start">
                  <Library className="mr-2 h-4 w-4" />
                  Mi Biblioteca
                </Button>
              </Link>
              <Link href="/dashboard/configuracion">
                <Button variant="ghost" className="w-full justify-start">
                  <Settings className="mr-2 h-4 w-4" />
                  Configuración
                </Button>
              </Link>
              <div className="pt-4 border-t border-border">
                <LogoutButton />
              </div>
            </nav>
          </aside>

          {/* Main Content */}
          <main className="md:col-span-3">{children}</main>
        </div>
      </div>

      <Footer />
    </div>
  )
}
