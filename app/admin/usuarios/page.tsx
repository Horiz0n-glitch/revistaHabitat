import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function AdminUsersPage() {
  const mockUsers = [
    {
      id: "1",
      email: "admin@habitat.com",
      first_name: "Admin",
      last_name: "Usuario",
      avatar: null,
      role: "admin",
      date_created: new Date().toISOString(),
    },
    {
      id: "2",
      email: "editor@habitat.com",
      first_name: "Editor",
      last_name: "Principal",
      avatar: null,
      role: "editor",
      date_created: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString(),
    },
  ]

  return (
    <div className="space-y-8">
      <div className="space-y-2">
        <h1 className="font-serif text-3xl md:text-4xl font-bold">Usuarios</h1>
        <p className="text-muted-foreground">Gestiona todos los usuarios registrados</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Lista de Usuarios</CardTitle>
          <CardDescription>Total de {mockUsers.length} usuarios registrados (datos de demostración)</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {mockUsers.map((user: any) => {
              const fullName =
                user.first_name && user.last_name ? `${user.first_name} ${user.last_name}` : user.first_name || ""
              const initials =
                fullName
                  ?.split(" ")
                  .map((n: string) => n[0])
                  .join("")
                  .toUpperCase() || user.email?.[0].toUpperCase()

              return (
                <div
                  key={user.id}
                  className="flex items-center justify-between py-4 border-b border-border last:border-0"
                >
                  <div className="flex items-center gap-4">
                    <Avatar>
                      <AvatarImage src={user.avatar || undefined} />
                      <AvatarFallback>{initials}</AvatarFallback>
                    </Avatar>
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <p className="font-medium">{fullName || "Sin nombre"}</p>
                        <Badge
                          variant={user.role === "admin" ? "default" : user.role === "editor" ? "secondary" : "outline"}
                        >
                          {user.role === "admin" ? "Admin" : user.role === "editor" ? "Editor" : "Usuario"}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">{user.email}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-muted-foreground">
                      Registrado el{" "}
                      {new Date(user.date_created).toLocaleDateString("es-ES", {
                        day: "numeric",
                        month: "short",
                        year: "numeric",
                      })}
                    </p>
                  </div>
                </div>
              )
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
