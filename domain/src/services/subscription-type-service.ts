import { SubscriptionType } from "../entities"
import { Service } from "../utils"


export interface SubscriptionTypeService extends Service<SubscriptionType> {
  getAll: () => Promise<SubscriptionType[]>
}