import { Date, Entity } from "../utils"

export const SUBSCRIPTION_STATUS = {
  ACTIVE: 'active',
  EXPIRED: 'expired',
} as const

export type SubscriptionStatus = typeof SUBSCRIPTION_STATUS[keyof typeof SUBSCRIPTION_STATUS]

export interface Subscription extends Entity {
  startAt: Date
  endAt: Date
  status: SubscriptionStatus
  price: number
  subscriptionType: string
  memberId: number
}