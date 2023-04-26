/**
 * Math utility functions
 * @module MathUtils
 * @category Math
 */

import { sortNumArray } from '../Arrays';

interface normalizeBetweenProps{
  min?: number,
  max?: number,
  values: number[]
}

export const normalizeBetween = ({
  min = 0,
  max = 1,
  values,
}: normalizeBetweenProps): number[] => {
  const range = max - min;
  const valuesMax = Math.max(...values);
  const valuesMin = Math.min(...values);
  const valuesRange = valuesMax - valuesMin;
  const scaledValues = values.map((v) => ((((v - valuesMin) / (valuesRange)) * (range)) + min));
  return scaledValues;
};

/**
 * Generates a scaler function
 */
export const genScale = ({
  min,
  max,
  values,
}: {
  min: number,
  max: number,
  values: number[]
}) => {
  const range = Math.max(min, max) - Math.min(min, max);
  const vmax = Math.max(...values);
  const vmin = Math.min(...values);
  const vRange = vmax - vmin;
  return (n: number) => (
    ((((n - vmin) / (vRange)) * (range)) + min)
  );
};

/**
 * Generates a random int within the max and min range.
 * Maximum is exclusive and minimum is inclusive.
 * @param min
 * @param max
 */
export const getRandomInt = (
  min: number,
  max: number,
): number => (
  Math.floor(
    Math.random() * (
      Math.floor(max) - Math.ceil(min)
    ) + Math.ceil(min),
  )
);

/**
 * Generates a random decimal within the max and min range.
 * @param min
 * @param max
 * @param precision
 */
export const randomNumber = (min: number, max: number, precision?: number): number => {
  if (!precision) return Math.random() * (max - min) + min;
  return Number((Math.random() * (max - min) + min).toFixed(precision));
};

/**
 * Generates a random int within the max and min range with an arry of excludes.
 * Maximum is exclusive and minimum is inclusive.
 * @param min
 * @param max
 * @param excludes
 */
export const getRandomIntWithExclude = (
  min: number,
  max: number,
  excludes: number[] = [],
): number => {
  if (min === max && excludes.includes(min)) throw new RangeError('All values are excluded');
  if (min === max) return min;
  // eslint-disable-next-line no-param-reassign
  if (max < min) [max, min] = [min, max];

  let num = getRandomInt(min, max);
  if (!excludes.length) return num;

  excludes
    .sort((a, b) => a - b)
    // eslint-disable-next-line no-return-assign
    .every((except) => except <= num && (num >= max ? num -= 1 : num += 1, true));
  if (excludes.includes(num)) throw new RangeError('All values are excluded');
  return num;
};

/**
  * Calculates the distance betwee two geographic points
  * @param lat1
  * @param lon1
  * @param lat2
  * @param lon2
  */
export function harversineDistance({
  lat1,
  lon1,
  lat2,
  lon2,
}:{
   lat1: number,
   lon1: number,
   lat2: number,
   lon2: number,
 }): number {
  const dlon = lon2 - lon1;
  const dlat = lat2 - lat1;
  const a = (Math.sin(dlat / 2)) ** 2 + Math.cos(lat1) * Math.cos(lat2) * (Math.sin(dlon / 2)) ** 2;
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const d = 6373 * c; // where R is the radius of the Earth 6373km
  return d;
}

export interface ILinReg {
   points: {
     x: number,
     y: number,
   }[],
   slope: number | null,
   intercept: number,
 }
 /**
  * Simple linear regression
  *
  * @param data
  * @return
  */
export const linearRegression = (data: [number, number][]): ILinReg => {
  let sum_x = 0;
  let sum_y = 0;
  let sum_xy = 0;
  let sum_xx = 0;
  let count = 0;

  if (data.length === 0) {
    throw new Error('Empty data');
  }

  // calculate sums
  for (let i = 0, len = data.length; i < len; i++) {
    const point = data[i];
    sum_x += point[0];
    sum_y += point[1];
    sum_xx += point[0] * point[0];
    sum_xy += point[0] * point[1];
    count += 1;
  }

  // calculate slope (m) and y-intercept (b) for f(x) = m * x + b
  const slope = (count * sum_xy - sum_x * sum_y) / (count * sum_xx - sum_x * sum_x);
  const intercept = (sum_y / count) - (slope * sum_x) / count;

  const points = data.map((point) => {
    const y = slope * point[0] + intercept;
    return { x: point[0], y };
  });
  return { points, slope, intercept };
};

/**
 * Performs a linear regression from an object array
 *
 * If called with a string value key for x, is expected that the data is sorted,
 * because the y value will become the index position
 */
export const objArrayLinearRegression = <
T extends Record<string, unknown>,
NumKey extends KeysOfType<T, number>,
NumOrOrdinalKey extends KeysOfType<T, number | string>
>(
    inputArray: T[],
    xLabel: NumOrOrdinalKey,
    yLabel: NumKey,
  ) => {
  const xTypeSet = new Set<string>();
  const yTypeSet = new Set<string>();
  inputArray.forEach((v) => {
    xTypeSet.add(typeof v[xLabel]);
    yTypeSet.add(typeof v[yLabel]);
  });
  if (xTypeSet.size > 1) {
    throw new Error('X values cannot have multiple types.');
  }
  if (yTypeSet.size > 1) {
    throw new Error('Y values can only be numbers.');
  }
  const xy = inputArray.map((element, i) => {
    const elmX = element[xLabel];
    const elmY = element[yLabel];
    if (typeof elmY !== 'number') {
      throw new Error('Y must be a number.');
    }
    if (typeof elmX === 'number') return [elmX, elmY] as [number, number];
    return [i, elmY] as [number, number];
  });

  return linearRegression(xy);
};

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
export const lerp = (lower: number, upper: number, val: number): number => lower * (1 - val) + upper * val;

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
export const clamp = (val: number, min = 0, max = 1): number => Math.min(max, Math.max(min, val));

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
export const invlerp = (lower: number, upper: number, val: number): number => clamp((val - lower) / (upper - lower));

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
export const transformRange = (
  lower1: number,
  upper1: number,
  lower2: number,
  upper2: number,
  val: number,
): number => lerp(lower2, upper2, invlerp(lower1, upper1, val));

