import { Date as DateObject } from "domain/src/utils"

export function parseDateToDateObject(date: Date) {
  const dateObject = {
    day: date.getUTCDate(),
    month: date.getUTCMonth() + 1,
    year: date.getUTCFullYear(),
  }

  return dateObject
}

export function isEqualDateObject(firstDate: DateObject, secondDate: DateObject) {
  return firstDate.day === secondDate.day && firstDate.month === secondDate.month && firstDate.year === secondDate.year
}
export function isBeforeDateObject(firstDate: DateObject, secondDate: DateObject) {
  if (firstDate.year < secondDate.year) return true
  if (firstDate.year > secondDate.year) return false

  if (firstDate.month < secondDate.month) return true
  if (firstDate.month > secondDate.month) return false

  if (firstDate.day < secondDate.day) return true

  return false
}

export function isAfterDateObject(firstDate: DateObject, secondDate: DateObject) {
  return !isBeforeDateObject(firstDate, secondDate) && !isEqualDateObject(firstDate, secondDate)
}