/**
 * Miscelaneous utility functions
 * @module MiscUtils
 * @category Misc
 */

export interface ITranslateDynamic<T = string> {
  value: T
  translationObj: {
    [key: string]: T
  }
}

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
export const dynamicTranslate = <T extends string>(
  value: T,
  translationObj: {
    [key: string]: T
  }): T => {
  const translation = Object.keys(translationObj).find((k) => value === k);
  if (translation) return translationObj[translation];
  return value;
};

export const isNullOrUndefined = (val: unknown): val is null | undefined => (val === null || typeof val === 'undefined');

/**
 * A simple abstraction to avoid writing for loops
 * @param start
 * @param end
 * @param cb
 * @param step
 */
export const forLoop = (start: number, end: number, cb: (i: number) => void, step = 1): void => {
  for (let i = start; i < end; i += step) {
    cb(i);
  }
};

/**
 * A simple abstraction to avoid writing for loops
 * but puts the iteratee in the callback. like a `.map`
 * @param start
 * @param end
 * @param cb
 * @param step
 */
export const forLoopMap = <T>(
  arr: T[],
  cb: (val:T, i: number) => void,
  start = 0,
  step = 1,
): void => {
  const lng = arr.length;
  for (let i = start; i < lng; i += step) {
    cb(arr[i], i);
  }
};
