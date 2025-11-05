import { describe, test, expect } from "vitest"
import { getMember } from "./get-member"
import { memberService } from "../services/mocks"

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
      expect(Object.keys(activeMember.registrationAt)).toEqual(['day', 'month', 'year'])
      expect(activeMember.registrationAt).toEqual({
        day: expect.any(Number),
        month: expect.any(Number),
        year: expect.any(Number),
      })
    }
  })

  test("should return a member without subscription when pass an member without subscription id", async () => {
    const member = await getMember({ memberService }, { member: { id: 3 } })
    expect(member).toMatchObject({
      id: 3,
      nationalId: "11223344C",
      firstName: "Luis",
      lastName: "Martínez",
      phone: "600987654",
      status: 'active'
    })
    if (!(member instanceof Error)) {
      expect(Object.keys(member.registrationAt)).toEqual(['day', 'month', 'year'])
      expect(member.registrationAt).toEqual({
        day: expect.any(Number),
        month: expect.any(Number),
        year: expect.any(Number),
      })
      expect(member.subscription).toBeUndefined()
    }
  })

  test("should return an error if pass a non-existent member id", async () => {
    const error = await getMember({ memberService }, { member: { id: 10 } })

    expect(error).toBeInstanceOf(Error)
  })
})
