import { MemberService } from "../services"

interface GetMemberDeps {
  memberService: MemberService
}

interface GetMemberPayload {
  member: { id: number },
}

export async function getMember (dependencies: GetMemberDeps, payload: GetMemberPayload) {
  const member = await dependencies.memberService.getById(payload.member)
  if (!member) return new Error("Member not found")

  return member
}