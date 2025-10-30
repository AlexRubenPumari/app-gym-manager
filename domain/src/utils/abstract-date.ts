export abstract class AbstractDate {
  readonly day: number
  readonly month: number
  readonly year: number

  constructor(year: number, month: number, day: number) {
    if (month < 1 || month > 12) throw new Error('Month must be between 1 and 12')
    if (day < 1 || day > 31) throw new Error('Day must be between 1 and 31')
    if (year < 0) throw new Error('Year must be a non-negative number')

    this.month = month
    this.day = day
    this.year = year
  }

  abstract isEqual(otherDate: AbstractDate): boolean
  abstract isBefore(otherDate: AbstractDate): boolean
  abstract isAfter(otherDate: AbstractDate): boolean
  abstract addDays(days: number): AbstractDate
  abstract subtractDays(days: number): AbstractDate
}