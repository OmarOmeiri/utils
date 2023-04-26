"use strict";
/**
 * Math utility functions
 * @module MathUtils
 * @category Math
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.trapezoidArea = exports.pctChange = exports.roundToMultiple = exports.createBins = exports.getBinWidthSorted = exports.getBinWidth = exports.IQRAlreadySorted = exports.IQR = exports.medianAlreadySorted = exports.median = exports.zScore = exports.zScores = exports.stdDev = exports.variance = exports.arrayProd = exports.round = exports.sum = exports.mean = exports.transformRange = exports.invlerp = exports.clamp = exports.lerp = exports.objArrayLinearRegression = exports.linearRegression = exports.harversineDistance = exports.getRandomIntWithExclude = exports.randomNumber = exports.getRandomInt = exports.genScale = exports.normalizeBetween = void 0;
const Arrays_1 = require("../Arrays");
const normalizeBetween = ({ min = 0, max = 1, values, }) => {
    const range = max - min;
    const valuesMax = Math.max(...values);
    const valuesMin = Math.min(...values);
    const valuesRange = valuesMax - valuesMin;
    const scaledValues = values.map((v) => ((((v - valuesMin) / (valuesRange)) * (range)) + min));
    return scaledValues;
};
exports.normalizeBetween = normalizeBetween;
/**
 * Generates a scaler function
 */
const genScale = ({ min, max, values, }) => {
    const range = Math.max(min, max) - Math.min(min, max);
    const vmax = Math.max(...values);
    const vmin = Math.min(...values);
    const vRange = vmax - vmin;
    return (n) => (((((n - vmin) / (vRange)) * (range)) + min));
};
exports.genScale = genScale;
/**
 * Generates a random int within the max and min range.
 * Maximum is exclusive and minimum is inclusive.
 * @param min
 * @param max
 */
const getRandomInt = (min, max) => (Math.floor(Math.random() * (Math.floor(max) - Math.ceil(min)) + Math.ceil(min)));
exports.getRandomInt = getRandomInt;
/**
 * Generates a random decimal within the max and min range.
 * @param min
 * @param max
 * @param precision
 */
const randomNumber = (min, max, precision) => {
    if (!precision)
        return Math.random() * (max - min) + min;
    return Number((Math.random() * (max - min) + min).toFixed(precision));
};
exports.randomNumber = randomNumber;
/**
 * Generates a random int within the max and min range with an arry of excludes.
 * Maximum is exclusive and minimum is inclusive.
 * @param min
 * @param max
 * @param excludes
 */
const getRandomIntWithExclude = (min, max, excludes = []) => {
    if (min === max && excludes.includes(min))
        throw new RangeError('All values are excluded');
    if (min === max)
        return min;
    // eslint-disable-next-line no-param-reassign
    if (max < min)
        [max, min] = [min, max];
    let num = (0, exports.getRandomInt)(min, max);
    if (!excludes.length)
        return num;
    excludes
        .sort((a, b) => a - b)
        // eslint-disable-next-line no-return-assign
        .every((except) => except <= num && (num >= max ? num -= 1 : num += 1, true));
    if (excludes.includes(num))
        throw new RangeError('All values are excluded');
    return num;
};
exports.getRandomIntWithExclude = getRandomIntWithExclude;
/**
  * Calculates the distance betwee two geographic points
  * @param lat1
  * @param lon1
  * @param lat2
  * @param lon2
  */
function harversineDistance({ lat1, lon1, lat2, lon2, }) {
    const dlon = lon2 - lon1;
    const dlat = lat2 - lat1;
    const a = (Math.sin(dlat / 2)) ** 2 + Math.cos(lat1) * Math.cos(lat2) * (Math.sin(dlon / 2)) ** 2;
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const d = 6373 * c; // where R is the radius of the Earth 6373km
    return d;
}
exports.harversineDistance = harversineDistance;
/**
 * Simple linear regression
 *
 * @param data
 * @return
 */
const linearRegression = (data) => {
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
exports.linearRegression = linearRegression;
/**
 * Performs a linear regression from an object array
 *
 * If called with a string value key for x, is expected that the data is sorted,
 * because the y value will become the index position
 */
const objArrayLinearRegression = (inputArray, xLabel, yLabel) => {
    const xTypeSet = new Set();
    const yTypeSet = new Set();
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
        if (typeof elmX === 'number')
            return [elmX, elmY];
        return [i, elmY];
    });
    return (0, exports.linearRegression)(xy);
};
exports.objArrayLinearRegression = objArrayLinearRegression;
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
const lerp = (lower, upper, val) => lower * (1 - val) + upper * val;
exports.lerp = lerp;
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
const clamp = (val, min = 0, max = 1) => Math.min(max, Math.max(min, val));
exports.clamp = clamp;
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
const invlerp = (lower, upper, val) => (0, exports.clamp)((val - lower) / (upper - lower));
exports.invlerp = invlerp;
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
const transformRange = (lower1, upper1, lower2, upper2, val) => (0, exports.lerp)(lower2, upper2, (0, exports.invlerp)(lower1, upper1, val));
exports.transformRange = transformRange;
/**
 * Calculates the mean of a set of numbers
 * @param nums
 */
