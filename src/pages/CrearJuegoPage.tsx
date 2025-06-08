"use client"

import type React from "react"

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
import { Button } from "../components/ui/button"
import { Input } from "../components/ui/input"
import { Badge } from "../components/ui/badge"
import { ArrowLeft, CheckCircle, Target, Calendar, Users } from "lucide-react"
import { useNavigate } from "react-router-dom"

export default function CrearJuegoPage() {
  const isMobile = useIsMobile()
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    type: "",
    participants: "",
    relatedCompetition: "",
    startDate: "",
    endDate: "",
    location: "",
    disciplines: [] as string[],
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)

  const availableDisciplines = [
    "Natación",
    "Atletismo",
    "Gimnasia",
    "Ciclismo",
    "Tenis",
    "Fútbol",
    "Baloncesto",
    "Voleibol",
    "Boxeo",
    "Judo",
  ]

  const handleDisciplineChange = (discipline: string, checked: boolean) => {
    setFormData((prev) => ({
      ...prev,
      disciplines: checked ? [...prev.disciplines, discipline] : prev.disciplines.filter((d) => d !== discipline),
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    await new Promise((resolve) => setTimeout(resolve, 2000))

    setIsSubmitting(false)
    setShowSuccess(true)

    setTimeout(() => {
      setFormData({
        name: "",
        description: "",
        type: "",
        participants: "",
        relatedCompetition: "",
        startDate: "",
        endDate: "",
        location: "",
        disciplines: [],
      })
      setShowSuccess(false)
    }, 3000)
  }

  const CardComponent = isMobile ? MobileCard : Card
  const CardHeaderComponent = isMobile ? MobileCardHeader : CardHeader
  const CardContentComponent = isMobile ? MobileCardContent : CardContent
  const CardTitleComponent = isMobile ? MobileCardTitle : CardTitle
  const CardDescriptionComponent = isMobile ? MobileCardDescription : CardDescription

  return (
    <ResponsiveLayout title="Crear Juego" showSearch={false}>
      <div className={isMobile ? "px-4 py-4 space-y-6" : "space-y-6"}>
        {/* Back Button */}
        <Button variant="ghost" size="sm" onClick={() => navigate("/configuracion")} className="mb-2 -ml-2">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Volver a Configuración
        </Button>

        <div className="mb-6">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">Crear Nuevo Juego</h2>
          <p className="text-gray-600">Configura una nueva competencia o evento deportivo</p>
        </div>

        {showSuccess ? (
          <CardComponent>
            <CardContentComponent className="text-center py-8">
              <CheckCircle className="h-16 w-16 text-green-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-green-800 mb-2">¡Juego creado exitosamente!</h3>
              <p className="text-green-600">El juego ha sido configurado y está listo para usar.</p>
            </CardContentComponent>
          </CardComponent>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Información básica */}
            <CardComponent>
              <CardHeaderComponent>
                <CardTitleComponent className="flex items-center gap-2">
                  <Target className="h-5 w-5 text-green-600" />
                  Configuración del Juego
                </CardTitleComponent>
                <CardDescriptionComponent>
                  Define los parámetros y características del nuevo juego o competencia
                </CardDescriptionComponent>
              </CardHeaderComponent>
              <CardContentComponent className="space-y-4">
                <div className="space-y-2">
                  <label htmlFor="name" className="text-sm font-medium">
                    Nombre del juego *
                  </label>
                  <Input
                    id="name"
                    placeholder="Ej: Campeonato Nacional de Natación 2024"
                    value={formData.name}
                    onChange={(e) => setFormData((prev) => ({ ...prev, name: e.target.value }))}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="description" className="text-sm font-medium">
                    Descripción
                  </label>
                  <textarea
                    id="description"
                    placeholder="Descripción detallada del juego o competencia"
                    rows={3}
                    value={formData.description}
                    onChange={(e) => setFormData((prev) => ({ ...prev, description: e.target.value }))}
                    className="flex w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm ring-offset-white placeholder:text-gray-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="type" className="text-sm font-medium">
                    Tipo de competencia *
                  </label>
                  <select
                    id="type"
                    value={formData.type}
                    onChange={(e) => setFormData((prev) => ({ ...prev, type: e.target.value }))}
                    className="flex h-10 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm ring-offset-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500 focus-visible:ring-offset-2"
                    required
                  >
                    <option value="">Seleccionar tipo</option>
                    <option value="nacional">Nacional</option>
                    <option value="internacional">Internacional</option>
                    <option value="regional">Regional</option>
                    <option value="local">Local</option>
                    <option value="amistoso">Amistoso</option>
                  </select>
                </div>
              </CardContentComponent>
            </CardComponent>

            {/* Fechas y ubicación */}
            <CardComponent>
              <CardHeaderComponent>
                <CardTitleComponent className="flex items-center gap-2">
                  <Calendar className="h-5 w-5" />
                  Fechas y Ubicación
                </CardTitleComponent>
              </CardHeaderComponent>
              <CardContentComponent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label htmlFor="startDate" className="text-sm font-medium">
                      Fecha de inicio
                    </label>
                    <Input
                      id="startDate"
                      type="date"
                      value={formData.startDate}
                      onChange={(e) => setFormData((prev) => ({ ...prev, startDate: e.target.value }))}
                    />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="endDate" className="text-sm font-medium">
                      Fecha de fin
                    </label>
                    <Input
                      id="endDate"
                      type="date"
                      value={formData.endDate}
                      onChange={(e) => setFormData((prev) => ({ ...prev, endDate: e.target.value }))}
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label htmlFor="location" className="text-sm font-medium">
                    Ubicación
                  </label>
                  <Input
                    id="location"
                    placeholder="Ciudad, País o instalación deportiva"
                    value={formData.location}
                    onChange={(e) => setFormData((prev) => ({ ...prev, location: e.target.value }))}
                  />
                </div>
              </CardContentComponent>
            </CardComponent>

            {/* Participantes */}
            <CardComponent>
              <CardHeaderComponent>
                <CardTitleComponent className="flex items-center gap-2">
                  <Users className="h-5 w-5" />
                  Participantes
                </CardTitleComponent>
              </CardHeaderComponent>
              <CardContentComponent className="space-y-4">
                <div className="space-y-2">
                  <label htmlFor="participants" className="text-sm font-medium">
                    Lista de participantes *
                  </label>
                  <select
                    id="participants"
                    value={formData.participants}
                    onChange={(e) => setFormData((prev) => ({ ...prev, participants: e.target.value }))}
                    className="flex h-10 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm ring-offset-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500 focus-visible:ring-offset-2"
                    required
                  >
                    <option value="">Seleccionar lista de participantes</option>
                    <option value="lista-larga">Lista Larga (45 atletas)</option>
                    <option value="lista-corta">Lista Corta (12 atletas)</option>
                    <option value="custom">Selección personalizada</option>
                    <option value="open">Inscripción abierta</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label htmlFor="relatedCompetition" className="text-sm font-medium">
                    Competencia relacionada
                  </label>
                  <select
                    id="relatedCompetition"
                    value={formData.relatedCompetition}
                    onChange={(e) => setFormData((prev) => ({ ...prev, relatedCompetition: e.target.value }))}
                    className="flex h-10 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm ring-offset-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500 focus-visible:ring-offset-2"
                  >
                    <option value="">Seleccionar competencia</option>
                    <option value="panamericanos-2024">Panamericanos 2024</option>
                    <option value="mundial-2024">Mundial 2024</option>
                    <option value="olimpicos-2024">Olímpicos 2024</option>
                    <option value="sudamericanos-2024">Sudamericanos 2024</option>
                    <option value="none">Ninguna</option>
                  </select>
                </div>
              </CardContentComponent>
            </CardComponent>

            {/* Disciplinas */}
            <CardComponent>
              <CardHeaderComponent>
                <CardTitleComponent>Disciplinas Deportivas</CardTitleComponent>
                <CardDescriptionComponent>
                  Selecciona las disciplinas que formarán parte de este juego
                </CardDescriptionComponent>
              </CardHeaderComponent>
              <CardContentComponent className="space-y-4">
                <div className="grid grid-cols-2 gap-3">
                  {availableDisciplines.map((discipline) => (
                    <div key={discipline} className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        id={discipline}
                        checked={formData.disciplines.includes(discipline)}
                        onChange={(e) => handleDisciplineChange(discipline, e.target.checked)}
                        className="w-4 h-4 text-orange-600 border-gray-300 rounded focus:ring-orange-500"
                      />
                      <label htmlFor={discipline} className="text-sm cursor-pointer">
                        {discipline}
                      </label>
                    </div>
                  ))}
                </div>
              </CardContentComponent>
            </CardComponent>

            {/* Resumen de disciplinas seleccionadas */}
            {formData.disciplines.length > 0 && (
              <CardComponent>
                <CardContentComponent>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Disciplinas seleccionadas:</label>
                    <div className="flex flex-wrap gap-2">
                      {formData.disciplines.map((discipline) => (
                        <Badge key={discipline} variant="secondary">
                          {discipline}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </CardContentComponent>
              </CardComponent>
            )}

            <div className="flex gap-4 pt-4">
              <Button
                type="submit"
                disabled={isSubmitting || !formData.name || !formData.type || !formData.participants}
                className="flex-1"
              >
                {isSubmitting ? "Creando juego..." : "Crear Juego"}
              </Button>
              <Button type="button" variant="outline" onClick={() => navigate("/configuracion")}>
                Cancelar
              </Button>
            </div>
          </form>
        )}
      </div>
    </ResponsiveLayout>
  )
}
