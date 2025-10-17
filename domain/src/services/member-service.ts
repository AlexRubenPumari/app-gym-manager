import { Member } from "../entities"
import { NewEntity } from "../utils"

export interface MemberService {
  getById: (id: number) => Promise<Member | undefined> 
  register: (newMember: NewEntity<Member>) => Promise<Member | Error>
  update: (id: number, updateData: Partial<NewEntity<Member>>) => Promise<Member | Error>
}