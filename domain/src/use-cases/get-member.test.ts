import { describe, test, expect } from "vitest"
import { getMember } from "./get-member"
import { memberService } from "../services/mocks"

describe("get-member", () => {
  test("should return a member when a valid id is provided", async () => {

    const activeMember = await getMember({ memberService }, { memberId: 1 })
    expect(activeMember).toStrictEqual({
      id: 1,
      dni: "12345678A",
      firstName: "Juan",
      lastName: "Pérez",
      phone: "600123456",
      registrationDate: new Date("2023-01-15"),
      isActive: true
    })

    const inactiveMember = await getMember({ memberService }, { memberId: 3 })
    expect(inactiveMember).toStrictEqual({
      id: 3,
      dni: "11223344C",
      firstName: "Luis",
      lastName: "Martínez",
      phone: "600987654",
      registrationDate: new Date("2024-03-22"),
      isActive: false
    })
  })

  test("should return an error when an invalid id is provided", async () => {
    const error = await getMember({ memberService }, { memberId: 10 })

    expect(error).toBeInstanceOf(Error)
  })
})
