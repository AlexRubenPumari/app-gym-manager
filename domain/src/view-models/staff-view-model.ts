import { Staff } from "../entities"

export type StaffViewModel = Omit<Staff, 'password'>