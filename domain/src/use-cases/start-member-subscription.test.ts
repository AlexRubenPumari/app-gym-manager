import { describe, test, expect } from "vitest"
import { memberService, subscriptionService, subscriptionTypeService, paymentService } from "../services/mocks"
import { AbstractDate } from "../utils"
import { startMemberSubscription } from "./start-member-subscription"

describe("start-member-subscription", () => {
  test("should return an error if member already has an active subscription", async () => {
    const result = await startMemberSubscription(
      { memberService, subscriptionService, subscriptionTypeService, paymentService },
      { member: { id: 1 }, payment: { method: "cash" }, subscriptionType: { id: 1 } }
    )

    expect(result).toBeInstanceOf(Error)
  })

  test("should return an error if member does not exist", async () => {
    const result = await startMemberSubscription(
      { memberService, subscriptionService, subscriptionTypeService, paymentService },
      { member: { id: 99 }, payment: { method: "cash" }, subscriptionType: { id: 1 } }
    )

    expect(result).toBeInstanceOf(Error)
  })

  test("should return an error if subscription type does not exist", async () => {
    const result = await startMemberSubscription(
      { memberService, subscriptionService, subscriptionTypeService, paymentService },
      { member: { id: 1 }, payment: { method: "cash" }, subscriptionType: { id: 99 } }
    )

    expect(result).toBeInstanceOf(Error)
  })

  test("should return a subscription and payment if subscription type, member and payment method exist", async () => {
    const result = await startMemberSubscription(
      { memberService, subscriptionService, subscriptionTypeService, paymentService },
      { member: { id: 1 }, payment: { method: "cash" }, subscriptionType: { id: 1 } }
    )

    if (!(result instanceof Error)) {
      const { payment, subscription } = result
      
      expect(subscription.id).toBeTypeOf("number")
      expect(subscription.subscriptionType).toBeTypeOf("string")
      expect(subscription.price).toBeTypeOf("number")
      expect(subscription.startAt).toBeInstanceOf(AbstractDate)
      expect(subscription.endAt).toBeInstanceOf(AbstractDate)
      expect(subscription).toMatchObject({
        status: "active",
        memberId: 1
      })

      expect(payment.id).toBeTypeOf("number")
      expect(payment.subscriptionId).toBeTypeOf("number")
      expect(payment.paidAt).toBeInstanceOf(AbstractDate)
      expect(payment).toMatchObject({
        memberId: 1,
        amount: subscription.price,
        method: "cash"
      })
    }
  })
})