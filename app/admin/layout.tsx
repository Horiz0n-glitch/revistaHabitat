import type React from "react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import Link from "next/link"
import { LayoutDashboard, FileText, MessageSquare, BookOpen, Users } from "lucide-react"
import { Button } from "@/components/ui/button"
import { getCurrentUser } from "@/lib/mock-auth"
import { redirect } from "next/navigation"

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const userResult = await getCurrentUser()

  if (!userResult.success || !userResult.data) {
    redirect("/login")
  }

  const user = userResult.data

  // Check if user has admin/editor role
  if (!["admin", "editor"].includes(user.role)) {
    redirect("/")
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <div className="flex-1 container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Sidebar */}
          <aside className="md:col-span-1">
            <div className="space-y-2 sticky top-24">
              <div className="pb-4 mb-4 border-b border-border">
                <h2 className="font-serif text-xl font-bold">Panel Admin</h2>
              </div>

              <Link href="/admin">
                <Button variant="ghost" className="w-full justify-start">
                  <LayoutDashboard className="mr-2 h-4 w-4" />
                  Dashboard
                </Button>
              </Link>
              <Link href="/admin/articulos">
                <Button variant="ghost" className="w-full justify-start">
                  <FileText className="mr-2 h-4 w-4" />
                  Artículos
                </Button>
              </Link>
              <Link href="/admin/entrevistas">
                <Button variant="ghost" className="w-full justify-start">
                  <MessageSquare className="mr-2 h-4 w-4" />
                  Entrevistas
                </Button>
              </Link>
              <Link href="/admin/revistas">
                <Button variant="ghost" className="w-full justify-start">
                  <BookOpen className="mr-2 h-4 w-4" />
                  Revistas
                </Button>
              </Link>
              {user.role === "admin" && (
                <Link href="/admin/usuarios">
                  <Button variant="ghost" className="w-full justify-start">
                    <Users className="mr-2 h-4 w-4" />
                    Usuarios
                  </Button>
                </Link>
              )}
            </div>
          </aside>

          {/* Main Content */}
          <main className="md:col-span-3">{children}</main>
        </div>
      </div>

      <Footer />
    </div>
  )
}
