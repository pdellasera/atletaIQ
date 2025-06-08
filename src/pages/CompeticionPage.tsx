"use client"

import { useState, useMemo } from "react"
import { useIsMobile } from "../hooks/use-media-query"
import { ResponsiveLayout } from "../components/layouts/responsive-layout"
import { Card, CardHeader, CardContent, CardTitle } from "../components/ui/card"
import { MobileCard, MobileCardHeader, MobileCardContent, MobileCardTitle } from "../components/ui/mobile-card"
import { Input } from "../components/ui/input"
import { Badge } from "../components/ui/badge"
import { Progress } from "../components/ui/progress"
import { Button } from "../components/ui/button"
import {
  Search,
  Filter,
  Calendar,
  MapPin,
  Users,
  DollarSign,
  Trophy,
  Medal,
  Clock,
  Globe,
  X,
  ChevronRight,
  Award,
  TrendingUp,
  CheckCircle,
  XCircle,
} from "lucide-react"

export interface Competition {
  id: number
  name: string
  type: "Nacional" | "Internacional" | "Regional" | "Local" | "Olímpico"
  status: "Próxima" | "En Curso" | "Finalizada" | "Cancelada"
  startDate: string
  endDate: string
  location: {
    city: string
    country: string
    venue: string
  }
  disciplines: string[]
  participants: {
    registered: number
    confirmed: number
    total: number
  }
  medals?: {
    gold: number
    silver: number
    bronze: number
  }
  budget: {
    allocated: number
    spent: number
    currency: string
  }
  description: string
  organizer: string
  website?: string
  logo?: string
  priority: "Alta" | "Media" | "Baja"
  logistics: {
    accommodation: boolean
    transport: boolean
    meals: boolean
    equipment: boolean
  }
  results?: {
    athlete: string
    discipline: string
    position: number
    result: string
    medal?: "gold" | "silver" | "bronze"
  }[]
  schedule?: {
    date: string
    time: string
    event: string
    venue: string
  }[]
}

