import { LocalDate } from "../../utils"
import { DateService } from "../date-service"

export const dateService: DateService = {
  now: () => {
    return new LocalDate()
  }
} 