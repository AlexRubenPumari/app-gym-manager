import { describe, test, expect } from "vitest"
import { getMember } from "./get-member"
import { memberService } from "../services/mocks"

describe("get-member", () => {
  test("Debe retornar un Cliente si pasamos un id válido", async () => {

    const member = await getMember({ memberService }, { id: 1 })
    expect(member).toStrictEqual({
      id: 1,
      name: 'alex',
      phone: '1128280122',
      role: 'member'
    })
  })

  test("Debe retornar un Error si pasamos un id inválido", async () => {
    const error = await getMember({ memberService }, { id: 10 })

    expect(error).toBeInstanceOf(Error)
  })
})
