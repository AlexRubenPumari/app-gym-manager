import { MemberService, DateService } from "../../services"
import { MEMBER_STATUS } from "../../entities"

interface RegisterMemberDeps {
  memberService: MemberService
  dateService: DateService
}

interface RegisterMemberPayload {
  member: { nationalId: string, firstName: string, lastName: string, phone?: string }
}

export async function registerMember(
  { memberService, dateService }: RegisterMemberDeps, { member }: RegisterMemberPayload
) {

  const existingMember = await memberService.getByNationalId(member)
  if (existingMember) return new Error("Member already exists")

  const result = await memberService.create({
    nationalId: member.nationalId,
    firstName: member.firstName,
    lastName: member.lastName,
    registrationAt: dateService.now(),
    status: MEMBER_STATUS.ACTIVE,
    ...(member.phone && { phone: member.phone }),
  })

  return result
}