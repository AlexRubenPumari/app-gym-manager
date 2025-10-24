import { Member } from "domain/src/entities"
import { NewEntity } from "domain/src/utils"
import { subscriptions } from "./data/subscriptions"
import { members } from "./data/members"
import { MemberService } from "../member-service"

export const memberService: MemberService = {
  getById: async (id: number) => {
    const foundedMember = members.find(member => member.id === id)
    if (!foundedMember) return null

    let isActiveMember: boolean = subscriptions.some(
      subscription => {
        if (subscription.memberId !== id) return false

        const today = new Date()
        const end = subscription.endDate

        return (
          today.getFullYear() < end.getFullYear() ||
          (today.getFullYear() === end.getFullYear() && (
            today.getMonth() < end.getMonth() ||
            (today.getMonth() === end.getMonth() && today.getDate() <= end.getDate())
          ))
        )
      }
    )

    return {
      ...foundedMember,
      status: isActiveMember ? 'active' : 'inactive'
    }
  },
  getByNationalId: async (nationalId: string) => {
    const foundedMember = members.find(member => member.nationalId === nationalId)
    if (!foundedMember) return null

    let isActiveMember: boolean = subscriptions.some(
      subscription => {
        if (subscription.memberId !== foundedMember.id) return false

        const today = new Date()
        const end = subscription.endDate

        return (
          today.getFullYear() < end.getFullYear() ||
          (today.getFullYear() === end.getFullYear() && (
            today.getMonth() < end.getMonth() ||
            (today.getMonth() === end.getMonth() && today.getDate() <= end.getDate())
          ))
        )
      }
    )

    return {
      ...foundedMember,
      status: isActiveMember ? 'active' : 'inactive'
    }
  },
  create: async (newMember: NewEntity<Member>) => {
    return {
      id: 1,
      ...newMember,
      status: "inactive" as const
    }
  },
  update: async (id: number, updateData: Partial<NewEntity<Member>>) => {
    if (!updateData) return new Error()

    const member = members.find(member => member.id === id)

    if (!member) return new Error()

    return { ...member, ...updateData } as Member
  }
}