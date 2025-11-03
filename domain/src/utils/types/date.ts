export interface OperableDate extends Date, DateOperations {}

export interface Date {
  day: number,
  month: number,
  year: number
}

export interface DateOperations {
  isEqual: (otherDate: Date) => boolean
  isBefore: (otherDate: Date) => boolean
  isAfter: (otherDate: Date) => boolean
  addDays: (days: number) => OperableDate
  subtractDays: (days: number) => OperableDate
}