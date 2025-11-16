import { ValidateMemberEntryViewModel } from "../../view-models"
import { MemberService, SubscriptionService } from "../../services"
import { MEMBER_STATUS } from "../../entities"

interface ValidateMemberEntryDeps {
  memberService: MemberService
  subscriptionService: SubscriptionService
}

interface ValidateMemberEntryPayload {
  member: { id: number }
}

export async function validateMemberEntry (
  { memberService, subscriptionService }: ValidateMemberEntryDeps,
  { member }: ValidateMemberEntryPayload
) {
  const foundedMember = await memberService.getById(member)
  
  if (!foundedMember) {
    return new Error("Member not found")
  }
  if (foundedMember.status === MEMBER_STATUS.BANNED) {
    return new Error("Member is banned")
  }
  
  const foundedSubscription = await subscriptionService.getActiveByMember(foundedMember)
  if (!foundedSubscription) {
    return new Error("Member does not have an active subscription")
  }

  const result: ValidateMemberEntryViewModel = {
    firstName: foundedMember.firstName,
    lastName: foundedMember.lastName,
    status: foundedMember.status,
    subscription: {
      startAt: foundedSubscription.startAt,
      endAt: foundedSubscription.endAt,
    },
  }

  return result
}