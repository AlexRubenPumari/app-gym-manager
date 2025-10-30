import { describe, test, expect } from "vitest"
import { LocalDate } from "./mocks"

describe("abstract-date", () => {
  test("should set today's date if no params are passed to constructor", () => {
    const today = new Date()
    const date = new LocalDate()

    expect(date.year).toBe(today.getUTCFullYear())
    expect(date.month).toBe(today.getUTCMonth() + 1)
    expect(date.day).toBe(today.getUTCDate())
  })

  test("should correctly assign year, month, and day in constructor", () => {
    const date = new LocalDate(2025, 10, 30)

    expect(date.year).toBe(2025)
    expect(date.month).toBe(10)
    expect(date.day).toBe(30)
  })

  test("is-equal method should return true for identical dates", () => {
    const firstDate = new LocalDate(2025, 10, 30)
    const secondDate = new LocalDate(2025, 10, 30)

    expect(firstDate.isEqual(secondDate)).toBe(true)
  })

  test("is-equal method should return false for different dates", () => {
    const firstDate = new LocalDate(2025, 10, 30)
    const secondDate = new LocalDate(2025, 11, 1)

    expect(firstDate.isEqual(secondDate)).toBe(false)
  })

  test("is-before method should correctly compare dates", () => {
    const firstDate = new LocalDate(2025, 10, 30)
    const secondDate = new LocalDate(2025, 11, 1)

    expect(firstDate.isBefore(secondDate)).toBe(true)
    expect(secondDate.isBefore(firstDate)).toBe(false)
  })

  test("is-after method should correctly compare dates", () => {
    const firstDate = new LocalDate(2025, 10, 30)
    const secondDate = new LocalDate(2025, 11, 1)

    expect(secondDate.isAfter(firstDate)).toBe(true)
    expect(firstDate.isAfter(secondDate)).toBe(false)
  })

  test("add-days method should return a new date with days added", () => {
    const date = new LocalDate(2025, 10, 30)
    const newDate = date.addDays(5)

    expect(newDate.day).toBe(4)
    expect(newDate.month).toBe(11)
    expect(newDate).not.toBe(date)
  })

  test("subtract-days method should return a new date with days subtracted", () => {
    const date = new LocalDate(2025, 10, 30)
    const newDate = date.subtractDays(10)

    expect(newDate.day).toBe(20)
    expect(newDate).not.toBe(date)
  })
})