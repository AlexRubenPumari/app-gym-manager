import { OperableDate } from "../utils"

export interface DateService {
  now: () => OperableDate
}