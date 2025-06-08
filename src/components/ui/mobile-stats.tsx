import type { ReactNode } from "react"

interface MobileStatsProps {
  title: string
  value: string | number
  subtitle?: string
  icon?: ReactNode
  color?: "blue" | "green" | "orange" | "red" | "purple"
  trend?: "up" | "down" | "neutral"
}

export function MobileStats({ title, value, subtitle, icon, color = "blue" }: MobileStatsProps) {
  const colorClasses = {
    blue: "bg-blue-50 text-blue-600 border-blue-100",
    green: "bg-green-50 text-green-600 border-green-100",
    orange: "bg-orange-50 text-orange-600 border-orange-100",
    red: "bg-red-50 text-red-600 border-red-100",
    purple: "bg-purple-50 text-purple-600 border-purple-100",
  }

  return (
    <div className={`rounded-xl border p-4 ${colorClasses[color]}`}>
      <div className="flex items-center justify-between mb-2">
        <span className="text-sm font-medium opacity-80">{title}</span>
        {icon && <div className="opacity-60">{icon}</div>}
      </div>
      <div className="space-y-1">
        <div className="text-2xl font-bold">{value}</div>
        {subtitle && <div className="text-xs opacity-70">{subtitle}</div>}
      </div>
    </div>
  )
}
