/**
 * RegExp utility functions
 * @module RegExUtils
 * @category RegEx
 */
export declare enum regexFlags {
    i = "i",
    g = "g",
    m = "m",
    ig = "ig",
    im = "im",
    gm = "gm"
}
/**
 * Validates a MongoDB ObjectID
 */
export declare const objectIdRegex: RegExp;
export declare const latinCharsAndDigitsRegex: RegExp;
export declare const urlValidationRegex: RegExp;
export declare const urlPathValidationRegex: RegExp;
export declare const EMAIL_REGEX: RegExp;
export declare const BASE_64_REGEX: RegExp;
export declare const FILE_EXT_REGEX: RegExp;
export declare const IP_PORT_REGEX: RegExp;
export declare const IP_REGEX: RegExp;
export declare const PORT_REGEX: RegExp;
export declare const JSON_REGEX: RegExp;
export declare const PHONE_REGEX: (type?: 'br' | 'intl') => RegExp;
export declare const DATE_DDMMMYYYY_REGEX: (sep?: string, monthNames?: {
    [key: number]: string;
}) => RegExp;
export declare const TIMEHHMM_REGEX: RegExp;
export declare const DATE_MMDDYYYY_REGEX: RegExp;
export declare const DATE_DDMMYYYY_REGEX: RegExp;
/**
 * Validates if a password is safe enough
 */
export declare const PASSWORD_VALIDATION_REGEX: ({ minLength, uppercase, numbers, symbols, maxLength, withMinLength, }?: {
    minLength?: number | undefined;
    uppercase?: boolean | undefined;
    numbers?: boolean | undefined;
    symbols?: boolean | undefined;
    maxLength?: number | undefined;
    withMinLength?: false | undefined;
}) => RegExp;
/**
 * Matches anything that starts with
 * @example
 * "http[s]:// | ftp:// | www[.]"
 */
export declare const urlPrefixRegex: RegExp;
/**
 * Matches 24 char hex compatible string (ObjectID)
 */
export declare const objectIdInStringRegex: RegExp;
/**
 * Match the product description URL
 */
export declare const s3ProductDescriptionUrlRegex: RegExp;
/**
  * Match the product description URL
  */
export declare const s3ProductImageUrlRegex: RegExp;
export declare const matchUpToAndIncluding: (pattern: string, flags?: string) => RegExp;
export declare const matchUpToAndNotIncluding: (pattern: string, flags?: string) => RegExp;
export declare const matchAllAfterLastOccurence: (str: string) => RegExp;
/**
 * Returns a RegExp of a given string template literal.
 * @param str template literal pattern. eg.: `[^${someString}]`
 * @param [flag]
 */
export declare function templateRegex(str: string, flag?: regexFlags): RegExp;
/**
 * Replaces values in a string from string template literal.
 * @param str string to be modified
 * @param pattern
 * @param [flag]
 * @param [replaceWith]
 * @param [trim] returns a trimmed string if equal to 'true' or not provided.
 */
export declare function templateRegexReplace({ str, pattern, flag, replaceWith, trim, }: {
    str: string;
    pattern: string;
    flag?: regexFlags;
    replaceWith?: string;
    trim?: boolean;
}): string;
/**
 * Validates an email address
 * @param email
 * @returns
 */
export declare function validateEmail(email: string): boolean;
/**
 * Replaces all latin and weird characters
 * @param str
 * @returns
 */
export declare function normalizeString(str: string): string;
/**
  * Validates and normalizes an url path
  * @param urlPath
  */
export declare const normalizeUrlPath: (urlPath: string) => string | false;
export declare const stringToNumber: (str: string | undefined | number, fallBack?: number) => number;
export declare const notStartsWith: (str: string, notStrtWith: string) => boolean;
/**
 * Puts a "-" before any uppercase character
 * and lowers the case.
 * @param string
 * @returns
 */
export declare const kebabize: (string: string) => string;
/**
 * Replaces any "-." with the capital of the next char
 * @param s
 * @returns
 */
export declare const camelize: (s: string) => string;
