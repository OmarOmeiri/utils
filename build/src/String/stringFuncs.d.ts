/**
 * String utility functions
 * @module StringUtils
 * @category String
 */
/**
 * Reverses a string
 * @param str
 * @returns
 */
export declare function reverseString(str: string): string;
/**
 * Finds the longest/shortest string in an array of strings
 * @param arr
 */
export declare function findLongestOrShortestString(arr: string[], type: 'long' | 'short'): string | null;
/**
 *
 * @param str the string to be matched
 * @param reg the RegEx to be used
 * @returns an array of matches
 */
export declare function regexMatches(str: string, reg: RegExp): string[];
/**
 * Splits a string every n chars
 * @param str
 * @param n
 * @returns
 */
export declare function chunkStr(str: string, size: number): string[];
/**
 * Split a string by a regex pattern.
 *
 * NOTE:
 * Remember to group the patterns if you want to keep the delimiters
*/
export declare function splitString(str: string, patt: RegExp, config?: {
    trim?: boolean;
}): string[];
/**
 * Capitalizes all first letters of a string.
 * @param str
 * @returns
 */
export declare function capitalize(str: string): string;
/**
 * Capitalizes the first letter of a string.
 * @param str
 * @returns
 */
export declare function capitalizeFirst(str: string): string;
/**
 * Capitalizes all first letters of words that have a minimum length.
 * @param str
 * @param minLength - optional - the minimum word length to be capitalized. Defaults to 3.
 * @returns
 */
export declare function capitalizeWords(str: string, minLength?: number): string;
/**
 * Normalizes a string to URL compatible form
 * @param str
 * @returns
 */
export declare function normalizeUrl(str: string): string;
type convertCamelCaseType = {
    str: string;
    insert?: string;
    capitalize?: 'all' | 'first' | 'none';
};
/**
 * Converts a camel case string
 * @param str camelCase string
 * @param insert - optional - the char to insert between capital letters. Defaults to space
 * @param capitalize - optional - 'all' | 'first' | 'none'. Capitalizes the first letter or all first letters of words. Defaults to 'none'
 */
export declare function convertCamelCase({ str, insert, capitalize, }: convertCamelCaseType): string;
/**
 * Gets the filename from a path.
 *
 * (Last item after last forward slash)
 * @param path
 * @returns
 */
export declare const getFileNameFromPath: (path: string) => string;
/**
 * Generates a random string
 */
export declare function randomString(length: number, charset?: string): string;
/**
 * Replaces all accented characters
 */
export declare function replaceAccents(str: string): string;
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
export declare function countCharsInString(string: string, chars: string, allowOverlapping?: boolean): number;
export declare function countCharsInString(string: string, chars?: string[] | null, allowOverlapping?: boolean): {
    [key: string]: number;
};
export declare function countCharsInString(string: string, chars?: string | string[] | null, allowOverlapping?: boolean): {
    [key: string]: number;
} | number;
export declare const doubleQuoteIfNotDoubleQuoted: (str: string) => string;
export {};
