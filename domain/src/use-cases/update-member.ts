import { NewEntity } from "../utils"
import { Member } from "../entities"
import { MemberService } from "../services"

interface UpdateMemberDeps {
  memberService: MemberService
}

interface UpdateMemberPayload {
  id: number,
  updateData: Partial<NewEntity<Member>>
}

export async function updateMember (
  dependencies: UpdateMemberDeps, payload: UpdateMemberPayload
) {
  const { id, updateData } = payload

  const getResult = await dependencies.memberService.getById(id)
  const memberExists = getResult !== undefined

  if (!memberExists) return new Error()

  const updateResult = await dependencies.memberService.update(id, updateData)

  return updateResult
}