/**
 * Exports all the helper functions related to dates
 * @module DateUtils
 * @category Date
 */
import dayjs, { OpUnitType, QUnitType } from 'dayjs';
import dayjsBusinessTime from 'dayjs-business-time';
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter';
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore';
import tz from 'dayjs/plugin/timezone';
import utc from 'dayjs/plugin/utc';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import { getRandomInt } from '../Math/mathFuncs';

import './holidays';

dayjs.extend(dayjsBusinessTime);
dayjs.extend(utc);
dayjs.extend(tz);
dayjs.extend(isSameOrAfter);
dayjs.extend(isSameOrBefore);
dayjs.extend(customParseFormat);

type dateFormats =
| 'DD/MM/YYYY'
| 'DD-MM-YYYY'
| 'YYYY-MM-DD'
| 'YYYY/MM/DD'

export enum dateComparison {
  gt = '>',
  gte = '>=',
  lt = '<',
  lte = '<=',
  eq = '=',
}

/**
 * Validates a date
 * @param date
 * @param format eg: ('DD-MM-YYY' | 'YYYY/MM/DD')
 * @returns
 */
export function validateDate(date: Date | dayjs.Dayjs, strict?: boolean, format?: undefined): boolean
export function validateDate(date: string, strict: true, format: dateFormats): boolean
export function validateDate(date: string, strict: false, format?: dateFormats): boolean
// eslint-disable-next-line require-jsdoc
export function validateDate(date: string | Date | dayjs.Dayjs, strict?: boolean, format?: dateFormats): boolean {
  return dayjs(date, format, strict).isValid();
}

/**
 * Formats a date to string
 * @param date
 * @param formatIn
 * @param formatOut
 * @returns
 */
export function formatDate(date: dayjs.Dayjs | Date, formatOut: dateFormats): string
export function formatDate(date: string, formatIn: dateFormats, formatOut: dateFormats): string
// eslint-disable-next-line require-jsdoc
export function formatDate(date: string | Date | dayjs.Dayjs, formatIn: dateFormats, formatOut?: dateFormats): string {
  if (dayjs.isDayjs(date)) return date.format(formatIn ?? formatOut);
  if (date instanceof Date) return dayjs(date).format(formatIn ?? formatOut);
  return dayjs(date, formatIn).format(formatOut);
}

/**
 * Compares two dates.
 * Can be string, Dates or dayjs Objects.
 *
 * @param date1
 * @param date2
 * @param comparison The type of comparison. See {@link dateComparison}
 * @param gran granularity. Check {@link dayjs.OpUnitType}
 * @param format supplied date format {@link dateFormats}
 * @returns
 */
export const compareDate = (
  date1: string | Date | dayjs.Dayjs,
  date2: string | Date | dayjs.Dayjs,
  comparison: dateComparison,
  gran: dayjs.OpUnitType,
  format: 'YYYY-MM-DD',
): boolean => {
  let dt1: dayjs.Dayjs;
  let dt2: dayjs.Dayjs;

  if (!dayjs.isDayjs(date1)) dt1 = dayjs(date1, format);
  else dt1 = date1;

  if (!dayjs.isDayjs(date2)) dt2 = dayjs(date2, format);
  else dt2 = date2;

  if (comparison === dateComparison.gt) {
    return dt1.isAfter(dt2, gran);
  }

  if (comparison === dateComparison.gte) {
    dt1.isSameOrAfter(dt2, gran);
  }

  if (comparison === dateComparison.lt) {
    return dt1.isBefore(dt2, gran);
  }

  if (comparison === dateComparison.lte) {
    return dt1.isSameOrBefore(dt2, gran);
  }

  return dt1.isSame(dt2, gran);
};

/**
  * This function adds a given amount of business days to a date
  * @param date the date
  * @param  length number of days to add
  */
export function manipulateBusinessDays(date: Date, length: number): Date {
  return dayjs(date).addBusinessTime(length, 'days').toDate();
}

