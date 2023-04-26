/**
 * String utility functions
 * @module StringUtils
 * @category String
 */

/* eslint-disable no-param-reassign */
import { normalizeString } from '../RegEx/regexFuncs';

/**
 * Reverses a string
 * @param str
 * @returns
 */
export function reverseString(str: string): string {
  return str.split('').reverse().join('');
}

/**
 * Finds the longest/shortest string in an array of strings
 * @param arr
 */
export function findLongestOrShortestString(
  arr: string[],
  type: 'long' | 'short',
): string | null {
  let lgth = type === 'long' ? 0 : Infinity;
  let result: string | null = null;

  if (type === 'long') {
    for (let i = 0; i < arr.length; i++) {
      if (arr[i].length > lgth) {
        lgth = arr[i].length;
        result = arr[i];
      }
    }
  } else {
    for (let i = 0; i < arr.length; i++) {
      if (arr[i].length < lgth) {
        lgth = arr[i].length;
        result = arr[i];
      }
    }
  }

  return result;
}

/**
 *
 * @param str the string to be matched
 * @param reg the RegEx to be used
 * @returns an array of matches
 */
export function regexMatches(str: string, reg: RegExp): string[] {
  const matches = Array.from(str.matchAll(reg)) as unknown as string[];
  const matchedChars: string[] = [];

  // for (let match of matches) {
  //   matchedChars.push(match);
  // }
  matches.forEach((m) => matchedChars.push(m));

  return matchedChars;
}

/**
 * Splits a string every n chars
 * @param str
 * @param n
 * @returns
 */
export function chunkStr(str: string, size: number): string[] {
  return Array.from(str.match(new RegExp(`.{1,${size}}`, 'g')) ?? []);
}

/**
 * Split a string by a regex pattern.
 *
 * NOTE:
 * Remember to group the patterns if you want to keep the delimiters
*/
export function splitString(str: string, patt: RegExp, config: {trim?: boolean} = {}): string[] {
  const split = str.split(patt);
  if (config.trim) return split.map((s) => s.trim());
  return split;
}

/**
 * Capitalizes all first letters of a string.
 * @param str
 * @returns
 */
export function capitalize(str: string): string {
  if (str === '') return str;
  const words = str.split(' ');
  return words.map((w) => {
    const chars = w.split('');
    chars[0] = chars[0].toUpperCase();
    return chars.join('');
  }).join(' ');
}

/**
 * Capitalizes the first letter of a string.
 * @param str
 * @returns
 */
export function capitalizeFirst(str: string): string {
  if (!str) return str;
  return `${str.charAt(0).toUpperCase()}${str.slice(1)}`;
}

/**
 * Capitalizes all first letters of words that have a minimum length.
 * @param str
 * @param minLength - optional - the minimum word length to be capitalized. Defaults to 3.
 * @returns
 */
export function capitalizeWords(str: string, minLength = 3): string {
  const re = new RegExp(`\\w{${minLength},}`, 'g');
  return str.toLowerCase().replace(re, (match) => match.replace(/\w/, (m) => m.toUpperCase()));
}

/**
 * Normalizes a string to URL compatible form
 * @param str
 * @returns
 */
export function normalizeUrl(str: string): string {
  return normalizeString(str)
    .replace(/\s/g, '-')
    .replace(/[^0-9a-z-]/gi, '')
    .toLowerCase();
}

type convertCamelCaseType = {
  str: string,
  insert?: string,
  capitalize?: 'all' | 'first' | 'none'
}
/**
 * Converts a camel case string
 * @param str camelCase string
 * @param insert - optional - the char to insert between capital letters. Defaults to space
 * @param capitalize - optional - 'all' | 'first' | 'none'. Capitalizes the first letter or all first letters of words. Defaults to 'none'
 */
export function convertCamelCase({
  str,
  insert = ' ',
  // eslint-disable-next-line @typescript-eslint/no-shadow
  capitalize = 'none',
}: convertCamelCaseType): string {
  str = str[0].toLowerCase() + str.slice(1);
  const result = str.replace(/([A-Z])/g, `${insert}$1`).toLowerCase();
  if (capitalize === 'all') return capitalizeWords(result);
  if (capitalize === 'first') return result.charAt(0).toUpperCase() + result.slice(1);
  return result;
}

/**
 * Gets the filename from a path.
 *
 * (Last item after last forward slash)
 * @param path
 * @returns
 */
export const getFileNameFromPath = (path: string):string => path.split('/').slice(-1).join();

/**
 * Generates a random string
 */
export function randomString(
  length: number,
  charset = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz',
): string {
  return [...Array(length)]
    .map((_) => charset[Math.floor(Math.random() * charset.length)])
    .join('');
}

/**
 * Replaces all accented characters
 */
export function replaceAccents(str: string): string {
  return str.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
}

/** Function that count occurrences of a substring in a string;
 * @param string               The string
 * @param chars            The sub string to search for
 * @param [allowOverlapping]   Allows overlapping when performing matches
 *
 * @example
 * countCharsInString("foofoofoo", "foofoo"); // 1
 * countCharsInString("foofoofoo", "foofoo", true); // 2
 * countCharsInString("foofoofoo"); // {f: 3, o: 6}
 * countCharsInString("foofoofoobarbarbar", ['o', 'r']); // {o: 6, r: 3}
 */
export function countCharsInString(string: string, chars: string, allowOverlapping?: boolean): number
export function countCharsInString(string: string, chars?: string[] | null, allowOverlapping?: boolean): {[key: string]: number}
export function countCharsInString(string: string, chars?: string | string[] | null, allowOverlapping?: boolean): {[key: string]: number} | number
// eslint-disable-next-line require-jsdoc
export function countCharsInString(string: string, chars?: string | string[] | null, allowOverlapping?: boolean): {[key: string]: number} | number {
  if (!chars) {
    return string
      .split('')
      .reduce((count, char) => ({
        ...count,
        [char]: (count[char] || 0) + 1,
      }), {} as {[key: string]: number});
  }

  const doIt = (str: string, char: string) => {
    str += '';
    char += '';
    if (char.length <= 0) return (str.length + 1);

    let n = 0;
    let pos = 0;
    const step = allowOverlapping ? 1 : char.length;

    // eslint-disable-next-line no-constant-condition
    while (true) {
      pos = str.indexOf(char, pos);
      if (pos >= 0) {
        n += 1;
        pos += step;
      } else break;
    }
    return n;
  };

  if (Array.isArray(chars)) {
    return chars.reduce((count, ch) => ({
      ...count,
      [ch]: doIt(string, ch),
    }), Object.fromEntries(chars.map((c) => ([c, 0]))) as {[key: string]: number});
  }

  return doIt(string, chars);
}

export const doubleQuoteIfNotDoubleQuoted = (str: string) => {
  const isDoubleQuoted = /^".+"$/.test(str);
  if (isDoubleQuoted) return str;
  return `"${str}"`;
};
