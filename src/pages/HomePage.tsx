"use client"

import { useState } from "react"
import { useIsMobile } from "../hooks/use-media-query"
import { ResponsiveLayout } from "../components/layouts/responsive-layout"
import { Card, CardHeader, CardContent, CardTitle } from "../components/ui/card"
import {
  MobileCard,
  MobileCardHeader,
  MobileCardContent,
  MobileCardTitle,
  MobileCardDescription,
} from "../components/ui/mobile-card"
import { MobileChart } from "../components/charts/mobile-chart"
import { Input } from "../components/ui/input"
import { Badge } from "../components/ui/badge"
import { Progress } from "../components/ui/progress"
import { Avatar, AvatarFallback, AvatarImage } from "../components/ui/avatar"
import { Trophy, Users, DollarSign, TrendingUp, Award, Search, ChevronDown, Calendar, Target } from "lucide-react"

// Datos reales del dashboard
const quickStats = [
  {
    title: "Atletas Activos",
    value: "156",
    icon: <Users className="h-5 w-5" />,
    trend: "+12%",
    trendUp: true,
  },
  {
    title: "Competencias",
    value: "3",
    icon: <Trophy className="h-5 w-5" />,
    trend: "+1",
    trendUp: true,
  },
  {
    title: "Medallas 2024",
    value: "42",
    icon: <Award className="h-5 w-5" />,
    trend: "+15%",
    trendUp: true,
  },
  {
    title: "Presupuesto",
    value: "75%",
    icon: <DollarSign className="h-5 w-5" />,
    trend: "85% usado",
    trendUp: false,
  },
]

// Datos históricos de medallas
const medalsHistoryData = [
  { year: "2016", oro: 2, plata: 3, bronce: 4, total: 9 },
  { year: "2019", oro: 4, plata: 5, bronce: 6, total: 15 },
  { year: "2020", oro: 3, plata: 4, bronce: 5, total: 12 },
  { year: "2022", oro: 5, plata: 6, bronce: 7, total: 18 },
  { year: "2023", oro: 6, plata: 7, bronce: 8, total: 21 },
  { year: "2024", oro: 8, plata: 9, bronce: 10, total: 27 },
]

// Atletas para competencias futuras
const athletesCompetitionData = [
  {
    id: 1,
    name: "Laura Morales",
    avatar: "/avatars/laura-garcia.png",
    listaLarga: "Mundial",
    listaCorta: 2,
    discipline: "Natación",
    status: "Confirmado",
    country: "Panamá",
  },
  {
    id: 2,
    name: "Carlos Pérez",
    avatar: "/avatars/carlos-santos.png",
    listaLarga: "Olimpiadas",
    listaCorta: 4,
    discipline: "Atletismo",
    status: "Pendiente",
    country: "Panamá",
  },
  {
    id: 3,
    name: "Ana Castillo",
    avatar: "/avatars/ana-martinez.png",
    listaLarga: "Panamericanos",
    listaCorta: 3,
    discipline: "Gimnasia",
    status: "Confirmado",
    country: "Panamá",
  },
  {
    id: 4,
    name: "Daniel Sánchez",
    avatar: "/avatars/daniel-lopez.jpg",
    listaLarga: "Mundial",
    listaCorta: 2,
    discipline: "Ciclismo",
    status: "Confirmado",
    country: "Panamá",
  },
  {
    id: 5,
    name: "David Rodríguez",
    avatar: "/avatars/david-gomez.png",
    listaLarga: "Olimpiadas",
    listaCorta: 1,
    discipline: "Tenis",
    status: "Evaluando",
    country: "Panamá",
  },
]

