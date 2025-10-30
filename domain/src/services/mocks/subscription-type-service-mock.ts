import { SubscriptionTypeService } from "../subscription-type-service"
import { subscriptionTypes } from "./data/subscription-types"

export const subscriptionTypeService: SubscriptionTypeService = {
  getById: async (subscriptionType: { id: number }) => {
    const result = subscriptionTypes.find(({ id }) => id === subscriptionType.id)
    if (!result) return null

    return { ...result }
  },
  create: async (newSubscriptionType: { description: string, price: number }) => {
    return {
      ...newSubscriptionType,
      id: 10
    }
  },
  update: async (updateSubscriptionType: { id: number, description?: string, price?: number }) => {
    return 
  },
  delete: async (subscriptionType: { id: number }) => {
    return
  }
}