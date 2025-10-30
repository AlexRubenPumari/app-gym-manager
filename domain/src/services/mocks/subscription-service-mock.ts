import { Subscription } from "domain/src/entities"
import { subscriptions } from "./data/subscriptions"
import { subscriptionTypes } from "./data/subscription-types"
import { NewEntity } from "domain/src/utils"
import { SubscriptionService } from "../subscription-service"

export const subscriptionService: SubscriptionService = {
  getById: (id: number) => {
    const foundedSubscription = subscriptions.find(subscription => subscription.id === id)
    if (!foundedSubscription) return null

    let isActiveSubscription = subscription => {
      const todayDate = dataService.now()
      return (
        dateService.isEqual(subscription.endAt, todayDate) ||
        dataService.isBefore(subscription.endAt, todayDate)
      )
    }

    const subscriptionStatus = isActiveSubscription(foundedSubscription) ? 'active' : 'expired'

    return { ...foundedSubscription, status: subscriptionStatus }
  },
  create: async (newSubscription: NewEntity<Subscription>) => {
    return {
      id: 10,
      ...newSubscription,
      status: 'active'
    }
  },
  update: async (updateSubscription: { id: number }) => {
  },
  delete: async (subscription: { id: number }) => {
  }, 
}