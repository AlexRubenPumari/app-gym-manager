import { DateValue, Person, Entity } from "../utils"

export interface Member extends Entity, Person {
  registrationDate: DateValue,
  status: MemberStatus
}

type MemberStatus = 'active' | 'inactive'