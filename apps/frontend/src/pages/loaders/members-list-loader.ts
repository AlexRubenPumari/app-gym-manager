import { members } from "../../services"

export async function membersListLoader() {
  const result = await members.get()
  return { members: result }
}