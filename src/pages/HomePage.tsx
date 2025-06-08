"use client"

import { useState } from "react"
import { useIsMobile } from "../hooks/use-media-query"
import { ResponsiveLayout } from "../components/layouts/responsive-layout"
import { Card, CardHeader, CardContent, CardTitle, CardDescription } from "../components/ui/card"
import {
  MobileCard,
  MobileCardHeader,
  MobileCardContent,
  MobileCardTitle,
  MobileCardDescription,
} from "../components/ui/mobile-card"
import { MobileStats } from "../components/ui/mobile-stats"
import { MobileChart } from "../components/charts/mobile-chart"
import { Button } from "../components/ui/button"
import { Input } from "../components/ui/input"
import { Badge } from "../components/ui/badge"
import { Progress } from "../components/ui/progress"
import { Avatar, AvatarFallback, AvatarImage } from "../components/ui/avatar"
import {
  Trophy,
  Users,
  DollarSign,
  TrendingUp,
  Award,
  Search,
  ChevronRight,
  Plus,
  Calendar,
  Package,
  Filter,
} from "lucide-react"

// Datos
const quickStats = [
  { title: "Atletas Activos", value: "156", icon: <Users className="h-4 w-4" />, color: "blue" as const },
  { title: "Competencias", value: "8", icon: <Trophy className="h-4 w-4" />, color: "green" as const },
  { title: "Medallas 2024", value: "59", icon: <Award className="h-4 w-4" />, color: "orange" as const },
  { title: "Presupuesto", value: "75%", icon: <DollarSign className="h-4 w-4" />, color: "purple" as const },
]

const medalsData = [
  { year: "2020", oro: 12, plata: 8, bronce: 15, value: 35 },
  { year: "2021", oro: 15, plata: 12, bronce: 10, value: 37 },
  { year: "2022", oro: 18, plata: 14, bronce: 12, value: 44 },
  { year: "2023", oro: 22, plata: 16, bronce: 14, value: 52 },
  { year: "2024", oro: 25, plata: 18, bronce: 16, value: 59 },
]

const competitionData = [
  { name: "Lista Larga", value: 45 },
  { name: "Lista Corta", value: 12 },
  { name: "Cupos", value: 8 },
]

const athletesData = [
  {
    id: 1,
    name: "María González",
    discipline: "Natación",
    lastResult: "1er lugar - Nacional",
    projection: 85,
    economicSupport: "$2,500",
    nextCompetition: "Panamericanos 2024",
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: 2,
    name: "Carlos Rodríguez",
    discipline: "Atletismo",
    lastResult: "2do lugar - Regional",
    projection: 72,
    economicSupport: "$1,800",
    nextCompetition: "Sudamericanos 2024",
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: 3,
    name: "Ana Martínez",
    discipline: "Gimnasia",
    lastResult: "3er lugar - Internacional",
    projection: 90,
    economicSupport: "$3,000",
    nextCompetition: "Mundial 2024",
    avatar: "/placeholder.svg?height=40&width=40",
  },
]

const budgetData = [
  { category: "Total Adjudicado", amount: 100000, percentage: 100 },
  { category: "Aprobado", amount: 75000, percentage: 75 },
  { category: "Ejecutado", amount: 45000, percentage: 45 },
]

const upcomingEvents = [
  { name: "Panamericanos 2024", date: "Oct 15", status: "Próximo" },
  { name: "Mundial Natación", date: "Nov 20", status: "Preparación" },
  { name: "Sudamericanos", date: "Dic 5", status: "Planificación" },
]

