/**
 * Memoize utility functions
 * @module MemoUtils
 * @categori Memo
 */
declare type memoReturn<T> = (...args: any[]) => T;
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
export declare const memoize: <T>(fn: (...args: any[]) => T) => memoReturn<T>;
export {};
