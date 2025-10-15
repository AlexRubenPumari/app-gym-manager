import { MemberService } from "../services"

interface GetMemberDeps {
  memberService: MemberService
}

interface GetMemberPayload {
  id: number,
}

export async function getMember (dependencies: GetMemberDeps, payload: GetMemberPayload) {
  const member = await dependencies.memberService.getById(payload.id)

  if (!member) return new Error()

  return member
}