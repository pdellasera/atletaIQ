"use client"

import { useIsMobile } from "../hooks/use-media-query"
import { ResponsiveLayout } from "../components/layouts/responsive-layout"
import { Card, CardHeader, CardContent, CardTitle } from "../components/ui/card"
import { MobileCard, MobileCardHeader, MobileCardContent, MobileCardTitle } from "../components/ui/mobile-card"
import { Badge } from "../components/ui/badge"
import { useNavigate } from "react-router-dom"
import {
  UserPlus,
  Target,
  Users,
  Shield,
  BarChart3,
  ChevronRight,
  Bell,
  Palette,
  Database,
  Download,
} from "lucide-react"

const configSections = [
  {
    title: "Gestión de Usuarios",
    items: [
      {
        icon: <UserPlus className="h-5 w-5 text-blue-600" />,
        title: "Crear Cuentas",
        description: "Agregar nuevos usuarios al sistema",
        href: "/configuracion/crear-cuenta",
        badge: "Nuevo",
      },
      {
        icon: <Users className="h-5 w-5 text-green-600" />,
        title: "Gestionar Roles",
        description: "Administrar permisos y roles",
        href: "/configuracion/roles",
      },
    ],
  },
  {
    title: "Competencias y Eventos",
    items: [
      {
        icon: <Target className="h-5 w-5 text-orange-600" />,
        title: "Crear Juegos",
        description: "Configurar nuevas competencias",
        href: "/configuracion/crear-juego",
      },
      {
        icon: <BarChart3 className="h-5 w-5 text-purple-600" />,
        title: "Reportes",
        description: "Configurar reportes automáticos",
        href: "/configuracion/reportes",
      },
    ],
  },
  {
    title: "Sistema",
    items: [
      {
        icon: <Bell className="h-5 w-5 text-yellow-600" />,
        title: "Notificaciones",
        description: "Configurar alertas y notificaciones",
        href: "/configuracion/notificaciones",
      },
      {
        icon: <Shield className="h-5 w-5 text-red-600" />,
        title: "Seguridad",
        description: "Configuraciones de seguridad",
        href: "/configuracion/seguridad",
      },
      {
        icon: <Database className="h-5 w-5 text-indigo-600" />,
        title: "Respaldos",
        description: "Gestionar copias de seguridad",
        href: "/configuracion/respaldos",
      },
    ],
  },
  {
    title: "Personalización",
    items: [
      {
        icon: <Palette className="h-5 w-5 text-pink-600" />,
        title: "Apariencia",
        description: "Personalizar tema y colores",
        href: "/configuracion/apariencia",
      },
      {
        icon: <Download className="h-5 w-5 text-teal-600" />,
        title: "Exportar Datos",
        description: "Descargar información del sistema",
        href: "/configuracion/exportar",
      },
    ],
  },
]

