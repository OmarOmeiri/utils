/* eslint-disable arrow-body-style */
/**
 * Exports all functions related to array manipulation.
 * @module ArrayUtils
 * @category Array
 */
import _l, {
  orderBy,
  filter,
  cloneDeep,
  isEqual,
  uniqWith,
} from 'lodash';
import { getRandomInt } from '../Math';
import { omit } from '../Objects';

export type ArraySortOrder = 'asc' | 'desc';

/**
 * Deep comparison of two arrays.
 * @param x
 * @param y
 * @returns
 */
// eslint-disable-next-line func-names
export const isArrayEqual = function (x: any[], y: any[]): boolean {
  return _l(x).differenceWith(y, isEqual).isEmpty();
};

export const isNumberArray = (
  arr: Array<unknown>,
  options?: {testLengthPct?: number, nullable?: boolean},
): arr is number[] => {
  const lng = Math.max(Math.floor(arr.length * (options?.testLengthPct || 0.15)), 1);
  return arr.slice(0, lng).every((e) => {
    if (options?.nullable && (typeof e === 'number' || e === null)) return true;
    return typeof e === 'number';
  });
};

export const findIndexes = <T>(arr: T[], cb: (value: T, i: number) => boolean) => (
  arr.reduce((c, v, i) => {
    if (cb(v, i)) return [...c, i];
    return c;
  }, [] as number[])
);

/**
 * Calls a callback function
 * whenever the chunks reach the given size
 * @param iter
 * @param cb
 * @param size
 * @param unbox If the iterator yields array, you can pass `true` to flatten
 */
export async function breakChunks<T>(
  iter: AsyncGenerator<T[], void, any>,
  cb: (T: T[]) => Promise<any>,
  size: number,
  unbox: true,
): Promise<void>
export async function breakChunks<T>(
  iter: AsyncGenerator<T[], void, any>,
  cb: (T: T[]) => Promise<any>,
  size: number,
  unbox: false,
): Promise<void>
export async function breakChunks<T>(
  iter: AsyncGenerator<T, void, any>,
  cb: (T: T[]) => Promise<any>,
  size: number,
  unbox?: undefined,
): Promise<void>
export async function breakChunks<T>(
  iter: AsyncGenerator<T | T[], void, any>,
  cb: (T: T[] | T[][number]) => Promise<any>,
  size: number,
  unbox?: boolean,
): Promise<void>
// eslint-disable-next-line require-jsdoc
export async function breakChunks<T>(
  iter: AsyncGenerator<T | T[], void, any>,
  cb: (T: T[] | T[][number]) => Promise<any>,
  size: number,
  unbox = false,
): Promise<void> {
  const chunks: T[] = [];
  for await (const i of iter) {
    if (unbox && Array.isArray(i)) {
      const flattened = i.flat(Infinity) as T[];
      chunks.push(...flattened);
    } else chunks.push(i as T);
    if (chunks.length >= size) {
      await cb(chunks);
      chunks.length = 0;
    }
  }

  if (chunks.length) {
    await cb(chunks);
  }
}

/**
 * Removes a given value from an array
 *
 * IMPORTANT: This function removes values inPlace!!
 * It modifies the original array!
 * @param arr any array
 * @param value a value to be removed
 * @returns {Boolean} indication that the value was sucessfully removed
 */
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const removeValueFromArray = (arr: any[], value: any): boolean => {
  const index = arr.indexOf(value);
  if (index !== -1) {
    arr.splice(index, 1);
    return true;
  }
  return false;
};

/**
 * Removes duplicates of an array of objects by property name
 * @param arr
 * @param prop
 * @returns
 */
// @ts-ignore
export const removeDuplicatesFromObjArrayByPropName = <T extends Array<Record<string, unknown>>>(arr: T, prop: keyof T[number]): T => Array.from(
  arr
    .reduce(
      (acc, item) => ((
        item && item[prop as string] && acc.set(item[prop as string], item),
        acc
      )),
      new Map(),
    )
    .values(),
);

/**
 * Removes duplicates of an array of objects by property name (Multi)
 * @param arr
 * @param prop
 * @returns
 */
