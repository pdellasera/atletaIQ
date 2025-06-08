import type { ReactNode } from "react"

interface BadgeProps {
  children: ReactNode
  variant?: "default" | "secondary" | "destructive"
  className?: string
  onClick?: ()=> void
}

export function Badge({ children, variant = "default", className = "" , onClick}: BadgeProps) {
  const variants = {
    default: "bg-orange-100 text-orange-800",
    secondary: "bg-gray-100 text-gray-800",
    destructive: "bg-red-100 text-red-800",
  }

  return (
    <div
      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${variants[variant]} ${className}`}
      onClick={()=> onClick !== undefined ? onClick() : ''}
    >
      {children}
    </div>
  )
}
