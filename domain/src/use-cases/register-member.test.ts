import { describe, test, expect } from "vitest"
import { registerMember } from "./register-member"
import { memberService } from "../services/mocks"
import { LocalDate, AbstractDate } from "../utils"

describe("register-member", () => {
  test("should return a member with inactive status when given valid data", async () => {
    const newMember = {
      nationalId: "42345678B",
      firstName: "Juan",
      lastName: "Pérez",
      phone: "600123456",
      registrationAt: new LocalDate(),
      isActive: true
    }
    const result = await registerMember({ memberService }, { newMember })
    expect(result).toMatchObject({
      nationalId: "42345678B",
      firstName: "Juan",
      lastName: "Pérez",
      phone: "600123456",
      status: 'inactive'
    })
    if (!(result instanceof Error)) {
      expect(result.registrationAt).toBeInstanceOf(AbstractDate)
      expect(result.id).toBeTypeOf('number')
    }
  })

  test("should return an error when pass a member that is already registered", async () => {
    const newMember = {
      nationalId: "12345678A",
      firstName: "Juan",
      lastName: "Pérez",
      phone: "600123456",
      registrationAt: new LocalDate(),
    }

    const result = await registerMember({ memberService }, { newMember })

    expect(result).toBeInstanceOf(Error)
  })
})