export const removeDuplicatesFromObjArrayByPropNames = <T extends Array<Record<string, unknown>>>(arr: T, props: (keyof T[number])[]): T => [...arr.reduce((m, r) => {
  const key = props.reduce((val, acc, i) => {
    if (!i) return `${r[val as string]}${r[acc as string]}`;
    return `${r[val as string]}-${r[acc as string]}`;
  });
  return m.has(key) ? m : m.set(key, r);
}, new Map()).values()] as T;

/**
 * Return all data types contained in an array
 * @param arr
 */
export function getTypesInArray(arr: any[], unique?: boolean): string[] {
  const types = arr.reduce((tps, val) => {
    if (!tps.includes(typeof val)) tps.push(typeof val);
    return tps;
  }, []);
  if (!unique) return types;
  return Array.from(new Set(types));
}

/**
 * Counts occurences of every element in an array.
 * @param arr
 * @example
 *
 * countOccurences(['a', 'b', 'a', 'c', 'd', 'd']) =>
 * [
 *   { search: 'a', innerCount: 2 },
 *   { search: 'b', innerCount: 1 },
 *   { search: 'c', innerCount: 1 },
 *   { search: 'd', innerCount: 2 }
 * ]
 */
export function countOccurences<T>(arr: T[]): {
  search: T,
  innerCount: number,
}[] {
  const uniqValues = Array.from(new Set(arr));
  const outerCount = uniqValues.map((search) => {
    const innerCount = arr.reduce((n, val) => n + Number(val === search), 0);
    return { search, innerCount };
  });
  return outerCount;
}

/**
 * Counts occurences of a single element in an array.
 * @param arr
 * @param elm the element to be counted
 * @returns
 */
export function countOccurence(arr: any[], elm: unknown): number {
  let count = 0;
  arr.forEach((e) => {
    if (e === elm) {
      count += 1;
    }
  });
  return count;
}

/**
 * Filter an array of objects by a condition that returns a boolean
 * @param obj
 * @param condition
 * @returns
 */
export const filterObjArr = <T>(obj: T[], condition: (o: T) => boolean): T[] => filter(obj, condition);

/**
 * Returns the difference between two arrays.
 * @param arr1
 * @param arr2
 * @returns the elements that are in 'arr1' but not in 'arr2'
 */
export const arrayDiff = <T>(arr1: T[], arr2: T[]) => {
  return arr1.filter((x) => !arr2.some((y) => isEqual(x, y)));
};

/**
 * Returns the outer join of two arrays.
 * @param arr1
 * @param arr2
 * @returns the elements that are not in both arrays
 */
export const arrayOuterJoin = <T>(arr1: T[], arr2: T[]): T[] => {
  return [
    ...arr1.filter((x) => !arr2.some((y) => isEqual(x, y))),
    ...arr2.filter((x) => !arr1.some((y) => isEqual(x, y))),
  ];
};

/**
 * Returns the inner join of two arrays.
 * @param arr1
 * @param arr2
 * @returns the elements that are in both arrays
 */
export const arrayInnerJoin = <T>(arr1: T[], arr2: T[]): T[] => {
  return arr1.filter((x) => arr2.some((y) => isEqual(x, y)));
};

/**
 * Aggrupates arrays in a given size
 * @param {Array} array array to be gruped / chunked
 * @param {Number} size size of the chunks
 * @returns
 */
export function chunk<T>(array: T[], size: number): T[][] {
  const chunks = [];
  const arrLength = array.length;
  const chunkNum = arrLength / size;
  for (let i = 0; i < chunkNum; i += 1) {
    chunks.push(array.slice(i * size, (i + 1) * size));
  }
  return chunks;
}

/**
 * Aggrupates arrays in a given size
 * @param {Array} array array to be gruped / chunked
 * @param {Number} size size of the chunks
 * @returns
 */
export function* genChunk<T>(array: T[], size: number): Generator<T[], void, unknown> {
  const arrLength = array.length;
  const chunkNum = arrLength / size;
  for (let i = 0; i < chunkNum; i += 1) {
    yield array.slice(i * size, (i + 1) * size);
  }
}

/**
 * Searches an array for a regex match.
 * @param arr
 * @param pattern
 * @returns {Boolean}
 */
export const matchArrayRegex = (arr: string[], pattern: RegExp): boolean => {
  return !!arr.find((s) => pattern.test(s));
};

/**
 * Sorts an array of objects by key
 *
 * IMPORTANT:
 * Sorts in ascending order by default
 * @param arr
 * @param key
 * @param order
 * @returns
 */
