"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getQuarter = exports.dateTimeReviver = exports.isInstanceofDate = exports.isDate = exports.randomDate = exports.minMaxDate = exports.excludeWeekends = exports.fillMissingDaysObj = exports.diffDate = exports.fillMissingDays = exports.getBusinessDay = exports.isBusinessDay = exports.getLastWeekend = exports.manipulateBusinessDays = exports.compareDate = exports.formatDate = exports.validateDate = exports.dateComparison = void 0;
/**
 * Exports all the helper functions related to dates
 * @module DateUtils
 * @category Date
 */
const dayjs_1 = __importDefault(require("dayjs"));
const dayjs_business_time_1 = __importDefault(require("dayjs-business-time"));
const isSameOrAfter_1 = __importDefault(require("dayjs/plugin/isSameOrAfter"));
const isSameOrBefore_1 = __importDefault(require("dayjs/plugin/isSameOrBefore"));
const timezone_1 = __importDefault(require("dayjs/plugin/timezone"));
const utc_1 = __importDefault(require("dayjs/plugin/utc"));
const customParseFormat_1 = __importDefault(require("dayjs/plugin/customParseFormat"));
const mathFuncs_1 = require("../Math/mathFuncs");
require("./holidays");
dayjs_1.default.extend(dayjs_business_time_1.default);
dayjs_1.default.extend(utc_1.default);
dayjs_1.default.extend(timezone_1.default);
dayjs_1.default.extend(isSameOrAfter_1.default);
dayjs_1.default.extend(isSameOrBefore_1.default);
dayjs_1.default.extend(customParseFormat_1.default);
var dateComparison;
(function (dateComparison) {
    dateComparison["gt"] = ">";
    dateComparison["gte"] = ">=";
    dateComparison["lt"] = "<";
    dateComparison["lte"] = "<=";
    dateComparison["eq"] = "=";
})(dateComparison = exports.dateComparison || (exports.dateComparison = {}));
// eslint-disable-next-line require-jsdoc
function validateDate(date, strict, format) {
    return (0, dayjs_1.default)(date, format, strict).isValid();
}
exports.validateDate = validateDate;
// eslint-disable-next-line require-jsdoc
function formatDate(date, formatIn, formatOut) {
    if (dayjs_1.default.isDayjs(date))
        return date.format(formatIn ?? formatOut);
    if (date instanceof Date)
        return (0, dayjs_1.default)(date).format(formatIn ?? formatOut);
    return (0, dayjs_1.default)(date, formatIn).format(formatOut);
}
exports.formatDate = formatDate;
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
const compareDate = (date1, date2, comparison, gran, format) => {
    let dt1;
    let dt2;
    if (!dayjs_1.default.isDayjs(date1))
        dt1 = (0, dayjs_1.default)(date1, format);
    else
        dt1 = date1;
    if (!dayjs_1.default.isDayjs(date2))
        dt2 = (0, dayjs_1.default)(date2, format);
    else
        dt2 = date2;
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
exports.compareDate = compareDate;
/**
  * This function adds a given amount of business days to a date
  * @param date the date
  * @param  length number of days to add
  */
function manipulateBusinessDays(date, length) {
    return (0, dayjs_1.default)(date).addBusinessTime(length, 'days').toDate();
}
exports.manipulateBusinessDays = manipulateBusinessDays;
// eslint-disable-next-line require-jsdoc
function getLastWeekend({ date, endOfWeekend = true } = {}) {
    const dt = date || new Date();
    const dtNoTz = new Date(dt.getFullYear(), dt.getMonth(), dt.getDate());
    const lastSunday = new Date(dtNoTz.setDate(dtNoTz.getDate() - dtNoTz.getDay()));
    if (endOfWeekend)
        return lastSunday;
    const lastSaturday = new Date(dtNoTz.setDate(dtNoTz.getDate() - dtNoTz.getDay() - 1));
    return [lastSaturday, lastSunday];
}
exports.getLastWeekend = getLastWeekend;
/**
 * Checks if a date is a business day
 * @param date
 * @returns
 */
function isBusinessDay(date) {
    return (0, dayjs_1.default)(date).isBusinessDay();
}
exports.isBusinessDay = isBusinessDay;
/**
 * Return the next or previuos business day.
 *
 * IMPORTANT: If TODAY is a business day, it will return TODAY.
 * @param day
 * @param nextOrPrevious
 */
function getBusinessDay(day, nextOrPrevious) {
    if (isBusinessDay(day))
        return (0, dayjs_1.default)(day).startOf('day').toDate();
    const dt = new Date(day.getTime());
    const incr = nextOrPrevious === 'next' ? 1 : -1;
    while (!isBusinessDay(dt)) {
        dt.setDate(dt.getDate() + incr);
    }
    return (0, dayjs_1.default)(dt).startOf('day').toDate();
}
exports.getBusinessDay = getBusinessDay;
/**
 * Function fills missing dates in an array of dates
 *
 * IMPORTANT!!
 *
 * THIS WILL RESET THE "HH:MM:SS" OF THE DATE TO "00:00:00"
 * @param dates
 * @returns
 */
function fillMissingDays(dates, sort) {
    const sortedDates = dates.sort((a, b) => a.getTime() - b.getTime());
    const startDate = (0, dayjs_1.default)(sortedDates[0]);
    const endDate = (0, dayjs_1.default)(sortedDates[sortedDates.length - 1]);
    const missingDates = [];
    let currentDate = startDate.startOf('day');
    while (currentDate.isSameOrBefore(endDate)) {
        missingDates.push(currentDate.toDate());
        currentDate = currentDate.add(1, 'day').startOf('day');
    }
    return sort === 'asc' ? missingDates : missingDates.reverse();
}
exports.fillMissingDays = fillMissingDays;
/**
 * Returns the difference bwtewwn dates
 * @param start
 * @param end
 * @param unit
 * @returns
 */
function diffDate(start, end, unit) {
    const date1 = (0, dayjs_1.default)(start);
    const date2 = (0, dayjs_1.default)(end);
    return date1.diff(date2, unit);
}
exports.diffDate = diffDate;
/** */
function push(last, curr, dateKey, fillWith) {
    const arr = [];
    const nextDate = (0, dayjs_1.default)(curr[dateKey]).startOf('day');
    let currDate = (0, dayjs_1.default)(last[dateKey]).startOf('day');
    while (diffDate(nextDate, currDate, 'day') > 1) {
        currDate = (0, dayjs_1.default)(currDate).startOf('day').add(1, 'day').startOf('day');
        const newObj = { [dateKey]: currDate.toDate(), ...fillWith };
        arr.push(newObj);
    }
    return arr;
}
/**
 * Function fills missing dates in an array of dates
 * @param dates
 * @returns
 */
function fillMissingDaysObj(objArr, dateKey, sort, fillWith) {
    const sorted = objArr.sort((a, b) => a[dateKey].getTime() - b[dateKey].getTime());
    const filled = sorted.reduce((obj, curr, i) => {
        if (!i)
            return [curr];
        const last = obj[obj.length - 1];
        return [
            ...obj,
            ...push(last, curr, dateKey, fillWith),
            curr,
        ];
    }, []);
    return sort === 'asc' ? filled : filled.reverse();
}
exports.fillMissingDaysObj = fillMissingDaysObj;
/**
 * Excludes weekends from a given array of dates
 * @param dates
 * @returns
 */
function excludeWeekends(dates) {
    return dates.filter((date) => {
        const day = date.getDay();
        return day !== 0 && day !== 6;
    });
}
exports.excludeWeekends = excludeWeekends;
/**
 * Returns the min and max dates from an array of dates
 * @param dates
 * @returns
 */
function minMaxDate(dates) {
    const times = dates.map((date) => date.getTime());
    return {
        min: new Date(Math.min(...times)),
        max: new Date(Math.max(...times)),
    };
}
exports.minMaxDate = minMaxDate;
/**
 * Generates a random date in a range
 */
function randomDate({ yearRng, businessDay, } = {}) {
    const yRng = yearRng || [1970, new Date().getFullYear()];
    const mRng = [0, 11];
    const dRng = [1, 31];
    if (yRng[0] > yRng[1])
        throw new Error('yearRng[0] must be less than or equal to yearRng[1]');
    if (mRng[0] > mRng[1])
        throw new Error('monthRng[0] must be less than or equal to monthRng[1]');
    if (dRng[0] > dRng[1])
        throw new Error('dayRng[0] must be less than or equal to dayRng[1]');
    let dt;
    while (!dt
        || !validateDate(dt)
        || (businessDay ? !isBusinessDay(dt) : false)) {
        const year = (0, mathFuncs_1.getRandomInt)(yRng[0], yRng[1] + 1);
        const month = (0, mathFuncs_1.getRandomInt)(mRng[0], mRng[1] + 1);
        const day = Math.min((0, mathFuncs_1.getRandomInt)(dRng[0], dRng[1]), (0, dayjs_1.default)(`${year}-${month}`).daysInMonth());
        dt = new Date(year, month, day);
    }
    return dt;
}
exports.randomDate = randomDate;
// eslint-disable-next-line require-jsdoc
function isDate(value, strict, format) {
    if (typeof value === 'string')
        return (0, dayjs_1.default)(value, format, strict).isValid();
    return value instanceof Date && (0, dayjs_1.default)(value, format, strict).isValid();
}
exports.isDate = isDate;
/**
 * Checks if a Date object is instanceof `Invalid Date`
 *
 * IMPORTANT!
 *
 * THIS IS NOT DATE VALIDATION
 */
function isInstanceofDate(value) {
    return value instanceof Date && Number.isFinite(Number(value));
}
exports.isInstanceofDate = isInstanceofDate;
/**
 * Parsed dates in json objects
 */
function dateTimeReviver(_, value) {
    if (typeof value === 'string') {
        try {
            const dt = new Date(value);
            if (!Number.isNaN(dt.getTime()))
                return dt;
            return value;
        }
        catch (e) {
            return value;
        }
    }
    return value;
}
exports.dateTimeReviver = dateTimeReviver;
/**
 * Gets the quarter of year from date
 * @param date
 * @returns
 */
function getQuarter(date = new Date()) {
    return Math.floor(date.getMonth() / 3 + 1);
}
exports.getQuarter = getQuarter;
//# sourceMappingURL=date.js.map