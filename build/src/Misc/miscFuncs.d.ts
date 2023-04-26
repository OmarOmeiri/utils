/**
 * Miscelaneous utility functions
 * @module MiscUtils
 * @category Misc
 */
export interface ITranslateDynamic<T = string> {
    value: T;
    translationObj: {
        [key: string]: T;
    };
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
export declare const dynamicTranslate: <T extends string>(value: T, translationObj: {
    [key: string]: T;
}) => T;
export declare const isNullOrUndefined: (val: unknown) => val is null | undefined;
/**
 * A simple abstraction to avoid writing for loops
 * @param start
 * @param end
 * @param cb
 * @param step
 */
export declare const forLoop: (start: number, end: number, cb: (i: number) => void, step?: number) => void;
/**
 * A simple abstraction to avoid writing for loops
 * but puts the iteratee in the callback. like a `.map`
 * @param start
 * @param end
 * @param cb
 * @param step
 */
export declare const forLoopMap: <T>(arr: T[], cb: (val: T, i: number) => void, start?: number, step?: number) => void;
