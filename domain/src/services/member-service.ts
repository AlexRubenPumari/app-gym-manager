import { Member } from "../entities"
import { Service } from "../utils"

export interface MemberService extends Service<Member> {
  getAll: () => Promise<Member[]>
  getByNationalId: (member: { nationalId: string }) => Promise<Member | null>
}