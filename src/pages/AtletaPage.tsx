"use client"

import { useState, useMemo } from "react"
import { useIsMobile } from "../hooks/use-media-query"
import { ResponsiveLayout } from "../components/layouts/responsive-layout"
import { Card, CardHeader, CardContent, CardTitle } from "../components/ui/card"
import { MobileCard, MobileCardHeader, MobileCardContent, MobileCardTitle } from "../components/ui/mobile-card"
import { Input } from "../components/ui/input"
import { Badge } from "../components/ui/badge"
import { Progress } from "../components/ui/progress"
import { Avatar, AvatarFallback, AvatarImage } from "../components/ui/avatar"
import { Button } from "../components/ui/button"
import { Search, Filter, Medal, TrendingUp, Calendar, User, MapPin, Clock, Award, X, ChevronRight } from "lucide-react"
export interface Athlete {
  id: number
  name: string
  avatar: string
  discipline: string
  status: "Activo" | "Inactivo" | "Lesionado" | "Suspendido"
  age: number
  gender: "Masculino" | "Femenino"
  country: string
  medals: {
    gold: number
    silver: number
    bronze: number
  }
  personalBest: string
  nextCompetition?: string
  coach?: string
  federation: string
  ranking: number
  bio: string
  stats: {
    strength: number
    speed: number
    endurance: number
    technique: number
    mental: number
  }
  recentResults: {
    competition: string
    date: string
    position: number
    result: string
  }[]
  trainingCenter: string
  weight?: number
  height?: number
}

