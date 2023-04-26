/**
 * Math utility functions
 * @module MathUtils
 * @category Math
 */
interface normalizeBetweenProps {
    min?: number;
    max?: number;
    values: number[];
}
export declare const normalizeBetween: ({ min, max, values, }: normalizeBetweenProps) => number[];
/**
 * Generates a scaler function
 */
export declare const genScale: ({ min, max, values, }: {
    min: number;
    max: number;
    values: number[];
}) => (n: number) => number;
/**
 * Generates a random int within the max and min range.
 * Maximum is exclusive and minimum is inclusive.
 * @param min
 * @param max
 */
export declare const getRandomInt: (min: number, max: number) => number;
/**
 * Generates a random decimal within the max and min range.
 * @param min
 * @param max
 * @param precision
 */
export declare const randomNumber: (min: number, max: number, precision?: number) => number;
/**
 * Generates a random int within the max and min range with an arry of excludes.
 * Maximum is exclusive and minimum is inclusive.
 * @param min
 * @param max
 * @param excludes
 */
export declare const getRandomIntWithExclude: (min: number, max: number, excludes?: number[]) => number;
/**
  * Calculates the distance betwee two geographic points
  * @param lat1
  * @param lon1
  * @param lat2
  * @param lon2
  */
export declare function harversineDistance({ lat1, lon1, lat2, lon2, }: {
    lat1: number;
    lon1: number;
    lat2: number;
    lon2: number;
}): number;
export interface ILinReg {
    points: {
        x: number;
        y: number;
    }[];
    slope: number | null;
    intercept: number;
}
/**
 * Simple linear regression
 *
 * @param data
 * @return
 */
export declare const linearRegression: (data: [number, number][]) => ILinReg;
/**
 * Performs a linear regression from an object array
 *
 * If called with a string value key for x, is expected that the data is sorted,
 * because the y value will become the index position
 */
export declare const objArrayLinearRegression: <T extends Record<string, unknown>, NumKey extends KeysOfType<T, number, false>, NumOrOrdinalKey extends KeysOfType<T, string | number, false>>(inputArray: T[], xLabel: NumOrOrdinalKey, yLabel: NumKey) => ILinReg;
/**
 * Returns the value between two numbers at a specified, decimal midpoint:
 * @param lower
 * @param upper
 * @param val
 * @example
 * lerp(20, 80, 0)   // 20
 * lerp(20, 80, 1)   // 80
 * lerp(20, 80, 0.5) // 40
 */
export declare const lerp: (lower: number, upper: number, val: number) => number;
/**
 * Constricts a value between a range
 * @param val
 * @param min
 * @param max
 * @example
 * clamp(24, 20, 30) // 24
 * clamp(12, 20, 30) // 20
 * clamp(32, 20, 30) // 30
 */
export declare const clamp: (val: number, min?: number, max?: number) => number;
/**
 * This works in the opposite way to the lerp.
 * Instead of passing a decimal midpoint, you pass any value, and it’ll return that decimal, wherever it falls on that spectrum
 *
 * @param lower
 * @param upper
 * @param val
 * @example
 * invlerp(50, 100, 75)  // 0.5
 * invlerp(50, 100, 25)  // 0
 * invlerp(50, 100, 125) // 1
 *
 */
export declare const invlerp: (lower: number, upper: number, val: number) => number;
/**
 * Converts a value from one data range to another.
 * @param lower1
 * @param upper1
 * @param lower2
 * @param upper2
 * @param val
 * @example
 * //    Range 1    Range 2    Value
 * range(10, 100, 2000, 20000, 50) // 10000
 */
export declare const transformRange: (lower1: number, upper1: number, lower2: number, upper2: number, val: number) => number;
/**
 * Calculates the mean of a set of numbers
 * @param nums
 */
export declare const mean: (...nums: number[]) => number;
export declare const sum: (...nums: number[]) => number;
export declare const round: (num: number, decimalPlaces: number) => number;
export declare const arrayProd: (...nums: number[]) => number;
export declare const variance: (arr: number[]) => number;
export declare const stdDev: (nums: number[]) => number;
export declare const zScores: (arr: number[]) => number[];
export declare const zScore: (x: number, arr: number[]) => number;
/**
  * Calculates the median of an array of Numbers
  * @param arr
  * @returns
  */
export declare function median(arr: number[]): number;
export declare const medianAlreadySorted: (sortedArr: number[]) => number;
export declare const IQR: (arr: number[]) => number;
export declare const IQRAlreadySorted: (sorted: number[]) => number;
export declare const getBinWidth: (data: Array<number>) => number;
export declare const getBinWidthSorted: (data: Array<number>) => number;
/**
 * Bins an array of numbers
 * @param data
 * @param normalize If true, will return the relative percentages instead of count
 * @returns
 */
export declare const createBins: (data: number[], normalize?: boolean) => [number, number][];
/**
 *  Rounds a number to a given multiple
 * @param x
 * @param mult
 * @param type
 * @returns
 */
export declare const roundToMultiple: (x: number, mult: number, type: 'ceil' | 'floor' | 'nearest') => number;
export declare const pctChange: (vi: number, vf: number) => number;
export declare const trapezoidArea: (base: number, h1: number, h2: number) => number;
export {};
