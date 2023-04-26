/**
 * RegExp utility functions
 * @module RegExUtils
 * @category RegEx
 */

import {
  getProductDescriptionKey,
  getProductImgKey,
} from '../AWS/s3UrlGenerators';

export enum regexFlags {
  i = 'i',
  g = 'g',
  m = 'm',
  ig = 'ig',
  im = 'im',
  gm = 'gm',
}

/**
 * Validates a MongoDB ObjectID
 */
export const objectIdRegex = /^[a-f\d]{24}$/i;

export const latinCharsAndDigitsRegex = /[^0-9a-zA-ZÀ-ÿ\s]+/g;
// eslint-disable-next-line no-useless-escape
export const urlValidationRegex = /^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/g;

export const urlPathValidationRegex = /[a-z0-9/_-]/gi;

export const EMAIL_REGEX = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/i;

export const BASE_64_REGEX = /^([A-Za-z0-9+/]{4})*([A-Za-z0-9+/]{3}=|[A-Za-z0-9+/]{2}==)?$/;

export const FILE_EXT_REGEX = /\.[^.]*$/;

export const IP_PORT_REGEX = /^(([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])\.){3}([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5]):[0-9]+$/;

export const IP_REGEX = /^((25[0-5]|(2[0-4]|1\d|[1-9]|)\d)(\.(?!$)|$)){4}$/;

export const PORT_REGEX = /^([1-9][0-9]{0,3}|[1-5][0-9]{4}|6[0-4][0-9]{3}|65[0-4][0-9]{2}|655[0-2][0-9]|6553[0-5])$/;

export const JSON_REGEX = /[{[]{1}([,:{}[\]0-9.\-+Eaeflnr-u \n\r\t]|".*?")+[}\]]{1}/g;

export const PHONE_REGEX = (type: 'br' | 'intl' = 'intl') => {
  switch (type) {
    case 'br':
      return /^\(?[1-9]{2}\)?[1-9]{1}\d{4}-?\d{4}/;
    default:
      return /^([+]?\d{1,2})?\(?\d{2,3}\)?\d{3,5}-?\d{4}$/;
  }
};

