import { describe, test, expect } from "vitest"
import { getMember } from "./get-member"
import { memberService } from "../services/mocks"

describe("get-member", () => {
  test("should return a member with active status when given an active member id", async () => {

    const activeMember = await getMember({ memberService }, { memberId: 1 })
    expect(activeMember).toStrictEqual({
      id: 1,
      nationalId: "12345678A",
      firstName: "Juan",
      lastName: "Pérez",
      phone: "600123456",
      registrationDate: new Date("2023-01-15"),
      status: 'active'
    })
  })

  test("should return a member with inactive status when given an inactive member id", async () => {
    const inactiveMember = await getMember({ memberService }, { memberId: 3 })
    expect(inactiveMember).toStrictEqual({
      id: 3,
      nationalId: "11223344C",
      firstName: "Luis",
      lastName: "Martínez",
      phone: "600987654",
      registrationDate: new Date("2024-03-22"),
      status: 'inactive'
    })
  })

  test("should return an error if given a non-existent member id", async () => {
    const error = await getMember({ memberService }, { memberId: 10 })

    expect(error).toBeInstanceOf(Error)
  })
})
