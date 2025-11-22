import { MEMBER_STATUS, SUBSCRIPTION_STATUS,PaymentMethod } from "../entities"
import { LocalDate } from "../utils"
import { MemberService, SubscriptionService, PaymentService, SubscriptionTypeService } from "../services"

interface startMemberSubscriptionDeps {
  memberService: MemberService,
  subscriptionService: SubscriptionService,
  subscriptionTypeService: SubscriptionTypeService,
  paymentService: PaymentService,
}

interface startMemberSubscriptionPayload {
  member: { id: number }
  subscriptionType: { id: number }
  payment: { method: PaymentMethod }
}

export async function startMemberSubscription (
  { memberService, subscriptionService, subscriptionTypeService, paymentService }: startMemberSubscriptionDeps,
  { member, subscriptionType, payment }: startMemberSubscriptionPayload
) {
  const foundedMember = await memberService.getById(member)
  if (!foundedMember) {
    return new Error("Member not found")
  }

  if (foundedMember.subscription) {
    return new Error("Member already has an active subscription")
  }

  const memberIsBanned = foundedMember.status === MEMBER_STATUS.BANNED
  if (memberIsBanned) {
    return new Error("Member is banned")
  }

  const foundedSubscriptionType = await subscriptionTypeService.getById(subscriptionType)
  if (!foundedSubscriptionType) {
    return new Error("Subscription type not found")
  }

  const SUBSCRIPTION_DAYS = 30
  const today = new LocalDate()
  const memberSubscription = {
    memberId: foundedMember.id,
    type: foundedSubscriptionType.description,
    startAt: today,
    endAt: today.addDays(SUBSCRIPTION_DAYS),
    price: foundedSubscriptionType.price,
    status: SUBSCRIPTION_STATUS.ACTIVE
  }
  const createdSubscription = await subscriptionService.create(memberSubscription)

  const memberPayment = {
    subscriptionId: createdSubscription.id,
    memberId: member.id,
    amount: createdSubscription.price,
    paidAt: today,
    method: payment.method,
  }
  const createdPayment = await paymentService.create(memberPayment)

  return { subscription: createdSubscription, payment: createdPayment }
}