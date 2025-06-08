"use client"

import type React from "react"

import { useIsMobile } from "../../hooks/use-media-query"
import { MobileHeader } from "../ui/mobile-header"
import { BottomNavigation } from "../ui/bottom-navigation"
import { MobileDrawer } from "../ui/mobile-drawer"
import { DesktopHeader } from "../ui/desktop-header"
import { DesktopSidebar } from "../ui/desktop-sidebar"
import { useState } from "react"

interface ResponsiveLayoutProps {
  children: React.ReactNode
  title: string
  showSearch?: boolean
}

export function ResponsiveLayout({ children, title, showSearch = true }: ResponsiveLayoutProps) {
  const isMobile = useIsMobile()
  const [isDrawerOpen, setIsDrawerOpen] = useState(false)

  if (isMobile) {
    return (
      <div className="min-h-screen bg-gray-50">
        <MobileHeader title={title} onMenuClick={() => setIsDrawerOpen(true)} showSearch={showSearch} />
        <MobileDrawer isOpen={isDrawerOpen} onClose={() => setIsDrawerOpen(false)} />
        <main className="pb-20">{children}</main>
        <BottomNavigation />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <DesktopHeader title={title} showSearch={showSearch} />
      <div className="flex">
        <DesktopSidebar />
        <main className="flex-1 ml-64 transition-all duration-300">
          <div className="container mx-auto px-6 py-6">{children}</div>
        </main>
      </div>
    </div>
  )
}
