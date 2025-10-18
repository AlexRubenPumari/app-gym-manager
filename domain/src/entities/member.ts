import { ExpirationDate } from "./expiration-date"
import { Person } from "./person"

export interface Member extends Person {
  subscriptionExpiresAt: ExpirationDate
}