// Datos de distribución de atletas actualizada
const competitionDistributionData = [
  {
    name: "Natación",
    listaLarga: 25,
    listaCorta: 18,
    cuposDisponibles: 20,
    montoTotal: 850000,
    cantidadActual: 18,
  },
  {
    name: "Atletismo",
    listaLarga: 30,
    listaCorta: 22,
    cuposDisponibles: 25,
    montoTotal: 950000,
    cantidadActual: 22,
  },
  {
    name: "Gimnasia",
    listaLarga: 15,
    listaCorta: 12,
    cuposDisponibles: 14,
    montoTotal: 650000,
    cantidadActual: 12,
  },
  {
    name: "Ciclismo",
    listaLarga: 20,
    listaCorta: 15,
    cuposDisponibles: 18,
    montoTotal: 750000,
    cantidadActual: 15,
  },
  {
    name: "Tenis",
    listaLarga: 12,
    listaCorta: 8,
    cuposDisponibles: 10,
    montoTotal: 450000,
    cantidadActual: 8,
  },
]

// Atletas con porcentajes de proyección
const athletesProjectionData = [
  {
    name: "Juan Mendoza",
    percentage: 75,
    avatar: "/avatars/juan-perez.png",
    discipline: "Natación",
    country: "Panamá",
    medals: 6,
    competitions: 12,
    economicStimulus: "$15,000",
  },
  {
    name: "Andrés Vega",
    percentage: 82,
    avatar: "/avatars/andres-torres.png",
    discipline: "Atletismo",
    country: "Panamá",
    medals: 7,
    competitions: 15,
    economicStimulus: "$18,500",
  },
  {
    name: "Luis Aparicio",
    percentage: 65,
    avatar: "/avatars/luis-rodriguez.png",
    discipline: "Gimnasia",
    country: "Panamá",
    medals: 4,
    competitions: 8,
    economicStimulus: "$12,000",
  },
  {
    name: "Javier Batista",
    percentage: 53,
    avatar: "/avatars/javier-hernandez.png",
    discipline: "Ciclismo",
    country: "Panamá",
    medals: 3,
    competitions: 10,
    economicStimulus: "$10,500",
  },
]

// Datos de presupuesto por disciplina
const budgetByDisciplineData = [
  { discipline: "Gimnasia", budget: "Mundial", percentage: 85 },
  { discipline: "Atletismo", budget: "Olimpiadas", percentage: 70 },
  { discipline: "Natación", budget: "Panamericanos", percentage: 60 },
  { discipline: "Ciclismo", budget: "Mundial", percentage: 90 },
  { discipline: "Tenis", budget: "Olimpiadas", percentage: 75 },
]

// Datos de logística por federación
const logisticsByFederationData = [
  { function: "Mundial", assigned: 4, total: 4, status: "Completo" },
  { function: "Olimpiadas", assigned: 3, total: 3, status: "Completo" },
  { function: "Panamericanos", assigned: 7, total: 7, status: "Completo" },
]

// Datos de atención por federación
const attentionByFederationData = [
  { type: "Mundial", count: 3, priority: "Alta" },
  { type: "Olimpiadas", count: 2, priority: "Media" },
  { type: "Panamericanos", count: 1, priority: "Baja" },
]

// Datos de logística por competencia
const logisticsCompetitionData = [
  { role: "Mundial", assigned: 2, total: 2, percentage: 50 },
  { role: "Olimpiadas", assigned: 1, total: 2, percentage: 25 },
  { role: "Panamericanos", assigned: 2, total: 3, percentage: 67 },
]

