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
    value: "8",
    icon: <Trophy className="h-5 w-5" />,
    trend: "+2",
    trendUp: true,
  },
  {
    title: "Medallas 2024",
    value: "59",
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
  { year: "2016", oro: 2, plata: 1, bronce: 1, total: 4 },
  { year: "2019", oro: 3, plata: 2, bronce: 2, total: 7 },
  { year: "2020", oro: 4, plata: 2, bronce: 2, total: 8 },
  { year: "2022", oro: 6, plata: 3, bronce: 1, total: 10 },
  { year: "2023", oro: 8, plata: 3, bronce: 2, total: 13 },
  { year: "2024", oro: 9, plata: 2, bronce: 1, total: 12 },
]

// Atletas para competencias futuras
const athletesCompetitionData = [
  {
    id: 1,
    name: "Laura García",
    avatar: "/avatars/laura-garcia.png",
    listaLarga: "Leta",
    listaCorta: 2,
    discipline: "Natación",
    status: "Confirmado",
  },
  {
    id: 2,
    name: "Carlos Santos",
    avatar: "/avatars/carlos-santos.png",
    listaLarga: "Laten",
    listaCorta: 4,
    discipline: "Atletismo",
    status: "Pendiente",
  },
  {
    id: 3,
    name: "Ana Martinez",
    avatar: "/avatars/ana-martinez.png",
    listaLarga: "Aflet",
    listaCorta: 3,
    discipline: "Gimnasia",
    status: "Confirmado",
  },
  {
    id: 4,
    name: "Daniel Lopez",
    avatar: "/avatars/daniel-lopez.jpg",
    listaLarga: "Mañana",
    listaCorta: 2,
    discipline: "Ciclismo",
    status: "Confirmado",
  },
  {
    id: 5,
    name: "David Gomez",
    avatar: "/avatars/david-gomez.png",
    listaLarga: "Dromíngiez",
    listaCorta: 1,
    discipline: "Tenis",
    status: "Evaluando",
  },
]

// Datos de distribución de competencias
const competitionDistributionData = [
  { name: "Disponibles", value: 50, color: "#374151" },
  { name: "Lista Larga", value: 75, color: "#ea580c" },
  { name: "Cupos Dipó.", value: 25, color: "#9ca3af" },
]

// Atletas con porcentajes de proyección
const athletesProjectionData = [
  { name: "Juan Pérez", percentage: 75, avatar: "/avatars/juan-perez.png", discipline: "Natación" },
  { name: "Andrés Torres", percentage: 82, avatar: "/avatars/andres-torres.png", discipline: "Atletismo" },
  { name: "Luis Rodríguez", percentage: 65, avatar: "/avatars/luis-rodriguez.png", discipline: "Gimnasia" },
  { name: "Javier Hernández", percentage: 53, avatar: "/avatars/javier-hernandez.png", discipline: "Ciclismo" },
]

// Datos de presupuesto por disciplina
const budgetByDisciplineData = [
  { discipline: "Gimnasia", budget: "Presupuesto Total", percentage: 85 },
  { discipline: "Atletismo", budget: "Adigandas", percentage: 70 },
  { discipline: "Natación", budget: "Completadas", percentage: 60 },
  { discipline: "Ciclismo", budget: "Personas Necesarias", percentage: 90 },
  { discipline: "Tenis", budget: "Asignadas", percentage: 75 },
]

// Datos de logística por federación
const logisticsByFederationData = [
  { function: "Asigrtadas", assigned: 4, total: 4, status: "Completo" },
  { function: "Completadas", assigned: 3, total: 3, status: "Completo" },
  { function: "Asignadas", assigned: 7, total: 7, status: "Completo" },
]

// Datos de atención por federación
const attentionByFederationData = [
  { type: "Técnica", count: 3, priority: "Alta" },
  { type: "Médica", count: 2, priority: "Media" },
  { type: "Legal", count: 1, priority: "Baja" },
]

// Datos de logística por competencia
const logisticsCompetitionData = [
  { role: "Acompañante de misión", assigned: 2, total: 2, percentage: 50 },
  { role: "Utilero", assigned: 1, total: 2, percentage: 25 },
  { role: "Comptador de pasajes", assigned: 2, total: 3, percentage: 67 },
]

