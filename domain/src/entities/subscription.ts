import { DateValue } from "./date-value"

type SubscriptionStatus = 'active' | 'expired'

export interface Subscription {
  id: number
  startDate: DateValue
  endDate: DateValue
  status: SubscriptionStatus
  memberId: number
}