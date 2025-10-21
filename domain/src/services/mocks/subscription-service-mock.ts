import { Subscription } from "domain/src/entities"
import { subscriptions } from "./data/subscriptions"
import { NewEntity } from "domain/src/utils"

export const subscriptionService = {
  getById: (id: number) => {
    const foundedSubscription = subscriptions.find(subscription => subscription.id === id)
    if (!foundedSubscription) return null

    let isActiveSubscription = (subscription: NewEntity<Subscription>) => {
      subscription.endDate.setHours(0, 0, 0, 0)
      const todayDate = new Date()
      todayDate.setHours(0, 0, 0, 0)

      return subscription.endDate <= todayDate
    }

    const subscriptionStatus = isActiveSubscription(foundedSubscription) ? 'active' : 'expired'

    return { ...foundedSubscription, status: subscriptionStatus }
  },
  create: (newSubscription: NewEntity<Subscription>) => {
    return {
      id: 10,
      ...newSubscription,
      status: 'active'
    }
  },
  update: (id: number) => {
    
  },
  delete: (id: number) => {
    
  }, 
}