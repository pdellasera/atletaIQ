"use client"

import { Home, Users, BarChart3, Settings, Trophy } from "lucide-react"
import { useLocation, useNavigate } from "react-router-dom"

const navItems = [
  { icon: Home, label: "Inicio", href: "/" },
  { icon: Users, label: "Atletas", href: "/atletas" },
  { icon: BarChart3, label: "Reportes", href: "/reportes" },
  { icon: Trophy, label: "Competencias", href: "/competencias" },
  { icon: Settings, label: "Config", href: "/configuracion" },
]

export function BottomNavigation() {
  const location = useLocation()
  const navigate = useNavigate()

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-gray-200 px-2 py-1 safe-area-pb">
      <div className="flex items-center justify-around">
        {navItems.map((item) => {
          const isActive =
            location.pathname === item.href || (item.href !== "/" && location.pathname.startsWith(item.href))
          const Icon = item.icon

          return (
            <button key={item.href} onClick={() => navigate(item.href)} className="flex-1">
              <div
                className={`flex flex-col items-center py-2 px-1 rounded-lg transition-colors ${
                  isActive ? "text-orange-600 bg-orange-50" : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                }`}
              >
                <Icon className="h-5 w-5 mb-1" />
                <span className="text-xs font-medium truncate">{item.label}</span>
              </div>
            </button>
          )
        })}
      </div>
    </nav>
  )
}
