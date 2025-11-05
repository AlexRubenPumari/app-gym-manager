import { Staff } from "../entities"

export interface AuthService {
  validateCredentials: (
    staff: { email: string, password: string }
  ) => Promise<Staff | null>
}