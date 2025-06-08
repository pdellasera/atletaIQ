"use client"

import { useState } from "react"
import { Home, Users, BarChart3, Trophy, Settings, ChevronLeft, ChevronRight } from "lucide-react"
import { useLocation, useNavigate } from "react-router-dom"
import { Button } from "./button"

const sidebarItems = [
  { icon: Home, label: "Dashboard", href: "/" },
  { icon: Users, label: "Atletas", href: "/atletas" },
  { icon: BarChart3, label: "Reportes", href: "/reportes" },
  { icon: Trophy, label: "Competencias", href: "/competencias" },
  { icon: Settings, label: "Configuración", href: "/configuracion" },
]

export function DesktopSidebar() {
  const [isCollapsed, setIsCollapsed] = useState(false)
  const location = useLocation()
  const navigate = useNavigate()

  return (
    <aside
      className={`fixed left-0 top-0 h-full bg-white border-r border-gray-200 transition-all duration-300 z-40 ${
        isCollapsed ? "w-16" : "w-64"
      }`}
    >
      <div className="flex flex-col h-full">
        {/* Header */}
        <div className="p-4 border-b border-gray-200">
          <div className="flex items-center justify-between">
            {!isCollapsed && (
              <div className="flex items-center space-x-2">
                <Trophy className="h-6 w-6 text-orange-600" />
                <span className="font-bold text-lg">AthleteIQ</span>
              </div>
            )}
            <Button variant="ghost" size="sm" onClick={() => setIsCollapsed(!isCollapsed)} className="p-2">
              {isCollapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
            </Button>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4">
          <div className="space-y-2">
            {sidebarItems.map((item) => {
              const isActive =
                location.pathname === item.href || (item.href !== "/" && location.pathname.startsWith(item.href))
              const Icon = item.icon

              return (
                <button key={item.href} onClick={() => navigate(item.href)} className="w-full">
                  <div
                    className={`flex items-center space-x-3 px-3 py-2 rounded-lg transition-colors ${
                      isActive ? "bg-orange-100 text-orange-700" : "text-gray-700 hover:bg-gray-100"
                    }`}
                  >
                    <Icon className="h-5 w-5 flex-shrink-0" />
                    {!isCollapsed && <span className="font-medium">{item.label}</span>}
                  </div>
                </button>
              )
            })}
          </div>
        </nav>
      </div>
    </aside>
  )
}
