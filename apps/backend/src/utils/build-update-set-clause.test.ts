import { describe, expect, test, vi } from "vitest"
import { Decimal, VarChar } from "mssql"
import { buildUpdateSetClause } from "./build-update-set-clause"
import type { Request } from "mssql"

describe("build-update-set-clause", async () => {
  test("should generate a valid set clause and call request.input() for each field", () => {
    const mockRequest = { input: vi.fn() } as unknown as Request
    const params = {
      Price: { type: Decimal(10, 2), value: 9.99 },
      Description: { type: VarChar(100), value: "Test" }
    }
    const setClause = buildUpdateSetClause(mockRequest, params)

    expect(setClause).toBe("Price = @Price, Description = @Description")

    expect(mockRequest.input).toHaveBeenCalledTimes(2)
    expect(mockRequest.input).toHaveBeenNthCalledWith(
      1, "Price", params.Price.type, params.Price.value
    )
    expect(mockRequest.input).toHaveBeenNthCalledWith(
      2, "Description", params.Description.type, params.Description.value
    )
  })
})