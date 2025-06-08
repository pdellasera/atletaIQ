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
import { ArrowLeft, CheckCircle, UserPlus } from "lucide-react"
import { useNavigate } from "react-router-dom"

export default function CrearCuentaPage() {
  const isMobile = useIsMobile()
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    role: "",
    permissions: [] as string[],
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)

  const roles = [
    { id: "admin", label: "Administrador", description: "Acceso completo al sistema" },
    { id: "coach", label: "Entrenador", description: "Gestión de atletas y entrenamientos" },
    { id: "analyst", label: "Analista", description: "Acceso a reportes y estadísticas" },
    { id: "coordinator", label: "Coordinador", description: "Gestión de competencias" },
  ]

  const permissions = [
    { id: "view-athletes", label: "Ver atletas" },
    { id: "edit-athletes", label: "Editar atletas" },
    { id: "manage-competitions", label: "Gestionar competencias" },
    { id: "manage-budgets", label: "Administrar presupuestos" },
    { id: "create-reports", label: "Crear reportes" },
    { id: "manage-logistics", label: "Gestionar logística" },
  ]

  const handleRoleSelect = (roleId: string) => {
    setFormData((prev) => ({ ...prev, role: roleId }))
  }

  const handlePermissionChange = (permissionId: string, checked: boolean) => {
    setFormData((prev) => ({
      ...prev,
      permissions: checked ? [...prev.permissions, permissionId] : prev.permissions.filter((p) => p !== permissionId),
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    await new Promise((resolve) => setTimeout(resolve, 2000))

    setIsSubmitting(false)
    setShowSuccess(true)

    setTimeout(() => {
      setFormData({ name: "", email: "", role: "", permissions: [] })
      setShowSuccess(false)
    }, 3000)
  }

  const CardComponent = isMobile ? MobileCard : Card
  const CardHeaderComponent = isMobile ? MobileCardHeader : CardHeader
  const CardContentComponent = isMobile ? MobileCardContent : CardContent
  const CardTitleComponent = isMobile ? MobileCardTitle : CardTitle
  const CardDescriptionComponent = isMobile ? MobileCardDescription : CardDescription

  return (
    <ResponsiveLayout title="Crear Cuenta" showSearch={false}>
      <div className={isMobile ? "px-4 py-4 space-y-6" : "space-y-6"}>
        {/* Back Button */}
        <Button variant="ghost" size="sm" onClick={() => navigate("/configuracion")} className="mb-2 -ml-2">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Volver
        </Button>

        {showSuccess ? (
          <CardComponent>
            <CardContentComponent className="text-center py-8">
              <CheckCircle className="h-16 w-16 text-green-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-green-800 mb-2">¡Cuenta creada!</h3>
              <p className="text-green-600">El usuario ha sido registrado exitosamente.</p>
            </CardContentComponent>
          </CardComponent>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Basic Info */}
            <CardComponent>
              <CardHeaderComponent>
                <CardTitleComponent className="flex items-center gap-2">
                  <UserPlus className="h-5 w-5 text-blue-600" />
                  Información Básica
                </CardTitleComponent>
              </CardHeaderComponent>
              <CardContentComponent className="space-y-4">
                <div className="space-y-2">
                  <label htmlFor="name" className="text-sm font-medium">
                    Nombre completo *
                  </label>
                  <Input
                    id="name"
                    placeholder="Ingrese el nombre completo"
                    value={formData.name}
                    onChange={(e) => setFormData((prev) => ({ ...prev, name: e.target.value }))}
                    className={isMobile ? "h-12" : ""}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="email" className="text-sm font-medium">
                    Correo electrónico *
                  </label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="correo@ejemplo.com"
                    value={formData.email}
                    onChange={(e) => setFormData((prev) => ({ ...prev, email: e.target.value }))}
                    className={isMobile ? "h-12" : ""}
                    required
                  />
                </div>
              </CardContentComponent>
            </CardComponent>

            {/* Role Selection */}
            <CardComponent>
              <CardHeaderComponent>
                <CardTitleComponent>Seleccionar Rol *</CardTitleComponent>
                <CardDescriptionComponent>Elige el rol que tendrá este usuario</CardDescriptionComponent>
              </CardHeaderComponent>
              <CardContentComponent className="space-y-3">
                {roles.map((role) => (
                  <div
                    key={role.id}
                    className={`p-3 border rounded-lg cursor-pointer transition-colors ${
                      formData.role === role.id ? "border-orange-500 bg-orange-50" : "border-gray-200 hover:bg-gray-50"
                    }`}
                    onClick={() => handleRoleSelect(role.id)}
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-medium">{role.label}</h4>
                        <p className="text-sm text-gray-600 mt-1">{role.description}</p>
                      </div>
                      <div
                        className={`w-4 h-4 rounded-full border-2 ${
                          formData.role === role.id ? "border-orange-500 bg-orange-500" : "border-gray-300"
                        }`}
                      >
                        {formData.role === role.id && (
                          <div className="w-full h-full rounded-full bg-white scale-50"></div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </CardContentComponent>
            </CardComponent>

            {/* Permissions */}
            <CardComponent>
              <CardHeaderComponent>
                <CardTitleComponent>Permisos Específicos</CardTitleComponent>
                <CardDescriptionComponent>Selecciona los permisos adicionales</CardDescriptionComponent>
              </CardHeaderComponent>
              <CardContentComponent className="space-y-3">
                {permissions.map((permission) => (
                  <div key={permission.id} className="flex items-center space-x-3 p-2">
                    <input
                      type="checkbox"
                      id={permission.id}
                      checked={formData.permissions.includes(permission.id)}
                      onChange={(e) => handlePermissionChange(permission.id, e.target.checked)}
                      className="w-4 h-4 text-orange-600 border-gray-300 rounded focus:ring-orange-500"
                    />
                    <label htmlFor={permission.id} className="flex-1 cursor-pointer text-sm">
                      {permission.label}
                    </label>
                  </div>
                ))}
              </CardContentComponent>
            </CardComponent>

            {/* Selected Permissions Summary */}
            {formData.permissions.length > 0 && (
              <CardComponent>
                <CardHeaderComponent>
                  <CardTitleComponent>Permisos Seleccionados</CardTitleComponent>
                </CardHeaderComponent>
                <CardContentComponent>
                  <div className="flex flex-wrap gap-2">
                    {formData.permissions.map((permissionId) => {
                      const permission = permissions.find((p) => p.id === permissionId)
                      return (
                        <Badge key={permissionId} variant="secondary">
                          {permission?.label}
                        </Badge>
                      )
                    })}
                  </div>
                </CardContentComponent>
              </CardComponent>
            )}

            {/* Submit Button */}
            <div className={isMobile ? "sticky bottom-20 bg-gray-50 pt-4 -mx-4 px-4" : ""}>
              <Button
                type="submit"
                disabled={isSubmitting || !formData.name || !formData.email || !formData.role}
                className={isMobile ? "w-full h-12 text-base" : "w-full"}
              >
                {isSubmitting ? "Creando cuenta..." : "Crear Cuenta"}
              </Button>
            </div>
          </form>
        )}
      </div>
    </ResponsiveLayout>
  )
}
