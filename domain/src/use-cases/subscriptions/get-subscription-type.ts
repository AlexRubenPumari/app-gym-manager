import { SubscriptionTypeService } from "../../services"

interface GetSubscriptionTypeDeps {
  subscriptionTypeService: SubscriptionTypeService
}

interface GetSubscriptionTypePayload {
  subscriptionType: { id: number },
}

export async function getSubscriptionType (
  { subscriptionTypeService }: GetSubscriptionTypeDeps,
  { subscriptionType }: GetSubscriptionTypePayload
) {
  const result = await subscriptionTypeService.getById(subscriptionType)
  if (!result) return new Error("Subscription type not found")

  return result
}