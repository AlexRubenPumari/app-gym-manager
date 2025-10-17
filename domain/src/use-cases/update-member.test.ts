import { describe, test, expect } from "vitest"
import { updateMember } from "./update-member"
import { memberService } from "../services/mocks"

const updateData = {
  phone: '1130401020'
}

describe("update-member", () => {
  test("should return a Member if valid data is provided", async () => {
    const updatedMember = await updateMember({ memberService }, { id: 1, updateData })
    expect(updatedMember).toStrictEqual({
      id: 1,
      name: 'alex',
      phone: '1130401020',
      role: 'member'
    })
  })

  test("should only update the provided fields and keep the rest unchanged", async () => {
  const member = {
    id: 1,
    name: 'alex',
    phone: '1130401020',
    role: 'member'
  }

  const updatedMember = await updateMember({ memberService }, { id: 1, updateData: { phone: '9999999999' } })

  if (!(updateMember instanceof Error)) {
    expect(updatedMember.phone).toBe('9999999999')
    expect(updatedMember.name).toBe(member.name)
    expect(updatedMember.role).toBe(member.role)
    expect(updatedMember.id).toBe(member.id)
  }
})

  test("should return an Error if invalid id is provided", async () => {
    const error = await updateMember({ memberService }, { id: 10, updateData })

    expect(error).toBeInstanceOf(Error)
  })

  test("should return an Error if invalid data is provided", async () => {
    const error = await updateMember({ memberService }, { id: 1 })

    expect(error).toBeInstanceOf(Error)
  })
})
