import { describe, test, expect } from "vitest"
import { registerMember } from "./register-member"
import { memberService } from "../services/mocks"

describe("register-member", () => {
  test("Debe retornar un Member si los datos son válidos", async () => {
    const newMember = {
      name: 'alex',
      phone: '1128280122',
      role: 'member' as const
    }
    const result = await registerMember({ memberService }, { newMember })
    expect(result).toStrictEqual({
      id: 1,
      name: 'alex',
      phone: '1128280122',
      role: 'member'
    })
  })

  test("Debe retornar un Error si los datos son inválidos", async () => {
    const error = await registerMember({ memberService })

    expect(error).toBeInstanceOf(Error)
  })
})
