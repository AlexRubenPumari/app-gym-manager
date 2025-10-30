import { Entity } from "../utils"

export interface SubscriptionType extends Entity {
  description: string,
  price: number
}