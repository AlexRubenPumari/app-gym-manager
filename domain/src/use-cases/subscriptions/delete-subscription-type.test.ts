import { describe, test, expect } from "vitest"
import { deleteSubscriptionType, getSubscriptionType } from "."
import { subscriptionTypeService } from "../../services/mocks"

describe("delete-subscription-type", () => {
  test("should return an error if pass a non-existent subscription type", async () => {
    const error = await deleteSubscriptionType(
      { subscriptionTypeService }, { subscriptionType: { id: 10 } }
    )

    expect(error).toBeInstanceOf(Error)
  })

  test("should delete the subscription type", async () => {
    const subscriptionType = { id: 1 }
    await deleteSubscriptionType(
      { subscriptionTypeService }, { subscriptionType }
    )
    const result = await getSubscriptionType(
      { subscriptionTypeService }, { subscriptionType }
    )

    expect(result).toBeInstanceOf(Error)
  })
})
