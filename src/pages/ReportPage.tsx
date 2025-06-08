"use client"

import { useState, useMemo } from "react"
import { useIsMobile } from "../hooks/use-media-query"
import { ResponsiveLayout } from "../components/layouts/responsive-layout"
import { Card, CardHeader, CardContent, CardTitle } from "../components/ui/card"
import { MobileCard, MobileCardContent } from "../components/ui/mobile-card"
import { Input } from "../components/ui/input"
import { Badge } from "../components/ui/badge"
import { Button } from "../components/ui/button"
import { MobileChart } from "../components/charts/mobile-chart"
import {
  Search,
  Filter,
  Download,
  Calendar,
  FileText,
  TrendingUp,
  DollarSign,
  Medal,
  BarChart3,
  Trophy,
  Target,
  Truck,
  PieChart,
  Heart,
  Calculator,
  Clock,
  Settings,
  Play,
  Pause,
  X,
  Plus,
  Eye,
} from "lucide-react"

export interface ReportTemplate {
  id: number
  name: string
  description: string
  category: "Rendimiento" | "Financiero" | "Competencias" | "Atletas" | "Logística"
  type: "Predefinido" | "Personalizado"
  lastGenerated?: string
  frequency: "Diario" | "Semanal" | "Mensual" | "Trimestral" | "Anual" | "Bajo demanda"
  status: "Activo" | "Inactivo" | "Programado"
  parameters: {
    dateRange: boolean
    athletes: boolean
    competitions: boolean
    disciplines: boolean
    budget: boolean
  }
  charts: string[]
  exportFormats: ("PDF" | "Excel" | "CSV" | "PowerPoint")[]
  icon: string
  priority: "Alta" | "Media" | "Baja"
}

export const reportTemplates: ReportTemplate[] = [
  {
    id: 1,
    name: "Rendimiento de Atletas",
    description: "Análisis completo del rendimiento individual y grupal de atletas por disciplina y período",
    category: "Rendimiento",
    type: "Predefinido",
    lastGenerated: "2024-11-15",
    frequency: "Mensual",
    status: "Activo",
    parameters: {
      dateRange: true,
      athletes: true,
      competitions: true,
      disciplines: true,
      budget: false,
    },
    charts: ["Gráfico de barras", "Línea de tiempo", "Radar de habilidades"],
    exportFormats: ["PDF", "Excel", "PowerPoint"],
    icon: "TrendingUp",
    priority: "Alta",
  },
  {
    id: 2,
    name: "Análisis Financiero",
    description: "Reporte detallado de presupuestos, gastos y ROI por competencia y disciplina",
    category: "Financiero",
    type: "Predefinido",
    lastGenerated: "2024-11-10",
    frequency: "Trimestral",
    status: "Activo",
    parameters: {
      dateRange: true,
      athletes: false,
      competitions: true,
      disciplines: true,
      budget: true,
    },
    charts: ["Gráfico de pastel", "Barras comparativas", "Línea de tendencia"],
    exportFormats: ["PDF", "Excel", "CSV"],
    icon: "DollarSign",
    priority: "Alta",
  },
  {
    id: 3,
    name: "Medallas y Logros",
    description: "Resumen de medallas obtenidas, récords establecidos y logros destacados",
    category: "Competencias",
    type: "Predefinido",
    lastGenerated: "2024-11-12",
    frequency: "Mensual",
    status: "Activo",
    parameters: {
      dateRange: true,
      athletes: true,
      competitions: true,
      disciplines: true,
      budget: false,
    },
    charts: ["Gráfico de medallas", "Comparativo histórico", "Ranking por disciplina"],
    exportFormats: ["PDF", "PowerPoint"],
    icon: "Medal",
    priority: "Alta",
  },
  {
    id: 4,
    name: "Análisis por Disciplina",
    description: "Comparativa de rendimiento, inversión y resultados por cada disciplina deportiva",
    category: "Rendimiento",
    type: "Predefinido",
    lastGenerated: "2024-11-08",
    frequency: "Mensual",
    status: "Activo",
    parameters: {
      dateRange: true,
      athletes: true,
      competitions: true,
      disciplines: true,
      budget: true,
    },
    charts: ["Comparativo de disciplinas", "ROI por disciplina", "Evolución temporal"],
    exportFormats: ["PDF", "Excel"],
    icon: "BarChart3",
    priority: "Media",
  },
  {
    id: 5,
    name: "Reporte de Competencias",
    description: "Análisis detallado de participación, resultados y logística de competencias",
    category: "Competencias",
    type: "Predefinido",
    lastGenerated: "2024-11-14",
    frequency: "Bajo demanda",
    status: "Activo",
    parameters: {
      dateRange: true,
      athletes: true,
      competitions: true,
      disciplines: true,
      budget: true,
    },
    charts: ["Mapa de competencias", "Timeline de eventos", "Análisis de resultados"],
    exportFormats: ["PDF", "PowerPoint", "Excel"],
    icon: "Trophy",
    priority: "Media",
  },
  {
    id: 6,
    name: "Proyección Olímpica",
    description: "Análisis predictivo de atletas con potencial olímpico y recomendaciones estratégicas",
    category: "Atletas",
    type: "Personalizado",
    lastGenerated: "2024-11-05",
    frequency: "Trimestral",
    status: "Programado",
    parameters: {
      dateRange: true,
      athletes: true,
      competitions: true,
      disciplines: true,
      budget: true,
    },
    charts: ["Matriz de potencial", "Proyección de rendimiento", "Análisis SWOT"],
    exportFormats: ["PDF", "PowerPoint"],
    icon: "Target",
    priority: "Alta",
  },
  {
    id: 7,
    name: "Eficiencia Logística",
    description: "Análisis de costos y eficiencia en la gestión logística de delegaciones",
    category: "Logística",
    type: "Predefinido",
    lastGenerated: "2024-11-01",
    frequency: "Trimestral",
    status: "Activo",
    parameters: {
      dateRange: true,
      athletes: false,
      competitions: true,
      disciplines: false,
      budget: true,
    },
    charts: ["Costos por categoría", "Eficiencia temporal", "Comparativo de proveedores"],
    exportFormats: ["Excel", "CSV"],
    icon: "Truck",
    priority: "Media",
  },
  {
    id: 8,
    name: "Dashboard Ejecutivo",
    description: "Resumen ejecutivo con KPIs principales y métricas de alto nivel",
    category: "Rendimiento",
    type: "Predefinido",
    lastGenerated: "2024-11-16",
    frequency: "Semanal",
    status: "Activo",
    parameters: {
      dateRange: true,
      athletes: true,
      competitions: true,
      disciplines: true,
      budget: true,
    },
    charts: ["KPIs principales", "Tendencias clave", "Alertas y notificaciones"],
    exportFormats: ["PDF", "PowerPoint"],
    icon: "PieChart",
    priority: "Alta",
  },
  {
    id: 9,
    name: "Análisis de Lesiones",
    description: "Seguimiento de lesiones, tiempos de recuperación y prevención",
    category: "Atletas",
    type: "Personalizado",
    frequency: "Mensual",
    status: "Inactivo",
    parameters: {
      dateRange: true,
      athletes: true,
      competitions: false,
      disciplines: true,
      budget: false,
    },
    charts: ["Incidencia de lesiones", "Tiempo de recuperación", "Factores de riesgo"],
    exportFormats: ["PDF", "Excel"],
    icon: "Heart",
    priority: "Media",
  },
  {
    id: 10,
    name: "ROI por Inversión",
    description: "Análisis de retorno de inversión en atletas, equipamiento y programas",
    category: "Financiero",
    type: "Personalizado",
    lastGenerated: "2024-10-28",
    frequency: "Anual",
    status: "Programado",
    parameters: {
      dateRange: true,
      athletes: true,
      competitions: true,
      disciplines: true,
      budget: true,
    },
    charts: ["ROI por atleta", "Costo-beneficio", "Proyección financiera"],
    exportFormats: ["PDF", "Excel", "PowerPoint"],
    icon: "Calculator",
    priority: "Alta",
  },
]

