import { AbstractDate } from "../utils"

export const SUBSCRIPTION_STATUS = {
  ACTIVE: 'active',
  EXPIRED: 'expired',
} as const

export type SubscriptionStatus = typeof SUBSCRIPTION_STATUS[keyof typeof SUBSCRIPTION_STATUS]

export interface Subscription {
  id: number
  memberId: number
  subscriptionType: string
  startAt: AbstractDate
  endAt: AbstractDate
  status: SubscriptionStatus
  price: number
}