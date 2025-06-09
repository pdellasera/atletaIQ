"use client"

import { Menu, Bell, Search } from "lucide-react"
import { Button } from "./button"

interface MobileHeaderProps {
  title: string
  onMenuClick?: () => void
  showSearch?: boolean
  showNotifications?: boolean
}

export function MobileHeader({ onMenuClick, showSearch = false, showNotifications = true }: MobileHeaderProps) {
  return (
    <header className="sticky top-0 z-50 bg-orange-600 border-b border-orange-700 px-4 py-3 shadow-sm">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <Button variant="ghost" size="sm" onClick={onMenuClick} className="p-2 -ml-2 text-white hover:bg-orange-700">
            <Menu className="h-5 w-5" />
          </Button>
          <div className="flex items-center space-x-2">
            <img src="/logos/atleteLogo.png" alt="AthleteIQ" className="h-8 w-auto" />
            {/* <h1 className="text-lg font-bold text-white truncate">{title}</h1> */}
          </div>
        </div>
        <div className="flex items-center space-x-2">
          {showSearch && (
            <Button variant="ghost" size="sm" className="p-2 text-white hover:bg-orange-700">
              <Search className="h-5 w-5" />
            </Button>
          )}
          {showNotifications && (
            <Button variant="ghost" size="sm" className="p-2 relative text-white hover:bg-orange-700">
              <Bell className="h-5 w-5" />
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-yellow-400 rounded-full"></div>
            </Button>
          )}
        </div>
      </div>
    </header>
  )
}