// Datos para gráficos de ejemplo
export const sampleChartData = {
  athletePerformance: [
    { name: "Ene", value: 75 },
    { name: "Feb", value: 78 },
    { name: "Mar", value: 82 },
    { name: "Abr", value: 79 },
    { name: "May", value: 85 },
    { name: "Jun", value: 88 },
    { name: "Jul", value: 92 },
    { name: "Ago", value: 89 },
    { name: "Sep", value: 94 },
    { name: "Oct", value: 91 },
    { name: "Nov", value: 96 },
  ],
  budgetDistribution: [
    { name: "Natación", value: 35, color: "#3b82f6" },
    { name: "Atletismo", value: 25, color: "#ef4444" },
    { name: "Gimnasia", value: 20, color: "#10b981" },
    { name: "Ciclismo", value: 12, color: "#f59e0b" },
    { name: "Tenis", value: 8, color: "#8b5cf6" },
  ],
  medalsHistory: [
    { year: "2020", oro: 4, plata: 2, bronce: 2 },
    { year: "2021", oro: 6, plata: 3, bronce: 1 },
    { year: "2022", oro: 8, plata: 3, bronce: 2 },
    { year: "2023", oro: 9, plata: 2, bronce: 1 },
    { year: "2024", oro: 12, plata: 4, bronce: 3 },
  ],
}


// Mapeo de iconos
const iconMap = {
  TrendingUp,
  DollarSign,
  Medal,
  BarChart3,
  Trophy,
  Target,
  Truck,
  PieChart,
  Heart,
  Calculator,
}


// Componente para mostrar el estado del reporte
function ReportStatus({ status }: { status: ReportTemplate["status"] }) {
  const getStatusConfig = (status: ReportTemplate["status"]) => {
    switch (status) {
      case "Activo":
        return { variant: "default", icon: <Play className="h-3 w-3" /> }
      case "Programado":
        return { variant: "warning", icon: <Clock className="h-3 w-3" /> }
      case "Inactivo":
        return { variant: "secondary", icon: <Pause className="h-3 w-3" /> }
      default:
        return { variant: "secondary", icon: <Pause className="h-3 w-3" /> }
    }
  }

  const config = getStatusConfig(status)

  return (
    <Badge variant={config.variant as any} className="text-xs">
      <div className="flex items-center space-x-1">
        {config.icon}
        <span>{status}</span>
      </div>
    </Badge>
  )
}

// Componente para mostrar los parámetros del reporte
function ReportParameters({ parameters }: { parameters: ReportTemplate["parameters"] }) {
  const activeParams = Object.entries(parameters)
    .filter(([_, value]) => value)
    .map(([key, _]) => {
      const labels = {
        dateRange: "Rango de fechas",
        athletes: "Atletas",
        competitions: "Competencias",
        disciplines: "Disciplinas",
        budget: "Presupuesto",
      }
      return labels[key as keyof typeof labels]
    })

  return (
    <div className="flex flex-wrap gap-1">
      {activeParams.map((param, index) => (
        <Badge key={index} variant="outline" className="text-xs">
          {param}
        </Badge>
      ))}
    </div>
  )
}

