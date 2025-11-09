import { SubscriptionTypeService } from "../subscription-type-service"
import { subscriptionTypes } from "./data/subscription-types"

export const subscriptionTypeService: SubscriptionTypeService = {
  getById: async (subscriptionType: { id: number }) => {
    const result = subscriptionTypes.find(({ id }) => id === subscriptionType.id)
    if (!result) return null

    return { ...result }
  },
  getAll: async () => {
    return [...subscriptionTypes]
  },
  create: async (newSubscriptionType: { description: string, price: number }) => {
    return {
      ...newSubscriptionType,
      id: 10
    }
  },
  update: async (subscriptionType: { id: number, description?: string, price?: number }) => {
    const index = subscriptionTypes.findIndex(({ id }) => id === subscriptionType.id)

    if (subscriptionTypes[index]) {
      subscriptionTypes[index] = {
        id: subscriptionTypes[index].id,
        price: subscriptionType.price ?? subscriptionTypes[index].price,
        description: subscriptionType.description ?? subscriptionTypes[index].description
      }
    }
  },
  delete: async (subscriptionType: { id: number }) => {
    const index = subscriptionTypes.findIndex(({ id }) => id === subscriptionType.id)

    subscriptionTypes.splice(index, 1)
  }
}