import { SubscriptionTypeService } from "../services"

interface getSubscriptionTypesListDeps {
  subscriptionTypeService: SubscriptionTypeService
}

export async function getSubscriptionTypesList (
  { subscriptionTypeService }: getSubscriptionTypesListDeps
) {
  return await subscriptionTypeService.getAll()
}