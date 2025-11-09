import { SubscriptionTypeService } from "../../services"

interface UpdateSubscriptionTypeDeps {
  subscriptionTypeService: SubscriptionTypeService
}

interface UpdateSubscriptionTypePayload {
  subscriptionType: { id: number },
}

export async function updateSubscriptionType(
  { subscriptionTypeService }: UpdateSubscriptionTypeDeps,
  { subscriptionType }: UpdateSubscriptionTypePayload
) {
  const existing = await subscriptionTypeService.getById(subscriptionType)
  if (!existing) {
    return new Error("Subscription type not found")
  }

  await subscriptionTypeService.update(subscriptionType)
}