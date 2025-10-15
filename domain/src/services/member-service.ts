import { Member } from "../entities"
import { NewEntity } from "../utils"

export interface MemberService {
  getById: (id: number) => Promise<Member | undefined> 
  register: (newMember: NewEntity<Member>) => Promise<Member | Error>
  // update: (member: Member) => Promise<Member | Error>
}