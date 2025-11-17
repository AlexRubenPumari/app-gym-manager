import { describe, test, expect } from "vitest"
import { joinClasses } from "./join-classes.js"

describe("join-classes", () => {
  test("should return empty string for no arguments", () => {
    expect(joinClasses()).toBe("")
  })

  test("should join string class names", () => {
    expect(joinClasses("btn", "primary")).toBe("btn primary")
  })

  test("should include numbers as class names", () => {
    expect(joinClasses("item", 2)).toBe("item 2")
  })

  test("should ignore falsy values", () => {
    expect(joinClasses("btn", null, undefined, false, 0)).toBe("btn")
  })

  test("should process objects with boolean conditions", () => {
    expect(joinClasses({ active: true, disabled: false })).toBe("active")
  })

  test("should process arrays", () => {
    expect(joinClasses(["btn", "large"])).toBe("btn large")
    expect(joinClasses([])).toBe("")
  })

  test("should process nested arrays", () => {
    expect(joinClasses(["btn", ["primary", ["rounded"]]])).toBe("btn primary rounded")
    expect(joinClasses(["btn", ["primary", []]])).toBe("btn primary")
  })

  test("should handle mixed input types", () => {
    expect(
      joinClasses(
        "btn",
        { active: true, hidden: false },
        ["large", { rounded: true }],
        null,
        undefined
      )
    ).toBe("btn active large rounded")
  })

  test("should return empty string for only falsy values", () => {
    expect(joinClasses(null, false, undefined, "")).toBe("")
  })
})