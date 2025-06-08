"use client"

import type { ReactNode } from "react"

interface BadgeProps {
  children: ReactNode
  variant?: "default" | "secondary" | "destructive" | "outline" | "success" | "warning" | "info" | "purple"
  size?: "default" | "sm" | "lg"
  className?: string
  onClick?: () => void
}

export function Badge({ children, variant = "default", size = "default", className = "", onClick }: BadgeProps) {
  const variants = {
    default: "bg-orange-600 text-white hover:bg-orange-700",
    secondary: "bg-gray-100 text-gray-800 hover:bg-gray-200",
    destructive: "bg-red-100 text-red-800 hover:bg-red-200",
    outline: "border border-gray-300 bg-white text-gray-700 hover:bg-gray-50",
    success: "bg-green-100 text-green-800 hover:bg-green-200",
    warning: "bg-yellow-100 text-yellow-800 hover:bg-yellow-200",
    info: "bg-blue-100 text-blue-800 hover:bg-blue-200",
    purple: "bg-purple-100 text-purple-800 hover:bg-purple-200",
  }

  const sizes = {
    default: "px-2.5 py-0.5 text-xs",
    sm: "px-2 py-0.5 text-[10px]",
    lg: "px-3 py-1 text-sm",
  }

  const baseClasses = "inline-flex items-center justify-center rounded-full font-medium transition-colors"
  const clickableClasses = onClick ? "cursor-pointer" : ""
  const variantClasses = variants[variant]
  const sizeClasses = sizes[size]

  return (
    <div
      className={`${baseClasses} ${variantClasses} ${sizeClasses} ${clickableClasses} ${className}`}
      onClick={onClick}
    >
      {children}
    </div>
  )
}
