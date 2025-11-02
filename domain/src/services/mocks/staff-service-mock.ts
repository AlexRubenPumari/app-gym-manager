import { Staff } from "domain/src/entities"
import { New } from "domain/src/utils"
import { staff as staffList } from "./data/staff"
import { StaffService } from "../staff-service"

export const staffService: StaffService = {
  getById: async (staff: { id: number }) => {
    const foundedStaff = staffList.find(({ id }) => staff.id === id)
    if (!foundedStaff) return null

    return {
      ...foundedStaff,
    }
  },
  getByEmail: async (staff: { email: string }) => {
    const foundedStaff = staffList.find(({ email }) => staff.email === email)
    if (!foundedStaff) return null

    return { ...foundedStaff }
  },
  create: async (newStaff: New<Staff>) => {
    return { id: 10, ...newStaff }
  },
  update: async (updateMember) => {
  },
  delete: async (member) => {
  },
}