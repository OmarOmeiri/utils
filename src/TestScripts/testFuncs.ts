/**
 * This module contains functions for testing the performance
 * of any complexity script.
 *
 * Contains every time/space complexities.
 * @module testFuncs
 */

import { getRandomInt } from '../Math/mathFuncs';

/**
 * O(n) function
 *
 * IMPORTANT!!
 *
 * Do not time this function, since it has to generate an array of random numbers before executing.
 * The time of the execution will be returned.
 */
export const On = ({
  size,
  randomRng = [0, 10000],
}: {
  size: number,
  randomRng?: [number, number],
}): number => {
  const rndArr = Array(size).map(() => getRandomInt(randomRng[0], randomRng[1]));
  const arr: number[] = [];
  const start = performance.now();
  for (let i = 0; i < size; i++) {
    arr.push(rndArr[i]);
  }
  const end = performance.now();
  return end - start;
};

/**
 * O(log n)  QuickSort function
 *
 * IMPORTANT!!
 *
 * Do not time this function, since it has to generate an array of random numbers before executing.
 * The time of the execution will be returned.
 */
export const On2 = ({
  size,
  randomRng = [0, 10000],
}: {
  size: number,
  randomRng?: [number, number],
}): number => {
  const rndArr = Array(size).map(() => getRandomInt(randomRng[0], randomRng[1]));

  const sort = (array: number[]): number[] => {
    if (array.length < 2) return array;

    const pivot = array[0];
    const left = [];
    const right = [];

    for (let i = 1, total = array.length; i < total; i++) {
      if (array[i] < pivot) left.push(array[i]);
      else right.push(array[i]);
    }
    return [
      ...sort(left),
      pivot,
      ...sort(right),
    ];
  };

  const start = performance.now();
  sort(rndArr);
  const end = performance.now();
  return end - start;
};

/**
 * O(n!) Factorial function
 * @returns the execution time
 */
export const OnFactorial = (N: number): number => {
  const factorial = (n: number) => {
    let num = n;

    if (n === 0) return 1;
    for (let i = 0; i < n; i++) {
      num = n * factorial(n - 1);
    }

    return num;
  };
  const start = performance.now();
  factorial(N);
  const end = performance.now();
  return end - start;
};
