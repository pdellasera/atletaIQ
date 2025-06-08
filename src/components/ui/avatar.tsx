import type { ReactNode } from "react"

interface AvatarProps {
  children: ReactNode
  className?: string
}

interface AvatarImageProps {
  src?: string
  alt?: string
  className: string
}

interface AvatarFallbackProps {
  children: ReactNode,
  className: string
}

export function Avatar({ children, className = "" }: AvatarProps) {
  return <div className={`relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full ${className}`}>{children}</div>
}

export function AvatarImage({ src, alt, className }: AvatarImageProps) {
  return (
    <img
      className={`aspect-square h-full w-full object-cover ${className}`}
      src={src || "/placeholder.svg?height=40&width=40"}
      alt={alt || "Avatar"}
    />
  )
}

export function AvatarFallback({ children, className }: AvatarFallbackProps) {
  return (
    <div className={`flex h-full w-full items-center justify-center rounded-full bg-gray-100 text-sm font-medium text-gray-600 ${className}`}>
      {children}
    </div>
  )
}
