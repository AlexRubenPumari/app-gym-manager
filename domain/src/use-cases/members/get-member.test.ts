import { describe, test, expect } from "vitest"
import { getMember } from "."
import { memberService } from "../../services/mocks"

describe("get-member", () => {
  test("should return a member with a subscription if the member has an active subscription", async () => {
    const member = await getMember({ memberService }, { member: { id: 1 } })
    expect(member).toStrictEqual({
      id: 1,
      nationalId: "12345678A",
      firstName: "Juan",
      lastName: "Pérez",
      phone: "600123456",
      status: "active",
      registrationAt: { year: 2023, month: 1, day: 15 },
      subscription: {
        id: 1,
        startAt: { day: 10, month: 10, year: 2025 },
        endAt: { day: 10, month: 11, year: 2026 },
        memberId: 1,
        type: "Common plan",
        price: 200,
        status: "active",
      }
    })
  })

  test("should return a member without a subscription if the member has not an active subscription", async () => {
    const member = await getMember({ memberService }, { member: { id: 3 } })

    expect(member).toStrictEqual({
      id: 3,
      nationalId: "11223344C",
      firstName: "Luis",
      lastName: "Martínez",
      phone: "600987654",
      status: "active",
      registrationAt: { year: 2024, month: 3, day: 22 },
    })
  })

  test("should return an error if pass a non-existent member id", async () => {
    const error = await getMember({ memberService }, { member: { id: 10 } })

    expect(error).toBeInstanceOf(Error)
  })
})