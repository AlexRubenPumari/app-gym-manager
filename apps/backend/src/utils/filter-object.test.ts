import { describe, test, expect } from "vitest"
import { filterObject } from "./filter-object"

describe("filter-object", () => {
  test("should filter out properties where the predicate returns false", () => {
    type Data = Record<string, { value: unknown }>
    const data: Data = {
      a: { value: true },
      b: { value: false },
      c: { value: 1 },
      d: { value: 0 },
      e: { value: undefined },
      f: { value: null },
    }
    const result = filterObject(data, (property: { value: unknown }) => !!property.value)

    expect(result).toStrictEqual({ a: { value: true }, c: { value: 1 } })
  })

  test("should return an empty object when no properties match", () => {
    const data = { a: 10, b: 11, c: 12 }
    const result = filterObject(data, value => value > 15)

    expect(result).toStrictEqual({})
  })

  test("should return the same object when all properties match", () => {
    const data = { firstName: "Jane", lastName: "Doe" }
    const result = filterObject(data, value => value.length > 0)

    expect(result).toStrictEqual(data)
  })

  test("should not mutate the original object", () => {
    const data = { a: { value: true }, b: { value: false } }
    const result = filterObject(data, property => property.value)

    expect(result).toStrictEqual({ a: { value: true } })
    expect(result).not.toBe(data)
  })

  test("should work with an empty input object", () => {
    const data: Record<string, boolean> = {}
    const result = filterObject(data, value => value)

    expect(result).toEqual({})
  })
})