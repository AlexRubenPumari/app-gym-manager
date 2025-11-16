import { describe, test, expect } from "vitest"
import { getSubscriptionType } from "."
import { subscriptionTypeService } from "../../services/mocks"

describe("get-subscription-type", () => {
  test("should return a subscription type when pass a subscription type id", async () => {
    const foundedSubscriptionType = await getSubscriptionType(
      { subscriptionTypeService }, { subscriptionType: { id: 1 } }
    )
    expect(foundedSubscriptionType).toStrictEqual({
      id: 1,
      description: "Common plan",
      price: 200
    })
  })

  test("should return an error if pass a non-existent subscription type id", async () => {
    const error = await getSubscriptionType(
      { subscriptionTypeService }, { subscriptionType: { id: 10 } }
    )

    expect(error).toBeInstanceOf(Error)
  })
})