export const DATE_DDMMMYYYY_REGEX = (
  sep = '-',
  monthNames: {
    [key: number]: string;
  } = {},
): RegExp => {
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

export const TIMEHHMM_REGEX = /^(0*[0-9]|1\d|2[0-4]):([0-5]\d)$/;

export const DATE_MMDDYYYY_REGEX = /^((0?[13578]|10|12)(-|\/)(([1-9])|(0[1-9])|([12])([0-9]?)|(3[01]?))(-|\/)((19)([2-9])(\d{1})|(20)([01])(\d{1})|([8901])(\d{1}))|(0?[2469]|11)(-|\/)(([1-9])|(0[1-9])|([12])([0-9]?)|(3[0]?))(-|\/)((19)([2-9])(\d{1})|(20)([01])(\d{1})|([8901])(\d{1})))$/;

export const DATE_DDMMYYYY_REGEX = /^((([1-9])|(0[1-9])|([12])([0-9]?)|(3[01]?))(-|\/)(0?[13578]|10|12)(-|\/)(190\d|19[1-9]\d|2\d{3})|(([1-9])|(0[1-9])|([12])([0-9]?)|(3[0]?))(-|\/)(0?[2469]|11)(-|\/)(190\d|19[1-9]\d|2\d{3}))$/;

/**
 * Validates if a password is safe enough
 */
export const PASSWORD_VALIDATION_REGEX = ({
  minLength = 1,
  uppercase = true,
  numbers = true,
  symbols = true,
  maxLength,
  withMinLength,
}: {
  minLength?: number,
  uppercase?: boolean,
  numbers?: boolean,
  symbols?: boolean,
  maxLength?: number,
  withMinLength?: false,
} = {}): RegExp => {
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

/**
 * Matches anything that starts with
 * @example
 * "http[s]:// | ftp:// | www[.]"
 */
export const urlPrefixRegex = /^((http[s]?|ftp):\/?\/?)|^(www\.?)/;

/**
 * Matches 24 char hex compatible string (ObjectID)
 */
export const objectIdInStringRegex = /\b([a-f\d]{24})\b/g;

/**
 * Match the product description URL
 */
export const s3ProductDescriptionUrlRegex = new RegExp(`^${getProductDescriptionKey().replace(/\//g, '\\/')}`);

/**
  * Match the product description URL
  */
// eslint-disable-next-line no-useless-escape
export const s3ProductImageUrlRegex = new RegExp(`^(${getProductImgKey().replace(/\//g, '\\/')})(.*?\/)(products\/)`);

export const matchUpToAndIncluding = (pattern: string, flags?: string): RegExp => new RegExp(`(.*?${pattern}.*?)`, flags);

export const matchUpToAndNotIncluding = (pattern: string, flags?: string): RegExp => new RegExp(`(?:(?!${pattern}).)*`, flags);

export const matchAllAfterLastOccurence = (str: string): RegExp => new RegExp(`[^${str}]+$`);

/**
 * Returns a RegExp of a given string template literal.
 * @param str template literal pattern. eg.: `[^${someString}]`
 * @param [flag]
 */
export function templateRegex(
  str: string,
  flag?: regexFlags,
): RegExp {
  return RegExp(str, flag);
}

/**
 * Replaces values in a string from string template literal.
 * @param str string to be modified
 * @param pattern
 * @param [flag]
 * @param [replaceWith]
 * @param [trim] returns a trimmed string if equal to 'true' or not provided.
 */
export function templateRegexReplace({
  str,
  pattern,
  flag = regexFlags.g,
  replaceWith = '',
  trim = true,
}:{
  str: string,
  pattern: string,
  flag?: regexFlags,
  replaceWith?: string,
  trim?: boolean,
}): string {
  const replStr = str.replace(RegExp(pattern, flag), replaceWith);
  if (trim) return replStr.trim();
  return replStr;
}

/**
 * Validates an email address
 * @param email
 * @returns
 */
export function validateEmail(email: string): boolean {
  return EMAIL_REGEX.test(email);
}

/**
 * Replaces all latin and weird characters
 * @param str
 * @returns
 */
export function normalizeString(str: string): string {
  return str.normalize('NFD').replace(/\p{Diacritic}/gu, '');
}

/**
  * Validates and normalizes an url path
  * @param urlPath
  */
export const normalizeUrlPath = (urlPath: string): string | false => {
  // eslint-disable-next-line no-param-reassign
  urlPath = urlPath.replace(urlPrefixRegex, '').split('/').slice(1).join('/');
  const test = urlPathValidationRegex.test(urlPath);
  if (!test) return test;
  const hasLeadingSlash = /^\//.test(urlPath);
  return `${hasLeadingSlash ? '' : '/'}${normalizeString(urlPath)}`;
};

export const stringToNumber = (str: string| undefined | number, fallBack?: number): number => {
  if (str === 'undefined' || typeof str === 'undefined') return fallBack ?? 0;
  if (typeof str === 'number') return str;
  return Number(str.replace(/[^0-9.]/g, '')) ?? fallBack ?? 0;
};

// eslint-disable-next-line no-useless-escape
export const notStartsWith = (str: string, notStrtWith: string): boolean => new RegExp(`/^(?!${notStrtWith})\w+$/`).test(str);

/**
 * Puts a "-" before any uppercase character
 * and lowers the case.
 * @param string
 * @returns
 */
export const kebabize = (string: string): string => {
  // uppercase after a non-uppercase or uppercase before non-uppercase
  const upper = /(?<!\p{Uppercase_Letter})\p{Uppercase_Letter}|\p{Uppercase_Letter}(?!\p{Uppercase_Letter})/gu;
  return string.replace(upper, '-$&').replace(/^-/, '').toLowerCase();
};

/**
 * Replaces any "-." with the capital of the next char
 * @param s
 * @returns
 */
export const camelize = (s: string): string => s.replace(/-./g, (x) => x[1].toUpperCase());
