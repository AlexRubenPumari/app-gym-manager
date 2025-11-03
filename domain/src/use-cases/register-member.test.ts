import { describe, test, expect } from "vitest"
import { registerMember } from "./register-member"
import { memberService, dateService } from "../services/mocks"

describe("register-member", () => {
  test("should return a member with inactive status when given valid data", async () => {
    const currentDate = new Date()
    const registrationAt = {
      day: currentDate.getUTCDate(),
      month: currentDate.getUTCMonth() + 1,
      year: currentDate.getUTCFullYear(),
    }
    const newMember = {
      nationalId: "42345678B",
      firstName: "Juan",
      lastName: "Pérez",
      phone: "600123456",
    }
    const result = await registerMember({ memberService, dateService }, { newMember })
    expect(result).toMatchObject({
      nationalId: "42345678B",
      firstName: "Juan",
      lastName: "Pérez",
      phone: "600123456",
      status: 'inactive',
      registrationAt
    })
    if (!(result instanceof Error)) expect(result.id).toBeTypeOf('number')
  })

  test("should return an error when pass a member that is already registered", async () => {
    const newMember = {
      nationalId: "12345678A",
      firstName: "Juan",
      lastName: "Pérez",
      phone: "600123456",
    }

    const result = await registerMember({ memberService, dateService }, { newMember })

    expect(result).toBeInstanceOf(Error)
  })
})