export const sortObjArray = <T>(arr: T[], key: string, order: ArraySortOrder = 'asc'): T[] => {
  return orderBy(arr, [key], [order]);
};

export const sortNumArray = (arr: number[], order: ArraySortOrder = 'asc'): number[] => {
  if (order === 'asc') {
    return [...arr].sort((a, b) => a - b);
  }
  return [...arr].sort((a, b) => b - a);
};

/**
 * Sorts an array of objects by key IGNORES CASING
 * @param arr
 * @param key
 * @param order
 * @returns
 *
 * IMPORTANT!!
 *
 * Make sure the values are strings or numbers
 */
export const sortObjArrayIgCase = <T extends Record<string, unknown>>(arr: T[], key: string, order: ArraySortOrder = 'asc'): T[] => {
  if (!arr.length) return arr;
  let isNum = true;
  for (const v of arr) {
    if (Number.isNaN(Number(v[key]))) {
      isNum = false;
      break;
    }
  }
  if (isNum) {
    return orderBy(arr, [(val) => Number(val[key])], [order]);
  }
  return orderBy(arr, [(val) => ((val[key] as any).toString()).normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase()], [order]);
};

export const sortStrArr = (arr: string[], order: ArraySortOrder = 'asc'): string[] => {
  const sorted = [...arr]
    .sort((a, b) => a
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .localeCompare(b, 'en', { sensitivity: 'base' }));
  if (order === 'asc') return sorted;
  return sorted.reverse();
};

/**
 * Sorts an array of Objects by another array
 *
 * Puts elements that are not found in the sorting index at the end
 * @param array
 * @param order
 * @param key
 * @example
 * item_array = [
 *   { id: 2, label: 'Two' },
 *   { id: 3, label: 'Three' },
 *   { id: 5, label: 'Five' },
 *   { id: 4, label: 'Four' },
 *   { id: 1, label: 'One'},
 * ];
 *
 * item_order = [1,2,3,4,5];
 *
 * ordered_array = mapOrder(item_array, item_order, 'id');
 *
 * [
 *  { id: 1, label: 'One'},
 *  { id: 2, label: 'Two' },
 *  { id: 3, label: 'Three' },
 *  { id: 4, label: 'Four' },
 *  { id: 5, label: 'Five' },
 * ]
 *
 */
export const sortObjArrayByArrayAndKey = <T, K extends keyof T>(
  array: T[],
  order: T[K][],
  key: K,
): T[] => {
  const [
    includedInSortingIndex,
    notIncludedInSortingArray,
  ] = array.reduce((incl, val) => {
    if (order.includes(val[key])) incl[0].push(val);
    else incl[1].push(val);
    return incl;
  }, [[], []] as [T[], T[]]);

  return [
    ...includedInSortingIndex.slice().sort((a, b) => {
      const A = a[key];
      const B = b[key];
      return order.indexOf(A) - order.indexOf(B);
    }),
    ...notIncludedInSortingArray,
  ];
};

/**
 * Generates an array of unique numbers
 * @param min
 * @param max
 * @param size
 */
export function genRndNumUniqArray(min: number, max: number, size: number): number[] {
  const rng = Math.min(max - min, size);
  if (rng < 1) return [];
  const nums = new Set<number>();
  while (nums.size !== rng) {
    const n = getRandomInt(min, max);
    nums.add(n);
  }
  return Array.from(nums);
}

/**
 * Searches a substring array for a given string
 * @param str
 * @param substrArr
 * @returns
 */
export const matchStringInArrayofSubstr = (str: string, substrArr: string[]): boolean => {
  const lng = substrArr.length;
  let found = false;
  for (let i = 0; i < lng; i += 1) {
    if (str.includes(substrArr[i])) {
      found = true;
      break;
    }
  }
  return found;
};

/**
 * Sums a 2D array by columns
 * @param arr
 * @returns
 */
export const sum2DArrayCols = (arr: number[][]): number[] => {
  const newArray: number[] = [];
  arr.forEach((sub) => {
    sub.forEach((num, index) => {
      if (newArray[index]) {
        newArray[index] += num;
      } else {
        newArray[index] = num;
      }
    });
  });
  return newArray;
};

