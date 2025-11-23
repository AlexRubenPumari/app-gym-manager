export function filterObject<Type>(
  object: Record<string, Type>, predicate: (value: Type) => boolean
) {
  const result: Record<string, Type> = {}

  for (const key in object) {
    const value = object[key]!
    if (predicate(value)) result[key] = value
  }

  return result
}