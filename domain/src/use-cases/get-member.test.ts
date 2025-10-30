import { describe, test, expect } from "vitest"
import { getMember } from "./get-member"
import { memberService } from "../services/mocks"
import { AbstractDate } from "../utils"

describe("get-member", () => {
  test("should return a member with active status when pass an active member id", async () => {

    const activeMember = await getMember({ memberService }, { member: { id: 1 } })
    expect(activeMember).toMatchObject({
      id: 1,
      nationalId: "12345678A",
      firstName: "Juan",
      lastName: "Pérez",
      phone: "600123456",
      status: 'active'
    })
    if (!(activeMember instanceof Error)) {
      expect(activeMember.registrationAt).toBeInstanceOf(AbstractDate)
    }
  })

  test("should return a member with inactive status when pass an inactive member id", async () => {
    const inactiveMember = await getMember({ memberService }, { member: { id: 3 } })
    expect(inactiveMember).toMatchObject({
      id: 3,
      nationalId: "11223344C",
      firstName: "Luis",
      lastName: "Martínez",
      phone: "600987654",
      status: 'inactive'
    })
    if (!(inactiveMember instanceof Error)) {
      expect(inactiveMember.registrationAt).toBeInstanceOf(AbstractDate)
    }
  })

  test("should return an error if pass a non-existent member id", async () => {
    const error = await getMember({ memberService }, { member: { id: 10 } })

    expect(error).toBeInstanceOf(Error)
  })
})