export const competitions: Competition[] = [
  {
    id: 1,
    name: "Juegos Olímpicos París 2024",
    type: "Olímpico",
    status: "Finalizada",
    startDate: "2024-07-26",
    endDate: "2024-08-11",
    location: {
      city: "París",
      country: "Francia",
      venue: "Múltiples sedes olímpicas",
    },
    disciplines: ["Natación", "Atletismo", "Gimnasia", "Ciclismo", "Tenis"],
    participants: {
      registered: 45,
      confirmed: 42,
      total: 50,
    },
    medals: {
      gold: 3,
      silver: 5,
      bronze: 4,
    },
    budget: {
      allocated: 2500000,
      spent: 2350000,
      currency: "USD",
    },
    description:
      "Los Juegos Olímpicos de París 2024 representan la máxima competencia deportiva mundial. Nuestra delegación participó con 42 atletas en 5 disciplinas diferentes.",
    organizer: "Comité Olímpico Internacional",
    website: "https://paris2024.org",
    priority: "Alta",
    logistics: {
      accommodation: true,
      transport: true,
      meals: true,
      equipment: true,
    },
    results: [
      {
        athlete: "Laura García",
        discipline: "Natación",
        position: 2,
        result: "53.45s",
        medal: "silver",
      },
      {
        athlete: "Carlos Santos",
        discipline: "Atletismo",
        position: 3,
        result: "44.56s",
        medal: "bronze",
      },
      {
        athlete: "Ana Martinez",
        discipline: "Gimnasia",
        position: 1,
        result: "57.800 pts",
        medal: "gold",
      },
    ],
  },
  {
    id: 2,
    name: "Campeonato Mundial de Natación 2024",
    type: "Internacional",
    status: "Próxima",
    startDate: "2024-12-15",
    endDate: "2024-12-22",
    location: {
      city: "Doha",
      country: "Qatar",
      venue: "Aquatic Centre Doha",
    },
    disciplines: ["Natación"],
    participants: {
      registered: 8,
      confirmed: 6,
      total: 10,
    },
    budget: {
      allocated: 450000,
      spent: 125000,
      currency: "USD",
    },
    description:
      "Campeonato mundial de natación en piscina corta. Competencia clave para la preparación hacia los próximos Juegos Olímpicos.",
    organizer: "World Aquatics",
    website: "https://worldaquatics.com",
    priority: "Alta",
    logistics: {
      accommodation: true,
      transport: true,
      meals: true,
      equipment: false,
    },
    schedule: [
      {
        date: "2024-12-15",
        time: "09:00",
        event: "Ceremonia de Apertura",
        venue: "Aquatic Centre Doha",
      },
      {
        date: "2024-12-16",
        time: "18:00",
        event: "100m Libre Femenino",
        venue: "Piscina Principal",
      },
      {
        date: "2024-12-17",
        time: "19:30",
        event: "200m Espalda Masculino",
        venue: "Piscina Principal",
      },
    ],
  },
  {
    id: 3,
    name: "Juegos Panamericanos Santiago 2023",
    type: "Internacional",
    status: "Finalizada",
    startDate: "2023-10-20",
    endDate: "2023-11-05",
    location: {
      city: "Santiago",
      country: "Chile",
      venue: "Múltiples sedes",
    },
    disciplines: ["Natación", "Atletismo", "Gimnasia", "Ciclismo", "Tenis"],
    participants: {
      registered: 38,
      confirmed: 35,
      total: 40,
    },
    medals: {
      gold: 5,
      silver: 3,
      bronze: 7,
    },
    budget: {
      allocated: 1800000,
      spent: 1750000,
      currency: "USD",
    },
    description:
      "Los Juegos Panamericanos de Santiago 2023 fueron una excelente preparación para París 2024, con resultados destacados en múltiples disciplinas.",
    organizer: "Panam Sports",
    priority: "Alta",
    logistics: {
      accommodation: true,
      transport: true,
      meals: true,
      equipment: true,
    },
    results: [
      {
        athlete: "Juan Pérez",
        discipline: "Natación",
        position: 1,
        result: "1:56.23",
        medal: "gold",
      },
      {
        athlete: "Luis Rodríguez",
        discipline: "Gimnasia",
        position: 1,
        result: "86.200 pts",
        medal: "gold",
      },
    ],
  },
  {
    id: 4,
    name: "Copa del Mundo de Gimnasia 2024",
    type: "Internacional",
    status: "En Curso",
    startDate: "2024-11-01",
    endDate: "2024-11-03",
    location: {
      city: "Stuttgart",
      country: "Alemania",
      venue: "Porsche Arena",
    },
    disciplines: ["Gimnasia"],
    participants: {
      registered: 4,
      confirmed: 4,
      total: 5,
    },
    budget: {
      allocated: 180000,
      spent: 95000,
      currency: "USD",
    },
    description:
      "Copa del Mundo de Gimnasia Artística. Competencia importante para el ranking mundial y clasificación a futuras competencias.",
    organizer: "Federación Internacional de Gimnasia",
    priority: "Media",
    logistics: {
      accommodation: true,
      transport: true,
      meals: false,
      equipment: false,
    },
  },
  {
    id: 5,
    name: "Campeonato Nacional de Atletismo 2024",
    type: "Nacional",
    status: "Próxima",
    startDate: "2024-12-08",
    endDate: "2024-12-10",
    location: {
      city: "Ciudad de México",
      country: "México",
      venue: "Estadio Olímpico Universitario",
    },
    disciplines: ["Atletismo"],
    participants: {
      registered: 15,
      confirmed: 12,
      total: 18,
    },
    budget: {
      allocated: 85000,
      spent: 25000,
      currency: "USD",
    },
    description:
      "Campeonato nacional que servirá como clasificatorio para competencias internacionales del próximo año.",
    organizer: "Federación Mexicana de Atletismo",
    priority: "Media",
    logistics: {
      accommodation: false,
      transport: true,
      meals: false,
      equipment: false,
    },
  },
  {
    id: 6,
    name: "Diamond League Final 2024",
    type: "Internacional",
    status: "Finalizada",
    startDate: "2024-09-07",
    endDate: "2024-09-08",
    location: {
      city: "Eugene",
      country: "Estados Unidos",
      venue: "Hayward Field",
    },
    disciplines: ["Atletismo"],
    participants: {
      registered: 3,
      confirmed: 3,
      total: 3,
    },
    medals: {
      gold: 0,
      silver: 1,
      bronze: 0,
    },
    budget: {
      allocated: 120000,
      spent: 118000,
      currency: "USD",
    },
    description:
      "Final de la Diamond League 2024. Los mejores atletas del mundo compiten en la máxima competencia de atletismo.",
    organizer: "World Athletics",
    priority: "Alta",
    logistics: {
      accommodation: true,
      transport: true,
      meals: true,
      equipment: false,
    },
    results: [
      {
        athlete: "Carlos Santos",
        discipline: "Atletismo",
        position: 2,
        result: "44.32s",
        medal: "silver",
      },
    ],
  },
  {
    id: 7,
    name: "Campeonato Sudamericano de Ciclismo 2024",
    type: "Regional",
    status: "Cancelada",
    startDate: "2024-11-15",
    endDate: "2024-11-18",
    location: {
      city: "Medellín",
      country: "Colombia",
      venue: "Velódromo Alcides Nieto Patiño",
    },
    disciplines: ["Ciclismo"],
    participants: {
      registered: 6,
      confirmed: 0,
      total: 8,
    },
    budget: {
      allocated: 95000,
      spent: 15000,
      currency: "USD",
    },
    description:
      "Campeonato sudamericano de ciclismo de pista. Cancelado debido a problemas logísticos del organizador.",
    organizer: "Confederación Sudamericana de Ciclismo",
    priority: "Baja",
    logistics: {
      accommodation: false,
      transport: false,
      meals: false,
      equipment: false,
    },
  },
  {
    id: 8,
    name: "Open de Tenis Roland Garros 2024",
    type: "Internacional",
    status: "Finalizada",
    startDate: "2024-05-26",
    endDate: "2024-06-09",
    location: {
      city: "París",
      country: "Francia",
      venue: "Stade Roland Garros",
    },
    disciplines: ["Tenis"],
    participants: {
      registered: 2,
      confirmed: 2,
      total: 2,
    },
    budget: {
      allocated: 75000,
      spent: 72000,
      currency: "USD",
    },
    description: "Roland Garros 2024. Uno de los cuatro Grand Slam del tenis mundial, disputado en tierra batida.",
    organizer: "Federación Francesa de Tenis",
    priority: "Alta",
    logistics: {
      accommodation: true,
      transport: true,
      meals: false,
      equipment: false,
    },
    results: [
      {
        athlete: "David Gomez",
        discipline: "Tenis",
        position: 4,
        result: "Semifinal",
      },
    ],
  },
]

