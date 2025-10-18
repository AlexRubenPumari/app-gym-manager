import { describe, test, expect } from "vitest"
import { getMember } from "./get-member"
import { memberService } from "../services/mocks"

describe("get-member", () => {
  test("should return a member when a valid id is provided", async () => {

    const member = await getMember({ memberService }, { memberId: 1 })
    expect(member).toStrictEqual({
      id: 1,
      name: 'alex',
      phone: '1128280122',
      role: 'member'
    })
  })

  test("should return an error when an invalid id is provided", async () => {
    const error = await getMember({ memberService }, { memberId: 10 })

    expect(error).toBeInstanceOf(Error)
  })
})
