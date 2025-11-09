import { SubscriptionTypeService } from "../../services"

interface DeleteSubscriptionTypeDeps {
  subscriptionTypeService: SubscriptionTypeService
}

interface DeleteSubscriptionTypePayload {
  subscriptionType: { id: number },
}

export async function deleteSubscriptionType(
  { subscriptionTypeService }: DeleteSubscriptionTypeDeps,
  { subscriptionType }: DeleteSubscriptionTypePayload
) {
  const existing = await subscriptionTypeService.getById(subscriptionType)
  if (!existing) {
    return new Error("Subscription type not found")
  }

  await subscriptionTypeService.delete(subscriptionType)
}