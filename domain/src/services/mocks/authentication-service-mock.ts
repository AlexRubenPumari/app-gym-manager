import { StaffRol } from "domain/src/entities"
import { AuthenticationService } from "../authentication-service"
import { staffMembers } from "./data/staff-members"

export const authenticationService: AuthenticationService = {
  authenticateStaff: async (email: string, password: string) => {
    const authenticatedStaff = staffMembers.find(staffMember => (
      staffMember.email === email && staffMember.password === password
    ))

    if (!authenticatedStaff) return null

    return { ...authenticatedStaff, role: authenticatedStaff.role as StaffRol }
  }
}