// Componente Mobile
function MobileHomepage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCompetition, setSelectedCompetition] = useState("Panamericanos")
  const [selectedLogisticsCompetition, setSelectedLogisticsCompetition] = useState("Olimpiadas")

  // Filtrar atletas basado en el término de búsqueda
  const filteredAthletes = athletesCompetitionData.filter(
    (athlete) =>
      athlete.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      athlete.discipline.toLowerCase().includes(searchTerm.toLowerCase()) ||
      athlete.status.toLowerCase().includes(searchTerm.toLowerCase()) ||
      athlete.listaLarga.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  return (
    <div className="px-4 py-4 space-y-6">
      {/* Quick Stats */}
      <section>
        <div className="grid grid-cols-2 gap-4">
          {quickStats.map((stat, index) => (
            <div key={index} className="bg-white rounded-lg border border-gray-200 p-4 shadow-sm">
              <div className="flex items-center justify-between mb-2">
                <div className="p-2 bg-gray-50 rounded-lg">{stat.icon}</div>
                <span className={`text-xs font-medium ${stat.trendUp ? "text-green-600" : "text-gray-600"}`}>
                  {stat.trend}
                </span>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
              </div>
            </div>
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
            className="pl-10 h-12 rounded-lg border-gray-200 bg-white"
          />
        </div>
      </section>

      {/* Desempeño Histórico */}
      <MobileCard className="border-gray-200">
        <MobileCardHeader>
          <div className="flex items-center justify-between">
            <div>
              <MobileCardTitle className="text-gray-900">Desempeño Histórico por Competencia</MobileCardTitle>
              <MobileCardDescription className="text-gray-600">Medallas por año</MobileCardDescription>
            </div>
            <TrendingUp className="h-5 w-5 text-orange-600" />
          </div>
        </MobileCardHeader>
        <MobileCardContent>
          <MobileChart type="bar" data={medalsHistoryData} height={200} />
        </MobileCardContent>
      </MobileCard>

      {/* Competencias Futuras */}
      <MobileCard className="border-gray-200">
        <MobileCardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Calendar className="h-5 w-5 text-gray-700" />
              <MobileCardTitle className="text-gray-900">Atletas Clasificados</MobileCardTitle>
            </div>
            <div
              className="flex items-center space-x-1 text-sm text-gray-600 border border-gray-200 px-2 py-1 rounded-md cursor-pointer hover:bg-gray-50"
              onClick={() => {
                const competitions = ["Panamericanos", "Olimpiadas", "Mundial"]
                const currentIndex = competitions.indexOf(selectedCompetition)
                const nextIndex = (currentIndex + 1) % competitions.length
                setSelectedCompetition(competitions[nextIndex])
              }}
            >
              <span className="font-medium">{selectedCompetition}</span>
              <ChevronDown className="h-4 w-4" />
            </div>
          </div>
        </MobileCardHeader>
        <MobileCardContent>
          <div className="space-y-4">
            {/* Lista de Atletas */}
            <div>
              <div className="space-y-3">
                {filteredAthletes.map((athlete) => (
                  <div key={athlete.id} className="p-3 border border-gray-100 rounded-lg">
                    <div className="flex items-center space-x-3 mb-3">
                      <Avatar className="h-10 w-10 ring-2 ring-gray-200">
                        <AvatarImage
                          src={athlete.avatar || "/placeholder.svg"}
                          alt={`${athlete.name} - ${athlete.discipline}`}
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
                        <div className="font-medium text-gray-900">{athlete.name}</div>
                        <div className="text-xs text-gray-500">
                          {athlete.discipline} - {athlete.country}
                        </div>
                      </div>
                      <Badge
                        variant={athlete.status === "Confirmado" ? "default" : "secondary"}
                        className={`text-xs ${athlete.status === "Confirmado" ? "bg-orange-600" : ""}`}
                      >
                        {athlete.status}
                      </Badge>
                    </div>

                    {/* Información adicional en filas separadas
                    <div className="grid grid-cols-2 gap-3 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Competición:</span>
                        <span className="font-medium text-gray-900">{athlete.listaLarga}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Lista Corta:</span>
                        <span className="font-medium text-gray-900">{athlete.listaCorta}</span>
                      </div>
                    </div> */}
                  </div>
                ))}
              </div>
            </div>

            {/* Gráfico de Distribución */}
            <div className="pt-4 border-t border-gray-200">
              <h4 className="text-sm font-medium mb-3 text-gray-900">Distribución de Atletas</h4>
              <MobileChart type="bar" data={competitionDistributionData} height={180} />
            </div>
          </div>
        </MobileCardContent>
      </MobileCard>

      {/* Atletas con Proyección */}
      <MobileCard className="border-gray-200">
        <MobileCardHeader>
          <div className="flex items-center space-x-2">
            <Target className="h-5 w-5 text-gray-700" />
            <MobileCardTitle className="text-gray-900">Atletas</MobileCardTitle>
          </div>
          <MobileCardDescription className="text-gray-600">Disciplina y porcentaje de proyección</MobileCardDescription>
        </MobileCardHeader>
        <MobileCardContent>
          <div className="space-y-4">
            {athletesProjectionData.map((athlete, index) => (
              <div key={index} className="space-y-2 p-3 border border-gray-100 rounded-lg">
                <div className="flex items-center space-x-3">
                  <Avatar className="h-8 w-8 ring-2 ring-gray-200">
                    <AvatarImage
                      src={athlete.avatar || "/placeholder.svg"}
                      alt={`${athlete.name} - ${athlete.discipline}`}
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
                    <div className="flex justify-between items-center">
                      <div>
                        <span className="text-sm font-medium text-gray-900">{athlete.name}</span>
                        <div className="text-xs text-gray-500">
                          {athlete.discipline} - {athlete.country}
                        </div>
                      </div>
                      <span className="text-sm font-bold text-orange-600">{athlete.percentage}%</span>
                    </div>
                  </div>
                </div>
                <Progress value={athlete.percentage} className="h-2" />
                <div className="grid grid-cols-3 gap-2 text-xs text-gray-600 mt-2">
                  <div className="text-center">
                    <div className="font-medium text-gray-900">{athlete.medals}</div>
                    <div>Medallas</div>
                  </div>
                  <div className="text-center">
                    <div className="font-medium text-gray-900">{athlete.competitions}</div>
                    <div>Competencias</div>
                  </div>
                  <div className="text-center">
                    <div className="font-medium text-gray-900">{athlete.economicStimulus}</div>
                    <div>Estímulo</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </MobileCardContent>
      </MobileCard>

      {/* Presupuesto por Disciplina */}
      <MobileCard className="border-gray-200">
        <MobileCardHeader>
          <div className="flex items-center space-x-2">
            <DollarSign className="h-5 w-5 text-gray-700" />
            <MobileCardTitle className="text-gray-900">Atletas por Competición</MobileCardTitle>
          </div>
          <MobileCardDescription className="text-gray-600">Presupuesto y asignaciones</MobileCardDescription>
        </MobileCardHeader>
        <MobileCardContent>
          <div className="space-y-4">
            {budgetByDisciplineData.map((item, index) => (
              <div key={index} className="p-3 border border-gray-100 rounded-lg">
                <div className="flex justify-between text-sm mb-2">
                  <span className="font-medium text-gray-900">{item.budget}</span>
                  <span className="text-gray-600 font-semibold">{item.percentage}%</span>
                </div>
                <Progress value={item.percentage} className="h-3" />
              </div>
            ))}
          </div>
        </MobileCardContent>
      </MobileCard>

      {/* Logística por Federación */}
      <MobileCard className="border-gray-200">
        <MobileCardHeader>
          <div className="flex items-center justify-between">
            <MobileCardTitle className="text-gray-900">Logística por Competición</MobileCardTitle>
            <div
              className="flex items-center space-x-1 text-gray-600 border border-gray-200 px-2 py-1 rounded-md cursor-pointer hover:bg-gray-50"
              onClick={() => {
                const competitions = ["Olimpiadas", "Panamericanos", "Mundial"]
                const currentIndex = competitions.indexOf(selectedLogisticsCompetition)
                const nextIndex = (currentIndex + 1) % competitions.length
                setSelectedLogisticsCompetition(competitions[nextIndex])
              }}
            >
              <span className="text-xs font-medium">{selectedLogisticsCompetition}</span>
              <ChevronDown className="h-3 w-3" />
            </div>
          </div>
        </MobileCardHeader>
        <MobileCardContent>
          <div className="space-y-4">
            <div className="text-sm font-medium text-gray-700">Funciones</div>
            {logisticsByFederationData.map((item, index) => (
              <div key={index} className="flex items-center justify-between p-2 border border-gray-100 rounded-lg">
                <span className="text-sm text-gray-900">{item.function}</span>
                <div className="flex items-center space-x-2">
                  <Badge variant="default" className="bg-orange-600 text-xs">
                    {item.assigned}
                  </Badge>
                  <span className="text-sm text-gray-600">{item.total}</span>
                  <Badge variant="secondary" className="text-xs">
                    {item.status}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </MobileCardContent>
      </MobileCard>

      {/* Atención por Federación */}
      <MobileCard className="border-gray-200">
        <MobileCardHeader>
          <MobileCardTitle className="text-gray-900">Acción por Competición</MobileCardTitle>
        </MobileCardHeader>
        <MobileCardContent>
          <div className="space-y-4">
            <div className="text-sm font-medium text-gray-700">Atención</div>
            {attentionByFederationData.map((item, index) => (
              <div key={index} className="flex items-center justify-between p-2 border border-gray-100 rounded-lg">
                <span className="text-sm text-gray-900">{item.type}</span>
                <div className="flex items-center space-x-2">
                  <Badge variant="secondary">{item.count}</Badge>
                  <Badge
                    variant={
                      item.priority === "Alta" ? "destructive" : item.priority === "Media" ? "default" : "secondary"
                    }
                    className={`text-xs ${item.priority === "Media" ? "bg-orange-600" : ""}`}
                  >
                    {item.priority}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </MobileCardContent>
      </MobileCard>

      {/* Logística por Competencia */}
      <MobileCard className="border-gray-200">
        <MobileCardHeader>
          <div className="flex items-center justify-between">
            <MobileCardTitle className="text-gray-900">Logística por Competencia</MobileCardTitle>
            <div
              className="flex items-center space-x-1 text-gray-600 border border-gray-200 px-2 py-1 rounded-md cursor-pointer hover:bg-gray-50"
              onClick={() => {
                const competitions = ["Olimpiadas", "Panamericanos", "Mundial"]
                const currentIndex = competitions.indexOf(selectedLogisticsCompetition)
                const nextIndex = (currentIndex + 1) % competitions.length
                setSelectedLogisticsCompetition(competitions[nextIndex])
              }}
            >
              <span className="text-xs font-medium">{selectedLogisticsCompetition}</span>
              <ChevronDown className="h-3 w-3" />
            </div>
          </div>
        </MobileCardHeader>
        <MobileCardContent>
          <div className="space-y-4">
            <div className="grid grid-cols-3 gap-2 text-xs font-medium text-gray-600 pb-2 border-b border-gray-200">
              <span>Funciones</span>
              <span>Asignada</span>
              <span>Completadas</span>
            </div>
            {logisticsCompetitionData.map((item, index) => (
              <div key={index} className="space-y-2 p-3 border border-gray-100 rounded-lg">
                <div className="text-sm font-medium text-gray-900">{item.role}</div>
                <div className="grid grid-cols-2 gap-2">
                  <div className="bg-gray-200 rounded-full h-4">
                    <div
                      className="bg-orange-600 h-4 rounded-full flex items-center justify-center text-white text-xs font-medium"
                      style={{ width: `${(item.assigned / item.total) * 100}%` }}
                    >
                      {item.assigned > 0 && item.assigned}
                    </div>
                  </div>
                  <div className="bg-gray-200 rounded-full h-4">
                    <div
                      className="bg-gray-600 h-4 rounded-full flex items-center justify-center text-white text-xs font-medium"
                      style={{ width: `${item.percentage}%` }}
                    >
                      {item.percentage > 30 && `${item.percentage}%`}
                    </div>
                  </div>
                </div>
                <div className="text-xs text-gray-600 text-right font-medium">{item.percentage}%</div>
              </div>
            ))}
          </div>
        </MobileCardContent>
      </MobileCard>
    </div>
  )
}

// Componente Desktop
function DesktopHomepage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCompetition, setSelectedCompetition] = useState("Panamericanos")
  const [selectedLogisticsCompetition, setSelectedLogisticsCompetition] = useState("Olimpiadas")

  // Agregar el filtro de búsqueda
  const filteredAthletes = athletesCompetitionData.filter(
    (athlete) =>
      athlete.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      athlete.discipline.toLowerCase().includes(searchTerm.toLowerCase()) ||
      athlete.status.toLowerCase().includes(searchTerm.toLowerCase()) ||
      athlete.listaLarga.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  return (
    <div className="space-y-8">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {quickStats.map((stat, index) => (
          <Card key={index} className="hover:shadow-md transition-shadow duration-200 border-gray-200">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                  <p className="text-3xl font-bold text-gray-900 mt-1">{stat.value}</p>
                  <p className={`text-sm font-medium mt-1 ${stat.trendUp ? "text-green-600" : "text-gray-600"}`}>
                    {stat.trend}
                  </p>
                </div>
                <div className="p-3 bg-gray-50 rounded-lg">{stat.icon}</div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Search Bar - Desktop */}
      <div className="max-w-md">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input
            placeholder="Buscar atletas, competencias..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 border-gray-200 bg-white"
          />
        </div>
      </div>

      {/* Main Dashboard Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Desempeño Histórico */}
        <Card className="lg:col-span-1 hover:shadow-md transition-shadow duration-200 border-gray-200">
          <CardHeader className="pb-4">
            <div className="flex items-center space-x-2">
              <TrendingUp className="h-5 w-5 text-orange-600" />
              <CardTitle className="text-gray-900">Desempeño Histórico por Competencia</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <MobileChart type="bar" data={medalsHistoryData} height={320} />
          </CardContent>
        </Card>

        {/* Competencias Futuras */}
        <Card className="lg:col-span-2 hover:shadow-md transition-shadow duration-200 border-gray-200">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Calendar className="h-5 w-5 text-gray-700" />
                <CardTitle className="text-gray-900">Atletas Clasificados</CardTitle>
              </div>
              <div
                className="flex items-center space-x-2 text-gray-600 border border-gray-200 px-3 py-2 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer"
                onClick={() => {
                  const competitions = ["Panamericanos", "Olimpiadas", "Mundial"]
                  const currentIndex = competitions.indexOf(selectedCompetition)
                  const nextIndex = (currentIndex + 1) % competitions.length
                  setSelectedCompetition(competitions[nextIndex])
                }}
              >
                <span className="text-sm font-medium">{selectedCompetition}</span>
                <ChevronDown className="h-4 w-4" />
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-6">
              {/* Lista de Atletas */}
              <div>
                <div className="grid grid-cols-3 gap-4 text-sm font-medium text-gray-600 pb-3 border-b border-gray-200 mb-4">
                  <span>Competición</span>
                  <span>Lista Corta</span>
                  <span>Estado</span>
                </div>
                <div className="space-y-3">
                  {filteredAthletes.map((athlete) => (
                    <div
                      key={athlete.id}
                      className="flex items-center space-x-3 p-3 border border-gray-100 rounded-lg hover:shadow-sm transition-shadow"
                    >
                      <Avatar className="h-10 w-10 ring-2 ring-gray-200">
                        <AvatarImage
                          src={athlete.avatar || "/placeholder.svg"}
                          alt={`${athlete.name} - ${athlete.discipline}`}
                          className="object-cover"
                        />
                        <AvatarFallback className="bg-gray-100 text-gray-700 text-sm font-medium">
                          {athlete.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1 grid grid-cols-3 gap-4">
                        <div>
                          <div className="font-medium text-sm text-gray-900">{athlete.name}</div>
                          <div className="text-xs text-gray-500">
                            {athlete.discipline} - {athlete.country}
                          </div>
                        </div>
                        <span className="text-sm text-gray-600">{athlete.listaLarga}</span>
                        <Badge
                          variant={athlete.status === "Confirmado" ? "default" : "secondary"}
                          className={`text-xs w-fit ${athlete.status === "Confirmado" ? "bg-orange-600" : ""}`}
                        >
                          {athlete.status}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Gráfico de Distribución */}
              <div>
                <h4 className="text-sm font-medium mb-4 text-gray-900">Distribución de Atletas</h4>
                <MobileChart type="bar" data={competitionDistributionData} height={280} />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Segunda fila */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Atletas con Proyección */}
        <Card className="lg:col-span-1 hover:shadow-md transition-shadow duration-200 border-gray-200">
          <CardHeader>
            <div className="flex items-center space-x-2">
              <Target className="h-5 w-5 text-gray-700" />
              <CardTitle className="text-base text-gray-900">Atletas</CardTitle>
            </div>
            <div className="flex space-x-4 text-xs text-gray-600">
              <span>Disciplina</span>
              <span>Porcentaje de proyección</span>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {athletesProjectionData.map((athlete, index) => (
                <div key={index} className="space-y-2 p-3 border border-gray-100 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <Avatar className="h-8 w-8 ring-2 ring-gray-200">
                      <AvatarImage
                        src={athlete.avatar || "/placeholder.svg"}
                        alt={`${athlete.name} - ${athlete.discipline}`}
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
                      <div className="flex justify-between items-center">
                        <div>
                          <span className="text-sm font-medium text-gray-900">{athlete.name}</span>
                          <div className="text-xs text-gray-500">
                            {athlete.discipline} - {athlete.country}
                          </div>
                        </div>
                        <span className="text-sm font-bold text-orange-600">{athlete.percentage}%</span>
                      </div>
                    </div>
                  </div>
                  <Progress value={athlete.percentage} className="h-2" />
                  <div className="grid grid-cols-3 gap-2 text-xs text-gray-600 mt-2">
                    <div className="text-center">
                      <div className="font-medium text-gray-900">{athlete.medals}</div>
                      <div>Medallas</div>
                    </div>
                    <div className="text-center">
                      <div className="font-medium text-gray-900">{athlete.competitions}</div>
                      <div>Competencias</div>
                    </div>
                    <div className="text-center">
                      <div className="font-medium text-gray-900">{athlete.economicStimulus}</div>
                      <div>Estímulo</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Presupuesto por Disciplina */}
        <Card className="lg:col-span-1 hover:shadow-md transition-shadow duration-200 border-gray-200">
          <CardHeader>
            <div className="flex items-center space-x-2">
              <DollarSign className="h-5 w-5 text-gray-700" />
              <CardTitle className="text-base text-gray-900">Atletas</CardTitle>
            </div>
            <div className="text-xs text-gray-600">Competición</div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {budgetByDisciplineData.map((item, index) => (
                <div key={index} className="p-3 border border-gray-100 rounded-lg">
                  <div className="flex justify-between text-sm mb-2">
                    <span className="font-medium text-gray-900">{item.budget}</span>
                    <span className="text-gray-600 font-semibold">{item.percentage}%</span>
                  </div>
                  <Progress value={item.percentage} className="h-3" />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Logística por Federación */}
        <Card className="lg:col-span-1 hover:shadow-md transition-shadow duration-200 border-gray-200">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-base text-gray-900">Logística por Competición</CardTitle>
              <div
                className="flex items-center space-x-1 text-gray-600 border border-gray-200 px-2 py-1 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer"
                onClick={() => {
                  const competitions = ["Olimpiadas", "Panamericanos", "Mundial"]
                  const currentIndex = competitions.indexOf(selectedLogisticsCompetition)
                  const nextIndex = (currentIndex + 1) % competitions.length
                  setSelectedLogisticsCompetition(competitions[nextIndex])
                }}
              >
                <span className="text-sm font-medium">{selectedLogisticsCompetition}</span>
                <ChevronDown className="h-4 w-4" />
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="text-sm font-medium text-gray-700">Funciones</div>
              {logisticsByFederationData.map((item, index) => (
                <div key={index} className="flex items-center justify-between p-2 border border-gray-100 rounded-lg">
                  <span className="text-sm text-gray-900">{item.function}</span>
                  <div className="flex items-center space-x-2">
                    <Badge variant="default" className="bg-orange-600">
                      {item.assigned}
                    </Badge>
                    <span className="text-sm text-gray-600">{item.total}</span>
                    <Badge variant="secondary" className="text-xs">
                      {item.status}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Atención por Federación */}
        <Card className="lg:col-span-1 hover:shadow-md transition-shadow duration-200 border-gray-200">
          <CardHeader>
            <CardTitle className="text-base text-gray-900">Acción por Competición</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="text-sm font-medium text-gray-700">Atención</div>
              {attentionByFederationData.map((item, index) => (
                <div key={index} className="flex items-center justify-between p-2 border border-gray-100 rounded-lg">
                  <span className="text-sm text-gray-900">{item.type}</span>
                  <div className="flex items-center space-x-2">
                    <Badge variant="secondary">{item.count}</Badge>
                    <Badge
                      variant={
                        item.priority === "Alta" ? "destructive" : item.priority === "Media" ? "default" : "secondary"
                      }
                      className={`text-xs ${item.priority === "Media" ? "bg-orange-600" : ""}`}
                    >
                      {item.priority}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Logística por Competencia */}
      <Card className="hover:shadow-md transition-shadow duration-200 border-gray-200">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Users className="h-5 w-5 text-gray-700" />
              <CardTitle className="text-gray-900">Logística por Competencia</CardTitle>
            </div>
            <div
              className="flex items-center space-x-1 text-gray-600 border border-gray-200 px-3 py-2 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer"
              onClick={() => {
                const competitions = ["Olimpiadas", "Panamericanos", "Mundial"]
                const currentIndex = competitions.indexOf(selectedLogisticsCompetition)
                const nextIndex = (currentIndex + 1) % competitions.length
                setSelectedLogisticsCompetition(competitions[nextIndex])
              }}
            >
              <span className="text-sm font-medium">{selectedLogisticsCompetition}</span>
              <ChevronDown className="h-4 w-4" />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-3 gap-6 mb-4">
            <div className="text-sm font-medium text-gray-700">Funciones</div>
            <div className="text-sm font-medium text-gray-700">Asignada</div>
            <div className="text-sm font-medium text-gray-700">Completadas</div>
          </div>
          <div className="space-y-4">
            {logisticsCompetitionData.map((item, index) => (
              <div
                key={index}
                className="grid grid-cols-3 gap-6 items-center p-4 border border-gray-100 rounded-lg hover:shadow-sm transition-shadow"
              >
                <span className="text-sm font-medium text-gray-900">{item.role}</span>
                <div className="flex items-center space-x-2">
                  <div className="flex-1 bg-gray-200 rounded-full h-6">
                    <div
                      className="bg-orange-600 h-6 rounded-full flex items-center justify-center text-white text-xs font-medium"
                      style={{ width: `${(item.assigned / item.total) * 100}%` }}
                    >
                      {item.assigned > 0 && item.assigned}
                    </div>
                  </div>
                  <div className="flex-1 bg-gray-200 rounded-full h-6">
                    <div
                      className="bg-gray-600 h-6 rounded-full flex items-center justify-center text-white text-xs font-medium"
                      style={{ width: `${item.percentage}%` }}
                    >
                      {item.percentage > 30 && `${item.percentage}%`}
                    </div>
                  </div>
                </div>
                <span className="text-sm font-medium text-gray-900">{item.percentage}%</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

// Componente Principal
export default function HomePage() {
  const isMobile = useIsMobile()

  return <ResponsiveLayout title="AthleteIQ">{isMobile ? <MobileHomepage /> : <DesktopHomepage />}</ResponsiveLayout>
}
