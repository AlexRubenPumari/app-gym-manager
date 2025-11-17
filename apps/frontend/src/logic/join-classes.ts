type ClassArgument =
  | string
  | number
  | null
  | undefined
  | boolean
  | Record<string, unknown>
  | ClassArgument[]

export function joinClasses(...args: ClassArgument[]): string {
  const result: (string | number)[] = []

  args.forEach(arg => {
    if (!arg) return

    const argType = typeof arg

    if (argType === "string" || argType === "number") {
      result.push(arg as string | number)
    } else if (argType === "object") {
      const argIsArray = Array.isArray(arg)
      if (argIsArray) {
        const innerClasses = joinClasses(...arg)
        if (innerClasses) result.push(innerClasses)
      } else {
        const object = arg as Record<string, unknown>

        for (const key in object) {
          const isOwnKey = Object.prototype.hasOwnProperty.call(arg, key)
          if (isOwnKey && object[key]) result.push(key)
        }
      }
    }
  })

  return result.join(" ")
}