/**
 * Filters an array of objects by an array of key value pairs
 * @param arr
 * @param filterPairs
 * @example
 * itemArray = [
 *   { id: 2, label: 'Two' },
 *   { id: 3, label: 'Three' },
 *   { id: 5, label: 'Five' },
 *   { id: 4, label: 'Four' },
 *   { id: 1, label: 'One'},
 * ];
 *
 * filterPairs = [
 *  ['id', 2],
 *  ['label', 'Three']
 * ];
 *
 * filteredArray = filterArrOfObjsByKeyValuePair(itemArray, filterPairs);
 *
 * [
 *  { id: 2, label: 'Two' },
 *  { id: 3, label: 'Three' },
 * ]
 *
 */
export const filterArrOfObjsByKeyValuePair = <T extends Record<any, any>>(arr: T[], filterPairs: [any, any][]): T[] => {
  const copy = cloneDeep(arr)
    .filter((i) => {
      let filterValue = true;
      filterPairs.forEach((fp) => {
        if (Object.keys(i).includes(fp[0])) {
          if (i[fp[0]] !== fp[1]) {
            filterValue = false;
          }
        }
      });
      return filterValue;
    });
  return copy;
};

/**
 * Filters an array of objects by an array of key value pairs
 *
 * IMPORTANT: Order is not guaranteed
 *
 * Returns a tuple. The first item is an object indexed by the chunk name
 * and the second item are the chunk names
 * @param arr
 * @param key
 * @example
 * itemArray = [
 *   { id: 2, label: 'Two', chunk: 1 },
 *   { id: 3, label: 'Three', chunk: 2 },
 *   { id: 5, label: 'Five', chunk: 2 },
 *   { id: 4, label: 'Four', chunk: 3 },
 *   { id: 1, label: 'One', chunk: 1},
 * ];
 *
 * chunked= chunkArrOfObjsByKeyAndValue(itemArray, 'chunk');
 *  [
 *    {
 *      '1': [
 *             { id: 2, label: 'Two', chunk: 1 },
 *             { id: 1, label: 'One', chunk: 1},
 *           ],
 *      '2': [
 *             { id: 3, label: 'Three', chunk: 2 },
 *             { id: 5, label: 'Five', chunk: 2 },
 *           ],
 *      '3': [
 *             { id: 4, label: 'Four', chunk: 3 },
 *           ]
 *    },
 *    ['1', '2', '3']
 *  ]
 */
export const chunkArrOfObjsByKeyAndValue = <T extends Record<any, any>>(arr: T[], key: keyof T): [{[key: string]: T[]}, (keyof T)[]] => {
  const copy = cloneDeep(arr);
  const chunkNames = Array.from(new Set(copy.map((i) => i[key])));
  const chunked: {
    [key: string]: T[]
  } = {};

  chunkNames.forEach((n) => {
    chunked[n] = copy.filter((c) => c[key] === n);
  });

  return [chunked, chunkNames.map((n) => n.toString())];
};

/**
 * Replaces an object in an object array by a key value pair
 *
 * IMPORTANT:
 *
 * If the object was not found, this function will insert the object into the array
 *
 * @param arr
 * @param replacement
 * @param keyVal
 * @returns
 */
export const replaceInObjArrayByKeyValue = <T extends Record<any, any>>(arr: T[], replacement: T, keyVal: [keyof T, any]): T[] => {
  let found = false;
  const newObj = arr.map((obj) => {
    if (obj[keyVal[0]] === keyVal[1]) {
      found = true;
      // eslint-disable-next-line no-param-reassign
      obj = replacement;
    }
    return obj;
  });

  if (!found) return [...arr, replacement];
  return newObj;
};

/**
 * Replaces items in an array of objects based on a replacements array and a key
 * @param arr
 * @param replacements
 * @param keyToMatch
 * @param [insertIfNotFound] If 'true' will insert the replacement if not found. Defaults to false
 *
 *
 * IMPORTANT!!!
 *
 * The "keyToMatch" value should be a string or a number. (UNIQUE)
 *
 * If the object wasn't found, it will push the replacement at the end
 *
 * @example
 *
 * const arr = [
 *  {
 *    id: '1',
 *    value: 'value1'
 *  },
 *  {
 *    id: '2',
 *    value: 'value2'
 *  },
 *  {
 *    id: '3',
 *    value: 'value3'
 *  },
 *  {
 *    id: '4',
 *    value: 'value4'
 *  },
 * ]
 *
 * const replacements = [
 *  {
 *    id: '2',
 *    value: 'newValue2'
 *  },
 *  {
 *    id: '4',
 *    value: 'newValue4'
 *  }
 * ]
 *
 * replaceItemsInObjArray(arr, replacements, 'id') => [
 *  {
 *    id: '1',
 *    value: 'value1'
 *  },
 *  {
 *    id: '2',
 *    value: 'newValue2'
 *  },
 *  {
 *    id: '3',
 *    value: 'value3'
 *  },
 *  {
 *    id: '4',
 *    value: 'newValue4'
 *  },
 * ]
 */
