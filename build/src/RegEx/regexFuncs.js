"use strict";
/**
 * RegExp utility functions
 * @module RegExUtils
 * @category RegEx
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.camelize = exports.kebabize = exports.notStartsWith = exports.stringToNumber = exports.normalizeUrlPath = exports.normalizeString = exports.validateEmail = exports.templateRegexReplace = exports.templateRegex = exports.matchAllAfterLastOccurence = exports.matchUpToAndNotIncluding = exports.matchUpToAndIncluding = exports.s3ProductImageUrlRegex = exports.s3ProductDescriptionUrlRegex = exports.objectIdInStringRegex = exports.urlPrefixRegex = exports.PASSWORD_VALIDATION_REGEX = exports.DATE_DDMMYYYY_REGEX = exports.DATE_MMDDYYYY_REGEX = exports.TIMEHHMM_REGEX = exports.DATE_DDMMMYYYY_REGEX = exports.PHONE_REGEX = exports.JSON_REGEX = exports.PORT_REGEX = exports.IP_REGEX = exports.IP_PORT_REGEX = exports.FILE_EXT_REGEX = exports.BASE_64_REGEX = exports.EMAIL_REGEX = exports.urlPathValidationRegex = exports.urlValidationRegex = exports.latinCharsAndDigitsRegex = exports.objectIdRegex = exports.regexFlags = void 0;
const s3UrlGenerators_1 = require("../AWS/s3UrlGenerators");
var regexFlags;
(function (regexFlags) {
    regexFlags["i"] = "i";
    regexFlags["g"] = "g";
    regexFlags["m"] = "m";
    regexFlags["ig"] = "ig";
    regexFlags["im"] = "im";
    regexFlags["gm"] = "gm";
})(regexFlags = exports.regexFlags || (exports.regexFlags = {}));
/**
 * Validates a MongoDB ObjectID
 */
exports.objectIdRegex = /^[a-f\d]{24}$/i;
exports.latinCharsAndDigitsRegex = /[^0-9a-zA-ZÀ-ÿ\s]+/g;
// eslint-disable-next-line no-useless-escape
exports.urlValidationRegex = /^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/g;
exports.urlPathValidationRegex = /[a-z0-9/_-]/gi;
exports.EMAIL_REGEX = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/i;
exports.BASE_64_REGEX = /^([A-Za-z0-9+/]{4})*([A-Za-z0-9+/]{3}=|[A-Za-z0-9+/]{2}==)?$/;
exports.FILE_EXT_REGEX = /\.[^.]*$/;
exports.IP_PORT_REGEX = /^(([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])\.){3}([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5]):[0-9]+$/;
exports.IP_REGEX = /^((25[0-5]|(2[0-4]|1\d|[1-9]|)\d)(\.(?!$)|$)){4}$/;
exports.PORT_REGEX = /^([1-9][0-9]{0,3}|[1-5][0-9]{4}|6[0-4][0-9]{3}|65[0-4][0-9]{2}|655[0-2][0-9]|6553[0-5])$/;
exports.JSON_REGEX = /[{[]{1}([,:{}[\]0-9.\-+Eaeflnr-u \n\r\t]|".*?")+[}\]]{1}/g;
const PHONE_REGEX = (type = 'intl') => {
    switch (type) {
        case 'br':
            return /^\(?[1-9]{2}\)?[1-9]{1}\d{4}-?\d{4}/;
        default:
            return /^([+]?\d{1,2})?\(?\d{2,3}\)?\d{3,5}-?\d{4}$/;
    }
};
exports.PHONE_REGEX = PHONE_REGEX;
const DATE_DDMMMYYYY_REGEX = (sep = '-', monthNames = {}) => {
    const months = {
        0: 'Jan',
        1: 'Feb',
        2: 'Mar',
        3: 'Apr',
        4: 'May',
        5: 'Jun',
        6: 'Jul',
        7: 'Aug',
        8: 'Sep',
        9: 'Oct',
        10: 'Nov',
        11: 'Dec',
        ...monthNames,
    };
    const m = Object.values(months).join('|');
    return new RegExp(`([1-9]|[12]\\d|3[01])${sep}(${m})${sep}\\d{4}`, 'i');
};
exports.DATE_DDMMMYYYY_REGEX = DATE_DDMMMYYYY_REGEX;
exports.TIMEHHMM_REGEX = /^(0*[0-9]|1\d|2[0-4]):([0-5]\d)$/;
exports.DATE_MMDDYYYY_REGEX = /^((0?[13578]|10|12)(-|\/)(([1-9])|(0[1-9])|([12])([0-9]?)|(3[01]?))(-|\/)((19)([2-9])(\d{1})|(20)([01])(\d{1})|([8901])(\d{1}))|(0?[2469]|11)(-|\/)(([1-9])|(0[1-9])|([12])([0-9]?)|(3[0]?))(-|\/)((19)([2-9])(\d{1})|(20)([01])(\d{1})|([8901])(\d{1})))$/;
exports.DATE_DDMMYYYY_REGEX = /^((([1-9])|(0[1-9])|([12])([0-9]?)|(3[01]?))(-|\/)(0?[13578]|10|12)(-|\/)(190\d|19[1-9]\d|2\d{3})|(([1-9])|(0[1-9])|([12])([0-9]?)|(3[0]?))(-|\/)(0?[2469]|11)(-|\/)(190\d|19[1-9]\d|2\d{3}))$/;
/**
 * Validates if a password is safe enough
 */
