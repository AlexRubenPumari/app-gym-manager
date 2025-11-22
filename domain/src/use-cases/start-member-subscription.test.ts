import { describe, test, expect } from "vitest"
import { memberService, subscriptionService, subscriptionTypeService, paymentService, dateService } from "../services/mocks"
import { startMemberSubscription } from "./start-member-subscription"

describe("start-member-subscription", () => {
  test("should return an error if member already has an active subscription", async () => {
    const result = await startMemberSubscription(
      { memberService, subscriptionService, subscriptionTypeService, paymentService },
      { member: { id: 1 }, payment: { method: "cash" }, subscriptionType: { id: 1 } }
    )

    expect(result).toBeInstanceOf(Error)
  })

  test("should return an error if the member does not exist", async () => {
    const result = await startMemberSubscription(
      { memberService, subscriptionService, subscriptionTypeService, paymentService },
      { member: { id: 99 }, payment: { method: "cash" }, subscriptionType: { id: 1 } }
    )

    expect(result).toBeInstanceOf(Error)
  })

  test("should return an error if the member is banned", async () => {
    const result = await startMemberSubscription(
      { memberService, subscriptionService, subscriptionTypeService, paymentService },
      { member: { id: 4 }, payment: { method: "cash" }, subscriptionType: { id: 1 } }
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
      expect(subscription.type).toBeTypeOf("string")
      expect(subscription.startAt).toStrictEqual(dateService.now())
      expect(subscription.endAt).toStrictEqual(dateService.now().addDays(30))
      expect(subscription).toMatchObject({
        type: "Common plan",
        status: "active",
        memberId: 1,
        price: 200
      })

      expect(payment.id).toBeTypeOf("number")
      expect(payment.paidAt).toStrictEqual(dateService.now())
      expect(payment).toMatchObject({
        subscriptionId: subscription.id,
        memberId: 1,
        amount: subscription.price,
        method: "cash"
      })
    }
  })
})