import { MemberService, DateService } from "../services"

interface RegisterMemberDeps {
  memberService: MemberService
  dateService: DateService
}

interface RegisterMemberPayload {
  member: { nationalId: string, firstName: string, lastName: string, phone?: string }
}

export async function registerMember (
  { memberService, dateService } : RegisterMemberDeps, { member }: RegisterMemberPayload
) {

  const existingMember = await memberService.getByNationalId(member)
  if (existingMember) return new Error("Member already exists")
    
  const memberToCreate = { ...member, registrationAt: dateService.now() }
  const result = await memberService.create(memberToCreate)

  return result
}