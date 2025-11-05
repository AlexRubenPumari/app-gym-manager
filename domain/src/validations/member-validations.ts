import { Member, MEMBER_STATUS } from "../entities"

export function hasSubscription (member: Member) {
  return member.subscription
}

export function isBanned(member: Member) {
  return member.status === MEMBER_STATUS.BANNED
}