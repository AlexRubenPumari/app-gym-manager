import { AuthService } from "../services"

interface LoginDeps {
  authService: AuthService
}

interface LoginPayload {
  staff: { email: string, password: string }
}

export async function login ({ authService }: LoginDeps, { staff }: LoginPayload) {
  if (!staff.email || !staff.password) return new Error("Email and password are required")

  const member = await authService.validateCredentials(staff)
  if (!member) return new Error("Invalid credentials")

  return member
}