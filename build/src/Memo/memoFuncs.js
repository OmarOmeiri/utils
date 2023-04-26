"use strict";
/**
 * Memoize utility functions
 * @module MemoUtils
 * @categori Memo
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.memoize = void 0;
/**
 * Memoizes a function result.
 * @param fn function to be memoized
 *
 *
 * USAGE:
 * @example
 * const fibo = memoize((n) => {
 *  if (n === 0) {
 *    return 0;
 *  } else if (n === 1) {
 *    return 1;
 *  } else {
 *    return fibo(n - 2) + fibo(n - 1);
 *  }
 *});
 */
const memoize = (fn) => {
    const cache = new Map();
    return (...args) => {
        const strX = JSON.stringify(args);
        if (!cache.has(strX)) {
            cache.set(strX, fn(...args));
        }
        return cache.get(strX);
    };
};
exports.memoize = memoize;
//# sourceMappingURL=memoFuncs.js.map