const mean = (...nums) => {
    if (!nums.length)
        return 0;
    return (nums.reduce((val, acc) => val + acc, 0)) / nums.length;
};
exports.mean = mean;
const sum = (...nums) => {
    if (!nums.length)
        return 0;
    return (nums.reduce((val, acc) => val + acc, 0));
};
exports.sum = sum;
const round = (num, decimalPlaces) => {
    const strNum = num.toString();
    const isExp = strNum.includes('e');
    if (isExp) {
        return Number(num.toPrecision(decimalPlaces + 1));
    }
    return Number(`${Math.round(Number(`${num}e${decimalPlaces}`))}e${decimalPlaces * -1}`);
};
exports.round = round;
const arrayProd = (...nums) => {
    if (!nums.length)
        return 0;
    return (nums.reduce((val, acc) => val * acc, 0));
};
exports.arrayProd = arrayProd;
const variance = (arr) => arr
    .reduce((s, n) => s + (n - (0, exports.mean)(...arr)) ** 2, 0) / (arr.length - 1);
exports.variance = variance;
const stdDev = (nums) => Math.sqrt((0, exports.variance)(nums));
exports.stdDev = stdDev;
const zScores = (arr) => {
    const mn = (0, exports.mean)(...arr);
    const sd = (0, exports.stdDev)(arr);
    return arr.map((x) => ((x - mn) / sd));
};
exports.zScores = zScores;
const zScore = (x, arr) => {
    const mn = (0, exports.mean)(...arr);
    const sd = (0, exports.stdDev)(arr);
    return ((x - mn) / sd);
};
exports.zScore = zScore;
/**
  * Calculates the median of an array of Numbers
  * @param arr
  * @returns
  */
function median(arr) {
    const { length } = arr;
    const isEven = length % 2 === 0;
    const sorted = (0, Arrays_1.sortNumArray)(arr);
    return isEven
        ? (sorted[(length / 2 - 1)] + sorted[length / 2]) / 2
        : sorted[((length + 1) / 2) - 1];
}
exports.median = median;
const medianAlreadySorted = (sortedArr) => {
    const { length } = sortedArr;
    const isEven = length % 2 === 0;
    return isEven
        ? (sortedArr[(length / 2 - 1)] + sortedArr[length / 2]) / 2
        : sortedArr[((length + 1) / 2) - 1];
};
exports.medianAlreadySorted = medianAlreadySorted;
const IQR = (arr) => {
    const mid = Math.floor(arr.length / 2);
    const sorted = [...arr].sort((a, b) => a - b);
    const isEven = sorted.length % 2 === 0;
    const split = isEven
        ? [mid, mid]
        : [mid, mid + 1];
    const q1 = (0, exports.medianAlreadySorted)(sorted.slice(0, split[0]));
    const q3 = (0, exports.medianAlreadySorted)(sorted.slice(split[1]));
    return q3 - q1;
};
exports.IQR = IQR;
const IQRAlreadySorted = (sorted) => {
    const mid = Math.floor(sorted.length / 2);
    const isEven = sorted.length % 2 === 0;
    const split = isEven
        ? [mid, mid]
        : [mid, mid + 1];
    const q1 = (0, exports.medianAlreadySorted)(sorted.slice(0, split[0]));
    const q3 = (0, exports.medianAlreadySorted)(sorted.slice(split[1]));
    return q3 - q1;
};
exports.IQRAlreadySorted = IQRAlreadySorted;
const getBinWidth = (data) => ((2 * (0, exports.IQR)(data)) / data.length ** (1 / 3));
exports.getBinWidth = getBinWidth;
const getBinWidthSorted = (data) => (
// (2 * IQRAlreadySorted(data)) / data.length ** (1 / 3)
((1 / data.length ** (1 / 3)) * (0, exports.stdDev)(data)) * 3.49);
exports.getBinWidthSorted = getBinWidthSorted;
const getBinNumber = (i, bw) => (Math.floor(i / bw));
/**
 * Bins an array of numbers
 * @param data
 * @param normalize If true, will return the relative percentages instead of count
 * @returns
 */
const createBins = (data, normalize = false) => {
    const { length } = data;
    const sorted = [...data].sort((a, b) => a - b);
    const bw = (0, exports.getBinWidthSorted)(sorted);
    let first = 0;
    const bins = [];
    for (let i = 0; i < length; i += 1) {
        const binNumber = getBinNumber(sorted[i], bw);
        if (!i)
            first = binNumber;
        const index = binNumber - first;
        if (bins[index]) {
            bins[index] = [
                bins[index][0],
                bins[index][1] + 1,
            ];
        }
        else {
            bins[index] = [
                sorted[i],
                1,
            ];
        }
    }
    if (normalize) {
        return bins.reduce((b, val) => [
            ...b,
            [val[0], val[1] / length],
        ], []);
    }
    return bins.filter((b) => b);
};
exports.createBins = createBins;
/**
 *  Rounds a number to a given multiple
 * @param x
 * @param mult
 * @param type
 * @returns
 */
const roundToMultiple = (x, mult, type) => {
    if (type === 'ceil')
        return Math.ceil(x / mult) * mult;
    if (type === 'floor')
        return Math.floor(x / mult) * mult;
    return Math.round(x / mult) * mult;
};
exports.roundToMultiple = roundToMultiple;
const pctChange = (vi, vf) => ((vf - vi) / Math.abs(vi));
exports.pctChange = pctChange;
const trapezoidArea = (base, h1, h2) => {
    const extraH = Math.abs(h2 - h1);
    const quadH = Math.max(h2, h1) - extraH;
    return (quadH * base) + ((extraH * base) / 2);
};
exports.trapezoidArea = trapezoidArea;
//# sourceMappingURL=mathFuncs.js.map