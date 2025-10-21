import { Member, StaffMember } from "../entities"

export interface AuthenticationService {
  authenticateStaff: (email: string, password: string) => Promise<StaffMember | null> 
}