export const replaceItemsInObjArray = <T>(arr: T[], replacements: T[], keyToMatch: keyof T, insertIfNotFound = false): T[] => {
  const notFoundKeys: T[keyof T][] = [];
  const replMap = new Map(replacements.map((e) => [e[keyToMatch], e]));
  const newArr = arr.map((obj) => {
    if (replMap.has(obj[keyToMatch])) {
      return replMap.get(obj[keyToMatch]) as T;
    }
    notFoundKeys.push(obj[keyToMatch]);
    return obj;
  });

  if (!insertIfNotFound) {
    return newArr;
  }
  return [
    ...newArr,
    ...notFoundKeys.map((k) => replacements.find((r) => r[keyToMatch] === k)) as T[],
  ];
};

/**
 * Checks if an array has any element contained in another array
 * @param arrToFind
 * @param arr
 * @returns
 */
export const arrayIncludesAnotherArray = <T extends unknown[]>(arrToFind: T, arr: T): boolean => (arrToFind ?? []).some((v) => arr.includes(v));

/**
 * Checks if an array has every element contained in another array
 * @param arrToFind
 * @param arr
 * @returns
 */
export const arrayIncludesAnotherArrayAll = <T extends unknown[]>(arrToFind: T, arr: T): boolean => (arrToFind ?? []).every((v) => arr.includes(v));

type filterObjectByKeysOverload = {
  <T>(obj: T, keys: string | string[], inplace: true): undefined,
  <T>(obj: T, keys: string | string[], inplace?: false): Partial<T>,
}

/**
 * Filters an object by a key or an array of keys.
 *
 * inplace = true modifies the original object
 * @param obj
 * @param keys
 */
export const filterObjectByKeys: filterObjectByKeysOverload = <T extends Record<string, unknown>>(
  obj: T,
  keys: keyof T | (keyof T)[],
  inplace = false,
// @ts-ignore
// eslint-disable-next-line consistent-return
): T => {
  const ks = Array.isArray(keys) ? keys : [keys];
  if (inplace) {
    Object.fromEntries(Object.entries(obj).filter(([key]) => ks.includes(key)));
  } else {
    const copy = cloneDeep(obj);
    return Object.fromEntries(Object.entries(copy).filter(([key]) => ks.includes(key))) as T;
  }
};

/**
 * Removes an element from an array by index.
 *
 * Defaults to returning a new array
 *
 * If 'inPlace === true' it modifies the current array
 * @param arr
 * @param index
 * @param inPlace
 * @returns
 */
export function removeByIndex<T>(arr: T[], index: number, inPlace?: false): T[]
export function removeByIndex<T>(arr: T[], index: number, inPlace: true): void
// eslint-disable-next-line consistent-return, require-jsdoc
export function removeByIndex<T>(arr: T[], index: number, inPlace = false): T[] | void {
  if (!inPlace) return arr.slice(0, index).concat(arr.slice(index + 1));
  arr.splice(index, 1);
}

/**
 * Picks a random values in an array
 *
 * IMPORTANT!!
 *
 * If the array has length less than or equal the
 * number of elements to pick, it will return the original array
 * @param arr
 * @param n
 * @param unique
 */
