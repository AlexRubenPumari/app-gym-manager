import { StaffViewModel } from "../view-models"
import { New } from "../utils"
import { Staff } from "../entities"
import { StaffService } from "../services"

interface RegisterStaffDeps {
  staffService: StaffService
}

interface RegisterStaffPayload {
  newStaff: New<Staff>,
}

export async function registerStaff (
  { staffService } : RegisterStaffDeps, { newStaff }: RegisterStaffPayload
): Promise<Error | StaffViewModel> {
  const existingStaff = await staffService.getByEmail(newStaff)
  if (existingStaff) return new Error("Staff already exists")

  const result = await staffService.create(newStaff)

  return result
}