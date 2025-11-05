import { Subscription } from "domain/src/entities"
import { subscriptions } from "./data/subscriptions"
import { subscriptionTypes } from "./data/subscription-types"
import { New, Date as DateObject } from "domain/src/utils"
import { SubscriptionService } from "../subscription-service"

import { parseDateToDateObject, isBeforeDateObject, isEqualDateObject } from "./logic"

function isActiveSubscription(subscription: { endAt: DateObject }) {
  const todayDate = parseDateToDateObject(new Date())
  return isEqualDateObject(todayDate, subscription.endAt) || isBeforeDateObject(todayDate, subscription.endAt)
}

function createSubscriptionViewModel(
  subscription: {
    id: number; startAt: DateObject; endAt: DateObject; memberId: number;subscriptionTypeId: number;
  }
): Subscription {
  const subscriptionStatus = isActiveSubscription(subscription)
    ? 'active'
    : 'expired'

  return {
    ...subscription,
    price: getSubscriptionPrice(subscription.subscriptionTypeId),
    subscriptionType: getSubscriptionDescription(subscription.subscriptionTypeId),
    status: subscriptionStatus
  }
}

function getSubscriptionPrice(subscriptionTypeId: number) {
  return subscriptionTypes.find(({ id }) => id === subscriptionTypeId)?.price as number
}

function getSubscriptionDescription(subscriptionTypeId: number) {
  return subscriptionTypes.find(({ id }) => id === subscriptionTypeId)?.description as string
}

export const subscriptionService: SubscriptionService = {
  getById: async (subscription: { id: number }) => {
    const foundedSubscription = subscriptions.find(({ id }) => subscription.id === id)
    if (!foundedSubscription) return null

    return createSubscriptionViewModel(foundedSubscription)
  },
  create: async (newSubscription: New<Subscription>) => {
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