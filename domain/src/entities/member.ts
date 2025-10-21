import { DateValue, Person, Entity } from "../utils"

export interface Member extends Entity, Person {
  registrationDate: DateValue
  isActive: boolean
}