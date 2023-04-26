"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isNumber = exports.parseStrToNumber = void 0;
const REGEX_UNWANTED_CHARACTERS = /[^\d\-.,]/g;
const REGEX_DASHES_EXCEPT_BEGINNING = /(?!^)-/g;
const REGEX_PERIODS_EXEPT_LAST = /\.(?=.*\.)/g;
/** */
function formatNumber(number, thousandSep) {
    if (typeof number !== 'string')
        return 'NaN';
    // eslint-disable-next-line no-param-reassign
    number = number.trim();
    if (thousandSep) {
        const thousandSplit = number.split(thousandSep);
        thousandSplit.shift();
        if (thousandSplit.every((s) => s.length === 3)) {
            // eslint-disable-next-line no-param-reassign
            number = number.replace(new RegExp(`\\${thousandSep}`, 'g'), '');
        }
    }
    // Handle exponentials
    if ((number.match(/e/g) ?? []).length === 1) {
        const numberParts = number.split('e');
        return `${formatNumber(numberParts[0])}e${formatNumber(numberParts[1])}`;
    }
    const sanitizedNumber = number
        .replace(REGEX_UNWANTED_CHARACTERS, '')
        .replace(REGEX_DASHES_EXCEPT_BEGINNING, '');
    // Handle only thousands separator
    if (((sanitizedNumber.match(/,/g) ?? []).length >= 2 && !sanitizedNumber.includes('.'))
        || ((sanitizedNumber.match(/\./g) ?? []).length >= 2 && !sanitizedNumber.includes(','))) {
        return sanitizedNumber.replace(/[.,]/g, '');
    }
    return sanitizedNumber.replace(/,/g, '.').replace(REGEX_PERIODS_EXEPT_LAST, '');
}
/**
 * Parses a string to a number
 *
 * @param number
 * @returns
 */
function parseStrToNumber(number, thousandSep) {
    if (typeof number === 'number')
        return number;
    return Number(formatNumber(number, thousandSep));
}
exports.parseStrToNumber = parseStrToNumber;
/**
 * Checks if is a number.
 *
 * IMPORANT!!!
 *
 * NAN returns false by default. You can change the behavior in the config param
 * @param value
 * @param config
 * @returns
 */
function isNumber(value, config = { nan: true }) {
    if (typeof value !== 'number')
        return false;
    if (!config)
        return true;
    if (config.nan && Number.isNaN(Number(value)))
        return false;
    if (config.int && !Number.isInteger(value))
        return false;
    return true;
}
exports.isNumber = isNumber;
//# sourceMappingURL=numberFuncs.js.map