"use client"

import { useEffect } from "react"
import { X, User, LogOut, HelpCircle, Shield } from "lucide-react"
import { Button } from "./button"
import { Avatar, AvatarFallback, AvatarImage } from "./avatar"

interface MobileDrawerProps {
  isOpen: boolean
  onClose: () => void
}

export function MobileDrawer({ isOpen, onClose }: MobileDrawerProps) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = "unset"
    }

    return () => {
      document.body.style.overflow = "unset"
    }
  }, [isOpen])

  if (!isOpen) return null

  return (
    <>
      {/* Overlay */}
      <div className="fixed inset-0 bg-black bg-opacity-50 z-40" onClick={onClose} />

      {/* Drawer */}
      <div className="fixed top-0 left-0 h-full w-80 max-w-[85vw] bg-white z-50 shadow-xl transform transition-transform duration-300">
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-gray-200">
            <h2 className="text-lg font-semibold">Menú</h2>
            <Button variant="ghost" size="sm" onClick={onClose} className="p-2">
              <X className="h-5 w-5" />
            </Button>
          </div>

          {/* User Profile */}
          <div className="p-4 border-b border-gray-100">
            <div className="flex items-center space-x-3">
              <Avatar className="h-12 w-12">
                <AvatarImage src="/placeholder.svg?height=48&width=48" />
                <AvatarFallback>JD</AvatarFallback>
              </Avatar>
              <div>
                <h3 className="font-semibold text-gray-900">Juan Pérez</h3>
                <p className="text-sm text-gray-600">Administrador</p>
              </div>
            </div>
          </div>

          {/* Menu Items */}
          <div className="flex-1 py-4">
            <div className="space-y-1 px-2">
              <Button variant="ghost" className="w-full justify-start px-4 py-3 h-auto">
                <User className="h-5 w-5 mr-3" />
                <span>Mi Perfil</span>
              </Button>
              <Button variant="ghost" className="w-full justify-start px-4 py-3 h-auto">
                <Shield className="h-5 w-5 mr-3" />
                <span>Seguridad</span>
              </Button>
              <Button variant="ghost" className="w-full justify-start px-4 py-3 h-auto">
                <HelpCircle className="h-5 w-5 mr-3" />
                <span>Ayuda y Soporte</span>
              </Button>
            </div>
          </div>

          {/* Footer */}
          <div className="p-4 border-t border-gray-200">
            <Button
              variant="ghost"
              className="w-full justify-start px-4 py-3 h-auto text-red-600 hover:text-red-700 hover:bg-red-50"
            >
              <LogOut className="h-5 w-5 mr-3" />
              <span>Cerrar Sesión</span>
            </Button>
          </div>
        </div>
      </div>
    </>
  )
}
