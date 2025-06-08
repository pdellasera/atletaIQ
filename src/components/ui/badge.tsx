"use client"

import type { ReactNode } from "react"

interface BadgeProps {
  children: ReactNode
  variant?: "default" | "secondary" | "destructive" | "outline"
  className?: string
  onClick?: () => void
}

export function Badge({ children, variant = "default", className = "", onClick }: BadgeProps) {
  const variants = {
    default: "bg-orange-600 text-white hover:bg-orange-700",
    secondary: "bg-gray-100 text-gray-800 hover:bg-gray-200",
    destructive: "bg-red-100 text-red-800 hover:bg-red-200",
    outline: "border border-gray-300 bg-white text-gray-700 hover:bg-gray-50",
  }

  const baseClasses = "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium transition-colors"
  const clickableClasses = onClick ? "cursor-pointer" : ""

  return (
    <div className={`${baseClasses} ${variants[variant]} ${clickableClasses} ${className}`} onClick={onClick}>
      {children}
    </div>
  )
}
