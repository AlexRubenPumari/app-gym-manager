import { Member } from "domain/src/entities"
import { NewEntity } from "domain/src/utils"
import { subscriptions } from "./data/subscriptions"
import { members } from "./data/members"

export const memberService = {
  getById: async (id: number) => {
    const foundedMember = members.find(member => member.id === id)
    if (!foundedMember) return null

    let isActiveMember: boolean = subscriptions.some(
      subscription => {
        if (subscription.memberId !== id) return false

        const endDate = new Date(subscription.endDate)
        const todayDate = new Date()

        endDate.setHours(0, 0, 0, 0)
        todayDate.setHours(0, 0, 0, 0)

        return endDate >= todayDate
      }
    )

    return { ...foundedMember, status: isActiveMember ? 'active' : 'banned' as const }
  },
  create: async (newMember: NewEntity<Member>) => {
    if (!newMember) return new Error()

    return {
      id: 1,
      ...newMember
    } as Member
  },
  update: async (id: number, updateData: Partial<NewEntity<Member>>) => {
    if (!updateData) return new Error()

    const member = members.find(member => member.id === id)

    if (!member) return new Error()

    return { ...member, ...updateData } as Member
  }
}