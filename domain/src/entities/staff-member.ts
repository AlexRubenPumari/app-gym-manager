import { Person } from "./person"
import { StaffRol } from "./staff-rol"
import { User } from "./user"

export interface StaffMember extends Person, User {
  role: StaffRol
}