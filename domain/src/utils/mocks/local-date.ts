import { AbstractDate } from "../abstract-date"

export class LocalDate extends AbstractDate {
  constructor()
  constructor(year: number, month: number, day: number)

  constructor(year?: number, month?: number, day?: number) {
    let y: number, m: number, d: number

    if (year !== undefined && month !== undefined && day !== undefined) {
        y = year
        m = month
        d = day
    } else {
        const today = new Date()
        y = today.getUTCFullYear()
        m = today.getUTCMonth() + 1
        d = today.getUTCDate()
    }

    super(y, m, d)
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
    const newDate = new Date(Date.UTC(this.year, this.month - 1, this.day))
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