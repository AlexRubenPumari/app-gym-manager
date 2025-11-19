import { useId } from "react"
import { joinClasses } from "../logic"

interface InputProps {
  placeholder: string
  type?: "password" | "text"
  error?: string
  value?: string
  label?: string
  autoFocus?: boolean
}

export function Input(
  { type = "text", value = "", placeholder, error, autoFocus, label }: InputProps
) {
  const inputId = useId()
  const inputClassName = joinClasses(
    "rounded-lg px-4 py-2 focus:outline focus:outline-3 focus:outline-neutral-900",
    error && "outline outline-3 outline-red-600 focus:!outline-red-600"
  )
  const errorClassName = joinClasses(
    "absolute -bottom-6 left-0 text-red-600"
  )
  const labelClassName = joinClasses(
    "block mb-1"
  )

  return (
    <div className="relative">
      {label && <label htmlFor={inputId} className={labelClassName}>{label}</label>}
      <input
        id={inputId}
        value={value}
        className={inputClassName}
        type={type}
        placeholder={placeholder}
        autoFocus={autoFocus}
      />
      {error && <span className={errorClassName}>{error}</span>}
    </div>
  )
}