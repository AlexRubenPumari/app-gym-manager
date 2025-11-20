import { MemberService } from "../../services"

interface UpdateMemberDeps {
  memberService: MemberService
}

interface UpdateMemberPayload {
  member: { 
    id: number,
    nationalId?: string,
    firstName?: string,
    lastName?: string,
    phone?: string,
  },
}

export async function updateMember (
  { memberService }: UpdateMemberDeps, { member }: UpdateMemberPayload
) {
  const foundedMember = await memberService.getById(member)
  if (!foundedMember) return new Error("Member not found")

  return await memberService.update(member)
}