import { AbstractDate, Person, Entity } from "../utils"

export const MEMBER_STATUS = {
  ACTIVE: 'active',
  INACTIVE: 'inactive',
} as const

type MemberStatus = typeof MEMBER_STATUS[keyof typeof MEMBER_STATUS]

export interface Member extends Entity, Person {
  registrationDate: AbstractDate,
  status: MemberStatus
}