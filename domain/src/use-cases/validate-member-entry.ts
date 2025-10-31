import { MEMBER_STATUS } from "../entities"
import { MemberService } from "../services"

interface ValidateMemberEntryDeps {
  memberService: MemberService
}

interface ValidateMemberEntryPayload {
  member: { id: number }
}

export async function validateMemberEntry (
  { memberService }: ValidateMemberEntryDeps,
  { member }: ValidateMemberEntryPayload
) {
  const foundedMember = await memberService.getById(member)
  if (!foundedMember) {
    return new Error("Member not found")
  }
  if (foundedMember.status !== MEMBER_STATUS.ACTIVE) {
    return new Error("Member does not have an active subscription")
  }

  return foundedMember
}