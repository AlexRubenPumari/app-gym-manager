import { MemberService } from "../../services"

interface getMembersListDeps {
  memberService: MemberService
}

export async function getMembersList ({ memberService }: getMembersListDeps) {
  return await memberService.getAll()
}