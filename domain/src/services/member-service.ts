import { Member } from "../entities"

export interface MemberService {
  getById: (id: number) => Promise<Member | undefined> 
}