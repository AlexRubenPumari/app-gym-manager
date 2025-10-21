import { Entity, Person, User } from "../utils"
import { StaffRol } from "./staff-rol"

export interface StaffMember extends Entity, Person, User {
  role: StaffRol
}