import { MemberService } from "../../services"

interface GetMemberDeps {
  memberService: MemberService
}

interface GetMemberPayload {
  member: { id: number },
}

export async function getMember (
  { memberService }: GetMemberDeps, { member }: GetMemberPayload
) {
  const foundedMember = await memberService.getById(member)
  if (!foundedMember) return new Error("Member not found")

  return foundedMember
}