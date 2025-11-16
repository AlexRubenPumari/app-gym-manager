import { describe, test, expect } from "vitest"
import { validateMemberEntry } from "./validate-member-entry"
import { memberService, subscriptionService } from "../../services"

describe("validate-member-entry", () => {
  test("should return an error if the member is not found", async () => {
    const result = await validateMemberEntry(
      { memberService, subscriptionService }, { member: { id: 99 } }
    )

    expect(result).toBeInstanceOf(Error)
  })

  test("should return an error when the member does not have an active subscription", async () => {
    const result = await validateMemberEntry(
      { memberService, subscriptionService }, { member: { id: 2 } }
    )

    expect(result).toBeInstanceOf(Error)
  })

  test("should return an error if the member is banned", async () => {
    const result = await validateMemberEntry(
      { memberService, subscriptionService }, { member: { id: 4 } }
    )

    expect(result).toBeInstanceOf(Error)
  })

  test("should return the member if it has an active subscription", async () => {
    const result = await validateMemberEntry(
      { memberService, subscriptionService }, { member: { id: 1 } }
    )

    expect(result).toStrictEqual({
      firstName: "Juan",
      lastName: "Pérez",
      status: 'active',
      subscription: {
        startAt: { day: 10, month: 10, year: 2025 },
        endAt: { day: 10, month: 11, year: 2026 },
      }
    })
  })
})