"use strict";
/**
 * String utility functions
 * @module StringUtils
 * @category String
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.doubleQuoteIfNotDoubleQuoted = exports.countCharsInString = exports.replaceAccents = exports.randomString = exports.getFileNameFromPath = exports.convertCamelCase = exports.normalizeUrl = exports.capitalizeWords = exports.capitalizeFirst = exports.capitalize = exports.splitString = exports.chunkStr = exports.regexMatches = exports.findLongestOrShortestString = exports.reverseString = void 0;
/* eslint-disable no-param-reassign */
const regexFuncs_1 = require("../RegEx/regexFuncs");
/**
 * Reverses a string
 * @param str
 * @returns
 */
function reverseString(str) {
    return str.split('').reverse().join('');
}
exports.reverseString = reverseString;
/**
 * Finds the longest/shortest string in an array of strings
 * @param arr
 */
function findLongestOrShortestString(arr, type) {
    let lgth = type === 'long' ? 0 : Infinity;
    let result = null;
    if (type === 'long') {
        for (let i = 0; i < arr.length; i++) {
            if (arr[i].length > lgth) {
                lgth = arr[i].length;
                result = arr[i];
            }
        }
    }
    else {
        for (let i = 0; i < arr.length; i++) {
            if (arr[i].length < lgth) {
                lgth = arr[i].length;
                result = arr[i];
            }
        }
    }
    return result;
}
exports.findLongestOrShortestString = findLongestOrShortestString;
/**
 *
 * @param str the string to be matched
 * @param reg the RegEx to be used
 * @returns an array of matches
 */
function regexMatches(str, reg) {
    const matches = Array.from(str.matchAll(reg));
    const matchedChars = [];
    // for (let match of matches) {
    //   matchedChars.push(match);
    // }
    matches.forEach((m) => matchedChars.push(m));
    return matchedChars;
}
exports.regexMatches = regexMatches;
/**
 * Splits a string every n chars
 * @param str
 * @param n
 * @returns
 */
function chunkStr(str, size) {
    return Array.from(str.match(new RegExp(`.{1,${size}}`, 'g')) ?? []);
}
exports.chunkStr = chunkStr;
/**
 * Split a string by a regex pattern.
 *
 * NOTE:
 * Remember to group the patterns if you want to keep the delimiters
*/
function splitString(str, patt, config = {}) {
    const split = str.split(patt);
    if (config.trim)
        return split.map((s) => s.trim());
    return split;
}
exports.splitString = splitString;
/**
 * Capitalizes all first letters of a string.
 * @param str
 * @returns
 */
function capitalize(str) {
    if (str === '')
        return str;
    const words = str.split(' ');
    return words.map((w) => {
        const chars = w.split('');
        chars[0] = chars[0].toUpperCase();
        return chars.join('');
    }).join(' ');
}
exports.capitalize = capitalize;
/**
 * Capitalizes the first letter of a string.
 * @param str
 * @returns
 */
function capitalizeFirst(str) {
    if (!str)
        return str;
    return `${str.charAt(0).toUpperCase()}${str.slice(1)}`;
}
exports.capitalizeFirst = capitalizeFirst;
/**
 * Capitalizes all first letters of words that have a minimum length.
 * @param str
 * @param minLength - optional - the minimum word length to be capitalized. Defaults to 3.
 * @returns
 */
function capitalizeWords(str, minLength = 3) {
    const re = new RegExp(`\\w{${minLength},}`, 'g');
    return str.toLowerCase().replace(re, (match) => match.replace(/\w/, (m) => m.toUpperCase()));
}
exports.capitalizeWords = capitalizeWords;
/**
 * Normalizes a string to URL compatible form
 * @param str
 * @returns
 */
function normalizeUrl(str) {
    return (0, regexFuncs_1.normalizeString)(str)
        .replace(/\s/g, '-')
        .replace(/[^0-9a-z-]/gi, '')
        .toLowerCase();
}
exports.normalizeUrl = normalizeUrl;
/**
 * Converts a camel case string
 * @param str camelCase string
 * @param insert - optional - the char to insert between capital letters. Defaults to space
 * @param capitalize - optional - 'all' | 'first' | 'none'. Capitalizes the first letter or all first letters of words. Defaults to 'none'
 */
function convertCamelCase({ str, insert = ' ', 
// eslint-disable-next-line @typescript-eslint/no-shadow
capitalize = 'none', }) {
    str = str[0].toLowerCase() + str.slice(1);
    const result = str.replace(/([A-Z])/g, `${insert}$1`).toLowerCase();
    if (capitalize === 'all')
        return capitalizeWords(result);
    if (capitalize === 'first')
        return result.charAt(0).toUpperCase() + result.slice(1);
    return result;
}
exports.convertCamelCase = convertCamelCase;
/**
 * Gets the filename from a path.
 *
 * (Last item after last forward slash)
 * @param path
 * @returns
 */
const getFileNameFromPath = (path) => path.split('/').slice(-1).join();
exports.getFileNameFromPath = getFileNameFromPath;
/**
 * Generates a random string
 */
function randomString(length, charset = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz') {
    return [...Array(length)]
        .map((_) => charset[Math.floor(Math.random() * charset.length)])
        .join('');
}
exports.randomString = randomString;
/**
 * Replaces all accented characters
 */
function replaceAccents(str) {
    return str.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
}
exports.replaceAccents = replaceAccents;
// eslint-disable-next-line require-jsdoc
function countCharsInString(string, chars, allowOverlapping) {
    if (!chars) {
        return string
            .split('')
            .reduce((count, char) => ({
            ...count,
            [char]: (count[char] || 0) + 1,
        }), {});
    }
    const doIt = (str, char) => {
        str += '';
        char += '';
        if (char.length <= 0)
            return (str.length + 1);
        let n = 0;
        let pos = 0;
        const step = allowOverlapping ? 1 : char.length;
        // eslint-disable-next-line no-constant-condition
        while (true) {
            pos = str.indexOf(char, pos);
            if (pos >= 0) {
                n += 1;
                pos += step;
            }
            else
                break;
        }
        return n;
    };
    if (Array.isArray(chars)) {
        return chars.reduce((count, ch) => ({
            ...count,
            [ch]: doIt(string, ch),
        }), Object.fromEntries(chars.map((c) => ([c, 0]))));
    }
    return doIt(string, chars);
}
exports.countCharsInString = countCharsInString;
const doubleQuoteIfNotDoubleQuoted = (str) => {
    const isDoubleQuoted = /^".+"$/.test(str);
    if (isDoubleQuoted)
        return str;
    return `"${str}"`;
};
exports.doubleQuoteIfNotDoubleQuoted = doubleQuoteIfNotDoubleQuoted;
//# sourceMappingURL=stringFuncs.js.map