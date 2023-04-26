import {
  findDuplicates,
  genRndNumUniqArray,
  getRandomInt,
  pickRandom,
} from '..';
import { asyncFilter, asyncFilterSeq } from './arrayFuncs';

describe('Array function testing', () => {
  test('[asyncFilter]', async () => {
    const arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    const filtered = asyncFilter(arr, async (item) => {
      await Promise.resolve(new Promise<void>((resolve) => { setTimeout(() => { resolve(); }, 50); }));
      return item % 2 === 0;
    });
    expect(await Promise.resolve(filtered)).toEqual([2, 4, 6, 8, 10]);
  });

  test('[asyncFilterSeq]', async () => {
    const arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    const filtered = asyncFilterSeq(arr, async (item) => {
      await Promise.resolve(new Promise<void>((resolve) => { setTimeout(() => { resolve(); }, 50); }));
      return item % 2 === 0;
    });
    expect(await filtered).toEqual([2, 4, 6, 8, 10]);
  });

  describe('[pickRandom]', () => {
    test.repeats({ times: 100 }, 'Should pick random values of an array correctly', () => {
      const max = getRandomInt(-100, 100);
      const min = getRandomInt(-100, max - 1);
      const length = getRandomInt(0, 100);

      const arr = genRndNumUniqArray(min, max, length);

      const pickAmount = getRandomInt(-1, length + 10);
      const picked = pickRandom(arr, pickAmount);

      if (pickAmount < 1) expect(picked).toHaveLength(0);
      if (pickAmount >= arr.length) expect(picked).twoWayIncludes(arr);
      if (pickAmount < arr.length && pickAmount > 1) expect(picked).toHaveLength(pickAmount);
    });

    test.repeats({ times: 100 }, 'Should pick random values of an array correctly UNIQUE', () => {
      const max = getRandomInt(-100, 100);
      const min = getRandomInt(-100, max - 1);
      const length = getRandomInt(0, 100);

      const arr = genRndNumUniqArray(min, max, length);

      const pickLength = getRandomInt(-1, length + 10);
      const picked = pickRandom(arr, pickLength, true);

      if (pickLength < 1) expect(picked).toHaveLength(0);
      if (pickLength >= arr.length) expect(picked).twoWayIncludes([...new Set(arr)]);
      if (pickLength < arr.length && pickLength > 1) expect(picked).toHaveLength(pickLength);
      expect(findDuplicates(picked)).toHaveLength(0);
    });
  });
});
