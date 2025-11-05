import { MemberService } from "../services"
import { hasSubscription, isBanned } from "../validations"

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
  if (!hasSubscription(foundedMember)) {
    return new Error("Member does not have a subscription")
  }
  if (isBanned(foundedMember)) {
    return new Error("Member is banned")
  }

  return foundedMember
}