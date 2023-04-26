import { genRndNumUniqArray } from '..';
import { shuffleArray } from '../Arrays';
import {
  getRandomIntWithExclude,
  getRandomInt,
  IQR,
  createBins,
} from './mathFuncs';

describe('[MathFuncs]', () => {
  test.repeats(
    { times: 1000 },
    '[getRandomIntWithExclude] Should generate a random number excluding values in an array',
    () => {
      const excludesLength = getRandomInt(0, 10);
      const excludes = excludesLength
        ? genRndNumUniqArray(0, 100, excludesLength)
        : [];

      const [min, max] = excludes.length
        ? [Math.min(...excludes), Math.max(...excludes)]
        : [getRandomInt(0, 10), getRandomInt(10, 100)];

      try {
        const num = getRandomIntWithExclude(min, max, excludes);
        expect(num).not.toBeIncludedIn(excludes);
        expect(num).toBeGreaterThanOrEqual(min);
        expect(num).toBeLessThan(max);
      } catch (error) {
        if (min === max && excludes.includes(min)) {
          expect(error).toBeInstanceOf(RangeError);
        }
      }
    },
  );

  test.repeats(
    { times: 100 },
    '[getRandomIntWithExclude] Should throw a `RangeError` if all possible values are in the excludes array',
    () => {
      const excludes = [...Array(getRandomInt(2, 10)).keys()];
      const [min, max] = [Math.min(...excludes), Math.max(...excludes)];

      try {
        getRandomIntWithExclude(min, max, excludes);
        expect(true).toBe(false); // This is not supposed to be reached since the code above throws an error
      } catch (error) {
        if (min === max && excludes.includes(min)) {
          expect(error).toBeInstanceOf(RangeError);
        }
      }
    },
  );

  test('[IQR]', () => {
    const arr1 = shuffleArray([1, 2, 5, 6, 7, 9, 12, 15, 18, 19, 27]);
    const arr2 = shuffleArray([3, 5, 7, 8, 9, 11, 15, 16, 20, 21]);
    const iqr1 = IQR(arr1);
    const iqr2 = IQR(arr2);
    expect(iqr1).toEqual(13);
    expect(iqr2).toEqual(9);
  });
});