/**
 * Gets the last weekend of the current or passed date
 *
 * @param [endOfWeekend] Optional - If true, returns the last sunday (default = true)
/ */
export function getLastWeekend(): Date
export function getLastWeekend({ date, endOfWeekend }: {date?: Date, endOfWeekend?: true}): Date
export function getLastWeekend({ date, endOfWeekend }: {date?: Date, endOfWeekend?: false}): [Date, Date]
// eslint-disable-next-line require-jsdoc
export function getLastWeekend({ date, endOfWeekend = true }: ({date?: Date | undefined, endOfWeekend?: boolean} | undefined) = {}): Date | [Date, Date] {
  const dt = date || new Date();
  const dtNoTz = new Date(dt.getFullYear(), dt.getMonth(), dt.getDate());
  const lastSunday = new Date(dtNoTz.setDate(dtNoTz.getDate() - dtNoTz.getDay()));
  if (endOfWeekend) return lastSunday;
  const lastSaturday = new Date(dtNoTz.setDate(dtNoTz.getDate() - dtNoTz.getDay() - 1));
  return [lastSaturday, lastSunday];
}

/**
 * Checks if a date is a business day
 * @param date
 * @returns
 */
export function isBusinessDay(date: Date): boolean {
  return dayjs(date).isBusinessDay();
}
/**
 * Return the next or previuos business day.
 *
 * IMPORTANT: If TODAY is a business day, it will return TODAY.
 * @param day
 * @param nextOrPrevious
 */
export function getBusinessDay(day: Date, nextOrPrevious: 'next' | 'prev'): Date {
  if (isBusinessDay(day)) return dayjs(day).startOf('day').toDate();
  const dt = new Date(day.getTime());
  const incr = nextOrPrevious === 'next' ? 1 : -1;
  while (!isBusinessDay(dt)) {
    dt.setDate(dt.getDate() + incr);
  }
  return dayjs(dt).startOf('day').toDate();
}

/**
 * Function fills missing dates in an array of dates
 *
 * IMPORTANT!!
 *
 * THIS WILL RESET THE "HH:MM:SS" OF THE DATE TO "00:00:00"
 * @param dates
 * @returns
 */
export function fillMissingDays(dates: Date[], sort: 'asc' | 'desc'): Date[] {
  const sortedDates = dates.sort((a, b) => a.getTime() - b.getTime());
  const startDate = dayjs(sortedDates[0]);
  const endDate = dayjs(sortedDates[sortedDates.length - 1]);

  const missingDates = [];
  let currentDate = startDate.startOf('day');

  while (currentDate.isSameOrBefore(endDate)) {
    missingDates.push(currentDate.toDate());
    currentDate = currentDate.add(1, 'day').startOf('day');
  }

  return sort === 'asc' ? missingDates : missingDates.reverse();
}

/**
 * Returns the difference bwtewwn dates
 * @param start
 * @param end
 * @param unit
 * @returns
 */
export function diffDate(start: Date | dayjs.Dayjs, end: Date | dayjs.Dayjs, unit: QUnitType | OpUnitType): number {
  const date1 = dayjs(start);
  const date2 = dayjs(end);
  return date1.diff(date2, unit);
}

type ObjWithDate<K extends string> = {
  [K: string]: unknown | Date,
} & {
  [DK in K]: Date
}

/** */
function push<K extends string, O extends ObjWithDate<K>>(
  last: O,
  curr: O,
  dateKey: K,
  fillWith: Omit<O, K>,
) {
  const arr: (O & {
    [x: string]: Date;
  })[] = [];
  const nextDate = dayjs(curr[dateKey]).startOf('day');
  let currDate = dayjs(last[dateKey]).startOf('day');

  while (diffDate(nextDate, currDate, 'day') > 1) {
    currDate = dayjs(currDate).startOf('day').add(1, 'day').startOf('day');
    const newObj = { [dateKey]: currDate.toDate(), ...fillWith } as O;
    arr.push(newObj);
  }
  return arr;
}

