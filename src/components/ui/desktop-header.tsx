"use client"

import { Trophy, Bell, Search, Settings, LogOut } from "lucide-react"
import { Button } from "./button"
import { Input } from "./input"
import { Avatar, AvatarFallback, AvatarImage } from "./avatar"
import { useNavigate } from "react-router-dom"

interface DesktopHeaderProps {
  title: string
  showSearch?: boolean
}

export function DesktopHeader({ title, showSearch = true }: DesktopHeaderProps) {
  const navigate = useNavigate()

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-gray-200 shadow-sm">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo and Title */}
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-3">
              <Trophy className="h-8 w-8 text-orange-600" />
              <h1 className="text-2xl font-bold text-gray-900">{title}</h1>
            </div>
          </div>

          {/* Search Bar */}
          {showSearch && (
            <div className="flex-1 max-w-md mx-8">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input placeholder="Buscar atletas, competencias..." className="pl-10 w-full" />
              </div>
            </div>
          )}

          {/* Navigation and User */}
          <div className="flex items-center space-x-4">
            <nav className="flex items-center space-x-2">
              <Button variant="ghost" size="sm" onClick={() => navigate("/")}>
                Dashboard
              </Button>
              <Button variant="ghost" size="sm" onClick={() => navigate("/atletas")}>
                Atletas
              </Button>
              <Button variant="ghost" size="sm" onClick={() => navigate("/competencias")}>
                Competencias
              </Button>
              <Button variant="ghost" size="sm" onClick={() => navigate("/configuracion")}>
                <Settings className="h-4 w-4 mr-2" />
                Configuración
              </Button>
            </nav>

            <div className="flex items-center space-x-3 pl-4 border-l border-gray-200">
              <Button variant="ghost" size="sm" className="relative">
                <Bell className="h-5 w-5" />
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></div>
              </Button>

              <div className="flex items-center space-x-2">
                <Avatar className="h-8 w-8">
                  <AvatarImage src="/placeholder.svg?height=32&width=32" />
                  <AvatarFallback>JP</AvatarFallback>
                </Avatar>
                <div className="hidden lg:block">
                  <p className="text-sm font-medium">Juan Pérez</p>
                  <p className="text-xs text-gray-600">Administrador</p>
                </div>
              </div>

              <Button variant="ghost" size="sm">
                <LogOut className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}
