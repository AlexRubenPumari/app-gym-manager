import { describe, test, expect } from "vitest"
import { buildSqlSetClause } from "."

describe("build-sql-set-clause", () => {
  test("should build sql set clause with multiple fields", () => {
    const result = buildSqlSetClause({ Price: 10, Description: "Description 1" })

    const optionA = "Price = 10, Description = 'Description 1'";
    const optionB = "Description = 'Description 1', Price = 10'";

    expect([optionA, optionB]).toContain(result)
  })
  test("should build sql set clause with a single field", () => {
    const result = buildSqlSetClause({ Price: 10 })
    const otherResult = buildSqlSetClause({ Description: "Description 1" })

    expect(result).toEqual("Price = 10")
    expect(otherResult).toEqual("Description = 'Description 1'")
  })
})