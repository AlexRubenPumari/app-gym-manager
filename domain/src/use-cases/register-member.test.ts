import { Member } from "../entities"
import { describe, test, expect } from "vitest"
import { registerMember } from "./register-member"
import { memberService } from "../services/mocks"

describe("register-member", () => {
  test("should return a member when given valid data", async () => {
    function isMember(result: any): result is Member {
      return result && typeof result === 'object' && 'dni' in result;
    }

    const newMember = {
      nationalId: "42345678B",
      firstName: "Juan",
      lastName: "Pérez",
      phone: "600123456",
      registrationDate: new Date(),
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
    if (isMember(result)) {
      expect(result.registrationDate).toBeInstanceOf(Date)
      expect(result.id).toBeTypeOf('number')
    }
  })

  test("should return an error when given a member that is already registered", async () => {
    const member = {
      nationalId: "12345678A",
      firstName: "Juan",
      lastName: "Pérez",
      phone: "600123456",
      registrationDate: new Date("2023-01-15"),
    }

    const result = await registerMember({ memberService }, { newMember: member })

    expect(result).toBeInstanceOf(Error)
  })
})
