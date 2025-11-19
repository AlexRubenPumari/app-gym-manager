import { joinClasses } from "../logic"
import type { ReactNode } from "react"

interface ButtonProps {
  variant: "primary" | "secondary"
  children: ReactNode
  disabled?: boolean
  onClick?: () => void
}

export function Button ({ variant, disabled = false, children, onClick }: ButtonProps) {
  const className = joinClasses(
    "px-4 py-2 rounded-md font-bold select-none",
    variant === "primary" && "bg-neutral-900 text-white",
    variant === "secondary" && "outline -outline-offset-2 outline-2 outline-neutral-900 text-neutral-900",
    variant === "primary" && disabled && "!bg-neutral-400 !text-neutral-200",
    variant === "secondary" && disabled && "!outline-neutral-400 !bg-transparent !text-neutral-400",
  )

  return (
    <button
      className={className}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  )
}