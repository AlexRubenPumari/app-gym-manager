import { Member, MemberStatus, Subscription } from "domain/src/entities"
import { New } from "domain/src/utils"
import { members } from "./data/members"
import { MemberService } from "../member-service"
import { isActiveSubscription, subscriptionService } from "./subscription-service-mock"
import { parseDateToDateObject, parseDateObjectToDate } from "./logic"
import { subscriptions } from "./data/subscriptions"

async function getActiveSubscriptionByMember(member: { id: number }): Promise<Subscription | undefined> {
  const result = subscriptions
    .filter(subcription => subcription.memberId === member.id)
    .find(subcription => isActiveSubscription(subcription))

  if(!result) return

  return await subscriptionService.getById({ id: result.id }) as Subscription
}

async function createMember(member: {
  id: number;
  nationalId: string;
  firstName: string;
  lastName: string;
  phone?: string;
  status: string;
  registrationAt: Date;
}): Promise<Member> {
  const registrationDate = parseDateToDateObject(member.registrationAt)
  const status = member.status as MemberStatus

  const memberSubscription = await getActiveSubscriptionByMember(member)

  let result: Member = { ...member, status: status, registrationAt: registrationDate }

  if (memberSubscription) return { ...result, subscription: memberSubscription}
  
  return result
}

export const memberService: MemberService = {
  getAll: async () => {
    return await Promise.all(
      members.map(member => createMember(member))
    )
  },
  getById: async (member: { id: number }) => {
    const foundedMember = members.find(({ id }) => member.id === id)
    if (!foundedMember) return null

    return createMember(foundedMember)
  },
  getByNationalId: async (member: { nationalId: string }) => {
    const foundedMember = members.find(({ nationalId }) => member.nationalId === nationalId)
    if (!foundedMember) return null

    return createMember(foundedMember)
  },
  create: async (newMember: New<Member>) => {
    return {
      id: 1,
      ...newMember,
      status: "active" as const
    }
  },
  update: async (member) => {
    const index = members.findIndex(({ id }) => id === member.id)
    let foundedMember = members[index]
    
    if (!!foundedMember) {
      const registrationAt: Date = member.registrationAt
        ? parseDateObjectToDate(member.registrationAt)
        : foundedMember.registrationAt

      const updatedMember = {
        ...foundedMember,
        ...member,
        registrationAt
      }

      foundedMember = updatedMember
    }
  },
  delete: async (member) => {
  },
}