// Componente Mobile
function MobileConfiguracion() {
  const navigate = useNavigate()

  return (
    <div className="px-4 py-4 space-y-6">
      {/* User Profile Card */}
      <MobileCard>
        <MobileCardContent>
          <div className="flex items-center space-x-4">
            <div className="w-16 h-16 bg-gradient-to-br from-orange-400 to-orange-600 rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-lg">JP</span>
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-gray-900">Juan Pérez</h3>
              <p className="text-sm text-gray-600">Administrador del Sistema</p>
              <Badge variant="default" className="mt-1 text-xs">
                Acceso Completo
              </Badge>
            </div>
            <ChevronRight className="h-5 w-5 text-gray-400" />
          </div>
        </MobileCardContent>
      </MobileCard>

      {/* Configuration Sections */}
      {configSections.map((section, sectionIndex) => (
        <section key={sectionIndex}>
          <h3 className="text-lg font-semibold mb-3 px-1">{section.title}</h3>
          <div className="space-y-3">
            {section.items.map((item, itemIndex) => (
              <button key={itemIndex} onClick={() => navigate(item.href)} className="w-full">
                <MobileCard className="active:scale-[0.98] transition-transform">
                  <MobileCardContent className="p-4">
                    <div className="flex items-center space-x-4">
                      <div className="w-10 h-10 bg-gray-50 rounded-lg flex items-center justify-center">
                        {item.icon}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center space-x-2">
                          <h4 className="font-medium text-gray-900">{item.title}</h4>
                          {item.badge && (
                            <Badge variant="default" className="text-xs bg-orange-100 text-orange-800">
                              {item.badge}
                            </Badge>
                          )}
                        </div>
                        <p className="text-sm text-gray-600 mt-1">{item.description}</p>
                      </div>
                      <ChevronRight className="h-5 w-5 text-gray-400 flex-shrink-0" />
                    </div>
                  </MobileCardContent>
                </MobileCard>
              </button>
            ))}
          </div>
        </section>
      ))}

      {/* System Info */}
      <MobileCard>
        <MobileCardHeader>
          <MobileCardTitle>Información del Sistema</MobileCardTitle>
        </MobileCardHeader>
        <MobileCardContent>
          <div className="space-y-3 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-600">Versión</span>
              <span className="font-medium">2.1.0</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Última actualización</span>
              <span className="font-medium">15 Oct 2024</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Estado del servidor</span>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span className="font-medium text-green-600">Activo</span>
              </div>
            </div>
          </div>
        </MobileCardContent>
      </MobileCard>
    </div>
  )
}

// Componente Desktop
function DesktopConfiguracion() {
  const navigate = useNavigate()

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-2">Configuración del Sistema</h2>
        <p className="text-gray-600">Gestiona usuarios, juegos y configuraciones generales del sistema</p>
      </div>

      {/* User Profile Card */}
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center space-x-6">
            <div className="w-20 h-20 bg-gradient-to-br from-orange-400 to-orange-600 rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-2xl">JP</span>
            </div>
            <div className="flex-1">
              <h3 className="text-xl font-semibold text-gray-900">Juan Pérez</h3>
              <p className="text-gray-600">Administrador del Sistema</p>
              <div className="flex items-center space-x-4 mt-2">
                <Badge variant="default">Acceso Completo</Badge>
                <span className="text-sm text-gray-500">Último acceso: Hoy, 14:30</span>
              </div>
            </div>
            <ChevronRight className="h-6 w-6 text-gray-400" />
          </div>
        </CardContent>
      </Card>

      {/* Configuration Grid */}
      {configSections.map((section, sectionIndex) => (
        <section key={sectionIndex}>
          <h3 className="text-xl font-semibold mb-4">{section.title}</h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {section.items.map((item, itemIndex) => (
              <button key={itemIndex} onClick={() => navigate(item.href)} className="w-full">
                <Card className="cursor-pointer hover:shadow-lg transition-shadow h-full">
                  <CardHeader className="text-center">
                    <div className="mx-auto w-12 h-12 bg-gray-50 rounded-lg flex items-center justify-center mb-4">
                      {item.icon}
                    </div>
                    <div className="flex items-center justify-center space-x-2">
                      <CardTitle>{item.title}</CardTitle>
                      {item.badge && (
                        <Badge variant="default" className="text-xs bg-orange-100 text-orange-800">
                          {item.badge}
                        </Badge>
                      )}
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-gray-600 text-center">{item.description}</p>
                  </CardContent>
                </Card>
              </button>
            ))}
          </div>
        </section>
      ))}

      {/* System Info */}
      <Card>
        <CardHeader>
          <CardTitle>Información del Sistema</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <p className="text-2xl font-bold text-gray-900">2.1.0</p>
              <p className="text-sm text-gray-600">Versión</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-gray-900">15 Oct 2024</p>
              <p className="text-sm text-gray-600">Última actualización</p>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center space-x-2 mb-1">
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                <p className="text-2xl font-bold text-green-600">Activo</p>
              </div>
              <p className="text-sm text-gray-600">Estado del servidor</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default function ConfiguracionPage() {
  const isMobile = useIsMobile()

  return (
    <ResponsiveLayout title="Configuración" showSearch={false}>
      {isMobile ? <MobileConfiguracion /> : <DesktopConfiguracion />}
    </ResponsiveLayout>
  )
}