export function pickRandom<T>(arr: T[] | ReadonlyArray<T>, n?: undefined, unique?: boolean): T
export function pickRandom<T>(arr: T[] | ReadonlyArray<T>, n: number, unique?: boolean): T[]
export function pickRandom<T>(arr: T[] | ReadonlyArray<T>, n?: number, unique?: boolean): T[] | ReadonlyArray<T> | T
// eslint-disable-next-line require-jsdoc
export function pickRandom<T>(arr: T[] | ReadonlyArray<T>, n?: number, unique?: boolean): T[] | ReadonlyArray<T> | T {
  const isUndefParam = !!(!n && n !== 0);
  // eslint-disable-next-line no-param-reassign
  if (!n && n !== 0) n = 1;

  if (n < 1) return [];
  const { length } = arr;
  if (n >= length && !unique) {
    if (isUndefParam) return arr[getRandomInt(0, length)];
    return arr;
  }
  if (n >= length && unique) {
    const uniq = uniqWith(arr, isEqual);
    if (isUndefParam) return uniq[getRandomInt(0, uniq.length)];
    return uniq;
  }
  const pick = () => Math.floor(Math.random() * (Math.floor(length) - Math.ceil(0)) + Math.ceil(0));
  if (!unique) {
    const picked = [...Array(n)].map(() => arr[pick()]);
    if (n === 1 && isUndefParam) return picked[0];
    return picked;
  }

  const rng = Math.min(arr.length, n);
  const nums = new Set<number>();
  while (nums.size !== rng) {
    nums.add(getRandomInt(0, length));
  }
  const picked = [...nums].map((i) => arr[i]);
  if (n === 1 && isUndefParam) return picked[0];
  return picked;
}

/**
 * Performs a asynchronous filter concurrently
 * @param arr
 * @param cb
 * @returns
 */
export async function asyncFilter<T>(arr: T[], cb: (...args: [e: T, i: number]) => Promise<boolean>): Promise<T[]> {
  const results = await Promise.all(arr.map(cb));
  return arr.filter((_v, index) => results[index]);
}

/**
 * Gets the duplicate elements of an object array by key
 *
 * IMPORTANT!
 *
 * Will return the duplicates elements more than once
 */
export function getObjDuplicatesByKey<O extends Record<PropertyKey, unknown>>(arr: O[], key: keyof O): O[] {
  const lookup = arr.reduce((a, e) => {
    a.set(e[key], (a.get(e[key]) ?? 0) + 1);
    return a;
  }, new Map());

  return arr.filter((e) => lookup.get(e[key]) > 1);
}

/**
 * Gets the duplicate elements of an object array by key
 *
 * IMPORTANT!
 *
 * If unique is false or undefined will return the duplicated elements more than once.
 * if true, will return only once
 */
export function findDuplicates<T extends Exclude<Primitives, symbol> | Date>(arr: T[], unique?: boolean): T[] {
  const primArr = arr.map((e) => {
    if (e instanceof Date) return e.toString();
    return e as Exclude<Primitives, symbol>;
  });

  const lookup = primArr.reduce((a, e) => {
    a.set(e, (a.get(e) ?? 0) + 1);
    return a;
  }, new Map());

  const dupes = arr.filter((e) => lookup.get(e) > 1);
  if (!unique) return dupes;
  return [...new Set(dupes)];
}

export const findDuplicateString = (strings: string[]): boolean => {
  const table: { [key: string]: boolean} = {};
  for (const string of strings) {
    if (string in table) return true;
    table[string] = true;
  }
  return false;
};

/**
 * Perform an asynchronous filter sequentially
 * @param arr
 * @param cb
 * @returns
 */
export async function asyncFilterSeq<T>(arr: T[], cb: (...args: [e: T, i: number]) => Promise<boolean>): Promise<T[]> {
  return arr.reduce(
    async (memo, e, i) => [...await memo, ...await cb(e, i) ? [e] : []],
  Promise.resolve([]) as Promise<T[]>,
  );
}

/**
 * Shuffles an array
 * @param array
 */
export function shuffleArray<T>(array: T[]): T[] {
  return array.sort(() => (Math.random() > 0.5 ? 1 : -1));
}

/**
 * Returns a range of numbers
 * @param from
 * @param to
 * @param step
 * @returns
 */
export function range(from: number, to: number, step = 1): number[] {
  let rev = false;
  if (!step) return [];
  // eslint-disable-next-line no-param-reassign
  step = Math.round(step);
  if (from > to) {
    rev = true;
    // eslint-disable-next-line no-param-reassign
    [from, to] = [to, from];
  }

  if (step < 0) {
    rev = true;
    // eslint-disable-next-line no-param-reassign
    step = Math.abs(step);
  }

  const amplitude = to - from;
  if (amplitude < 1 || amplitude < step) return [from];

  if (rev) return [...Array(Math.floor((to - from) / step) + 1)].map((v, i) => from + i * step).reverse();
  return [...Array(Math.floor((to - from) / step) + 1)].map((v, i) => from + i * step);
}

