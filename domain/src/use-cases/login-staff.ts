import { Staff, StaffRol } from "../entities"
import { AuthService } from "../services"
import { StaffViewModel } from "../view-models"

interface LoginStaffDeps {
  authService: AuthService
}

interface LoginStaffPayload {
  staff: { email: string, password: string }
}

export async function loginStaff(
  { authService }: LoginStaffDeps, { staff }: LoginStaffPayload
) {
  if (!staff.email || !staff.password) return new Error("Email and password are required")

  const validatedStaff = await authService.validateCredentials(staff)
  if (!validatedStaff) return new Error("Invalid credentials")

  const result: StaffViewModel = omit(validatedStaff, ["password"])

  return result
}

function omit<T, K extends keyof T>(obj: T, keys: K[]): Omit<T, K> {
  const copy = { ...obj }
  keys.forEach(k => delete copy[k])
  return copy
}