export const athletes: Athlete[] = [
  {
    id: 1,
    name: "Laura García",
    avatar: "/avatars/laura-garcia.png",
    discipline: "Natación",
    status: "Activo",
    age: 24,
    gender: "Femenino",
    country: "Panamá",
    medals: {
      gold: 3,
      silver: 2,
      bronze: 1,
    },
    personalBest: "100m Libre: 53.45s",
    nextCompetition: "Mundial 2024",
    coach: "Miguel Hernández",
    federation: "Federación Panameña de Natación",
    ranking: 3,
    bio: "Laura García es una nadadora especializada en estilo libre y mariposa. Ha representado a Panamá en múltiples competencias internacionales desde 2018.",
    stats: {
      strength: 85,
      speed: 92,
      endurance: 88,
      technique: 90,
      mental: 85,
    },
    recentResults: [
      {
        competition: "Panamericanos 2023",
        date: "2023-10-15",
        position: 1,
        result: "53.45s",
      },
      {
        competition: "Mundial 2023",
        date: "2023-07-22",
        position: 4,
        result: "53.89s",
      },
      {
        competition: "Olimpiadas París 2024",
        date: "2024-08-05",
        position: 2,
        result: "54.12s",
      },
    ],
    trainingCenter: "Centro Acuático Nacional de Panamá",
    weight: 62,
    height: 175,
  },
  {
    id: 2,
    name: "Carlos Santos",
    avatar: "/avatars/carlos-santos.png",
    discipline: "Atletismo",
    status: "Activo",
    age: 27,
    gender: "Masculino",
    country: "Panamá",
    medals: {
      gold: 2,
      silver: 4,
      bronze: 3,
    },
    personalBest: "400m: 44.32s",
    nextCompetition: "Mundial 2024",
    coach: "Roberto Méndez",
    federation: "Federación Panameña de Atletismo",
    ranking: 5,
    bio: "Carlos Santos es un atleta especializado en 400m planos. Ha sido medallista en múltiples competencias internacionales y actualmente se prepara para representar a Panamá.",
    stats: {
      strength: 88,
      speed: 94,
      endurance: 90,
      technique: 85,
      mental: 92,
    },
    recentResults: [
      {
        competition: "Mundial 2023",
        date: "2023-08-25",
        position: 3,
        result: "44.56s",
      },
      {
        competition: "Olimpiadas París 2024",
        date: "2024-08-10",
        position: 2,
        result: "44.32s",
      },
      {
        competition: "Panamericanos 2023",
        date: "2023-10-15",
        position: 1,
        result: "44.87s",
      },
    ],
    trainingCenter: "Centro de Alto Rendimiento de Panamá",
    weight: 75,
    height: 183,
  },
  {
    id: 3,
    name: "Ana Martínez",
    avatar: "/avatars/ana-martinez.png",
    discipline: "Gimnasia",
    status: "Activo",
    age: 19,
    gender: "Femenino",
    country: "Panamá",
    medals: {
      gold: 5,
      silver: 2,
      bronze: 1,
    },
    personalBest: "All-Around: 57.800 puntos",
    nextCompetition: "Mundial 2024",
    coach: "Claudia Fernández",
    federation: "Federación Panameña de Gimnasia",
    ranking: 2,
    bio: "Ana Martínez es una gimnasta artística especializada en barras asimétricas y suelo. Ha sido campeona panamericana y finalista mundial representando a Panamá.",
    stats: {
      strength: 86,
      speed: 88,
      endurance: 84,
      technique: 95,
      mental: 90,
    },
    recentResults: [
      {
        competition: "Mundial 2023",
        date: "2023-10-05",
        position: 2,
        result: "57.800 pts",
      },
      {
        competition: "Panamericanos 2023",
        date: "2023-07-18",
        position: 1,
        result: "57.650 pts",
      },
      {
        competition: "Olimpiadas París 2024",
        date: "2024-08-03",
        position: 3,
        result: "56.900 pts",
      },
    ],
    trainingCenter: "Centro Nacional de Gimnasia de Panamá",
    weight: 52,
    height: 158,
  },
  {
    id: 4,
    name: "Daniel López",
    avatar: "/avatars/daniel-lopez.jpg",
    discipline: "Ciclismo",
    status: "Lesionado",
    age: 29,
    gender: "Masculino",
    country: "Panamá",
    medals: {
      gold: 1,
      silver: 3,
      bronze: 2,
    },
    personalBest: "Contrarreloj 40km: 48:15",
    nextCompetition: "Mundial 2024",
    coach: "Javier Mínguez",
    federation: "Federación Panameña de Ciclismo",
    ranking: 8,
    bio: "Daniel López es un ciclista especializado en contrarreloj y pruebas de ruta. Actualmente se recupera de una lesión en la rodilla pero espera volver a representar a Panamá pronto.",
    stats: {
      strength: 90,
      speed: 87,
      endurance: 95,
      technique: 84,
      mental: 88,
    },
    recentResults: [
      {
        competition: "Olimpiadas París 2024",
        date: "2024-07-10",
        position: 15,
        result: "Etapa 9",
      },
      {
        competition: "Panamericanos 2023",
        date: "2023-09-05",
        position: 7,
        result: "General",
      },
      {
        competition: "Mundial 2023",
        date: "2023-09-25",
        position: 4,
        result: "49:05",
      },
    ],
    trainingCenter: "Centro de Ciclismo de Alto Rendimiento",
    weight: 68,
    height: 178,
  },
  {
    id: 5,
    name: "David Gómez",
    avatar: "/avatars/david-gomez.png",
    discipline: "Tenis",
    status: "Activo",
    age: 25,
    gender: "Masculino",
    country: "Panamá",
    medals: {
      gold: 0,
      silver: 1,
      bronze: 2,
    },
    personalBest: "Semifinal Grand Slam (Roland Garros 2023)",
    nextCompetition: "Olimpiadas 2024",
    coach: "Marcelo Ríos",
    federation: "Federación Panameña de Tenis",
    ranking: 12,
    bio: "David Gómez es un tenista profesional que ha ascendido rápidamente en el ranking ATP representando a Panamá. Su mejor superficie es la tierra batida.",
    stats: {
      strength: 82,
      speed: 88,
      endurance: 90,
      technique: 87,
      mental: 85,
    },
    recentResults: [
      {
        competition: "Olimpiadas París 2024",
        date: "2024-09-10",
        position: 8,
        result: "Cuartos de Final",
      },
      {
        competition: "Mundial 2023",
        date: "2023-06-04",
        position: 4,
        result: "Semifinal",
      },
      {
        competition: "Panamericanos 2023",
        date: "2023-05-07",
        position: 5,
        result: "Cuartos de Final",
      },
    ],
    trainingCenter: "Centro de Tenis Nacional de Panamá",
    weight: 75,
    height: 185,
  },
  {
    id: 6,
    name: "Juan Pérez",
    avatar: "/avatars/juan-perez.png",
    discipline: "Natación",
    status: "Activo",
    age: 22,
    gender: "Masculino",
    country: "Panamá",
    medals: {
      gold: 2,
      silver: 1,
      bronze: 3,
    },
    personalBest: "200m Espalda: 1:56.23",
    nextCompetition: "Panamericanos 2024",
    coach: "Fernando Alonso",
    federation: "Federación Panameña de Natación",
    ranking: 7,
    bio: "Juan Pérez es un nadador especializado en estilo espalda. Ha representado a Panamá en competencias internacionales desde 2019 y es una promesa para los próximos Juegos Olímpicos.",
    stats: {
      strength: 80,
      speed: 85,
      endurance: 90,
      technique: 88,
      mental: 82,
    },
    recentResults: [
      {
        competition: "Panamericanos 2023",
        date: "2023-11-12",
        position: 1,
        result: "1:56.23",
      },
      {
        competition: "Mundial 2023",
        date: "2023-07-28",
        position: 6,
        result: "1:57.05",
      },
      {
        competition: "Olimpiadas París 2024",
        date: "2024-08-15",
        position: 1,
        result: "1:57.89",
      },
    ],
    trainingCenter: "Centro Acuático Nacional de Panamá",
    weight: 78,
    height: 188,
  },
  {
    id: 7,
    name: "Andrés Torres",
    avatar: "/avatars/andres-torres.png",
    discipline: "Atletismo",
    status: "Suspendido",
    age: 26,
    gender: "Masculino",
    country: "Panamá",
    medals: {
      gold: 4,
      silver: 2,
      bronze: 1,
    },
    personalBest: "Salto Largo: 8.35m",
    nextCompetition: "Pendiente",
    coach: "Ricardo Montoya",
    federation: "Federación Panameña de Atletismo",
    ranking: 4,
    bio: "Andrés Torres es un atleta especializado en salto largo. Actualmente cumple una suspensión temporal por faltar a un control antidopaje, pero espera resolver su situación pronto.",
    stats: {
      strength: 92,
      speed: 90,
      endurance: 85,
      technique: 93,
      mental: 80,
    },
    recentResults: [
      {
        competition: "Mundial 2023",
        date: "2023-05-05",
        position: 2,
        result: "8.28m",
      },
      {
        competition: "Panamericanos 2023",
        date: "2023-03-18",
        position: 1,
        result: "8.35m",
      },
      {
        competition: "Olimpiadas París 2024",
        date: "2024-02-22",
        position: 1,
        result: "8.22m",
      },
    ],
    trainingCenter: "Centro de Alto Rendimiento de Panamá",
    weight: 75,
    height: 182,
  },
  {
    id: 8,
    name: "Luis Rodríguez",
    avatar: "/avatars/luis-rodriguez.png",
    discipline: "Gimnasia",
    status: "Activo",
    age: 23,
    gender: "Masculino",
    country: "Panamá",
    medals: {
      gold: 1,
      silver: 3,
      bronze: 2,
    },
    personalBest: "All-Around: 86.450 puntos",
    nextCompetition: "Mundial 2024",
    coach: "Carlos Oliveira",
    federation: "Federación Panameña de Gimnasia",
    ranking: 6,
    bio: "Luis Rodríguez es un gimnasta artístico especializado en barras paralelas y caballo con arcos. Ha representado a Panamá en los últimos Juegos Olímpicos y es medallista mundial.",
    stats: {
      strength: 90,
      speed: 85,
      endurance: 87,
      technique: 92,
      mental: 88,
    },
    recentResults: [
      {
        competition: "Mundial 2023",
        date: "2023-10-08",
        position: 3,
        result: "86.450 pts",
      },
      {
        competition: "Panamericanos 2023",
        date: "2023-07-20",
        position: 1,
        result: "86.200 pts",
      },
      {
        competition: "Olimpiadas París 2024",
        date: "2024-04-15",
        position: 2,
        result: "85.900 pts",
      },
    ],
    trainingCenter: "Centro Nacional de Gimnasia de Panamá",
    weight: 65,
    height: 168,
  },
  {
    id: 9,
    name: "Javier Hernández",
    avatar: "/avatars/javier-hernandez.png",
    discipline: "Ciclismo",
    status: "Inactivo",
    age: 31,
    gender: "Masculino",
    country: "Panamá",
    medals: {
      gold: 0,
      silver: 2,
      bronze: 4,
    },
    personalBest: "Montaña: Etapa Reina Vuelta a Panamá",
    nextCompetition: "Por confirmar",
    coach: "Rigoberto Urán",
    federation: "Federación Panameña de Ciclismo",
    ranking: 15,
    bio: "Javier Hernández es un ciclista especializado en montaña. Actualmente se encuentra en un período de descanso tras finalizar la temporada y evalúa ofertas de diferentes equipos.",
    stats: {
      strength: 88,
      speed: 82,
      endurance: 94,
      technique: 85,
      mental: 90,
    },
    recentResults: [
      {
        competition: "Panamericanos 2023",
        date: "2023-08-15",
        position: 3,
        result: "General",
      },
      {
        competition: "Olimpiadas París 2024",
        date: "2024-07-23",
        position: 22,
        result: "General",
      },
      {
        competition: "Mundial 2023",
        date: "2023-03-26",
        position: 5,
        result: "General",
      },
    ],
    trainingCenter: "Centro de Ciclismo de Alto Rendimiento",
    weight: 63,
    height: 175,
  },
  {
    id: 10,
    name: "María González",
    avatar: "/avatars/laura-garcia.png",
    discipline: "Atletismo",
    status: "Activo",
    age: 24,
    gender: "Femenino",
    country: "Panamá",
    medals: {
      gold: 2,
      silver: 3,
      bronze: 1,
    },
    personalBest: "800m: 1:58.24",
    nextCompetition: "Mundial 2024",
    coach: "Antonio Serrano",
    federation: "Federación Panameña de Atletismo",
    ranking: 4,
    bio: "María González es una atleta de medio fondo especializada en 800m. Ha sido campeona panamericana y finalista mundial, con aspiraciones olímpicas para la próxima cita.",
    stats: {
      strength: 84,
      speed: 90,
      endurance: 93,
      technique: 87,
      mental: 92,
    },
    recentResults: [
      {
        competition: "Mundial 2023",
        date: "2023-08-22",
        position: 4,
        result: "1:58.56",
      },
      {
        competition: "Olimpiadas París 2024",
        date: "2024-07-15",
        position: 2,
        result: "1:58.24",
      },
      {
        competition: "Panamericanos 2023",
        date: "2023-06-10",
        position: 1,
        result: "1:59.02",
      },
    ],
    trainingCenter: "Centro de Alto Rendimiento de Panamá",
    weight: 54,
    height: 168,
  },
]


