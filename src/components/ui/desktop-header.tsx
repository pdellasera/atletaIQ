"use client"

import { Bell, Search, Settings, LogOut } from "lucide-react"
import { Button } from "./button"
import { Input } from "./input"
import { Avatar, AvatarFallback, AvatarImage } from "./avatar"
import { useNavigate } from "react-router-dom"

interface DesktopHeaderProps {
  title: string
  showSearch?: boolean
}

export function DesktopHeader({  showSearch = true }: DesktopHeaderProps) {
  const navigate = useNavigate()

  return (
    <header className="sticky top-0 z-50 bg-orange-600 border-b border-orange-700 shadow-sm">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo and Title */}
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-3">
              <img src="/logos/atleteLogo.png" alt="AthleteIQ" className="h-10 w-auto" />
              {/* <h1 className="text-2xl font-bold text-white">{title}</h1> */}
            </div>
          </div>

          {/* Search Bar */}
          {showSearch && (
            <div className="flex-1 max-w-md mx-8">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-orange-200" />
                <Input
                  placeholder="Buscar atletas, competencias..."
                  className="pl-10 w-full bg-orange-500 border-orange-400 text-white placeholder-orange-200 focus:border-yellow-400"
                />
              </div>
            </div>
          )}

          {/* Navigation and User */}
          <div className="flex items-center space-x-4">
            <nav className="flex items-center space-x-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => navigate("/")}
                className="text-white hover:bg-orange-700"
              >
                Dashboard
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => navigate("/atletas")}
                className="text-white hover:bg-orange-700"
              >
                Atletas
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => navigate("/competencias")}
                className="text-white hover:bg-orange-700"
              >
                Competencias
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => navigate("/configuracion")}
                className="text-white hover:bg-orange-700"
              >
                <Settings className="h-4 w-4 mr-2" />
                Configuración
              </Button>
            </nav>

            <div className="flex items-center space-x-3 pl-4 border-l border-orange-500">
              <Button variant="ghost" size="sm" className="relative text-white hover:bg-orange-700">
                <Bell className="h-5 w-5" />
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-yellow-400 rounded-full"></div>
              </Button>

              <div className="flex items-center space-x-2">
                <Avatar className="h-8 w-8">
                  <AvatarImage src="/placeholder.svg?height=32&width=32" />
                  <AvatarFallback>JP</AvatarFallback>
                </Avatar>
                <div className="hidden lg:block">
                  <p className="text-sm font-medium text-white">Juan Pérez</p>
                  <p className="text-xs text-orange-100">Administrador</p>
                </div>
              </div>

              <Button variant="ghost" size="sm" className="text-white hover:bg-orange-700">
                <LogOut className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}