// Componente para generar reporte
function GenerateReportModal({ report, onClose }: { report: ReportTemplate; onClose: () => void }) {
  const [isGenerating, setIsGenerating] = useState(false)
  const [selectedFormat, setSelectedFormat] = useState<string>(report.exportFormats[0])
  const [dateRange, setDateRange] = useState({ start: "", end: "" })

  const handleGenerate = async () => {
    setIsGenerating(true)
    // Simular generación de reporte
    await new Promise((resolve) => setTimeout(resolve, 3000))
    setIsGenerating(false)
    onClose()
  }

  const IconComponent = iconMap[report.icon as keyof typeof iconMap] || FileText

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg max-w-md w-full max-h-[90vh] overflow-y-auto">
        <div className="p-4 border-b border-gray-200 flex items-center justify-between">
          <h3 className="text-lg font-semibold">Generar Reporte</h3>
          <Button variant="ghost" size="sm" onClick={onClose} className="p-1">
            <X className="h-5 w-5" />
          </Button>
        </div>

        <div className="p-4 space-y-4">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-gray-50 rounded-lg">
              <IconComponent className="h-5 w-5 text-gray-700" />
            </div>
            <div>
              <h4 className="font-medium">{report.name}</h4>
              <p className="text-sm text-gray-600">{report.category}</p>
            </div>
          </div>

          <div className="space-y-3">
            <div>
              <label className="text-sm font-medium">Formato de exportación</label>
              <div className="flex flex-wrap gap-2 mt-1">
                {report.exportFormats.map((format) => (
                  <Badge
                    key={format}
                    variant={selectedFormat === format ? "default" : "outline"}
                    className={`cursor-pointer ${selectedFormat === format ? "bg-orange-600" : ""}`}
                    onClick={() => setSelectedFormat(format)}
                  >
                    {format}
                  </Badge>
                ))}
              </div>
            </div>

            {report.parameters.dateRange && (
              <div>
                <label className="text-sm font-medium">Rango de fechas</label>
                <div className="grid grid-cols-2 gap-2 mt-1">
                  <Input
                    type="date"
                    value={dateRange.start}
                    onChange={(e) => setDateRange((prev) => ({ ...prev, start: e.target.value }))}
                    className="text-sm"
                  />
                  <Input
                    type="date"
                    value={dateRange.end}
                    onChange={(e) => setDateRange((prev) => ({ ...prev, end: e.target.value }))}
                    className="text-sm"
                  />
                </div>
              </div>
            )}

            <div>
              <label className="text-sm font-medium">Parámetros incluidos</label>
              <div className="mt-1">
                <ReportParameters parameters={report.parameters} />
              </div>
            </div>

            <div>
              <label className="text-sm font-medium">Gráficos incluidos</label>
              <div className="mt-1 space-y-1">
                {report.charts.map((chart, index) => (
                  <div key={index} className="text-sm text-gray-600 flex items-center space-x-2">
                    <BarChart3 className="h-3 w-3" />
                    <span>{chart}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="flex space-x-2 pt-4">
            <Button onClick={handleGenerate} disabled={isGenerating} className="flex-1">
              {isGenerating ? "Generando..." : `Generar ${selectedFormat}`}
            </Button>
            <Button variant="outline" onClick={onClose}>
              Cancelar
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

// Componente para vista previa de reporte
function ReportPreview({ report, onClose }: { report: ReportTemplate; onClose: () => void }) {
  const IconComponent = iconMap[report.icon as keyof typeof iconMap] || FileText

  return (
    <div className="fixed inset-0 bg-white z-50 overflow-y-auto">
      <div className="sticky top-0 bg-white border-b border-gray-200 p-4 flex items-center justify-between">
        <h2 className="text-lg font-bold">Vista Previa - {report.name}</h2>
        <Button variant="ghost" size="sm" onClick={onClose} className="p-1">
          <X className="h-5 w-5" />
        </Button>
      </div>

      <div className="p-4 space-y-6">
        {/* Header del reporte */}
        <div className="text-center space-y-2">
          <div className="flex justify-center">
            <div className="p-3 bg-orange-50 rounded-lg">
              <IconComponent className="h-8 w-8 text-orange-600" />
            </div>
          </div>
          <h1 className="text-2xl font-bold">{report.name}</h1>
          <p className="text-gray-600">{report.description}</p>
          <div className="flex justify-center space-x-2">
            <Badge variant="outline">{report.category}</Badge>
            <Badge variant="secondary">{new Date().toLocaleDateString()}</Badge>
          </div>
        </div>

        {/* Gráficos de ejemplo */}
        <div className="space-y-6">
          {report.category === "Rendimiento" && (
            <Card>
              <CardHeader>
                <CardTitle>Evolución del Rendimiento</CardTitle>
              </CardHeader>
              <CardContent>
                <MobileChart type="line" data={sampleChartData.athletePerformance} height={250} />
              </CardContent>
            </Card>
          )}

          {report.category === "Financiero" && (
            <Card>
              <CardHeader>
                <CardTitle>Distribución del Presupuesto</CardTitle>
              </CardHeader>
              <CardContent>
                <MobileChart type="pie" data={sampleChartData.budgetDistribution} height={250} />
              </CardContent>
            </Card>
          )}

          {report.category === "Competencias" && (
            <Card>
              <CardHeader>
                <CardTitle>Historial de Medallas</CardTitle>
              </CardHeader>
              <CardContent>
                <MobileChart type="bar" data={sampleChartData.medalsHistory} height={250} />
              </CardContent>
            </Card>
          )}

          {/* Tabla de datos de ejemplo */}
          <Card>
            <CardHeader>
              <CardTitle>Datos Detallados</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-gray-200">
                      <th className="text-left p-2">Atleta</th>
                      <th className="text-left p-2">Disciplina</th>
                      <th className="text-left p-2">Rendimiento</th>
                      <th className="text-left p-2">Medallas</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-gray-100">
                      <td className="p-2">Laura García</td>
                      <td className="p-2">Natación</td>
                      <td className="p-2">92%</td>
                      <td className="p-2">🥇 3 🥈 2 🥉 1</td>
                    </tr>
                    <tr className="border-b border-gray-100">
                      <td className="p-2">Carlos Santos</td>
                      <td className="p-2">Atletismo</td>
                      <td className="p-2">89%</td>
                      <td className="p-2">🥇 2 🥈 4 🥉 3</td>
                    </tr>
                    <tr className="border-b border-gray-100">
                      <td className="p-2">Ana Martinez</td>
                      <td className="p-2">Gimnasia</td>
                      <td className="p-2">95%</td>
                      <td className="p-2">🥇 5 🥈 2 🥉 1</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>

          {/* Resumen y conclusiones */}
          <Card>
            <CardHeader>
              <CardTitle>Resumen Ejecutivo</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="p-3 bg-green-50 rounded-lg">
                  <h4 className="font-medium text-green-800">Logros Destacados</h4>
                  <p className="text-sm text-green-700 mt-1">
                    Incremento del 15% en el rendimiento general comparado con el período anterior.
                  </p>
                </div>
                <div className="p-3 bg-blue-50 rounded-lg">
                  <h4 className="font-medium text-blue-800">Áreas de Oportunidad</h4>
                  <p className="text-sm text-blue-700 mt-1">
                    Optimización de presupuesto en disciplinas con menor ROI identificado.
                  </p>
                </div>
                <div className="p-3 bg-orange-50 rounded-lg">
                  <h4 className="font-medium text-orange-800">Recomendaciones</h4>
                  <p className="text-sm text-orange-700 mt-1">
                    Incrementar inversión en atletas con proyección olímpica identificados.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

// Agregar el componente CreateCustomReportModal después del componente ReportPreview y antes del componente MobileReports

// Componente para crear reporte personalizado
function CreateCustomReportModal({
  onClose,
  onSave,
}: { onClose: () => void; onSave: (report: Partial<ReportTemplate>) => void }) {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    category: "Rendimiento" as ReportTemplate["category"],
    frequency: "Mensual" as ReportTemplate["frequency"],
    priority: "Media" as ReportTemplate["priority"],
    parameters: {
      dateRange: true,
      athletes: false,
      competitions: false,
      disciplines: false,
      budget: false,
    },
    charts: [] as string[],
    exportFormats: ["PDF"] as ("PDF" | "Excel" | "CSV" | "PowerPoint")[],
    icon: "FileText",
  })

  const [availableCharts] = useState([
    "Gráfico de barras",
    "Línea de tiempo",
    "Gráfico de pastel",
    "Radar de habilidades",
    "Comparativo histórico",
    "Matriz de potencial",
    "Análisis de tendencias",
    "Mapa de calor",
    "Gráfico de dispersión",
    "Timeline de eventos",
  ])

  const [availableIcons] = useState([
    { name: "TrendingUp", label: "Tendencia" },
    { name: "BarChart3", label: "Gráfico de barras" },
    { name: "PieChart", label: "Gráfico circular" },
    { name: "Target", label: "Objetivo" },
    { name: "Trophy", label: "Trofeo" },
    { name: "Medal", label: "Medalla" },
    { name: "DollarSign", label: "Financiero" },
    { name: "Calculator", label: "Calculadora" },
    { name: "Heart", label: "Salud" },
    { name: "Truck", label: "Logística" },
  ])

  const handleParameterChange = (param: keyof typeof formData.parameters) => {
    setFormData((prev) => ({
      ...prev,
      parameters: {
        ...prev.parameters,
        [param]: !prev.parameters[param],
      },
    }))
  }

  const handleChartToggle = (chart: string) => {
    setFormData((prev) => ({
      ...prev,
      charts: prev.charts.includes(chart) ? prev.charts.filter((c) => c !== chart) : [...prev.charts, chart],
    }))
  }

  const handleFormatToggle = (format: "PDF" | "Excel" | "CSV" | "PowerPoint") => {
    setFormData((prev) => ({
      ...prev,
      exportFormats: prev.exportFormats.includes(format)
        ? prev.exportFormats.filter((f) => f !== format)
        : [...prev.exportFormats, format],
    }))
  }

  const handleSave = () => {
    if (!formData.name.trim() || !formData.description.trim()) {
      alert("Por favor completa el nombre y descripción del reporte")
      return
    }

    if (formData.charts.length === 0) {
      alert("Por favor selecciona al menos un gráfico")
      return
    }

    const newReport: Partial<ReportTemplate> = {
      ...formData,
      id: Date.now(), // ID temporal
      type: "Personalizado",
      status: "Activo",
    }

    onSave(newReport)
    onClose()
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-4 border-b border-gray-200 flex items-center justify-between">
          <h3 className="text-lg font-semibold">Crear Reporte Personalizado</h3>
          <Button variant="ghost" size="sm" onClick={onClose} className="p-1">
            <X className="h-5 w-5" />
          </Button>
        </div>

        <div className="p-6 space-y-6">
          {/* Información básica */}
          <div className="space-y-4">
            <h4 className="font-medium text-gray-900">Información Básica</h4>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Nombre del Reporte *</label>
              <Input
                value={formData.name}
                onChange={(e) => setFormData((prev) => ({ ...prev, name: e.target.value }))}
                placeholder="Ej: Análisis de Rendimiento Trimestral"
                className="w-full"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Descripción *</label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData((prev) => ({ ...prev, description: e.target.value }))}
                placeholder="Describe el propósito y contenido del reporte..."
                className="w-full p-2 border border-gray-300 rounded-md resize-none h-20 text-sm"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Categoría</label>
                <select
                  value={formData.category}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, category: e.target.value as ReportTemplate["category"] }))
                  }
                  className="w-full p-2 border border-gray-300 rounded-md text-sm"
                >
                  <option value="Rendimiento">Rendimiento</option>
                  <option value="Financiero">Financiero</option>
                  <option value="Competencias">Competencias</option>
                  <option value="Atletas">Atletas</option>
                  <option value="Logística">Logística</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Frecuencia</label>
                <select
                  value={formData.frequency}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, frequency: e.target.value as ReportTemplate["frequency"] }))
                  }
                  className="w-full p-2 border border-gray-300 rounded-md text-sm"
                >
                  <option value="Diario">Diario</option>
                  <option value="Semanal">Semanal</option>
                  <option value="Mensual">Mensual</option>
                  <option value="Trimestral">Trimestral</option>
                  <option value="Anual">Anual</option>
                  <option value="Bajo demanda">Bajo demanda</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Prioridad</label>
                <select
                  value={formData.priority}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, priority: e.target.value as ReportTemplate["priority"] }))
                  }
                  className="w-full p-2 border border-gray-300 rounded-md text-sm"
                >
                  <option value="Baja">Baja</option>
                  <option value="Media">Media</option>
                  <option value="Alta">Alta</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Icono</label>
                <select
                  value={formData.icon}
                  onChange={(e) => setFormData((prev) => ({ ...prev, icon: e.target.value }))}
                  className="w-full p-2 border border-gray-300 rounded-md text-sm"
                >
                  {availableIcons.map((icon) => (
                    <option key={icon.name} value={icon.name}>
                      {icon.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Parámetros */}
          <div className="space-y-4">
            <h4 className="font-medium text-gray-900">Parámetros del Reporte</h4>
            <div className="grid grid-cols-2 gap-3">
              {Object.entries(formData.parameters).map(([key, value]) => {
                const labels = {
                  dateRange: "Rango de fechas",
                  athletes: "Atletas",
                  competitions: "Competencias",
                  disciplines: "Disciplinas",
                  budget: "Presupuesto",
                }

                return (
                  <label key={key} className="flex items-center space-x-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={value}
                      onChange={() => handleParameterChange(key as keyof typeof formData.parameters)}
                      className="rounded border-gray-300"
                    />
                    <span className="text-sm">{labels[key as keyof typeof labels]}</span>
                  </label>
                )
              })}
            </div>
          </div>

          {/* Gráficos */}
          <div className="space-y-4">
            <h4 className="font-medium text-gray-900">Gráficos Incluidos *</h4>
            <div className="grid grid-cols-2 gap-2">
              {availableCharts.map((chart) => (
                <label key={chart} className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.charts.includes(chart)}
                    onChange={() => handleChartToggle(chart)}
                    className="rounded border-gray-300"
                  />
                  <span className="text-sm">{chart}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Formatos de exportación */}
          <div className="space-y-4">
            <h4 className="font-medium text-gray-900">Formatos de Exportación</h4>
            <div className="flex flex-wrap gap-2">
              {(["PDF", "Excel", "CSV", "PowerPoint"] as const).map((format) => (
                <Badge
                  key={format}
                  variant={formData.exportFormats.includes(format) ? "default" : "outline"}
                  className={`cursor-pointer ${formData.exportFormats.includes(format) ? "bg-orange-600" : ""}`}
                  onClick={() => handleFormatToggle(format)}
                >
                  {format}
                </Badge>
              ))}
            </div>
          </div>
        </div>

        <div className="p-4 border-t border-gray-200 flex justify-end space-x-2">
          <Button variant="outline" onClick={onClose}>
            Cancelar
          </Button>
          <Button onClick={handleSave} className="bg-orange-600 hover:bg-orange-700">
            Crear Reporte
          </Button>
        </div>
      </div>
    </div>
  )
}

// Componente Mobile
function MobileReports() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [selectedStatus, setSelectedStatus] = useState<string | null>(null)
  const [showFilters, setShowFilters] = useState(false)
  const [selectedReport, setSelectedReport] = useState<ReportTemplate | null>(null)
  const [showGenerateModal, setShowGenerateModal] = useState(false)
  const [showPreview, setShowPreview] = useState(false)
  // Después de la línea: const [showPreview, setShowPreview] = useState(false)
  const [showCreateModal, setShowCreateModal] = useState(false)

  // Obtener categorías únicas para el filtro
  const categories = useMemo(() => {
    const uniqueCategories = new Set(reportTemplates.map((report) => report.category))
    return Array.from(uniqueCategories)
  }, [])

  // Filtrar reportes
  const filteredReports = useMemo(() => {
    return reportTemplates.filter((report) => {
      // Filtro por búsqueda
      const matchesSearch =
        report.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        report.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        report.category.toLowerCase().includes(searchTerm.toLowerCase())

      // Filtro por categoría
      const matchesCategory = selectedCategory ? report.category === selectedCategory : true

      // Filtro por estado
      const matchesStatus = selectedStatus ? report.status === selectedStatus : true

      return matchesSearch && matchesCategory && matchesStatus
    })
  }, [searchTerm, selectedCategory, selectedStatus])

  const handleGenerateReport = (report: ReportTemplate) => {
    setSelectedReport(report)
    setShowGenerateModal(true)
  }

  const handlePreviewReport = (report: ReportTemplate) => {
    setSelectedReport(report)
    setShowPreview(true)
  }

  // Agregar el handler para guardar el reporte:
  // Después de handlePreviewReport, agregar:
  const handleSaveCustomReport = (newReport: Partial<ReportTemplate>) => {
    // Aquí podrías agregar la lógica para guardar el reporte
    // Por ahora solo mostramos una confirmación
    alert(`Reporte "${newReport.name}" creado exitosamente`)
  }

  return (
    <div className="px-4 py-4 space-y-6">
      {/* Barra de búsqueda */}
      <div className="flex items-center space-x-2">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input
            placeholder="Buscar reportes..."
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
          {(selectedCategory || selectedStatus) && (
            <Badge className="ml-1 bg-orange-600">{(selectedCategory ? 1 : 0) + (selectedStatus ? 1 : 0)}</Badge>
          )}
        </Button>
      </div>

      {/* Filtros */}
      {showFilters && (
        <MobileCard>
          <MobileCardContent className="p-4">
            <div className="space-y-4">
              <div>
                <h3 className="text-sm font-medium mb-2">Categoría</h3>
                <div className="flex flex-wrap gap-2">
                  {categories.map((category) => (
                    <Badge
                      key={category}
                      variant={selectedCategory === category ? "default" : "secondary"}
                      className={`cursor-pointer ${selectedCategory === category ? "bg-orange-600" : ""}`}
                      onClick={() => setSelectedCategory(selectedCategory === category ? null : category)}
                    >
                      {category}
                    </Badge>
                  ))}
                </div>
              </div>
              <div>
                <h3 className="text-sm font-medium mb-2">Estado</h3>
                <div className="flex flex-wrap gap-2">
                  {["Activo", "Programado", "Inactivo"].map((status) => (
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
              <div className="flex justify-end">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => {
                    setSelectedCategory(null)
                    setSelectedStatus(null)
                  }}
                >
                  Limpiar filtros
                </Button>
              </div>
            </div>
          </MobileCardContent>
        </MobileCard>
      )}

      {/* Botón para crear reporte personalizado */}
      <Button className="w-full h-12 bg-orange-600 hover:bg-orange-700" onClick={() => setShowCreateModal(true)}>
        <Plus className="h-4 w-4 mr-2" />
        Crear Reporte Personalizado
      </Button>

      {/* Lista de reportes */}
      <div>
        <div className="flex justify-between items-center mb-3">
          <h2 className="text-lg font-semibold">Reportes ({filteredReports.length})</h2>
        </div>

        <div className="space-y-4">
          {filteredReports.map((report) => {
            const IconComponent = iconMap[report.icon as keyof typeof iconMap] || FileText

            return (
              <MobileCard key={report.id} className="border-gray-200">
                <MobileCardContent className="p-4">
                  <div className="space-y-3">
                    <div className="flex items-start space-x-3">
                      <div className="p-2 bg-gray-50 rounded-lg">
                        <IconComponent className="h-5 w-5 text-gray-700" />
                      </div>
                      <div className="flex-1">
                        <div className="flex justify-between items-start">
                          <div>
                            <h3 className="font-medium text-gray-900">{report.name}</h3>
                            <p className="text-sm text-gray-600 mt-1">{report.description}</p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2 mt-2">
                          <Badge variant="outline" className="text-xs">
                            {report.category}
                          </Badge>
                          <ReportStatus status={report.status} />
                          <Badge variant="secondary" className="text-xs">
                            {report.frequency}
                          </Badge>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <div className="text-xs text-gray-600">
                        {report.lastGenerated && `Último: ${report.lastGenerated}`}
                      </div>
                      <ReportParameters parameters={report.parameters} />
                    </div>

                    <div className="flex space-x-2">
                      <Button
                        size="sm"
                        onClick={() => handleGenerateReport(report)}
                        className="flex-1 bg-orange-600 hover:bg-orange-700"
                      >
                        <Download className="h-3 w-3 mr-1" />
                        Generar
                      </Button>
                      <Button size="sm" variant="outline" onClick={() => handlePreviewReport(report)}>
                        <Eye className="h-3 w-3 mr-1" />
                        Vista Previa
                      </Button>
                    </div>
                  </div>
                </MobileCardContent>
              </MobileCard>
            )
          })}

          {filteredReports.length === 0 && (
            <div className="text-center py-8">
              <div className="text-gray-400 mb-2">No se encontraron reportes</div>
              <div className="text-sm text-gray-500">Intenta con otros filtros</div>
            </div>
          )}
        </div>
      </div>

      {/* Modales */}
      {showGenerateModal && selectedReport && (
        <GenerateReportModal report={selectedReport} onClose={() => setShowGenerateModal(false)} />
      )}

      {showPreview && selectedReport && <ReportPreview report={selectedReport} onClose={() => setShowPreview(false)} />}

      {showCreateModal && (
        <CreateCustomReportModal onClose={() => setShowCreateModal(false)} onSave={handleSaveCustomReport} />
      )}
    </div>
  )
}

// Componente Desktop
function DesktopReports() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [selectedStatus, setSelectedStatus] = useState<string | null>(null)
  const [selectedReport, setSelectedReport] = useState<ReportTemplate | null>(reportTemplates[0])
  const [showGenerateModal, setShowGenerateModal] = useState(false)
  const [showPreview, setShowPreview] = useState(false)
  // Después de la línea: const [showPreview, setShowPreview] = useState(false)
  const [showCreateModal, setShowCreateModal] = useState(false)

  // Obtener categorías únicas para el filtro
  const categories = useMemo(() => {
    const uniqueCategories = new Set(reportTemplates.map((report) => report.category))
    return Array.from(uniqueCategories)
  }, [])

  // Filtrar reportes
  const filteredReports = useMemo(() => {
    return reportTemplates.filter((report) => {
      // Filtro por búsqueda
      const matchesSearch =
        report.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        report.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        report.category.toLowerCase().includes(searchTerm.toLowerCase())

      // Filtro por categoría
      const matchesCategory = selectedCategory ? report.category === selectedCategory : true

      // Filtro por estado
      const matchesStatus = selectedStatus ? report.status === selectedStatus : true

      return matchesSearch && matchesCategory && matchesStatus
    })
  }, [searchTerm, selectedCategory, selectedStatus])

  const handleGenerateReport = (report: ReportTemplate) => {
    setSelectedReport(report)
    setShowGenerateModal(true)
  }

  const handlePreviewReport = (report: ReportTemplate) => {
    setSelectedReport(report)
    setShowPreview(true)
  }

  // Estadísticas generales
  const stats = useMemo(() => {
    const totalReports = reportTemplates.length
    const activeReports = reportTemplates.filter((r) => r.status === "Activo").length
    const scheduledReports = reportTemplates.filter((r) => r.status === "Programado").length
    const categoriesCount = new Set(reportTemplates.map((r) => r.category)).size

    return {
      totalReports,
      activeReports,
      scheduledReports,
      categoriesCount,
    }
  }, [])

  // Agregar el mismo handler para guardar el reporte:
  const handleSaveCustomReport = (newReport: Partial<ReportTemplate>) => {
    alert(`Reporte "${newReport.name}" creado exitosamente`)
  }

  return (
    <div className="space-y-6">
      {/* Header con estadísticas */}
      <div className="grid grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Reportes</p>
                <p className="text-3xl font-bold text-gray-900 mt-1">{stats.totalReports}</p>
              </div>
              <div className="p-3 bg-gray-50 rounded-lg">
                <FileText className="h-5 w-5 text-gray-700" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Reportes Activos</p>
                <p className="text-3xl font-bold text-gray-900 mt-1">{stats.activeReports}</p>
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
                <p className="text-sm font-medium text-gray-600">Programados</p>
                <p className="text-3xl font-bold text-gray-900 mt-1">{stats.scheduledReports}</p>
              </div>
              <div className="p-3 bg-gray-50 rounded-lg">
                <Clock className="h-5 w-5 text-orange-600" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Categorías</p>
                <p className="text-3xl font-bold text-gray-900 mt-1">{stats.categoriesCount}</p>
              </div>
              <div className="p-3 bg-gray-50 rounded-lg">
                <BarChart3 className="h-5 w-5 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Contenido principal en dos columnas */}
      <div className="grid grid-cols-12 gap-6">
        {/* Lista de reportes */}
        <div className="col-span-4">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Reportes Disponibles</CardTitle>
                {/* Actualizar el botón "Nuevo" en el header de la card:
                // Reemplazar el botón existente con: */}
                <Button
                  size="sm"
                  className="bg-orange-600 hover:bg-orange-700"
                  onClick={() => setShowCreateModal(true)}
                >
                  <Plus className="h-4 w-4 mr-1" />
                  Nuevo
                </Button>
              </div>
              <div className="mt-2">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    placeholder="Buscar reportes..."
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
                  <div className="mr-2 text-sm font-medium text-gray-700">Categoría:</div>
                  {categories.map((category) => (
                    <Badge
                      key={category}
                      variant={selectedCategory === category ? "default" : "secondary"}
                      className={`cursor-pointer ${selectedCategory === category ? "bg-orange-600" : ""}`}
                      onClick={() => setSelectedCategory(selectedCategory === category ? null : category)}
                    >
                      {category}
                    </Badge>
                  ))}
                </div>
                <div className="flex flex-wrap gap-2">
                  <div className="mr-2 text-sm font-medium text-gray-700">Estado:</div>
                  {["Activo", "Programado", "Inactivo"].map((status) => (
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
                <div className="border-t border-gray-200 pt-4 mt-4">
                  <div className="space-y-1">
                    {filteredReports.map((report) => {
                      const IconComponent = iconMap[report.icon as keyof typeof iconMap] || FileText

                      return (
                        <div
                          key={report.id}
                          className={`flex items-center p-3 rounded-lg cursor-pointer hover:bg-gray-50 ${
                            selectedReport?.id === report.id ? "bg-orange-50 border border-orange-200" : ""
                          }`}
                          onClick={() => setSelectedReport(report)}
                        >
                          <div className="p-2 bg-gray-50 rounded-lg mr-3">
                            <IconComponent className="h-4 w-4 text-gray-700" />
                          </div>
                          <div className="flex-1">
                            <div className="flex justify-between items-start mb-1">
                              <h3 className="font-medium text-gray-900 text-sm">{report.name}</h3>
                              <ReportStatus status={report.status} />
                            </div>
                            <div className="text-xs text-gray-600 mb-2">{report.category}</div>
                            <div className="flex items-center justify-between">
                              <Badge variant="outline" className="text-xs">
                                {report.frequency}
                              </Badge>
                              {report.lastGenerated && (
                                <span className="text-xs text-gray-500">{report.lastGenerated}</span>
                              )}
                            </div>
                          </div>
                        </div>
                      )
                    })}

                    {filteredReports.length === 0 && (
                      <div className="text-center py-8">
                        <div className="text-gray-400 mb-2">No se encontraron reportes</div>
                        <div className="text-sm text-gray-500">Intenta con otros filtros</div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Detalle del reporte */}
        <div className="col-span-8">
          {selectedReport && (
            <div className="space-y-6">
              {/* Header del reporte */}
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="p-3 bg-gray-50 rounded-lg">
                        {(() => {
                          const IconComponent = iconMap[selectedReport.icon as keyof typeof iconMap] || FileText
                          return <IconComponent className="h-6 w-6 text-gray-700" />
                        })()}
                      </div>
                      <div>
                        <h2 className="text-xl font-bold">{selectedReport.name}</h2>
                        <p className="text-gray-600 mt-1">{selectedReport.description}</p>
                        <div className="flex items-center space-x-3 mt-2">
                          <Badge variant="outline">{selectedReport.category}</Badge>
                          <ReportStatus status={selectedReport.status} />
                          <Badge variant="secondary">{selectedReport.frequency}</Badge>
                          <Badge
                            variant={selectedReport.priority === "Alta" ? "destructive" : "secondary"}
                            className={selectedReport.priority === "Alta" ? "bg-red-600" : ""}
                          >
                            {selectedReport.priority}
                          </Badge>
                        </div>
                      </div>
                    </div>
                    <div className="flex space-x-2">
                      <Button variant="outline" onClick={() => handlePreviewReport(selectedReport)}>
                        <Eye className="h-4 w-4 mr-2" />
                        Vista Previa
                      </Button>
                      <Button
                        onClick={() => handleGenerateReport(selectedReport)}
                        className="bg-orange-600 hover:bg-orange-700"
                      >
                        <Download className="h-4 w-4 mr-2" />
                        Generar
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Información del reporte */}
              <div className="grid grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <Settings className="h-5 w-5" />
                      <span>Parámetros</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ReportParameters parameters={selectedReport.parameters} />
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <BarChart3 className="h-5 w-5" />
                      <span>Gráficos Incluidos</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      {selectedReport.charts.map((chart, index) => (
                        <div key={index} className="flex items-center space-x-2">
                          <div className="w-2 h-2 bg-orange-600 rounded-full"></div>
                          <span className="text-sm">{chart}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <Download className="h-5 w-5" />
                      <span>Formatos de Exportación</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-2">
                      {selectedReport.exportFormats.map((format, index) => (
                        <Badge key={index} variant="outline">
                          {format}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <Calendar className="h-5 w-5" />
                      <span>Información de Generación</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-600">Frecuencia:</span>
                        <span className="text-sm font-medium">{selectedReport.frequency}</span>
                      </div>
                      {selectedReport.lastGenerated && (
                        <div className="flex justify-between">
                          <span className="text-sm text-gray-600">Último generado:</span>
                          <span className="text-sm font-medium">{selectedReport.lastGenerated}</span>
                        </div>
                      )}
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-600">Tipo:</span>
                        <span className="text-sm font-medium">{selectedReport.type}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Vista previa de gráficos */}
              <Card>
                <CardHeader>
                  <CardTitle>Vista Previa de Datos</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {selectedReport.category === "Rendimiento" && (
                      <div>
                        <h4 className="text-sm font-medium mb-3">Evolución del Rendimiento</h4>
                        <MobileChart type="line" data={sampleChartData.athletePerformance} height={200} />
                      </div>
                    )}
                    {selectedReport.category === "Financiero" && (
                      <div>
                        <h4 className="text-sm font-medium mb-3">Distribución del Presupuesto</h4>
                        <MobileChart type="pie" data={sampleChartData.budgetDistribution} height={200} />
                      </div>
                    )}
                    {(selectedReport.category === "Competencias" || selectedReport.category === "Atletas") && (
                      <div>
                        <h4 className="text-sm font-medium mb-3">Historial de Medallas</h4>
                        <MobileChart type="bar" data={sampleChartData.medalsHistory} height={200} />
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
        </div>
      </div>

      {/* Modales */}
      {showGenerateModal && selectedReport && (
        <GenerateReportModal report={selectedReport} onClose={() => setShowGenerateModal(false)} />
      )}

      {showPreview && selectedReport && <ReportPreview report={selectedReport} onClose={() => setShowPreview(false)} />}

      {showCreateModal && (
        <CreateCustomReportModal onClose={() => setShowCreateModal(false)} onSave={handleSaveCustomReport} />
      )}
    </div>
  )
}

// Componente Principal
export default function ReportsPage() {
  const isMobile = useIsMobile()

  return (
    <ResponsiveLayout title="Reportes" showSearch={false}>
      {isMobile ? <MobileReports /> : <DesktopReports />}
    </ResponsiveLayout>
  )
}
