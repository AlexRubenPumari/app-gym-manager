import { DateValue, Person, Entity } from "../utils"
import { MemberStatus } from "./member-status"

export interface Member extends Entity, Person {
  registrationDate: DateValue,
  status: MemberStatus
}