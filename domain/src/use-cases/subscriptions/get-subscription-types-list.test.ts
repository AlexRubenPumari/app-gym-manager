import { describe, expect, test } from "vitest"
import { getSubscriptionTypesList } from "."
import { subscriptionTypeService } from "../../services"

describe("get-subscription-types-list", async () => {
  test("should return a array of subscription types", async () => {
    const result = await getSubscriptionTypesList({ subscriptionTypeService })

    expect(result).toHaveLength(1)
  })
})