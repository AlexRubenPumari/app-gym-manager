import { DateRange, Entity } from "../utils"

export const SUBSCRIPTION_STATUS = {
  ACTIVE: "active",
  EXPIRED: "expired",
} as const

export type SubscriptionStatus = typeof SUBSCRIPTION_STATUS[keyof typeof SUBSCRIPTION_STATUS]

export interface Subscription extends Entity, DateRange {
  status: SubscriptionStatus
  price: number
  type: string
  memberId: number
}