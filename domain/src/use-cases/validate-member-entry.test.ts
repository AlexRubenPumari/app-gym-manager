import { describe, test, expect } from "vitest"
import { validateMemberEntry } from "./validate-member-entry"
import { memberService } from "../services"

describe("validate-member-entry", () => {
  test("should return an error if the member is not found", async () => {
    const result = await validateMemberEntry({ memberService }, { member: { id: 99 } })

    expect(result).toBeInstanceOf(Error)
  })

  test("should return an error when the member does not have an active subscription", async () => {
    const result = await validateMemberEntry({ memberService }, { member: { id: 2 } })

    expect(result).toBeInstanceOf(Error)
  })

  test("should return an error if the member is banned", async () => {
    const result = await validateMemberEntry({ memberService }, { member: { id: 4 } })

    expect(result).toBeInstanceOf(Error)
  })

  test("should return the member if it has an active subscription", async () => {
    const member = {
      id: 1,
      nationalId: "12345678A",
      firstName: "Juan",
      lastName: "Pérez",
      phone: "600123456",
      status: 'active',
      registrationAt: { year: 2023, month: 1, day: 15 }
    }
    const result = await validateMemberEntry({ memberService }, { member: { id: 1 } })

    expect(result).toMatchObject(member)
  })
})