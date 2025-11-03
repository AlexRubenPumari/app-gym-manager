import { Member } from "domain/src/entities"
import { New } from "domain/src/utils"
import { subscriptions } from "./data/subscriptions"
import { members } from "./data/members"
import { MemberService } from "../member-service"

export const memberService: MemberService = {
  getById: async (member: { id: number }) => {
    const foundedMember = members.find(({ id }) => member.id === id)
    if (!foundedMember) return null

    let isActiveMember: boolean = subscriptions.some(
      subscription => {
        if (subscription.memberId !== member.id) return false

        const date = new Date()
        const today = { day: date.getUTCDate(), month: date.getUTCMonth() + 1, year: date.getUTCFullYear() }
        const endAt = subscription.endAt

        return (
          today.year < endAt.year ||
          (today.year === endAt.year && (
            today.month < endAt.month ||
            (today.month === endAt.month && today.day <= endAt.day)
          ))
        )
      }
    )

    const registrationDate = {
      day: foundedMember.registrationAt.getUTCDate(),
      month: foundedMember.registrationAt.getUTCMonth() + 1,
      year: foundedMember.registrationAt.getUTCFullYear(),
    }

    return {
      ...foundedMember,
      registrationAt: registrationDate,
      status: isActiveMember ? 'active' : 'inactive'
    }
  },
  getByNationalId: async (member: { nationalId: string }) => {
    const foundedMember = members.find(({ nationalId }) => member.nationalId === nationalId)
    if (!foundedMember) return null

    let isActiveMember: boolean = subscriptions.some(
      subscription => {
        if (subscription.memberId !== foundedMember.id) return false

        const date = new Date()
        const today = { day: date.getUTCDate(), month: date.getUTCMonth() + 1, year: date.getUTCFullYear() }
        const endAt = subscription.endAt

        return (
          today.year < endAt.year ||
          (today.year === endAt.year && (
            today.month < endAt.month ||
            (today.month === endAt.month && today.day <= endAt.day)
          ))
        )
      }
    )

    const registrationDate = {
      day: foundedMember.registrationAt.getUTCDate(),
      month: foundedMember.registrationAt.getUTCMonth() + 1,
      year: foundedMember.registrationAt.getUTCFullYear(),
    }

    return {
      ...foundedMember,
      registrationAt: registrationDate,
      status: isActiveMember ? 'active' : 'inactive'
    }
  },
  create: async (newMember: New<Member>) => {
    return {
      id: 1,
      ...newMember,
      status: "inactive" as const
    }
  },
  update: async (updateMember) => {
  },
  delete: async (member) => {
  },
}