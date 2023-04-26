"use strict";
/**
 * This module contains functions for testing the performance
 * of any complexity script.
 *
 * Contains every time/space complexities.
 * @module testFuncs
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.OnFactorial = exports.On2 = exports.On = void 0;
const mathFuncs_1 = require("../Math/mathFuncs");
/**
 * O(n) function
 *
 * IMPORTANT!!
 *
 * Do not time this function, since it has to generate an array of random numbers before executing.
 * The time of the execution will be returned.
 */
const On = ({ size, randomRng = [0, 10000], }) => {
    const rndArr = Array(size).map(() => (0, mathFuncs_1.getRandomInt)(randomRng[0], randomRng[1]));
    const arr = [];
    const start = performance.now();
    for (let i = 0; i < size; i++) {
        arr.push(rndArr[i]);
    }
    const end = performance.now();
    return end - start;
};
exports.On = On;
/**
 * O(log n)  QuickSort function
 *
 * IMPORTANT!!
 *
 * Do not time this function, since it has to generate an array of random numbers before executing.
 * The time of the execution will be returned.
 */
const On2 = ({ size, randomRng = [0, 10000], }) => {
    const rndArr = Array(size).map(() => (0, mathFuncs_1.getRandomInt)(randomRng[0], randomRng[1]));
    const sort = (array) => {
        if (array.length < 2)
            return array;
        const pivot = array[0];
        const left = [];
        const right = [];
        for (let i = 1, total = array.length; i < total; i++) {
            if (array[i] < pivot)
                left.push(array[i]);
            else
                right.push(array[i]);
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
exports.On2 = On2;
/**
 * O(n!) Factorial function
 * @returns the execution time
 */
const OnFactorial = (N) => {
    const factorial = (n) => {
        let num = n;
        if (n === 0)
            return 1;
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
exports.OnFactorial = OnFactorial;
//# sourceMappingURL=testFuncs.js.map