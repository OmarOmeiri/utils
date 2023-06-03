/**
 * Exports all the helper functions related to dates
 * @module DateUtils
 * @category Date
 */
import dayjs, { OpUnitType, QUnitType } from 'dayjs';
import './holidays';
type dateFormats = 'DD/MM/YYYY' | 'DD-MM-YYYY' | 'YYYY-MM-DD' | 'YYYY/MM/DD';
export declare enum dateComparison {
    gt = ">",
    gte = ">=",
    lt = "<",
    lte = "<=",
    eq = "="
}
/**
 * Validates a date
 * @param date
 * @param format eg: ('DD-MM-YYY' | 'YYYY/MM/DD')
 * @returns
 */
export declare function validateDate(date: Date | dayjs.Dayjs, strict?: boolean, format?: undefined): boolean;
export declare function validateDate(date: string, strict: true, format: dateFormats): boolean;
export declare function validateDate(date: string, strict: false, format?: dateFormats): boolean;
/**
 * Formats a date to string
 * @param date
 * @param formatIn
 * @param formatOut
 * @returns
 */
export declare function formatDate(date: dayjs.Dayjs | Date, formatOut: dateFormats): string;
export declare function formatDate(date: string, formatIn: dateFormats, formatOut: dateFormats): string;
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
export declare const compareDate: (date1: string | Date | dayjs.Dayjs, date2: string | Date | dayjs.Dayjs, comparison: dateComparison, gran: dayjs.OpUnitType, format: 'YYYY-MM-DD') => boolean;
/**
  * This function adds a given amount of business days to a date
  * @param date the date
  * @param  length number of days to add
  */
export declare function manipulateBusinessDays(date: Date, length: number): Date;
/**
 * Gets the last weekend of the current or passed date
 *
 * @param [endOfWeekend] Optional - If true, returns the last sunday (default = true)
/ */
export declare function getLastWeekend(): Date;
export declare function getLastWeekend({ date, endOfWeekend }: {
    date?: Date;
    endOfWeekend?: true;
}): Date;
export declare function getLastWeekend({ date, endOfWeekend }: {
    date?: Date;
    endOfWeekend?: false;
}): [Date, Date];
/**
 * Checks if a date is a business day
 * @param date
 * @returns
 */
export declare function isBusinessDay(date: Date): boolean;
/**
 * Return the next or previuos business day.
 *
 * IMPORTANT: If TODAY is a business day, it will return TODAY.
 * @param day
 * @param nextOrPrevious
 */
export declare function getBusinessDay(day: Date, nextOrPrevious: 'next' | 'prev'): Date;
/**
 * Function fills missing dates in an array of dates
 *
 * IMPORTANT!!
 *
 * THIS WILL RESET THE "HH:MM:SS" OF THE DATE TO "00:00:00"
 * @param dates
 * @returns
 */
export declare function fillMissingDays(dates: Date[], sort: 'asc' | 'desc'): Date[];
/**
 * Returns the difference bwtewwn dates
 * @param start
 * @param end
 * @param unit
 * @returns
 */
export declare function diffDate(start: Date | dayjs.Dayjs, end: Date | dayjs.Dayjs, unit: QUnitType | OpUnitType): number;
type ObjWithDate<K extends string> = {
    [K: string]: unknown | Date;
} & {
    [DK in K]: Date;
};
/**
 * Function fills missing dates in an array of dates
 * @param dates
 * @returns
 */
export declare function fillMissingDaysObj<K extends string, O extends ObjWithDate<K>>(objArr: O[], dateKey: K, sort: 'asc' | 'desc', fillWith: Omit<O, K>): O[];
/**
 * Excludes weekends from a given array of dates
 * @param dates
 * @returns
 */
export declare function excludeWeekends(dates: Date[]): Date[];
/**
 * Returns the min and max dates from an array of dates
 * @param dates
 * @returns
 */
export declare function minMaxDate(dates: Date[]): {
    min: Date;
    max: Date;
};
/**
 * Generates a random date in a range
 */
export declare function randomDate({ yearRng, businessDay, }?: {
    yearRng?: [number, number];
    businessDay?: boolean;
}): Date;
/**
 *
 * @param value
 * @param strict Also validates the date
 */
export declare function isDate(value: Date, strict: boolean, format?: undefined): value is Date;
export declare function isDate(value: unknown, strict?: false, format?: undefined): value is Date;
export declare function isDate(value: unknown, strict: true, format: dateFormats): value is Date;
/**
 * Checks if a Date object is instanceof `Invalid Date`
 *
 * IMPORTANT!
 *
 * THIS IS NOT DATE VALIDATION
 */
export declare function isInstanceofDate(value: unknown): value is Date;
/**
 * Parsed dates in json objects
 */
export declare function dateTimeReviver(_: string, value: any): any;
/**
 * Gets the quarter of year from date
 * @param date
 * @returns
 */
export declare function getQuarter(date?: Date): number;
export {};
