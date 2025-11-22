import { Date, Person, Entity } from "../utils"

export const MEMBER_STATUS = {
  ACTIVE: "active",
  BANNED: "banned",
} as const

export type MemberStatus = typeof MEMBER_STATUS[keyof typeof MEMBER_STATUS]

export interface Member extends Entity, Person {
  registrationAt: Date,
  status: MemberStatus,
  subscription?: { id: number },
}