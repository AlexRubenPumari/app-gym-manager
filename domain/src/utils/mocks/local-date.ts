import { AbstractDate } from "../abstract-date"

export class LocalDate extends AbstractDate {
  constructor()
  constructor(year: number, month: number, day: number)

  constructor(year?: number, month?: number, day?: number) {
    if (year && month && day) super(year, month, day)

    const todayDate = new Date()
    super(
      todayDate.getUTCFullYear(),
      todayDate.getUTCMonth() + 1,
      todayDate.getUTCDate()
    )
  }

  isEqual(otherDate: AbstractDate): boolean {
    return this.day === otherDate.day && this.month === otherDate.month && this.year === otherDate.year
  }

  isBefore(otherDate: AbstractDate): boolean {
    if (this.year < otherDate.year) return true
    if (this.year > otherDate.year) return false

    if (this.month < otherDate.month) return true
    if (this.month > otherDate.month) return false

    if (this.day < otherDate.day) return true

    return false
  }

  isAfter(otherDate: AbstractDate): boolean {
    return !this.isEqual(otherDate) && !this.isBefore(otherDate)
  }

  addDays(days: number): AbstractDate {
    const newDate = new Date(Date.UTC(this.year, this.month, this.day))
    newDate.setUTCDate(newDate.getUTCDate() + days)

    return new LocalDate(
      newDate.getUTCFullYear(),
      newDate.getUTCMonth() + 1,
      newDate.getUTCDate()
    )
  }

  subtractDays(days: number): AbstractDate {
    return this.addDays(days * (-1))
  }
}