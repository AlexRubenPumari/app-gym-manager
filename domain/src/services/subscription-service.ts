import { Subscription } from "../entities"
import { Service } from "../utils"

export interface SubscriptionService extends Service<Subscription> {
  getActiveByMember: (member: { id: number }) => Promise<Subscription | null>
}