// Componente Mobile
function MobileHomepage() {
  const [searchTerm, setSearchTerm] = useState("")

  return (
    <div className="px-4 py-4 space-y-6">
      {/* Quick Stats */}
      <section>
        <div className="grid grid-cols-2 gap-3">
          {quickStats.map((stat, index) => (
            <MobileStats key={index} title={stat.title} value={stat.value} icon={stat.icon} color={stat.color} />
          ))}
        </div>
      </section>

      {/* Search Bar */}
      <section>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input
            placeholder="Buscar atletas, competencias..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 h-12 rounded-xl border-gray-200"
          />
        </div>
      </section>

      {/* Performance Chart */}
      <MobileCard>
        <MobileCardHeader>
          <div className="flex items-center justify-between">
            <div>
              <MobileCardTitle>Rendimiento 2024</MobileCardTitle>
              <MobileCardDescription>Total de medallas por año</MobileCardDescription>
            </div>
            <TrendingUp className="h-5 w-5 text-green-600" />
          </div>
        </MobileCardHeader>
        <MobileCardContent>
          <MobileChart type="bar" data={medalsData} height={180} />
        </MobileCardContent>
      </MobileCard>

      {/* Top Athletes */}
      <MobileCard>
        <MobileCardHeader>
          <div className="flex items-center justify-between">
            <MobileCardTitle>Atletas Destacados</MobileCardTitle>
            <Button variant="ghost" size="sm" className="text-orange-600 p-1">
              Ver todos
              <ChevronRight className="h-4 w-4 ml-1" />
            </Button>
          </div>
        </MobileCardHeader>
        <MobileCardContent>
          <div className="space-y-3">
            {athletesData.slice(0, 3).map((athlete) => (
              <div
                key={athlete.id}
                className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg active:bg-gray-100 transition-colors"
              >
                <Avatar className="h-10 w-10">
                  <AvatarImage src={athlete.avatar || "/placeholder.svg"} />
                  <AvatarFallback>
                    {athlete.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <h4 className="font-medium text-sm truncate">{athlete.name}</h4>
                    <div className="flex items-center space-x-1">
                      <span className="text-sm font-semibold text-green-600">{athlete.projection}%</span>
                      <TrendingUp className="h-3 w-3 text-green-600" />
                    </div>
                  </div>
                  <p className="text-xs text-gray-600">{athlete.discipline}</p>
                  <Progress value={athlete.projection} className="h-1 mt-1" />
                </div>
              </div>
            ))}
          </div>
        </MobileCardContent>
      </MobileCard>

      {/* Competition Distribution */}
      <MobileCard>
        <MobileCardHeader>
          <MobileCardTitle>Distribución de Competencias</MobileCardTitle>
          <MobileCardDescription>Panamericanos 2024</MobileCardDescription>
        </MobileCardHeader>
        <MobileCardContent>
          <MobileChart type="pie" data={competitionData} height={200} />
        </MobileCardContent>
      </MobileCard>

      {/* Upcoming Events */}
      <MobileCard>
        <MobileCardHeader>
          <div className="flex items-center justify-between">
            <MobileCardTitle>Próximos Eventos</MobileCardTitle>
            <Button variant="ghost" size="sm" className="p-1">
              <Plus className="h-4 w-4" />
            </Button>
          </div>
        </MobileCardHeader>
        <MobileCardContent>
          <div className="space-y-3">
            {upcomingEvents.map((event, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                  <div>
                    <h4 className="font-medium text-sm">{event.name}</h4>
                    <p className="text-xs text-gray-600">{event.date}</p>
                  </div>
                </div>
                <Badge variant="secondary" className="text-xs">
                  {event.status}
                </Badge>
              </div>
            ))}
          </div>
        </MobileCardContent>
      </MobileCard>

      {/* Quick Actions */}
      <section>
        <h3 className="text-lg font-semibold mb-3">Acciones Rápidas</h3>
        <div className="grid grid-cols-2 gap-3">
          <MobileCard onClick={() => {}} className="text-center">
            <div className="flex flex-col items-center space-y-2">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                <Users className="h-6 w-6 text-blue-600" />
              </div>
              <span className="text-sm font-medium">Nuevo Atleta</span>
            </div>
          </MobileCard>
          <MobileCard onClick={() => {}} className="text-center">
            <div className="flex flex-col items-center space-y-2">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                <Trophy className="h-6 w-6 text-green-600" />
              </div>
              <span className="text-sm font-medium">Nueva Competencia</span>
            </div>
          </MobileCard>
        </div>
      </section>
    </div>
  )
}

// Componente Desktop
function DesktopHomepage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedAthlete, setSelectedAthlete] = useState<number | null>(null)

  const filteredAthletes = athletesData.filter(
    (athlete) =>
      athlete.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      athlete.discipline.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  return (
    <div className="space-y-8">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {quickStats.map((stat, index) => (
          <Card key={index}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                  <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
                </div>
                <div className="p-3 bg-gray-50 rounded-full">{stat.icon}</div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Performance Chart */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="flex items-center gap-2">
                  <Trophy className="h-5 w-5 text-orange-600" />
                  Desempeño Histórico por Competencia
                </CardTitle>
                <CardDescription>Evolución de medallas obtenidas a lo largo del tiempo</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <MobileChart type="bar" data={medalsData} height={320} />
          </CardContent>
        </Card>

        {/* Competition Distribution */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="h-5 w-5 text-green-600" />
                  Competencias Futuras
                </CardTitle>
                <CardDescription>Gestión de listas de atletas para próximas competencias</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <MobileChart type="pie" data={competitionData} height={320} />
          </CardContent>
        </Card>
      </div>

      {/* Athletes Section */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5 text-blue-600" />
                Atletas
              </CardTitle>
              <CardDescription>Gestión y seguimiento de atletas</CardDescription>
            </div>
            <div className="flex items-center space-x-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Buscar atleta..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 w-64"
                />
              </div>
              <Button variant="outline" size="sm">
                <Filter className="h-4 w-4 mr-2" />
                Filtros
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredAthletes.map((athlete) => (
              <Card
                key={athlete.id}
                className="cursor-pointer hover:shadow-md transition-shadow"
                onClick={() => setSelectedAthlete(athlete.id)}
              >
                <CardContent className="p-4">
                  <div className="flex items-center space-x-3 mb-3">
                    <Avatar>
                      <AvatarImage src={athlete.avatar || "/placeholder.svg"} />
                      <AvatarFallback>
                        {athlete.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <h4 className="font-semibold">{athlete.name}</h4>
                      <p className="text-sm text-gray-600">{athlete.discipline}</p>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Último resultado:</span>
                      <Badge variant="secondary">{athlete.lastResult}</Badge>
                    </div>
                    <div className="space-y-1">
                      <div className="flex justify-between text-sm">
                        <span>Proyección:</span>
                        <span className="font-medium">{athlete.projection}%</span>
                      </div>
                      <Progress value={athlete.projection} className="h-2" />
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Estímulo económico:</span>
                      <span className="font-medium text-green-600">{athlete.economicSupport}</span>
                    </div>
                    <div className="text-xs text-gray-600">Próxima: {athlete.nextCompetition}</div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Budget and Logistics Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Budget */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="flex items-center gap-2">
                  <DollarSign className="h-5 w-5 text-green-600" />
                  Aportes Económicos
                </CardTitle>
                <CardDescription>Seguimiento de presupuestos por federación</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {budgetData.map((item, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex justify-between">
                    <span className="font-medium">{item.category}</span>
                    <span className="font-bold">${item.amount.toLocaleString()}</span>
                  </div>
                  <Progress value={item.percentage} className="h-3" />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Logistics */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Package className="h-5 w-5 text-purple-600" />
              Logística por Competencia
            </CardTitle>
            <CardDescription>Gestión de roles y tareas para competencias</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <h4 className="font-semibold">Roles Requeridos vs Asignados</h4>
              <div className="space-y-3">
                {[
                  { role: "Acompañante de misión", required: 3, assigned: 2 },
                  { role: "Utilero", required: 2, assigned: 2 },
                  { role: "Comprador de pasajes", required: 1, assigned: 1 },
                ].map((item, index) => (
                  <div key={index} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                    <span className="text-sm font-medium">{item.role}</span>
                    <Badge variant={item.assigned === item.required ? "default" : "destructive"}>
                      {item.assigned}/{item.required}
                    </Badge>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Modal para detalles de atleta */}
      {selectedAthlete && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Ficha Técnica - Prospect One</CardTitle>
                <Button variant="ghost" size="sm" onClick={() => setSelectedAthlete(null)}>
                  ✕
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="flex items-center space-x-4">
                  <Avatar className="h-16 w-16">
                    <AvatarImage src="/placeholder.svg?height=64&width=64" />
                    <AvatarFallback>MG</AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="text-xl font-bold">María González</h3>
                    <p className="text-gray-600">Natación - Estilo Libre</p>
                    <Badge className="mt-1">Categoría Senior</Badge>
                  </div>
                </div>

                <div className="h-64">
                  <h4 className="font-semibold mb-2">Evolución de Resultados</h4>
                  <MobileChart
                    type="line"
                    data={[
                      { month: "Ene", score: 75 },
                      { month: "Feb", score: 78 },
                      { month: "Mar", score: 82 },
                      { month: "Abr", score: 85 },
                      { month: "May", score: 88 },
                    ]}
                    height={200}
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-semibold mb-2">Evaluaciones Recientes</h4>
                    <div className="space-y-2">
                      {[
                        { date: "15 May 2024", score: 88, event: "Nacional" },
                        { date: "20 Abr 2024", score: 85, event: "Regional" },
                        { date: "10 Mar 2024", score: 82, event: "Local" },
                      ].map((evaluation, index) => (
                        <div key={index} className="p-2 bg-gray-50 rounded cursor-pointer hover:bg-gray-100">
                          <div className="flex justify-between">
                            <span className="text-sm font-medium">{evaluation.event}</span>
                            <span className="text-sm font-bold text-green-600">{evaluation.score}%</span>
                          </div>
                          <div className="text-xs text-gray-600">{evaluation.date}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">Métricas Clave</h4>
                    <div className="space-y-3">
                      <div>
                        <div className="flex justify-between text-sm">
                          <span>Resistencia</span>
                          <span>92%</span>
                        </div>
                        <Progress value={92} className="h-2" />
                      </div>
                      <div>
                        <div className="flex justify-between text-sm">
                          <span>Técnica</span>
                          <span>88%</span>
                        </div>
                        <Progress value={88} className="h-2" />
                      </div>
                      <div>
                        <div className="flex justify-between text-sm">
                          <span>Velocidad</span>
                          <span>85%</span>
                        </div>
                        <Progress value={85} className="h-2" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
}

// Componente Principal
export default function HomePage() {
  const isMobile = useIsMobile()

  return <ResponsiveLayout title="AthleteIQ">{isMobile ? <MobileHomepage /> : <DesktopHomepage />}</ResponsiveLayout>
}
