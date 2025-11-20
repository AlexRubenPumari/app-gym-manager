import { describe, test, expect } from "vitest"
import { updateMember } from "."
import { memberService } from "../../services/mocks"

describe("update-member", () => {
  test("should update the member", async () => {
    await updateMember({ memberService }, { member: { id: 1, firstName: "Alex" } })
  })

  test("should return an error when passing a non-existent id", async () => {
    const result = await updateMember({ memberService }, { member: { id: 99 } })

    expect(result).toBeInstanceOf(Error)
  })
})