const PASSWORD_VALIDATION_REGEX = ({ minLength = 1, uppercase = true, numbers = true, symbols = true, maxLength, withMinLength, } = {}) => {
    const sym = symbols ? '(?=.*[@$!%*#?&^_-])' : '';
    const upp = uppercase ? '(?=.*[A-Z])' : '';
    const num = numbers ? '(?=.*\\d)' : '';
    const maxLng = maxLength ? `${maxLength}` : '';
    const re = `${num}(?=.*[a-z])${upp}${sym}.`;
    if (withMinLength === false) {
        return new RegExp(`${re}+`);
    }
    return new RegExp(`${re}{${minLength},${maxLng}}`);
};
exports.PASSWORD_VALIDATION_REGEX = PASSWORD_VALIDATION_REGEX;
/**
 * Matches anything that starts with
 * @example
 * "http[s]:// | ftp:// | www[.]"
 */
exports.urlPrefixRegex = /^((http[s]?|ftp):\/?\/?)|^(www\.?)/;
/**
 * Matches 24 char hex compatible string (ObjectID)
 */
exports.objectIdInStringRegex = /\b([a-f\d]{24})\b/g;
/**
 * Match the product description URL
 */
exports.s3ProductDescriptionUrlRegex = new RegExp(`^${(0, s3UrlGenerators_1.getProductDescriptionKey)().replace(/\//g, '\\/')}`);
/**
  * Match the product description URL
  */
// eslint-disable-next-line no-useless-escape
exports.s3ProductImageUrlRegex = new RegExp(`^(${(0, s3UrlGenerators_1.getProductImgKey)().replace(/\//g, '\\/')})(.*?\/)(products\/)`);
const matchUpToAndIncluding = (pattern, flags) => new RegExp(`(.*?${pattern}.*?)`, flags);
exports.matchUpToAndIncluding = matchUpToAndIncluding;
const matchUpToAndNotIncluding = (pattern, flags) => new RegExp(`(?:(?!${pattern}).)*`, flags);
exports.matchUpToAndNotIncluding = matchUpToAndNotIncluding;
const matchAllAfterLastOccurence = (str) => new RegExp(`[^${str}]+$`);
exports.matchAllAfterLastOccurence = matchAllAfterLastOccurence;
/**
 * Returns a RegExp of a given string template literal.
 * @param str template literal pattern. eg.: `[^${someString}]`
 * @param [flag]
 */
function templateRegex(str, flag) {
    return RegExp(str, flag);
}
exports.templateRegex = templateRegex;
/**
 * Replaces values in a string from string template literal.
 * @param str string to be modified
 * @param pattern
 * @param [flag]
 * @param [replaceWith]
 * @param [trim] returns a trimmed string if equal to 'true' or not provided.
 */
function templateRegexReplace({ str, pattern, flag = regexFlags.g, replaceWith = '', trim = true, }) {
    const replStr = str.replace(RegExp(pattern, flag), replaceWith);
    if (trim)
        return replStr.trim();
    return replStr;
}
exports.templateRegexReplace = templateRegexReplace;
/**
 * Validates an email address
 * @param email
 * @returns
 */
function validateEmail(email) {
    return exports.EMAIL_REGEX.test(email);
}
exports.validateEmail = validateEmail;
/**
 * Replaces all latin and weird characters
 * @param str
 * @returns
 */
function normalizeString(str) {
    return str.normalize('NFD').replace(/\p{Diacritic}/gu, '');
}
exports.normalizeString = normalizeString;
/**
  * Validates and normalizes an url path
  * @param urlPath
  */
const normalizeUrlPath = (urlPath) => {
    // eslint-disable-next-line no-param-reassign
    urlPath = urlPath.replace(exports.urlPrefixRegex, '').split('/').slice(1).join('/');
    const test = exports.urlPathValidationRegex.test(urlPath);
    if (!test)
        return test;
    const hasLeadingSlash = /^\//.test(urlPath);
    return `${hasLeadingSlash ? '' : '/'}${normalizeString(urlPath)}`;
};
exports.normalizeUrlPath = normalizeUrlPath;
const stringToNumber = (str, fallBack) => {
    if (str === 'undefined' || typeof str === 'undefined')
        return fallBack ?? 0;
    if (typeof str === 'number')
        return str;
    return Number(str.replace(/[^0-9.]/g, '')) ?? fallBack ?? 0;
};
exports.stringToNumber = stringToNumber;
// eslint-disable-next-line no-useless-escape
const notStartsWith = (str, notStrtWith) => new RegExp(`/^(?!${notStrtWith})\w+$/`).test(str);
exports.notStartsWith = notStartsWith;
/**
 * Puts a "-" before any uppercase character
 * and lowers the case.
 * @param string
 * @returns
 */
const kebabize = (string) => {
    // uppercase after a non-uppercase or uppercase before non-uppercase
    const upper = /(?<!\p{Uppercase_Letter})\p{Uppercase_Letter}|\p{Uppercase_Letter}(?!\p{Uppercase_Letter})/gu;
    return string.replace(upper, '-$&').replace(/^-/, '').toLowerCase();
};
exports.kebabize = kebabize;
/**
 * Replaces any "-." with the capital of the next char
 * @param s
 * @returns
 */
const camelize = (s) => s.replace(/-./g, (x) => x[1].toUpperCase());
exports.camelize = camelize;
//# sourceMappingURL=regexFuncs.js.map