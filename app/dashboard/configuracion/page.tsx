import { getCurrentUser } from "@/lib/mock-auth"
import { redirect } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ProfileForm } from "@/components/profile-form"
import { PasswordForm } from "@/components/password-form"

export default async function SettingsPage() {
  const userResult = await getCurrentUser()

  if (!userResult.success || !userResult.data) {
    redirect("/login")
  }

  const user = userResult.data

  return (
    <div className="space-y-8">
      <div className="space-y-2">
        <h1 className="font-serif text-3xl md:text-4xl font-bold">Configuración</h1>
        <p className="text-muted-foreground">Administra tu cuenta y preferencias</p>
      </div>

      <div className="space-y-6">
        {/* Profile Settings */}
        <Card>
          <CardHeader>
            <CardTitle>Información Personal</CardTitle>
            <CardDescription>Actualiza tu nombre y foto de perfil</CardDescription>
          </CardHeader>
          <CardContent>
            <ProfileForm profile={user} />
          </CardContent>
        </Card>

        {/* Password Settings */}
        <Card>
          <CardHeader>
            <CardTitle>Contraseña</CardTitle>
            <CardDescription>Cambia tu contraseña de acceso</CardDescription>
          </CardHeader>
          <CardContent>
            <PasswordForm />
          </CardContent>
        </Card>

        {/* Account Info */}
        <Card>
          <CardHeader>
            <CardTitle>Información de la Cuenta</CardTitle>
            <CardDescription>Detalles de tu cuenta</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-between py-3 border-b border-border">
              <span className="text-sm text-muted-foreground">Email</span>
              <span className="text-sm font-medium">{user.email}</span>
            </div>
            <div className="flex justify-between py-3 border-b border-border">
              <span className="text-sm text-muted-foreground">ID de Usuario</span>
              <span className="text-sm font-mono">{user.id.slice(0, 8)}...</span>
            </div>
            <div className="flex justify-between py-3">
              <span className="text-sm text-muted-foreground">Cuenta creada</span>
              <span className="text-sm font-medium">
                {new Date(user.date_created || "").toLocaleDateString("es-ES", {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                })}
              </span>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