// Componente para mostrar las medallas de una competencia
function CompetitionMedals({ medals }: { medals?: Competition["medals"] }) {
  if (!medals) return <span className="text-sm text-gray-500">Sin resultados</span>

  const { gold, silver, bronze } = medals
  const total = gold + silver + bronze

  return (
    <div className="flex items-center space-x-3">
      <div className="flex items-center space-x-1">
        <div className="w-6 h-6 rounded-full bg-yellow-100 flex items-center justify-center">
          <span className="text-yellow-600 font-bold text-xs">{gold}</span>
        </div>
        <span className="text-xs text-gray-600">Oro</span>
      </div>
      <div className="flex items-center space-x-1">
        <div className="w-6 h-6 rounded-full bg-gray-100 flex items-center justify-center">
          <span className="text-gray-600 font-bold text-xs">{silver}</span>
        </div>
        <span className="text-xs text-gray-600">Plata</span>
      </div>
      <div className="flex items-center space-x-1">
        <div className="w-6 h-6 rounded-full bg-orange-100 flex items-center justify-center">
          <span className="text-orange-800 font-bold text-xs">{bronze}</span>
        </div>
        <span className="text-xs text-gray-600">Bronce</span>
      </div>
      <div className="flex items-center space-x-1">
        <div className="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center">
          <span className="text-blue-600 font-bold text-xs">{total}</span>
        </div>
        <span className="text-xs text-gray-600">Total</span>
      </div>
    </div>
  )
}

// Componente para mostrar el presupuesto
function CompetitionBudget({ budget }: { budget: Competition["budget"] }) {
  const percentage = (budget.spent / budget.allocated) * 100

  return (
    <div className="space-y-2">
      <div className="flex justify-between text-sm">
        <span className="text-gray-600">Presupuesto utilizado</span>
        <span className="font-medium">
          {budget.spent.toLocaleString()} / {budget.allocated.toLocaleString()} {budget.currency}
        </span>
      </div>
      <Progress value={percentage} className="h-2" />
      <div className="text-xs text-gray-500">{percentage.toFixed(1)}% utilizado</div>
    </div>
  )
}