// Componente Mobile
function MobileHomepage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCompetition, setSelectedCompetition] = useState("Juegos Panamericanos")
  const [selectedLogisticsCompetition, setSelectedLogisticsCompetition] = useState("Juegos Olímpicos")

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
              <MobileCardTitle className="text-gray-900">Competencias Futuras</MobileCardTitle>
            </div>
            <div className="flex items-center space-x-1 text-sm text-gray-600 border border-gray-200 px-2 py-1 rounded-md">
              <span className="font-medium">{selectedCompetition}</span>
              <ChevronDown className="h-4 w-4" />
            </div>
          </div>
        </MobileCardHeader>
        <MobileCardContent>
          <div className="space-y-4">
            {/* Lista de Atletas */}
            <div>
              <div className="grid grid-cols-3 gap-2 text-xs font-medium text-gray-600 pb-2 border-b border-gray-200 mb-3">
                <span>Lista Larga</span>
                <span>Lista Corta</span>
                <span>Estado</span>
              </div>
              <div className="space-y-3">
                {athletesCompetitionData.map((athlete) => (
                  <div key={athlete.id} className="flex items-center space-x-3 p-3 border border-gray-100 rounded-lg">
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
                    <div className="flex-1 grid grid-cols-3 gap-2 text-sm">
                      <div>
                        <div className="font-medium text-gray-900">{athlete.name}</div>
                        <div className="text-xs text-gray-500">{athlete.discipline}</div>
                      </div>
                      <span className="text-gray-600">{athlete.listaLarga}</span>
                      <Badge
                        variant={athlete.status === "Confirmado" ? "default" : "secondary"}
                        className={`text-xs ${athlete.status === "Confirmado" ? "bg-orange-600" : ""}`}
                      >
                        {athlete.status}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Gráfico de Distribución */}
            <div className="pt-4 border-t border-gray-200">
              <h4 className="text-sm font-medium mb-3 text-gray-900">Distribución de Atletas</h4>
              <MobileChart type="pie" data={competitionDistributionData} height={180} />
            </div>
          </div>
        </MobileCardContent>
      </MobileCard>

      {/* Atletas con Proyección */}
      <MobileCard className="border-gray-200">
        <MobileCardHeader>
          <div className="flex items-center space-x-2">
            <Target className="h-5 w-5 text-gray-700" />
            <MobileCardTitle className="text-gray-900">Atletas - Porcentaje de Proyección</MobileCardTitle>
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
                        <div className="text-xs text-gray-500">{athlete.discipline}</div>
                      </div>
                      <span className="text-sm font-bold text-orange-600">{athlete.percentage}%</span>
                    </div>
                  </div>
                </div>
                <Progress value={athlete.percentage} className="h-2" />
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
            <MobileCardTitle className="text-gray-900">Atletas por Disciplina</MobileCardTitle>
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
            <MobileCardTitle className="text-gray-900">Logística por Federación</MobileCardTitle>
            <div className="flex items-center space-x-1 text-gray-600 border border-gray-200 px-2 py-1 rounded-md">
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
          <MobileCardTitle className="text-gray-900">Acción por Federación</MobileCardTitle>
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
            <div className="flex items-center space-x-1 text-gray-600 border border-gray-200 px-2 py-1 rounded-md">
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
  const [selectedCompetition, setSelectedCompetition] = useState("Juegos Panamericanos")
  const [selectedLogisticsCompetition, setSelectedLogisticsCompetition] = useState("Juegos Olímpicos")

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
                <CardTitle className="text-gray-900">Competencias Futuras</CardTitle>
              </div>
              <div className="flex items-center space-x-2 text-gray-600 border border-gray-200 px-3 py-2 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer">
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
                  <span>Lista Larga</span>
                  <span>Lista Corta</span>
                  <span>Estado</span>
                </div>
                <div className="space-y-3">
                  {athletesCompetitionData.map((athlete) => (
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
                          <div className="text-xs text-gray-500">{athlete.discipline}</div>
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
                <MobileChart type="pie" data={competitionDistributionData} height={280} />
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
                          <div className="text-xs text-gray-500">{athlete.discipline}</div>
                        </div>
                        <span className="text-sm font-bold text-orange-600">{athlete.percentage}%</span>
                      </div>
                    </div>
                  </div>
                  <Progress value={athlete.percentage} className="h-2" />
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
            <div className="text-xs text-gray-600">Disciplina</div>
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
              <CardTitle className="text-base text-gray-900">Logística por Federación</CardTitle>
              <div className="flex items-center space-x-1 text-gray-600 border border-gray-200 px-2 py-1 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer">
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
            <CardTitle className="text-base text-gray-900">Acción por Federación</CardTitle>
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
            <div className="flex items-center space-x-1 text-gray-600 border border-gray-200 px-3 py-2 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer">
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
