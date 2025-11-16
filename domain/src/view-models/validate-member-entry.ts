import { Member } from "../entities"
import { DateRange } from "../utils"

type BasicMemberInfo = Pick<Member, "firstName" | "lastName" | "status">

export interface ValidateMemberEntryViewModel extends BasicMemberInfo {
  subscription: DateRange
}