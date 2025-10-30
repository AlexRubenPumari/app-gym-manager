export abstract class AbstractDate {
  day: number
  month: number
  year: number

  constructor(year: number, month: number, day: number) {
    this.day = day
    this.month = month
    this.year = year
  }

  abstract isEqual(otherDate: AbstractDate): boolean
  abstract isBefore(otherDate: AbstractDate): boolean
  abstract isAfter(otherDate: AbstractDate): boolean
  abstract addDays(days: number): AbstractDate
  abstract subtractDays(days: number): AbstractDate
}