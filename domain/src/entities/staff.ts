import { Entity, Person, User } from "../utils"

export const STAFF_ROL = {
  ADMIN: 'admin',
  TRAINER: 'trainer',
} as const

export type StaffRol = typeof STAFF_ROL[keyof typeof STAFF_ROL]

export interface Staff extends Entity, Person, User {
  role: StaffRol
}