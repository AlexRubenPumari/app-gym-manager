import { Staff } from "../entities"

type SafeStaff = Omit<Staff, 'password'>

export interface AuthService {
  validateCredentials: (
    staff: { email: string, password: string }
  ) => Promise<SafeStaff | null>
}