/**
 * Function fills missing dates in an array of dates
 * @param dates
 * @returns
 */
export function fillMissingDaysObj<K extends string, O extends ObjWithDate<K>>(
  objArr: O[],
  dateKey: K,
  sort: 'asc' | 'desc',
  fillWith: Omit<O, K>,
): O[] {
  const sorted = objArr.sort((a, b) => a[dateKey].getTime() - b[dateKey].getTime());

  const filled = sorted.reduce((obj, curr, i) => {
    if (!i) return [curr];
    const last = obj[obj.length - 1];
    return [
      ...obj,
      ...push(last, curr, dateKey, fillWith),
      curr,
    ];
  }, [] as O[]);

  return sort === 'asc' ? filled : filled.reverse();
}

/**
 * Excludes weekends from a given array of dates
 * @param dates
 * @returns
 */
export function excludeWeekends(dates: Date[]): Date[] {
  return dates.filter((date) => {
    const day = date.getDay();
    return day !== 0 && day !== 6;
  });
}

/**
 * Returns the min and max dates from an array of dates
 * @param dates
 * @returns
 */
export function minMaxDate(dates: Date[]): {
  min: Date,
  max: Date,
} {
  const times = dates.map((date) => date.getTime());
  return {
    min: new Date(Math.min(...times)),
    max: new Date(Math.max(...times)),
  };
}

/**
 * Generates a random date in a range
 */
export function randomDate({
  yearRng,
  businessDay,
}: {
  yearRng?: [number, number],
  businessDay?: boolean,
} = {}): Date {
  const yRng = yearRng || [1970, new Date().getFullYear()];
  const mRng = [0, 11];
  const dRng = [1, 31];

  if (yRng[0] > yRng[1]) throw new Error('yearRng[0] must be less than or equal to yearRng[1]');
  if (mRng[0] > mRng[1]) throw new Error('monthRng[0] must be less than or equal to monthRng[1]');
  if (dRng[0] > dRng[1]) throw new Error('dayRng[0] must be less than or equal to dayRng[1]');

  let dt: Date | undefined;

  while (
    !dt
    || !validateDate(dt)
    || (businessDay ? !isBusinessDay(dt) : false)
  ) {
    const year = getRandomInt(yRng[0], yRng[1] + 1);
    const month = getRandomInt(mRng[0], mRng[1] + 1);
    const day = Math.min(getRandomInt(dRng[0], dRng[1]), dayjs(`${year}-${month}`).daysInMonth());
    dt = new Date(
      year,
      month,
      day,
    );
  }
  return dt;
}

/**
 *
 * @param value
 * @param strict Also validates the date
 */
export function isDate(value: Date, strict: boolean, format?: undefined): value is Date
export function isDate(value: unknown, strict?: false, format?: undefined): value is Date
export function isDate(value: unknown, strict: true, format: dateFormats): value is Date
// eslint-disable-next-line require-jsdoc
export function isDate(value: unknown, strict?: boolean, format?: dateFormats): value is Date {
  if (typeof value === 'string') return dayjs(value, format, strict).isValid();
  return value instanceof Date && dayjs(value, format, strict).isValid();
}

/**
 * Checks if a Date object is instanceof `Invalid Date`
 *
 * IMPORTANT!
 *
 * THIS IS NOT DATE VALIDATION
 */
export function isInstanceofDate(value: unknown): value is Date {
  return value instanceof Date && Number.isFinite(Number(value));
}

/**
 * Parsed dates in json objects
 */
export function dateTimeReviver(_: string, value: any): any {
  if (typeof value === 'string') {
    try {
      const dt = new Date(value);
      if (!Number.isNaN(dt.getTime())) return dt;
      return value;
    } catch (e) {
      return value;
    }
  }
  return value;
}

/**
 * Gets the quarter of year from date
 * @param date
 * @returns
 */
export function getQuarter(date = new Date()): number {
  return Math.floor(date.getMonth() / 3 + 1);
}
