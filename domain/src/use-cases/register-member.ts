import { New } from "../utils"
import { Member } from "../entities"
import { MemberService } from "../services"

interface RegisterMemberDeps {
  memberService: MemberService
}

interface RegisterMemberPayload {
  newMember: New<Member>,
}

export async function registerMember (
  { memberService } : RegisterMemberDeps, { newMember }: RegisterMemberPayload
) {

  const existingMember = await memberService.getByNationalId(newMember)
  if (existingMember) return new Error("Member already exists")

  const result = await memberService.create(newMember)

  return result
}