// Componente para mostrar las estadísticas del atleta en forma de gráfico radar
function AthleteStats({ stats }: { stats: Athlete["stats"] }) {
  const { strength, speed, endurance, technique, mental } = stats

  return (
    <div className="space-y-3">
      <div className="flex justify-between text-xs text-gray-600">
        <span>Fuerza</span>
        <span>{strength}%</span>
      </div>
      <Progress value={strength} className="h-2" />

      <div className="flex justify-between text-xs text-gray-600">
        <span>Velocidad</span>
        <span>{speed}%</span>
      </div>
      <Progress value={speed} className="h-2" />

      <div className="flex justify-between text-xs text-gray-600">
        <span>Resistencia</span>
        <span>{endurance}%</span>
      </div>
      <Progress value={endurance} className="h-2" />

      <div className="flex justify-between text-xs text-gray-600">
        <span>Técnica</span>
        <span>{technique}%</span>
      </div>
      <Progress value={technique} className="h-2" />

      <div className="flex justify-between text-xs text-gray-600">
        <span>Mental</span>
        <span>{mental}%</span>
      </div>
      <Progress value={mental} className="h-2" />
    </div>
  )
}

// Componente para mostrar las medallas del atleta
function AthleteMedals({ medals }: { medals: Athlete["medals"] }) {
  const { gold, silver, bronze } = medals
  const total = gold + silver + bronze

  return (
    <div className="flex items-center space-x-4">
      <div className="flex flex-col items-center">
        <div className="w-8 h-8 rounded-full bg-yellow-100 flex items-center justify-center">
          <span className="text-yellow-600 font-bold">{gold}</span>
        </div>
        <span className="text-xs text-gray-600 mt-1">Oro</span>
      </div>
      <div className="flex flex-col items-center">
        <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center">
          <span className="text-gray-600 font-bold">{silver}</span>
        </div>
        <span className="text-xs text-gray-600 mt-1">Plata</span>
      </div>
      <div className="flex flex-col items-center">
        <div className="w-8 h-8 rounded-full bg-orange-100 flex items-center justify-center">
          <span className="text-orange-800 font-bold">{bronze}</span>
        </div>
        <span className="text-xs text-gray-600 mt-1">Bronce</span>
      </div>
      <div className="flex flex-col items-center">
        <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
          <span className="text-blue-600 font-bold">{total}</span>
        </div>
        <span className="text-xs text-gray-600 mt-1">Total</span>
      </div>
    </div>
  )
}