// Componente para mostrar los resultados de una competencia
function CompetitionResults({ results }: { results?: Competition["results"] }) {
  if (!results || results.length === 0) {
    return <div className="text-sm text-gray-500">Sin resultados disponibles</div>
  }

  return (
    <div className="space-y-3">
      {results.map((result, index) => (
        <div key={index} className="flex items-center justify-between p-3 border border-gray-100 rounded-lg">
          <div>
            <div className="font-medium text-sm">{result.athlete}</div>
            <div className="text-xs text-gray-600">{result.discipline}</div>
          </div>
          <div className="text-right flex items-center space-x-2">
            <div>
              <div className="font-medium text-sm">{result.result}</div>
              <div className="text-xs text-gray-600">Posición: {result.position}º</div>
            </div>
            {result.medal && (
              <div
                className={`w-6 h-6 rounded-full flex items-center justify-center ${
                  result.medal === "gold"
                    ? "bg-yellow-100"
                    : result.medal === "silver"
                      ? "bg-gray-100"
                      : "bg-orange-100"
                }`}
              >
                <Medal
                  className={`h-3 w-3 ${
                    result.medal === "gold"
                      ? "text-yellow-600"
                      : result.medal === "silver"
                        ? "text-gray-600"
                        : "text-orange-800"
                  }`}
                />
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  )
}

// Componente para mostrar el cronograma
function CompetitionSchedule({ schedule }: { schedule?: Competition["schedule"] }) {
  if (!schedule || schedule.length === 0) {
    return <div className="text-sm text-gray-500">Cronograma no disponible</div>
  }

  return (
    <div className="space-y-3">
      {schedule.map((item, index) => (
        <div key={index} className="flex items-center space-x-3 p-3 border border-gray-100 rounded-lg">
          <div className="flex flex-col items-center">
            <div className="text-xs text-gray-600">{item.date}</div>
            <div className="text-sm font-medium">{item.time}</div>
          </div>
          <div className="flex-1">
            <div className="font-medium text-sm">{item.event}</div>
            <div className="text-xs text-gray-600">{item.venue}</div>
          </div>
        </div>
      ))}
    </div>
  )
}

// Componente para mostrar el detalle de una competencia en móvil
function CompetitionDetailMobile({ competition, onClose }: { competition: Competition; onClose: () => void }) {
  const getStatusIcon = (status: Competition["status"]) => {
    switch (status) {
      case "Próxima":
        return <Clock className="h-4 w-4 text-blue-600" />
      case "En Curso":
        return <CheckCircle className="h-4 w-4 text-green-600" />
      case "Finalizada":
        return <Trophy className="h-4 w-4 text-orange-600" />
      case "Cancelada":
        return <XCircle className="h-4 w-4 text-red-600" />
    }
  }

  const getStatusColor = (status: Competition["status"]) => {
    switch (status) {
      case "Próxima":
        return "default"
      case "En Curso":
        return "default"
      case "Finalizada":
        return "secondary"
      case "Cancelada":
        return "destructive"
      default:
        return "secondary"
    }
  }

  return (
    <div className="fixed inset-0 bg-white z-50 overflow-y-auto pb-20">
      <div className="sticky top-0 bg-white border-b border-gray-200 p-4 flex items-center justify-between">
        <h2 className="text-lg font-bold">Detalle de Competencia</h2>
        <Button variant="ghost" size="sm" onClick={onClose} className="p-1">
          <X className="h-5 w-5" />
        </Button>
      </div>

      <div className="p-4 space-y-6">
        {/* Header con información básica */}
        <div className="space-y-3">
          <div>
            <h3 className="text-xl font-bold">{competition.name}</h3>
            <div className="flex items-center space-x-2 mt-1">
              <Badge
                variant={getStatusColor(competition.status)}
                className={competition.status === "En Curso" ? "bg-orange-600" : ""}
              >
                <div className="flex items-center space-x-1">
                  {getStatusIcon(competition.status)}
                  <span>{competition.status}</span>
                </div>
              </Badge>
              <Badge variant="outline">{competition.type}</Badge>
              <Badge variant="secondary">{competition.priority}</Badge>
            </div>
          </div>
        </div>

        {/* Información básica */}
        <MobileCard>
          <MobileCardHeader>
            <MobileCardTitle className="flex items-center space-x-2">
              <Calendar className="h-4 w-4" />
              <span>Información General</span>
            </MobileCardTitle>
          </MobileCardHeader>
          <MobileCardContent>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <div className="text-sm text-gray-600">Fecha de inicio</div>
                  <div className="font-medium">{competition.startDate}</div>
                </div>
                <div>
                  <div className="text-sm text-gray-600">Fecha de fin</div>
                  <div className="font-medium">{competition.endDate}</div>
                </div>
              </div>
              <div>
                <div className="text-sm text-gray-600">Ubicación</div>
                <div className="font-medium">
                  {competition.location.city}, {competition.location.country}
                </div>
                <div className="text-xs text-gray-500">{competition.location.venue}</div>
              </div>
              <div>
                <div className="text-sm text-gray-600">Organizador</div>
                <div className="font-medium">{competition.organizer}</div>
              </div>
            </div>
          </MobileCardContent>
        </MobileCard>

        {/* Descripción */}
        <MobileCard>
          <MobileCardHeader>
            <MobileCardTitle>Descripción</MobileCardTitle>
          </MobileCardHeader>
          <MobileCardContent>
            <p className="text-sm text-gray-700">{competition.description}</p>
          </MobileCardContent>
        </MobileCard>

        {/* Disciplinas */}
        <MobileCard>
          <MobileCardHeader>
            <MobileCardTitle>Disciplinas</MobileCardTitle>
          </MobileCardHeader>
          <MobileCardContent>
            <div className="flex flex-wrap gap-2">
              {competition.disciplines.map((discipline, index) => (
                <Badge key={index} variant="outline">
                  {discipline}
                </Badge>
              ))}
            </div>
          </MobileCardContent>
        </MobileCard>

        {/* Participantes */}
        <MobileCard>
          <MobileCardHeader>
            <MobileCardTitle className="flex items-center space-x-2">
              <Users className="h-4 w-4" />
              <span>Participantes</span>
            </MobileCardTitle>
          </MobileCardHeader>
          <MobileCardContent>
            <div className="grid grid-cols-3 gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600">{competition.participants.registered}</div>
                <div className="text-xs text-gray-600">Registrados</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600">{competition.participants.confirmed}</div>
                <div className="text-xs text-gray-600">Confirmados</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-600">{competition.participants.total}</div>
                <div className="text-xs text-gray-600">Total</div>
              </div>
            </div>
          </MobileCardContent>
        </MobileCard>

        {/* Presupuesto */}
        <MobileCard>
          <MobileCardHeader>
            <MobileCardTitle className="flex items-center space-x-2">
              <DollarSign className="h-4 w-4" />
              <span>Presupuesto</span>
            </MobileCardTitle>
          </MobileCardHeader>
          <MobileCardContent>
            <CompetitionBudget budget={competition.budget} />
          </MobileCardContent>
        </MobileCard>

        {/* Medallas (si existen) */}
        {competition.medals && (
          <MobileCard>
            <MobileCardHeader>
              <MobileCardTitle className="flex items-center space-x-2">
                <Medal className="h-4 w-4" />
                <span>Medallas Obtenidas</span>
              </MobileCardTitle>
            </MobileCardHeader>
            <MobileCardContent>
              <CompetitionMedals medals={competition.medals} />
            </MobileCardContent>
          </MobileCard>
        )}

        {/* Resultados */}
        {competition.results && (
          <MobileCard>
            <MobileCardHeader>
              <MobileCardTitle className="flex items-center space-x-2">
                <Award className="h-4 w-4" />
                <span>Resultados</span>
              </MobileCardTitle>
            </MobileCardHeader>
            <MobileCardContent>
              <CompetitionResults results={competition.results} />
            </MobileCardContent>
          </MobileCard>
        )}

        {/* Cronograma */}
        {competition.schedule && (
          <MobileCard>
            <MobileCardHeader>
              <MobileCardTitle className="flex items-center space-x-2">
                <Clock className="h-4 w-4" />
                <span>Cronograma</span>
              </MobileCardTitle>
            </MobileCardHeader>
            <MobileCardContent>
              <CompetitionSchedule schedule={competition.schedule} />
            </MobileCardContent>
          </MobileCard>
        )}

        {/* Logística */}
        <MobileCard>
          <MobileCardHeader>
            <MobileCardTitle>Logística</MobileCardTitle>
          </MobileCardHeader>
          <MobileCardContent>
            <div className="grid grid-cols-2 gap-3">
              <div className="flex items-center space-x-2">
                <div
                  className={`w-3 h-3 rounded-full ${competition.logistics.accommodation ? "bg-green-500" : "bg-red-500"}`}
                ></div>
                <span className="text-sm">Alojamiento</span>
              </div>
              <div className="flex items-center space-x-2">
                <div
                  className={`w-3 h-3 rounded-full ${competition.logistics.transport ? "bg-green-500" : "bg-red-500"}`}
                ></div>
                <span className="text-sm">Transporte</span>
              </div>
              <div className="flex items-center space-x-2">
                <div
                  className={`w-3 h-3 rounded-full ${competition.logistics.meals ? "bg-green-500" : "bg-red-500"}`}
                ></div>
                <span className="text-sm">Alimentación</span>
              </div>
              <div className="flex items-center space-x-2">
                <div
                  className={`w-3 h-3 rounded-full ${competition.logistics.equipment ? "bg-green-500" : "bg-red-500"}`}
                ></div>
                <span className="text-sm">Equipamiento</span>
              </div>
            </div>
          </MobileCardContent>
        </MobileCard>
      </div>
    </div>
  )
}

// Componente para mostrar el detalle de una competencia en desktop
function CompetitionDetailDesktop({ competition }: { competition: Competition }) {
  const getStatusIcon = (status: Competition["status"]) => {
    switch (status) {
      case "Próxima":
        return <Clock className="h-5 w-5 text-blue-600" />
      case "En Curso":
        return <CheckCircle className="h-5 w-5 text-green-600" />
      case "Finalizada":
        return <Trophy className="h-5 w-5 text-orange-600" />
      case "Cancelada":
        return <XCircle className="h-5 w-5 text-red-600" />
    }
  }

  const getStatusColor = (status: Competition["status"]) => {
    switch (status) {
      case "Próxima":
        return "default"
      case "En Curso":
        return "default"
      case "Finalizada":
        return "secondary"
      case "Cancelada":
        return "destructive"
      default:
        return "secondary"
    }
  }

  return (
    <div className="space-y-6">
      {/* Header con información básica */}
      <Card>
        <CardContent className="p-6">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold">{competition.name}</h2>
                <div className="flex items-center space-x-3 mt-2">
                  <Badge
                    variant={getStatusColor(competition.status)}
                    className={competition.status === "En Curso" ? "bg-orange-600" : ""}
                  >
                    <div className="flex items-center space-x-1">
                      {getStatusIcon(competition.status)}
                      <span>{competition.status}</span>
                    </div>
                  </Badge>
                  <Badge variant="outline">{competition.type}</Badge>
                  <Badge variant="secondary">{competition.priority}</Badge>
                </div>
              </div>
              {competition.medals && <CompetitionMedals medals={competition.medals} />}
            </div>
            <div className="grid grid-cols-4 gap-4">
              <div className="flex items-center space-x-2">
                <Calendar className="h-4 w-4 text-gray-500" />
                <span className="text-sm">
                  {competition.startDate} - {competition.endDate}
                </span>
              </div>
              <div className="flex items-center space-x-2">
                <MapPin className="h-4 w-4 text-gray-500" />
                <span className="text-sm">
                  {competition.location.city}, {competition.location.country}
                </span>
              </div>
              <div className="flex items-center space-x-2">
                <Users className="h-4 w-4 text-gray-500" />
                <span className="text-sm">{competition.participants.confirmed} atletas confirmados</span>
              </div>
              <div className="flex items-center space-x-2">
                <Globe className="h-4 w-4 text-gray-500" />
                <span className="text-sm">{competition.organizer}</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Contenido principal en dos columnas */}
      <div className="grid grid-cols-3 gap-6">
        {/* Columna izquierda */}
        <div className="space-y-6">
          {/* Participantes */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Users className="h-5 w-5" />
                <span>Participantes</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-1 gap-3">
                  <div className="text-center p-3 border border-gray-100 rounded-lg">
                    <div className="text-2xl font-bold text-blue-600">{competition.participants.registered}</div>
                    <div className="text-sm text-gray-600">Registrados</div>
                  </div>
                  <div className="text-center p-3 border border-gray-100 rounded-lg">
                    <div className="text-2xl font-bold text-green-600">{competition.participants.confirmed}</div>
                    <div className="text-sm text-gray-600">Confirmados</div>
                  </div>
                  <div className="text-center p-3 border border-gray-100 rounded-lg">
                    <div className="text-2xl font-bold text-gray-600">{competition.participants.total}</div>
                    <div className="text-sm text-gray-600">Total</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Presupuesto */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <DollarSign className="h-5 w-5" />
                <span>Presupuesto</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <CompetitionBudget budget={competition.budget} />
            </CardContent>
          </Card>

          {/* Logística */}
          <Card>
            <CardHeader>
              <CardTitle>Logística</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm">Alojamiento</span>
                  <div
                    className={`w-3 h-3 rounded-full ${competition.logistics.accommodation ? "bg-green-500" : "bg-red-500"}`}
                  ></div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Transporte</span>
                  <div
                    className={`w-3 h-3 rounded-full ${competition.logistics.transport ? "bg-green-500" : "bg-red-500"}`}
                  ></div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Alimentación</span>
                  <div
                    className={`w-3 h-3 rounded-full ${competition.logistics.meals ? "bg-green-500" : "bg-red-500"}`}
                  ></div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Equipamiento</span>
                  <div
                    className={`w-3 h-3 rounded-full ${competition.logistics.equipment ? "bg-green-500" : "bg-red-500"}`}
                  ></div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Columna central y derecha */}
        <div className="col-span-2 space-y-6">
          {/* Descripción */}
          <Card>
            <CardHeader>
              <CardTitle>Descripción</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700">{competition.description}</p>
              <div className="mt-4">
                <div className="text-sm text-gray-600 mb-2">Disciplinas:</div>
                <div className="flex flex-wrap gap-2">
                  {competition.disciplines.map((discipline, index) => (
                    <Badge key={index} variant="outline">
                      {discipline}
                    </Badge>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Resultados */}
          {competition.results && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Award className="h-5 w-5" />
                  <span>Resultados</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CompetitionResults results={competition.results} />
              </CardContent>
            </Card>
          )}

          {/* Cronograma */}
          {competition.schedule && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Clock className="h-5 w-5" />
                  <span>Cronograma</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CompetitionSchedule schedule={competition.schedule} />
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  )
}

// Componente Mobile
function MobileCompetitions() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedStatus, setSelectedStatus] = useState<string | null>(null)
  const [selectedType, setSelectedType] = useState<string | null>(null)
  const [selectedCompetition, setSelectedCompetition] = useState<Competition | null>(null)
  const [showFilters, setShowFilters] = useState(false)

  // Obtener tipos únicos para el filtro
  const types = useMemo(() => {
    const uniqueTypes = new Set(competitions.map((competition) => competition.type))
    return Array.from(uniqueTypes)
  }, [])

  // Filtrar competencias
  const filteredCompetitions = useMemo(() => {
    return competitions.filter((competition) => {
      // Filtro por búsqueda
      const matchesSearch =
        competition.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        competition.location.city.toLowerCase().includes(searchTerm.toLowerCase()) ||
        competition.location.country.toLowerCase().includes(searchTerm.toLowerCase()) ||
        competition.disciplines.some((d) => d.toLowerCase().includes(searchTerm.toLowerCase()))

      // Filtro por estado
      const matchesStatus = selectedStatus ? competition.status === selectedStatus : true

      // Filtro por tipo
      const matchesType = selectedType ? competition.type === selectedType : true

      return matchesSearch && matchesStatus && matchesType
    })
  }, [searchTerm, selectedStatus, selectedType])

  const getStatusIcon = (status: Competition["status"]) => {
    switch (status) {
      case "Próxima":
        return <Clock className="h-3 w-3 text-blue-600" />
      case "En Curso":
        return <CheckCircle className="h-3 w-3 text-green-600" />
      case "Finalizada":
        return <Trophy className="h-3 w-3 text-orange-600" />
      case "Cancelada":
        return <XCircle className="h-3 w-3 text-red-600" />
    }
  }

  return (
    <div className="px-4 py-4 space-y-6">
      {/* Barra de búsqueda */}
      <div className="flex items-center space-x-2">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input
            placeholder="Buscar competencias..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 h-12 rounded-lg border-gray-200 bg-white"
          />
        </div>
        <Button
          variant="outline"
          size="sm"
          onClick={() => setShowFilters(!showFilters)}
          className="h-12 px-3 flex items-center space-x-1"
        >
          <Filter className="h-4 w-4" />
          <span>Filtros</span>
          {(selectedStatus || selectedType) && (
            <Badge className="ml-1 bg-orange-600">{(selectedStatus ? 1 : 0) + (selectedType ? 1 : 0)}</Badge>
          )}
        </Button>
      </div>

      {/* Filtros */}
      {showFilters && (
        <MobileCard>
          <MobileCardContent className="p-4">
            <div className="space-y-4">
              <div>
                <h3 className="text-sm font-medium mb-2">Estado</h3>
                <div className="flex flex-wrap gap-2">
                  {["Próxima", "En Curso", "Finalizada", "Cancelada"].map((status) => (
                    <Badge
                      key={status}
                      variant={selectedStatus === status ? "default" : "secondary"}
                      className={`cursor-pointer ${selectedStatus === status ? "bg-orange-600" : ""}`}
                      onClick={() => setSelectedStatus(selectedStatus === status ? null : status)}
                    >
                      {status}
                    </Badge>
                  ))}
                </div>
              </div>
              <div>
                <h3 className="text-sm font-medium mb-2">Tipo</h3>
                <div className="flex flex-wrap gap-2">
                  {types.map((type) => (
                    <Badge
                      key={type}
                      variant={selectedType === type ? "default" : "secondary"}
                      className={`cursor-pointer ${selectedType === type ? "bg-orange-600" : ""}`}
                      onClick={() => setSelectedType(selectedType === type ? null : type)}
                    >
                      {type}
                    </Badge>
                  ))}
                </div>
              </div>
              <div className="flex justify-end">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => {
                    setSelectedStatus(null)
                    setSelectedType(null)
                  }}
                >
                  Limpiar filtros
                </Button>
              </div>
            </div>
          </MobileCardContent>
        </MobileCard>
      )}

      {/* Resultados */}
      <div>
        <div className="flex justify-between items-center mb-3">
          <h2 className="text-lg font-semibold">Competencias ({filteredCompetitions.length})</h2>
          <span className="text-sm text-gray-600">
            {selectedStatus || selectedType
              ? `Filtrado por ${selectedStatus ? `estado: ${selectedStatus}` : ""}${
                  selectedStatus && selectedType ? ", " : ""
                }${selectedType ? `tipo: ${selectedType}` : ""}`
              : "Mostrando todas"}
          </span>
        </div>

        <div className="space-y-4">
          {filteredCompetitions.map((competition) => (
            <MobileCard
              key={competition.id}
              className="active:scale-[0.98] transition-transform"
              onClick={() => setSelectedCompetition(competition)}
            >
              <MobileCardContent className="p-4">
                <div className="space-y-3">
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <h3 className="font-medium text-gray-900">{competition.name}</h3>
                      <div className="text-xs text-gray-600 flex items-center space-x-1 mt-1">
                        <MapPin className="h-3 w-3" />
                        <span>
                          {competition.location.city}, {competition.location.country}
                        </span>
                      </div>
                    </div>
                    <ChevronRight className="h-5 w-5 text-gray-400" />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Badge variant="outline" className="text-xs">
                        {competition.type}
                      </Badge>
                      <div className="flex items-center space-x-1">
                        {getStatusIcon(competition.status)}
                        <span className="text-xs text-gray-600">{competition.status}</span>
                      </div>
                    </div>
                    <div className="text-xs text-gray-600">{competition.startDate}</div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="flex items-center space-x-1">
                        <Users className="h-3 w-3 text-gray-500" />
                        <span className="text-xs text-gray-600">{competition.participants.confirmed}</span>
                      </div>
                      {competition.medals && (
                        <div className="flex items-center space-x-1">
                          <Medal className="h-3 w-3 text-yellow-600" />
                          <span className="text-xs font-medium">
                            {competition.medals.gold + competition.medals.silver + competition.medals.bronze}
                          </span>
                        </div>
                      )}
                    </div>
                    <Badge variant="secondary" className="text-xs">
                      {competition.priority}
                    </Badge>
                  </div>
                </div>
              </MobileCardContent>
            </MobileCard>
          ))}

          {filteredCompetitions.length === 0 && (
            <div className="text-center py-8">
              <div className="text-gray-400 mb-2">No se encontraron competencias</div>
              <div className="text-sm text-gray-500">Intenta con otros filtros</div>
            </div>
          )}
        </div>
      </div>

      {/* Detalle de la competencia (modal) */}
      {selectedCompetition && (
        <CompetitionDetailMobile competition={selectedCompetition} onClose={() => setSelectedCompetition(null)} />
      )}
    </div>
  )
}

// Componente Desktop
function DesktopCompetitions() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedStatus, setSelectedStatus] = useState<string | null>(null)
  const [selectedType, setSelectedType] = useState<string | null>(null)
  const [selectedCompetition, setSelectedCompetition] = useState<Competition | null>(competitions[0])

  // Obtener tipos únicos para el filtro
  const types = useMemo(() => {
    const uniqueTypes = new Set(competitions.map((competition) => competition.type))
    return Array.from(uniqueTypes)
  }, [])

  // Filtrar competencias
  const filteredCompetitions = useMemo(() => {
    return competitions.filter((competition) => {
      // Filtro por búsqueda
      const matchesSearch =
        competition.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        competition.location.city.toLowerCase().includes(searchTerm.toLowerCase()) ||
        competition.location.country.toLowerCase().includes(searchTerm.toLowerCase()) ||
        competition.disciplines.some((d) => d.toLowerCase().includes(searchTerm.toLowerCase()))

      // Filtro por estado
      const matchesStatus = selectedStatus ? competition.status === selectedStatus : true

      // Filtro por tipo
      const matchesType = selectedType ? competition.type === selectedType : true

      return matchesSearch && matchesStatus && matchesType
    })
  }, [searchTerm, selectedStatus, selectedType])

  const getStatusIcon = (status: Competition["status"]) => {
    switch (status) {
      case "Próxima":
        return <Clock className="h-4 w-4 text-blue-600" />
      case "En Curso":
        return <CheckCircle className="h-4 w-4 text-green-600" />
      case "Finalizada":
        return <Trophy className="h-4 w-4 text-orange-600" />
      case "Cancelada":
        return <XCircle className="h-4 w-4 text-red-600" />
    }
  }

  // Estadísticas generales
  const stats = useMemo(() => {
    const totalCompetitions = competitions.length
    const activeCompetitions = competitions.filter((c) => c.status === "Próxima" || c.status === "En Curso").length
    const totalMedals = competitions.reduce((total, comp) => {
      if (comp.medals) {
        return total + comp.medals.gold + comp.medals.silver + comp.medals.bronze
      }
      return total
    }, 0)
    const totalBudget = competitions.reduce((total, comp) => total + comp.budget.allocated, 0)

    return {
      totalCompetitions,
      activeCompetitions,
      totalMedals,
      totalBudget,
    }
  }, [])

  return (
    <div className="space-y-6">
      {/* Header con estadísticas */}
      <div className="grid grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Competencias</p>
                <p className="text-3xl font-bold text-gray-900 mt-1">{stats.totalCompetitions}</p>
              </div>
              <div className="p-3 bg-gray-50 rounded-lg">
                <Trophy className="h-5 w-5 text-gray-700" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Competencias Activas</p>
                <p className="text-3xl font-bold text-gray-900 mt-1">{stats.activeCompetitions}</p>
              </div>
              <div className="p-3 bg-gray-50 rounded-lg">
                <TrendingUp className="h-5 w-5 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Medallas</p>
                <p className="text-3xl font-bold text-gray-900 mt-1">{stats.totalMedals}</p>
              </div>
              <div className="p-3 bg-gray-50 rounded-lg">
                <Medal className="h-5 w-5 text-yellow-600" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Presupuesto Total</p>
                <p className="text-3xl font-bold text-gray-900 mt-1">${(stats.totalBudget / 1000000).toFixed(1)}M</p>
              </div>
              <div className="p-3 bg-gray-50 rounded-lg">
                <DollarSign className="h-5 w-5 text-orange-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Contenido principal en dos columnas */}
      <div className="grid grid-cols-12 gap-6">
        {/* Lista de competencias */}
        <div className="col-span-4">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Competencias</CardTitle>
                <div className="flex items-center space-x-2">
                  <span className="text-sm text-gray-600">
                    {filteredCompetitions.length} de {competitions.length}
                  </span>
                </div>
              </div>
              <div className="mt-2">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    placeholder="Buscar competencias..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 border-gray-200 bg-white"
                  />
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex flex-wrap gap-2">
                  <div className="mr-2 text-sm font-medium text-gray-700">Estado:</div>
                  {["Próxima", "En Curso", "Finalizada", "Cancelada"].map((status) => (
                    <Badge
                      key={status}
                      variant={selectedStatus === status ? "default" : "secondary"}
                      className={`cursor-pointer ${selectedStatus === status ? "bg-orange-600" : ""}`}
                      onClick={() => setSelectedStatus(selectedStatus === status ? null : status)}
                    >
                      {status}
                    </Badge>
                  ))}
                </div>
                <div className="flex flex-wrap gap-2">
                  <div className="mr-2 text-sm font-medium text-gray-700">Tipo:</div>
                  {types.map((type) => (
                    <Badge
                      key={type}
                      variant={selectedType === type ? "default" : "secondary"}
                      className={`cursor-pointer ${selectedType === type ? "bg-orange-600" : ""}`}
                      onClick={() => setSelectedType(selectedType === type ? null : type)}
                    >
                      {type}
                    </Badge>
                  ))}
                </div>
                <div className="border-t border-gray-200 pt-4 mt-4">
                  <div className="space-y-1">
                    {filteredCompetitions.map((competition) => (
                      <div
                        key={competition.id}
                        className={`flex items-center p-3 rounded-lg cursor-pointer hover:bg-gray-50 ${
                          selectedCompetition?.id === competition.id ? "bg-orange-50 border border-orange-200" : ""
                        }`}
                        onClick={() => setSelectedCompetition(competition)}
                      >
                        <div className="flex-1">
                          <div className="flex justify-between items-start mb-1">
                            <h3 className="font-medium text-gray-900 text-sm">{competition.name}</h3>
                            <div className="flex items-center space-x-1">{getStatusIcon(competition.status)}</div>
                          </div>
                          <div className="text-xs text-gray-600 flex items-center space-x-1">
                            <MapPin className="h-3 w-3" />
                            <span>{competition.location.city}</span>
                            <span>•</span>
                            <span>{competition.startDate}</span>
                          </div>
                          <div className="flex items-center justify-between mt-2">
                            <Badge variant="outline" className="text-xs">
                              {competition.type}
                            </Badge>
                            <div className="flex items-center space-x-1">
                              <Users className="h-3 w-3 text-gray-500" />
                              <span className="text-xs text-gray-600">{competition.participants.confirmed}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}

                    {filteredCompetitions.length === 0 && (
                      <div className="text-center py-8">
                        <div className="text-gray-400 mb-2">No se encontraron competencias</div>
                        <div className="text-sm text-gray-500">Intenta con otros filtros</div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Detalle de la competencia */}
        <div className="col-span-8">
          {selectedCompetition && <CompetitionDetailDesktop competition={selectedCompetition} />}
        </div>
      </div>
    </div>
  )
}

// Componente Principal
export default function CompetitionsPage() {
  const isMobile = useIsMobile()

  return (
    <ResponsiveLayout title="Competencias" showSearch={false}>
      {isMobile ? <MobileCompetitions /> : <DesktopCompetitions />}
    </ResponsiveLayout>
  )
}
