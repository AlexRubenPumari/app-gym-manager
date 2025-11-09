import { SubscriptionTypeService } from "../../services"
import { New } from "../../utils"
import { SubscriptionType } from "../../entities"

interface CreateSubscriptionTypeDeps {
  subscriptionTypeService: SubscriptionTypeService
}

interface CreateSubscriptionTypePayload {
  subscriptionType: New<SubscriptionType>,
}

export async function createSubscriptionType(
  { subscriptionTypeService }: CreateSubscriptionTypeDeps,
  { subscriptionType }: CreateSubscriptionTypePayload
) {
  return await subscriptionTypeService.create(subscriptionType)
}