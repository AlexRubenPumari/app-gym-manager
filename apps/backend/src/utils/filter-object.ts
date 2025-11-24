export function filterObject<Type extends Record<string, unknown>>(
  object: Type, predicate: (value: Type[keyof Type]) => boolean
): Partial<Type> {
  const result: Partial<Type> = {}

  for (const key in object) {
    const value = object[key]
    if (predicate(value)) result[key] = value
  }

  return result
}