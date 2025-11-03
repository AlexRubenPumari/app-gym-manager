import { Date, Person, Entity, New } from "../utils"

export const MEMBER_STATUS = {
  ACTIVE: 'active',
  INACTIVE: 'inactive',
} as const

export type MemberStatus = typeof MEMBER_STATUS[keyof typeof MEMBER_STATUS]

export interface Member extends Entity, Person {
  registrationAt: Date,
  status: MemberStatus
}

export type NewMember = Omit<New<Member>, 'registrationAt'>
