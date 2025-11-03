import { MemberService, DateService } from "../services"
import { NewMember } from "../entities"


interface RegisterMemberDeps {
  memberService: MemberService
  dateService: DateService
}

interface RegisterMemberPayload {
  newMember: NewMember,
}

export async function registerMember (
  { memberService, dateService } : RegisterMemberDeps, { newMember }: RegisterMemberPayload
) {

  const existingMember = await memberService.getByNationalId(newMember)
  if (existingMember) return new Error("Member already exists")
    
  const memberToCreate = { ...newMember, registrationAt: dateService.now() }
  const result = await memberService.create(memberToCreate)

  return result
}