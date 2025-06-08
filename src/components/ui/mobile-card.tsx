"use client"

import type { ReactNode } from "react"

interface MobileCardProps {
  children: ReactNode
  className?: string
  onClick?: () => void
  padding?: "sm" | "md" | "lg"
}

export function MobileCard({ children, className = "", onClick, padding = "md" }: MobileCardProps) {
  const paddingClasses = {
    sm: "p-3",
    md: "p-4",
    lg: "p-6",
  }

  return (
    <div
      className={`bg-white rounded-xl border border-gray-100 shadow-sm ${paddingClasses[padding]} ${className} ${
        onClick ? "cursor-pointer active:scale-[0.98] transition-transform" : ""
      }`}
      onClick={onClick}
    >
      {children}
    </div>
  )
}

export function MobileCardHeader({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <div className={`mb-3 ${className}`}>{children}</div>
}

export function MobileCardContent({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <div className={className}>{children}</div>
}

export function MobileCardTitle({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <h3 className={`text-base font-semibold text-gray-900 leading-tight ${className}`}>{children}</h3>
}

export function MobileCardDescription({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <p className={`text-sm text-gray-600 mt-1 ${className}`}>{children}</p>
}
