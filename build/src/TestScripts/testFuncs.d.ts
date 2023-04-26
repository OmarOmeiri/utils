/**
 * This module contains functions for testing the performance
 * of any complexity script.
 *
 * Contains every time/space complexities.
 * @module testFuncs
 */
/**
 * O(n) function
 *
 * IMPORTANT!!
 *
 * Do not time this function, since it has to generate an array of random numbers before executing.
 * The time of the execution will be returned.
 */
export declare const On: ({ size, randomRng, }: {
    size: number;
    randomRng?: [number, number] | undefined;
}) => number;
/**
 * O(log n)  QuickSort function
 *
 * IMPORTANT!!
 *
 * Do not time this function, since it has to generate an array of random numbers before executing.
 * The time of the execution will be returned.
 */
export declare const On2: ({ size, randomRng, }: {
    size: number;
    randomRng?: [number, number] | undefined;
}) => number;
/**
 * O(n!) Factorial function
 * @returns the execution time
 */
export declare const OnFactorial: (N: number) => number;