/**
 * Calculates the mean of a set of numbers
 * @param nums
 */
export const mean = (...nums: number[]): number => {
  if (!nums.length) return 0;
  return (nums.reduce((val, acc) => val + acc, 0)) / nums.length;
};

export const sum = (...nums: number[]): number => {
  if (!nums.length) return 0;
  return (nums.reduce((val, acc) => val + acc, 0));
};

export const round = (num: number, decimalPlaces: number) => {
  const strNum = num.toString();
  const isExp = strNum.includes('e');
  if (isExp) {
    return Number(num.toPrecision(decimalPlaces + 1));
  }

  return Number(
    `${Math.round(Number(`${num}e${decimalPlaces}`))}e${decimalPlaces * -1}`,
  );
};

export const arrayProd = (...nums: number[]): number => {
  if (!nums.length) return 0;
  return (nums.reduce((val, acc) => val * acc, 0));
};

export const variance = (arr: number[]) => arr
  .reduce((s, n) => s + (n - mean(...arr)) ** 2, 0) / (arr.length - 1);

export const stdDev = (nums: number[]) => Math.sqrt(variance(nums));

export const zScores = (arr: number[]) => {
  const mn = mean(...arr);
  const sd = stdDev(arr);
  return arr.map((x) => ((x - mn) / sd));
};

export const zScore = (x: number, arr: number[]) => {
  const mn = mean(...arr);
  const sd = stdDev(arr);
  return ((x - mn) / sd);
};

/**
  * Calculates the median of an array of Numbers
  * @param arr
  * @returns
  */
export function median(arr: number[]): number {
  const { length } = arr;
  const isEven = length % 2 === 0;
  const sorted = sortNumArray(arr);

  return isEven
    ? (sorted[(length / 2 - 1)] + sorted[length / 2]) / 2
    : sorted[((length + 1) / 2) - 1];
}

export const medianAlreadySorted = (sortedArr: number[]) => {
  const { length } = sortedArr;
  const isEven = length % 2 === 0;
  return isEven
    ? (sortedArr[(length / 2 - 1)] + sortedArr[length / 2]) / 2
    : sortedArr[((length + 1) / 2) - 1];
};

export const IQR = (arr: number[]) => {
  const mid = Math.floor(arr.length / 2);
  const sorted = [...arr].sort((a, b) => a - b);
  const isEven = sorted.length % 2 === 0;

  const split: [number, number] = isEven
    ? [mid, mid]
    : [mid, mid + 1];

  const q1 = medianAlreadySorted(sorted.slice(0, split[0]));
  const q3 = medianAlreadySorted(sorted.slice(split[1]));
  return q3 - q1;
};

export const IQRAlreadySorted = (sorted: number[]) => {
  const mid = Math.floor(sorted.length / 2);
  const isEven = sorted.length % 2 === 0;

  const split: [number, number] = isEven
    ? [mid, mid]
    : [mid, mid + 1];

  const q1 = medianAlreadySorted(sorted.slice(0, split[0]));
  const q3 = medianAlreadySorted(sorted.slice(split[1]));
  return q3 - q1;
};

export const getBinWidth = (data: Array<number>) => (
  (2 * IQR(data)) / data.length ** (1 / 3)
);

export const getBinWidthSorted = (data: Array<number>) => (
  // (2 * IQRAlreadySorted(data)) / data.length ** (1 / 3)
  ((1 / data.length ** (1 / 3)) * stdDev(data)) * 3.49
);

const getBinNumber = (i: number, bw: number) => (
  Math.floor(i / bw)
);

/**
 * Bins an array of numbers
 * @param data
 * @param normalize If true, will return the relative percentages instead of count
 * @returns
 */
export const createBins = (data: number[], normalize = false) => {
  const { length } = data;
  const sorted = [...data].sort((a, b) => a - b);
  const bw = getBinWidthSorted(sorted);
  let first = 0;
  const bins: [number, number][] = [];
  for (let i = 0; i < length; i += 1) {
    const binNumber = getBinNumber(sorted[i], bw);
    if (!i) first = binNumber;
    const index = binNumber - first;
    if (bins[index]) {
      bins[index] = [
        bins[index][0],
        bins[index][1] + 1,
      ];
    } else {
      bins[index] = [
        sorted[i],
        1,
      ];
    }
  }
  if (normalize) {
    return bins.reduce((b, val) => [
      ...b,
      [val[0], val[1] / length] as [number, number],
    ], [] as [number, number][]);
  }
  return bins.filter((b) => b);
};

/**
 *  Rounds a number to a given multiple
 * @param x
 * @param mult
 * @param type
 * @returns
 */
export const roundToMultiple = (x: number, mult: number, type: 'ceil' | 'floor' | 'nearest') => {
  if (type === 'ceil') return Math.ceil(x / mult) * mult;
  if (type === 'floor') return Math.floor(x / mult) * mult;
  return Math.round(x / mult) * mult;
};

export const pctChange = (vi: number, vf: number) => (
  (vf - vi) / Math.abs(vi)
);

export const trapezoidArea = (base: number, h1: number, h2: number) => {
  const extraH = Math.abs(h2 - h1);
  const quadH = Math.max(h2, h1) - extraH;
  return (quadH * base) + ((extraH * base) / 2);
};
