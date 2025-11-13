import { describe, expect, test, beforeEach } from "vitest"
import { SubscriptionTypeSqlService } from "."
import { connectToDatabase } from "../db"

describe("subscription-type-service-implementation", async () => {
  const db = await connectToDatabase("test")
  const subscriptionTypes = new SubscriptionTypeSqlService(db)

  beforeEach(async () => {
    await db.query("TRUNCATE TABLE SubscriptionType")
  })

  test("create: should create a new subscription type", async () => {
    const subscriptionType = await subscriptionTypes.create(
      { description: "Premium subscription", price: 200 }
    )

    expect(subscriptionType).toMatchObject(
      { description: "Premium subscription", price: 200 }
    )
    expect(subscriptionType.id).toBeTypeOf("number")
  })

  test("update: should update the subscription type", async () => {
    const created = await subscriptionTypes.create({ description: "Basic", price: 100 })
    await subscriptionTypes.update({ id: created.id, description: "Premium", price: 400 })
    const updated = await subscriptionTypes.getById({ id: created.id })

    expect(updated).toStrictEqual({ id: created.id, description: "Premium", price: 400 })
  })

  test("get-by-id: should return a subscription type when pass an id", async () => {
    const createdSubscriptionType = await subscriptionTypes.create(
      { description: "Premium subscription", price: 200 }
    )
    const id = createdSubscriptionType.id
    const foundedSubscriptionType = await subscriptionTypes.getById({ id })

    expect(foundedSubscriptionType).toStrictEqual(
      { id, description: "Premium subscription", price: 200 }
    )
  })

  test("get-by-id: should return an error when pass a non-existent id", async () => {
    const result = await subscriptionTypes.getById({ id: 1 })

    expect(result).toEqual(null)
  })

  test("delete: should delete the subscription type", async () => {
    const created = await subscriptionTypes.create({ description: "Basic", price: 100 })
    await subscriptionTypes.delete({ id: created.id })
    const result = await subscriptionTypes.getById({ id: created.id })

    expect(result).toEqual(null)
  })

  test("get-all: should return a array of subscription types", async () => {
    const result = await subscriptionTypes.getAll()

    expect(result).toHaveLength(0)
  })
})