/**
 * Generates an array of N numbers in which all elements summed equals to 1
 * @param n
 */
export function nArraySum1(n: number): number[] {
  const rnd = [...Array(n)]
    .map(() => Math.random());

  const sum = rnd.reduce((val, acc) => val + acc);
  return rnd.map((val) => val / sum);
}

/**
 * Filters an array based on another array.
 * Puts elements not found in the sorting array at the end
 */
export const sortArrayWithSortingArray = <T extends Primitives>(
  arr: Array<T>,
  sortingArray: Array<T>,
) => {
  const [
    includedInSortingIndex,
    notIncludedInSortingArray,
  ] = arr.reduce((incl, val) => {
    if (sortingArray.includes(val)) incl[0].push(val);
    else incl[1].push(val);
    return incl;
  }, [[], []] as [T[], T[]]);

  return [
    ...includedInSortingIndex.slice().sort((a, b) => {
      return sortingArray.indexOf(a) - sortingArray.indexOf(b);
    }),
    ...notIncludedInSortingArray,
  ];
};

/**
 * Transforms an array into a matrix (2D array) with dimensions M(arr.length / cols, cols)
 * @param arr
 * @param cols
 * @returns
 */
export function arrayToMatrix<T>(
  arr: Array<T>,
  cols: number,
): T[][] {
  return arr.reduce((matrix, item, index) => {
    if (index % cols === 0) {
      matrix.push([]);
    }
    matrix[matrix.length - 1].push(item);
    return matrix;
  }, [] as T[][]);
}

/**
 * Performs the cartesian product of multiple arrays
 * @param a
 * @param more
 * @returns
 */
export function* cartesianProduct<T>(a: T[], ...more: T[][]): Generator<T[][], void, any> {
  if (a == null) return yield [];
  for (const v of a) {
    // @ts-ignore
    for (const c of cartesianProduct(...more)) {
      // @ts-ignore
      yield [v, ...c];
    }
  }
}

/**
 * Calculates the average of an array of numbers
 * @param arr
 * @returns
 */
export function arrayAverage(...arr: number[]): number {
  if (!arr.length) return 0;
  return (arr.reduce((acc, v) => acc + v, 0)) / arr.length;
}

export const arraySum = (...arr: number[]): number => {
  if (!arr.length) return 0;
  return arr.reduce((acc, val) => acc + val, 0);
};

export const arrayTo2D = <T>(arr: Array<T>, size: number) => (
  arr.reduce((mat, item, i) => {
    if (i % size === 0) {
      mat.push([]);
    }
    mat[mat.length - 1].push(item);
    return mat;
  }, [] as T[][])
);

/**
 * Generator that yields an array chunked by the size param
 * @param arr
 * @param size
 */
export function* windowArray<T>(arr: Array<T>, size: number): Generator<Array<T>> {
  const lng = arr.length;
  const iterations = lng - (size - 1);
  for (const i of Array(iterations).keys()) {
    yield range(i, i + (size - 1)).map((j) => arr[j]);
  }
}

/**
 * Maps through chunks of an array of a given sizencu
 */
export function mapChunk <T, const S extends number, R>(arr: T[], callback: (t: T[], i: number) => R, size: S): R[] {
  return chunk(arr, size).map((c, i) => callback(c, i));
}

/**
 * Omits properties from an array of objects
 */
export function omitFromObjArray<T extends object>(arr: T[], keys: (keyof T)[]) {
  return arr.map((e) => omit(e, ...keys));
}

/**
 * Inserts elements in an array by index.
 *
 * IMPORTANT: Will add null elements if the desired index is larger that array.length
 * Will dislocate elements to a greater index if there is an element in the desired index.
 * @param arr
 * @param index
 * @param elem
 * @returns
 */
export const insertAtIndex = <T>(arr: T[], index: number, elem: T) => {
  if (arr.length === index) {
    return [...arr, elem];
  }
  if (arr.length < index) {
    return Array(index + 1)
      .fill(null)
      .map((_, i) => {
        if (i < arr.length) return arr[i];
        if (i === index) return elem;
        return null;
      });
  }
  const part1 = arr.slice(0, index);
  const part2 = arr.slice(index, arr.length);
  return [
    ...part1,
    elem,
    ...part2,
  ];
};
