import { DateValue } from "./date-value"
import { Person } from "./person"

export interface Member extends Person {
  registrationDate: DateValue
  isActive: boolean
}