import { Member } from "domain/src/entities"
import { NewEntity } from "domain/src/utils"
import { subscriptions } from "./data/subscriptions"
import { members } from "./data/members"
import { MemberService } from "../member-service"
import { LocalDate } from "../../utils"

export const memberService: MemberService = {
  getById: async (member: { id: number }) => {
    const foundedMember = members.find(({ id }) => member.id === id)
    if (!foundedMember) return null

    let isActiveMember: boolean = subscriptions.some(
      subscription => {
        if (subscription.memberId !== member.id) return false

        const today = new LocalDate()
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

    return {
      ...foundedMember,
      registrationAt: new LocalDate(
        foundedMember.registrationAt.getUTCFullYear(),
        foundedMember.registrationAt.getUTCMonth() + 1,
        foundedMember.registrationAt.getUTCDate(),
      ),
      status: isActiveMember ? 'active' : 'inactive'
    }
  },
  getByNationalId: async (member: { nationalId: string }) => {
    const foundedMember = members.find(({ nationalId }) => member.nationalId === nationalId)
    if (!foundedMember) return null

    let isActiveMember: boolean = subscriptions.some(
      subscription => {
        if (subscription.memberId !== foundedMember.id) return false

        const today = new LocalDate()
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

    return {
      ...foundedMember,
      registrationAt: new LocalDate(
        foundedMember.registrationAt.getUTCFullYear(),
        foundedMember.registrationAt.getUTCMonth() + 1,
        foundedMember.registrationAt.getUTCDate(),
      ),
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
  update: async (updateMember) => {
  },
  delete: async (member) => {
  },
}