// Componente para mostrar los resultados recientes del atleta
function AthleteResults({ results }: { results: Athlete["recentResults"] }) {
  return (
    <div className="space-y-3">
      {results.map((result, index) => (
        <div key={index} className="flex items-center justify-between p-2 border border-gray-100 rounded-lg">
          <div>
            <div className="font-medium text-sm">{result.competition}</div>
            <div className="text-xs text-gray-600">{result.date}</div>
          </div>
          <div className="text-right">
            <div className="font-medium text-sm">{result.result}</div>
            <div className="text-xs text-gray-600">Posición: {result.position}º</div>
          </div>
        </div>
      ))}
    </div>
  )
}

// Componente para mostrar el detalle de un atleta en móvil
function AthleteDetailMobile({ athlete, onClose }: { athlete: Athlete; onClose: () => void }) {
  return (
    <div className="fixed inset-0 bg-white z-50 overflow-y-auto pb-20">
      <div className="sticky top-0 bg-white border-b border-gray-200 p-4 flex items-center justify-between">
        <h2 className="text-lg font-bold">Detalle del Atleta</h2>
        <Button variant="ghost" size="sm" onClick={onClose} className="p-1">
          <X className="h-5 w-5" />
        </Button>
      </div>

      <div className="p-4 space-y-6">
        {/* Header con información básica */}
        <div className="flex items-center space-x-4">
          <Avatar className="h-16 w-16 ring-2 ring-gray-200">
            <AvatarImage src={athlete.avatar || "/placeholder.svg"} alt={athlete.name} className="object-cover" />
            <AvatarFallback className="bg-gray-100 text-gray-700 text-lg font-medium">
              {athlete.name
                .split(" ")
                .map((n) => n[0])
                .join("")}
            </AvatarFallback>
          </Avatar>
          <div>
            <h3 className="text-xl font-bold">{athlete.name}</h3>
            <div className="flex items-center space-x-2">
              <Badge
                variant={
                  athlete.status === "Activo" ? "default" : athlete.status === "Lesionado" ? "destructive" : "secondary"
                }
                className={athlete.status === "Activo" ? "bg-orange-600 text-white" : ""}
              >
                {athlete.status}
              </Badge>
              <span className="text-sm text-gray-600">{athlete.discipline}</span>
            </div>
          </div>
        </div>

        {/* Información personal */}
        <MobileCard>
          <MobileCardHeader>
            <MobileCardTitle className="flex items-center space-x-2">
              <User className="h-4 w-4" />
              <span>Información Personal</span>
            </MobileCardTitle>
          </MobileCardHeader>
          <MobileCardContent>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <div className="text-sm text-gray-600">Edad</div>
                <div className="font-medium">{athlete.age} años</div>
              </div>
              <div>
                <div className="text-sm text-gray-600">Género</div>
                <div className="font-medium">{athlete.gender}</div>
              </div>
              <div>
                <div className="text-sm text-gray-600">País</div>
                <div className="font-medium">{athlete.country}</div>
              </div>
              <div>
                <div className="text-sm text-gray-600">Ranking</div>
                <div className="font-medium">#{athlete.ranking}</div>
              </div>
              {athlete.weight && (
                <div>
                  <div className="text-sm text-gray-600">Peso</div>
                  <div className="font-medium">{athlete.weight} kg</div>
                </div>
              )}
              {athlete.height && (
                <div>
                  <div className="text-sm text-gray-600">Altura</div>
                  <div className="font-medium">{athlete.height} cm</div>
                </div>
              )}
            </div>
          </MobileCardContent>
        </MobileCard>

        {/* Biografía */}
        <MobileCard>
          <MobileCardHeader>
            <MobileCardTitle>Biografía</MobileCardTitle>
          </MobileCardHeader>
          <MobileCardContent>
            <p className="text-sm text-gray-700">{athlete.bio}</p>
          </MobileCardContent>
        </MobileCard>

        {/* Medallas */}
        <MobileCard>
          <MobileCardHeader>
            <MobileCardTitle className="flex items-center space-x-2">
              <Medal className="h-4 w-4" />
              <span>Medallas</span>
            </MobileCardTitle>
          </MobileCardHeader>
          <MobileCardContent>
            <AthleteMedals medals={athlete.medals} />
          </MobileCardContent>
        </MobileCard>

        {/* Estadísticas */}
        <MobileCard>
          <MobileCardHeader>
            <MobileCardTitle className="flex items-center space-x-2">
              <TrendingUp className="h-4 w-4" />
              <span>Estadísticas</span>
            </MobileCardTitle>
          </MobileCardHeader>
          <MobileCardContent>
            <AthleteStats stats={athlete.stats} />
          </MobileCardContent>
        </MobileCard>

        {/* Resultados recientes */}
        <MobileCard>
          <MobileCardHeader>
            <MobileCardTitle className="flex items-center space-x-2">
              <Award className="h-4 w-4" />
              <span>Resultados Recientes</span>
            </MobileCardTitle>
          </MobileCardHeader>
          <MobileCardContent>
            <AthleteResults results={athlete.recentResults} />
          </MobileCardContent>
        </MobileCard>

        {/* Información adicional */}
        <MobileCard>
          <MobileCardHeader>
            <MobileCardTitle>Información Adicional</MobileCardTitle>
          </MobileCardHeader>
          <MobileCardContent>
            <div className="space-y-4">
              <div>
                <div className="text-sm text-gray-600">Mejor Marca Personal</div>
                <div className="font-medium">{athlete.personalBest}</div>
              </div>
              {athlete.nextCompetition && (
                <div>
                  <div className="text-sm text-gray-600">Próxima Competencia</div>
                  <div className="font-medium">{athlete.nextCompetition}</div>
                </div>
              )}
              {athlete.coach && (
                <div>
                  <div className="text-sm text-gray-600">Entrenador</div>
                  <div className="font-medium">{athlete.coach}</div>
                </div>
              )}
              <div>
                <div className="text-sm text-gray-600">Federación</div>
                <div className="font-medium">{athlete.federation}</div>
              </div>
              <div>
                <div className="text-sm text-gray-600">Centro de Entrenamiento</div>
                <div className="font-medium">{athlete.trainingCenter}</div>
              </div>
            </div>
          </MobileCardContent>
        </MobileCard>
      </div>
    </div>
  )
}

