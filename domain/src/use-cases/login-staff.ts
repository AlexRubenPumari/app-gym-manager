import { AuthService } from "../services"

interface LoginStaffDeps {
  authService: AuthService
}

interface LoginStaffPayload {
  staff: { email: string, password: string }
}

export async function loginStaff ({ authService }: LoginStaffDeps, { staff }: LoginStaffPayload) {
  if (!staff.email || !staff.password) return new Error("Email and password are required")

  const validatedStaff = await authService.validateCredentials(staff)
  if (!validatedStaff) return new Error("Invalid credentials")

  return validatedStaff
}