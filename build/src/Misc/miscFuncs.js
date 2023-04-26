"use strict";
/**
 * Miscelaneous utility functions
 * @module MiscUtils
 * @category Misc
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.forLoopMap = exports.forLoop = exports.isNullOrUndefined = exports.dynamicTranslate = void 0;
/**
 * Translates a value into a user readable string.
 * @param value
 * @param translationObj
 * @example
 *
 * const val = 'Sim';
 * const translationObj = {
 *   Sim: 'Vai!',
 *  'Não': 'Tchau!'
 * };
 *
 * dymanicTranslate(val, translationObj) => 'Vai!'
 *
 * dymanicTranslate(val, translationObj) => 'Tchau!'
 *
 */
const dynamicTranslate = (value, translationObj) => {
    const translation = Object.keys(translationObj).find((k) => value === k);
    if (translation)
        return translationObj[translation];
    return value;
};
exports.dynamicTranslate = dynamicTranslate;
const isNullOrUndefined = (val) => (val === null || typeof val === 'undefined');
exports.isNullOrUndefined = isNullOrUndefined;
/**
 * A simple abstraction to avoid writing for loops
 * @param start
 * @param end
 * @param cb
 * @param step
 */
const forLoop = (start, end, cb, step = 1) => {
    for (let i = start; i < end; i += step) {
        cb(i);
    }
};
exports.forLoop = forLoop;
/**
 * A simple abstraction to avoid writing for loops
 * but puts the iteratee in the callback. like a `.map`
 * @param start
 * @param end
 * @param cb
 * @param step
 */
const forLoopMap = (arr, cb, start = 0, step = 1) => {
    const lng = arr.length;
    for (let i = start; i < lng; i += step) {
        cb(arr[i], i);
    }
};
exports.forLoopMap = forLoopMap;
//# sourceMappingURL=miscFuncs.js.map