// Componente para mostrar el detalle de un atleta en desktop
function AthleteDetailDesktop({ athlete }: { athlete: Athlete }) {
  return (
    <div className="space-y-6">
      {/* Header con información básica */}
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center space-x-6">
            <Avatar className="h-24 w-24 ring-2 ring-gray-200">
              <AvatarImage src={athlete.avatar || "/placeholder.svg"} alt={athlete.name} className="object-cover" />
              <AvatarFallback className="bg-gray-100 text-gray-700 text-xl font-medium">
                {athlete.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-bold">{athlete.name}</h2>
                  <div className="flex items-center space-x-3 mt-1">
                    <Badge
                      variant={
                        athlete.status === "Activo"
                          ? "default"
                          : athlete.status === "Lesionado"
                            ? "destructive"
                            : "secondary"
                      }
                      className={athlete.status === "Activo" ? "bg-orange-600 text-white" : ""}
                    >
                      {athlete.status}
                    </Badge>
                    <span className="text-gray-600">{athlete.discipline}</span>
                    <span className="text-gray-600">#{athlete.ranking} Ranking Mundial</span>
                  </div>
                </div>
                <AthleteMedals medals={athlete.medals} />
              </div>
              <div className="mt-4 grid grid-cols-3 gap-4">
                <div className="flex items-center space-x-2">
                  <User className="h-4 w-4 text-gray-500" />
                  <span>
                    {athlete.age} años, {athlete.gender}
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <MapPin className="h-4 w-4 text-gray-500" />
                  <span>{athlete.country}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Calendar className="h-4 w-4 text-gray-500" />
                  <span>{athlete.nextCompetition || "Sin competencias programadas"}</span>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Contenido principal en dos columnas */}
      <div className="grid grid-cols-3 gap-6">
        {/* Columna izquierda */}
        <div className="space-y-6">
          {/* Estadísticas */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <TrendingUp className="h-5 w-5" />
                <span>Estadísticas</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <AthleteStats stats={athlete.stats} />
            </CardContent>
          </Card>

          {/* Información personal */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <User className="h-5 w-5" />
                <span>Información Personal</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  {athlete.weight && (
                    <div>
                      <div className="text-sm text-gray-600">Peso</div>
                      <div className="font-medium">{athlete.weight} kg</div>
                    </div>
                  )}
                  {athlete.height && (
                    <div>
                      <div className="text-sm text-gray-600">Altura</div>
                      <div className="font-medium">{athlete.height} cm</div>
                    </div>
                  )}
                </div>
                <div>
                  <div className="text-sm text-gray-600">Mejor Marca Personal</div>
                  <div className="font-medium">{athlete.personalBest}</div>
                </div>
                {athlete.coach && (
                  <div>
                    <div className="text-sm text-gray-600">Entrenador</div>
                    <div className="font-medium">{athlete.coach}</div>
                  </div>
                )}
                <div>
                  <div className="text-sm text-gray-600">Federación</div>
                  <div className="font-medium">{athlete.federation}</div>
                </div>
                <div>
                  <div className="text-sm text-gray-600">Centro de Entrenamiento</div>
                  <div className="font-medium">{athlete.trainingCenter}</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Columna central y derecha */}
        <div className="col-span-2 space-y-6">
          {/* Biografía */}
          <Card>
            <CardHeader>
              <CardTitle>Biografía</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700">{athlete.bio}</p>
            </CardContent>
          </Card>

          {/* Resultados recientes */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Award className="h-5 w-5" />
                <span>Resultados Recientes</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {athlete.recentResults.map((result, index) => (
                  <div key={index} className="p-4 border border-gray-100 rounded-lg">
                    <div className="flex justify-between items-center mb-2">
                      <div className="font-medium">{result.competition}</div>
                      <Badge
                        variant={result.position <= 3 ? "default" : "secondary"}
                        className={result.position === 1 ? "bg-orange-600 text-white" : ""}
                      >
                        {result.position}º Lugar
                      </Badge>
                    </div>
                    <div className="flex justify-between text-sm text-gray-600">
                      <div className="flex items-center space-x-1">
                        <Calendar className="h-3 w-3" />
                        <span>{result.date}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Clock className="h-3 w-3" />
                        <span>{result.result}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Gráfico de rendimiento (simulado) */}
          <Card>
            <CardHeader>
              <CardTitle>Evolución de Rendimiento</CardTitle>
            </CardHeader>
            <CardContent className="h-64 flex items-center justify-center">
              <div className="text-center text-gray-500">
                <TrendingUp className="h-12 w-12 mx-auto mb-2 text-orange-600" />
                <p>Gráfico de evolución de rendimiento</p>
                <p className="text-sm">Datos disponibles próximamente</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

// Componente Mobile
function MobileAthletes() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedStatus, setSelectedStatus] = useState<string | null>(null)
  const [selectedDiscipline, setSelectedDiscipline] = useState<string | null>(null)
  const [selectedAthlete, setSelectedAthlete] = useState<Athlete | null>(null)
  const [showFilters, setShowFilters] = useState(false)

  // Obtener disciplinas únicas para el filtro
  const disciplines = useMemo(() => {
    const uniqueDisciplines = new Set(athletes.map((athlete) => athlete.discipline))
    return Array.from(uniqueDisciplines)
  }, [])

  // Filtrar atletas
  const filteredAthletes = useMemo(() => {
    return athletes.filter((athlete) => {
      // Filtro por búsqueda
      const matchesSearch =
        athlete.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        athlete.discipline.toLowerCase().includes(searchTerm.toLowerCase()) ||
        athlete.country.toLowerCase().includes(searchTerm.toLowerCase())

      // Filtro por estado
      const matchesStatus = selectedStatus ? athlete.status === selectedStatus : true

      // Filtro por disciplina
      const matchesDiscipline = selectedDiscipline ? athlete.discipline === selectedDiscipline : true

      return matchesSearch && matchesStatus && matchesDiscipline
    })
  }, [searchTerm, selectedStatus, selectedDiscipline])

  return (
    <div className="px-4 py-4 space-y-6">
      {/* Barra de búsqueda */}
      <div className="flex items-center space-x-2">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input
            placeholder="Buscar atletas..."
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
          {(selectedStatus || selectedDiscipline) && (
            <Badge className="ml-1 bg-orange-600 text-white">{(selectedStatus ? 1 : 0) + (selectedDiscipline ? 1 : 0)}</Badge>
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
                  {["Activo", "Lesionado", "Inactivo", "Suspendido"].map((status) => (
                    <Badge
                      key={status}
                      variant={selectedStatus === status ? "default" : "secondary"}
                      className={`cursor-pointer ${selectedStatus === status ? "bg-orange-600 text-white" : ""}`}
                      onClick={() => setSelectedStatus(selectedStatus === status ? null : status)}
                    >
                      {status}
                    </Badge>
                  ))}
                </div>
              </div>
              <div>
                <h3 className="text-sm font-medium mb-2">Disciplina</h3>
                <div className="flex flex-wrap gap-2">
                  {disciplines.map((discipline) => (
                    <Badge
                      key={discipline}
                      variant={selectedDiscipline === discipline ? "default" : "secondary"}
                      className={`cursor-pointer ${selectedDiscipline === discipline ? "bg-orange-600 text-white" : ""}`}
                      onClick={() => setSelectedDiscipline(selectedDiscipline === discipline ? null : discipline)}
                    >
                      {discipline}
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
                    setSelectedDiscipline(null)
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
          <h2 className="text-lg font-semibold">Atletas ({filteredAthletes.length})</h2>
          <span className="text-sm text-gray-600">
            {selectedStatus || selectedDiscipline
              ? `Filtrado por ${selectedStatus ? `estado: ${selectedStatus}` : ""}${
                  selectedStatus && selectedDiscipline ? ", " : ""
                }${selectedDiscipline ? `disciplina: ${selectedDiscipline}` : ""}`
              : "Mostrando todos"}
          </span>
        </div>

        <div className="space-y-4">
          {filteredAthletes.map((athlete) => (
            <MobileCard
              key={athlete.id}
              className="active:scale-[0.98] transition-transform"
              onClick={() => setSelectedAthlete(athlete)}
            >
              <MobileCardContent className="p-4">
                <div className="flex items-center space-x-3">
                  <Avatar className="h-12 w-12 ring-2 ring-gray-200">
                    <AvatarImage
                      src={athlete.avatar || "/placeholder.svg"}
                      alt={athlete.name}
                      className="object-cover"
                    />
                    <AvatarFallback className="bg-gray-100 text-gray-700 text-sm font-medium">
                      {athlete.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <div className="flex justify-between">
                      <div>
                        <h3 className="font-medium text-gray-900">{athlete.name}</h3>
                        <div className="text-xs text-gray-600 flex items-center space-x-1">
                          <span>{athlete.discipline}</span>
                          <span>•</span>
                          <span>{athlete.country}</span>
                        </div>
                      </div>
                      <ChevronRight className="h-5 w-5 text-gray-400" />
                    </div>
                    <div className="flex items-center space-x-2 mt-2">
                      <Badge
                        variant={
                          athlete.status === "Activo"
                            ? "default"
                            : athlete.status === "Lesionado"
                              ? "destructive"
                              : "secondary"
                        }
                        className={`text-xs ${athlete.status === "Activo" ? "bg-orange-600 text-white" : ""}`}
                      >
                        {athlete.status}
                      </Badge>
                      <div className="flex items-center space-x-1">
                        <Medal className="h-3 w-3 text-yellow-600" />
                        <span className="text-xs font-medium">
                          {athlete.medals.gold + athlete.medals.silver + athlete.medals.bronze}
                        </span>
                      </div>
                      <div className="text-xs text-gray-600">#{athlete.ranking} Ranking</div>
                    </div>
                  </div>
                </div>
              </MobileCardContent>
            </MobileCard>
          ))}

          {filteredAthletes.length === 0 && (
            <div className="text-center py-8">
              <div className="text-gray-400 mb-2">No se encontraron atletas</div>
              <div className="text-sm text-gray-500">Intenta con otros filtros</div>
            </div>
          )}
        </div>
      </div>

      {/* Detalle del atleta (modal) */}
      {selectedAthlete && <AthleteDetailMobile athlete={selectedAthlete} onClose={() => setSelectedAthlete(null)} />}
    </div>
  )
}

// Componente Desktop
function DesktopAthletes() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedStatus, setSelectedStatus] = useState<string | null>(null)
  const [selectedDiscipline, setSelectedDiscipline] = useState<string | null>(null)
  const [selectedAthlete, setSelectedAthlete] = useState<Athlete | null>(athletes[0])

  // Obtener disciplinas únicas para el filtro
  const disciplines = useMemo(() => {
    const uniqueDisciplines = new Set(athletes.map((athlete) => athlete.discipline))
    return Array.from(uniqueDisciplines)
  }, [])

  // Filtrar atletas
  const filteredAthletes = useMemo(() => {
    return athletes.filter((athlete) => {
      // Filtro por búsqueda
      const matchesSearch =
        athlete.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        athlete.discipline.toLowerCase().includes(searchTerm.toLowerCase()) ||
        athlete.country.toLowerCase().includes(searchTerm.toLowerCase())

      // Filtro por estado
      const matchesStatus = selectedStatus ? athlete.status === selectedStatus : true

      // Filtro por disciplina
      const matchesDiscipline = selectedDiscipline ? athlete.discipline === selectedDiscipline : true

      return matchesSearch && matchesStatus && matchesDiscipline
    })
  }, [searchTerm, selectedStatus, selectedDiscipline])

  return (
    <div className="space-y-6">
      {/* Header con estadísticas */}
      <div className="grid grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Atletas</p>
                <p className="text-3xl font-bold text-gray-900 mt-1">{athletes.length}</p>
              </div>
              <div className="p-3 bg-gray-50 rounded-lg">
                <User className="h-5 w-5 text-gray-700" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Atletas Activos</p>
                <p className="text-3xl font-bold text-gray-900 mt-1">
                  {athletes.filter((a) => a.status === "Activo").length}
                </p>
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
                <p className="text-3xl font-bold text-gray-900 mt-1">
                  {athletes.reduce(
                    (total, athlete) => total + athlete.medals.gold + athlete.medals.silver + athlete.medals.bronze,
                    0,
                  )}
                </p>
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
                <p className="text-sm font-medium text-gray-600">Disciplinas</p>
                <p className="text-3xl font-bold text-gray-900 mt-1">{disciplines.length}</p>
              </div>
              <div className="p-3 bg-gray-50 rounded-lg">
                <Award className="h-5 w-5 text-orange-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Contenido principal en dos columnas */}
      <div className="grid grid-cols-12 gap-6">
        {/* Lista de atletas */}
        <div className="col-span-4">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Atletas</CardTitle>
                <div className="flex items-center space-x-2">
                  <span className="text-sm text-gray-600">
                    {filteredAthletes.length} de {athletes.length}
                  </span>
                </div>
              </div>
              <div className="mt-2">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    placeholder="Buscar atletas..."
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
                  {["Activo", "Lesionado", "Inactivo", "Suspendido"].map((status) => (
                    <Badge
                      key={status}
                      variant={selectedStatus === status ? "default" : "secondary"}
                      className={`cursor-pointer ${selectedStatus === status ? "bg-orange-600 text-white" : ""}`}
                      onClick={() => setSelectedStatus(selectedStatus === status ? null : status)}
                    >
                      {status}
                    </Badge>
                  ))}
                </div>
                <div className="flex flex-wrap gap-2">
                  <div className="mr-2 text-sm font-medium text-gray-700">Disciplina:</div>
                  {disciplines.map((discipline) => (
                    <Badge
                      key={discipline}
                      variant={selectedDiscipline === discipline ? "default" : "secondary"}
                      className={`cursor-pointer ${selectedDiscipline === discipline ? "bg-orange-600 text-white" : ""}`}
                      onClick={() => setSelectedDiscipline(selectedDiscipline === discipline ? null : discipline)}
                    >
                      {discipline}
                    </Badge>
                  ))}
                </div>
                <div className="border-t border-gray-200 pt-4 mt-4">
                  <div className="space-y-1">
                    {filteredAthletes.map((athlete) => (
                      <div
                        key={athlete.id}
                        className={`flex items-center p-3 rounded-lg cursor-pointer hover:bg-gray-50 ${
                          selectedAthlete?.id === athlete.id ? "bg-orange-50 border border-orange-200" : ""
                        }`}
                        onClick={() => setSelectedAthlete(athlete)}
                      >
                        <Avatar className="h-10 w-10 mr-3 ring-2 ring-gray-200">
                          <AvatarImage
                            src={athlete.avatar || "/placeholder.svg"}
                            alt={athlete.name}
                            className="object-cover"
                          />
                          <AvatarFallback className="bg-gray-100 text-gray-700 text-xs font-medium">
                            {athlete.name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                          <div className="flex justify-between">
                            <h3 className="font-medium text-gray-900">{athlete.name}</h3>
                            <Badge
                              variant={
                                athlete.status === "Activo"
                                  ? "default"
                                  : athlete.status === "Lesionado"
                                    ? "destructive"
                                    : "secondary"
                              }
                              className={`text-xs ${athlete.status === "Activo" ? "bg-orange-600 text-white" : ""}`}
                            >
                              {athlete.status}
                            </Badge>
                          </div>
                          <div className="text-xs text-gray-600 flex items-center space-x-1">
                            <span>{athlete.discipline}</span>
                            <span>•</span>
                            <span>{athlete.country}</span>
                          </div>
                        </div>
                      </div>
                    ))}

                    {filteredAthletes.length === 0 && (
                      <div className="text-center py-8">
                        <div className="text-gray-400 mb-2">No se encontraron atletas</div>
                        <div className="text-sm text-gray-500">Intenta con otros filtros</div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Detalle del atleta */}
        <div className="col-span-8">{selectedAthlete && <AthleteDetailDesktop athlete={selectedAthlete} />}</div>
      </div>
    </div>
  )
}

// Componente Principal
export default function AthletesPage() {
  const isMobile = useIsMobile()

  return (
    <ResponsiveLayout title="Atletas" showSearch={false}>
      {isMobile ? <MobileAthletes /> : <DesktopAthletes />}
    </ResponsiveLayout>
  )
}
