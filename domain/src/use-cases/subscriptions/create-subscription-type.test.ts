import { describe, test, expect } from "vitest"
import { createSubscriptionType } from "."
import { subscriptionTypeService } from "../../services/mocks"

describe("create-subscription-type", () => {
  test("should return a subscription type", async () => {
    const subscriptionType = {
      description: "Premium plan",
      price: 400,
    }
    const createdSubscriptionType = await createSubscriptionType(
      { subscriptionTypeService }, { subscriptionType }
    )

    expect(createdSubscriptionType).toMatchObject({
      description: "Premium plan",
      price: 400
    })
    expect(createdSubscriptionType.id).toBeTypeOf("number")
  })
})
