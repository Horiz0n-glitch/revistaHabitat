import { mockArticles, mockInterviews, mockMagazines } from "@/lib/mock-data"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { FileText, MessageSquare, BookOpen, Users, DollarSign, TrendingUp } from "lucide-react"

export default function AdminDashboardPage() {
  const articlesCount = mockArticles.length
  const interviewsCount = mockInterviews.length
  const magazinesCount = mockMagazines.length
  const usersCount = 42 // Mock user count
  const completedPurchasesCount = 15 // Mock purchases
  const totalRevenue = completedPurchasesCount * 15000 // Mock revenue in ARS

  return (
    <div className="space-y-8">
      <div className="space-y-2">
        <h1 className="font-serif text-3xl md:text-4xl font-bold">Dashboard</h1>
        <p className="text-muted-foreground">Resumen general de la plataforma</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Artículos</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{articlesCount}</div>
            <p className="text-xs text-muted-foreground">Total publicados</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Entrevistas</CardTitle>
            <MessageSquare className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{interviewsCount}</div>
            <p className="text-xs text-muted-foreground">Total publicadas</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Revistas</CardTitle>
            <BookOpen className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{magazinesCount}</div>
            <p className="text-xs text-muted-foreground">Ediciones disponibles</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Usuarios</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{usersCount}</div>
            <p className="text-xs text-muted-foreground">Registrados</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Ventas</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{completedPurchasesCount}</div>
            <p className="text-xs text-muted-foreground">Revistas vendidas</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Ingresos</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${totalRevenue.toLocaleString("es-AR")}</div>
            <p className="text-xs text-muted-foreground">Total generado (ARS)</p>
          </CardContent>
        </Card>
      </div>

      {/* Recent Purchases */}
      <Card>
        <CardHeader>
          <CardTitle>Compras Recientes</CardTitle>
          <CardDescription>Últimas transacciones realizadas</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground text-center py-8">
            Datos de compras disponibles en producción con Directus
          </p>
        </CardContent>
      </Card>
    </div>
  )
}
