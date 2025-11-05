import { Staff } from "../entities"
import { Service } from "../utils"

export interface StaffService extends Service<Staff> {
  getByEmail: (staff: { email: string }) => Promise<Staff | null>
}