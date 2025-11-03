import { Date as DateType } from "../types"

export class LocalDate {
  day: number
  month: number
  year: number

  constructor()
  constructor(year: number, month: number, day: number)

  constructor(year?: number, month?: number, day?: number) {
    if (year && month && day) {
        this.year = year
        this.month = month
        this.day = day
    } else {
        const today = new Date()
        this.year = today.getUTCFullYear()
        this.month = today.getUTCMonth() + 1
        this.day = today.getUTCDate()
    }
  }

  isEqual(otherDate: DateType): boolean {
    return this.day === otherDate.day && this.month === otherDate.month && this.year === otherDate.year
  }

  isBefore(otherDate: DateType): boolean {
    if (this.year < otherDate.year) return true
    if (this.year > otherDate.year) return false

    if (this.month < otherDate.month) return true
    if (this.month > otherDate.month) return false

    if (this.day < otherDate.day) return true

    return false
  }

  isAfter(otherDate: DateType): boolean {
    return !this.isEqual(otherDate) && !this.isBefore(otherDate)
  }

  addDays(days: number): LocalDate {
    const newDate = new Date(Date.UTC(this.year, this.month - 1, this.day))
    newDate.setUTCDate(newDate.getUTCDate() + days)

    return new LocalDate(
      newDate.getUTCFullYear(),
      newDate.getUTCMonth() + 1,
      newDate.getUTCDate()
    )
  }

  subtractDays(days: number): LocalDate {
    return this.addDays(days * (-1))
  }
}