import { describe, expect, test } from "vitest"
import { updateSubscriptionType, getSubscriptionType } from "."
import { subscriptionTypeService } from "../../services"

describe("update-subscription-type", () => {
  test("should return an error when the subscription type does not exist", async () => {
    const subscriptionType = { id: 99, price: 0 }

    const result = await updateSubscriptionType(
      { subscriptionTypeService }, { subscriptionType } 
    )

    expect(result).toBeInstanceOf(Error)
  })
  test("should update the subscription type", async () => {
    const subscriptionType = { id: 1, price: 0 }

    await updateSubscriptionType(
      { subscriptionTypeService }, { subscriptionType } 
    )

    const updatedSubscriptionType = await getSubscriptionType(
      { subscriptionTypeService }, { subscriptionType }
    )

    expect(updatedSubscriptionType).toStrictEqual(
      { id: 1, description: "Common plan", price: 0 }
    )
  })
})