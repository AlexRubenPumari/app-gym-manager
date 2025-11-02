import { Staff } from "../entities"
import { Service, Safe } from "../utils"

export interface StaffService extends Service<Staff> {
  getByEmail: (staff: { email: string }) => Promise<Safe<Staff> | null>
}