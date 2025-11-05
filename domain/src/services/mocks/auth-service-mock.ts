import { staff as staffList } from "./data/staff"
import { AuthService } from "../auth-service"

export const authService: AuthService = {
  validateCredentials: async (staff: { email: string, password: string }) => {
    const foundedStaff = staffList.find(({ email }) => staff.email === email)
    if (!foundedStaff) return null

    const isValidPassword = staff.password === foundedStaff.password
    if (!isValidPassword) return null

    return { ...foundedStaff }
  },
}