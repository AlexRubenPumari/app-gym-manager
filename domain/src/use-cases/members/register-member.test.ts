import { describe, test, expect } from "vitest"
import { registerMember } from "./register-member"
import { memberService, dateService } from "../../services/mocks"

describe("register-member", () => {
  test("should register a member without a subscription", async () => {
    const currentDate = new Date()
    const today = {
      day: currentDate.getUTCDate(),
      month: currentDate.getUTCMonth() + 1,
      year: currentDate.getUTCFullYear(),
    }
    const member = {
      nationalId: "42345678B",
      firstName: "Juan",
      lastName: "Pérez",
      phone: "600123456",
    }
    const newMember = await registerMember({ memberService, dateService }, { member })
    expect(newMember).toMatchObject({
      nationalId: "42345678B",
      firstName: "Juan",
      lastName: "Pérez",
      phone: "600123456",
      status: "active",
      registrationAt: today
    })
    if (!(newMember instanceof Error)) {
      expect(newMember.id).toBeTypeOf("number")
      expect(newMember.subscription).toBeUndefined()
    }
  })

  test("should return an error when pass a member that is already registered", async () => {
    const member = {
      nationalId: "12345678A",
      firstName: "Juan",
      lastName: "Pérez",
      phone: "600123456",
    }

    const result = await registerMember({ memberService, dateService }, { member })

    expect(result).toBeInstanceOf(Error)
  })
})