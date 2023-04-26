/* eslint-disable @typescript-eslint/ban-types */
/**
 * JSON utility functions
 * @module JSONUtils
 * @category JSON
 */

/* eslint-disable no-nested-ternary */
/* eslint-disable no-restricted-syntax */
import lodash, {
  cloneDeep, isEqual,
} from 'lodash';
import { ArraySortOrder, sortNumArray, sortStrArr } from '../Arrays';
import { isNullOrUndefined } from '../Misc/miscFuncs';

/**
 * Recursively finds all possible paths in an object
 * @param obj
 * @param path
 * @returns
 */
function rKeys(obj: {[key: string]: any}, path = ''): any {
  if (!obj || typeof obj !== 'object') return path;
  return Object.keys(obj).map((key) => rKeys(obj[key], path ? [path, key].join('.') : key));
}

/**
 * Returns a list of all object paths
 * @param o
 * @returns
 *
 * @example
 * const obj = {
 *  a: 1,
 *  b: [1, 2],
 *  c: {d: 'test', e: 'vai'},
 * }
 *
 * objectPaths(obj) => [ 'a', 'b.0', 'b.1', 'c.d', 'c.e' ]
 *
 *
 * NOTE: Returns arrays in dot notation
 */
export const objectPaths = (obj: {[key: string]: any}): string[] => rKeys(obj).toString().split(',');

/**
 * Returns an object with all paths and values
 * @param o
 * @returns
 *
 * @example
 * const obj = {
 *  a: 1,
 *  b: [1, 2],
 *  c: {d: 'test', e: 'vai'},
 * }
 *
 * objectPathsWithValues(obj) => {
 *   a: 1,
 *  'b.0': 1,
 *  'b.1': 2,
 *  'c.d': 'test',
 *  'c.e': 'vai',
 * }
 *
 */
export const objectPathsWithValues = (obj: {[key: string]: any}): {[key: string]: any} => {
  const paths = objectPaths(obj);
  const pathsWithVals: {[key: string]: any} = {};
  paths.forEach((p) => {
    pathsWithVals[p] = lodash.get(obj, p);
  });
  return pathsWithVals;
};

/**
 * Finds a value by a property name in an object or array
 *
 * Returns the first match
 *
 * @param data
 * @param keyNameOrPattern
 * @returns
 */
 type ValByProp<O extends Record<string, unknown>, K extends keyof O> =
 KeyExists<O, K> extends true
 ? O[K]
 : undefined
export function valueByProperty<V, T extends Record<string, V>, K extends keyof T>(data: T | T[], keyNameOrPattern: K): ValByProp<T, K>
export function valueByProperty<V, T extends Record<string, V>>(data: T | T[], keyNameOrPattern: RegExp): V | undefined
export function valueByProperty<V, T extends Record<string, V>>(data: T | T[], keyNameOrPattern: string): V | undefined
// eslint-disable-next-line require-jsdoc
export function valueByProperty<V, T extends Record<string, V>, K extends keyof T>(data: T | T[], keyNameOrPattern: K | RegExp): V | ValByProp<T, K> | undefined {
  // eslint-disable-next-line no-restricted-syntax
  for (const key in data) {
    if (Object.prototype.hasOwnProperty.call(data, key)) {
      const entry = (data as any)[key];
      if (typeof keyNameOrPattern === 'string' && key === keyNameOrPattern) {
        return entry;
      }
      if (keyNameOrPattern instanceof RegExp && keyNameOrPattern.test(key)) {
        return entry;
      }

      if (typeof entry === 'object') {
        // @ts-ignore
        const found = valueByProperty(entry, keyNameOrPattern);

        if (found) { return found; }
      }
    }
  }
  return undefined;
}

/**
 * Performs a map of the 'valueByProperty' and
 * returns all matching values of keys
 * @param data
 * @param keyNameOrPattern
 * @returns
 */
export function valuesByProperty<V, T extends Record<string, V>, K extends keyof T>(data: T[], keyNameOrPattern: K): ValByProp<T, K>[]
export function valuesByProperty<V, T extends Record<string, V>>(data: T[], keyNameOrPattern: RegExp): V[]
export function valuesByProperty<V, T extends Record<string, V>>(data: T | T[], keyNameOrPattern: string): V | undefined
// eslint-disable-next-line require-jsdoc
export function valuesByProperty<V, T extends Record<string, V>, K extends keyof T>(data: T[], keyNameOrPattern: K | RegExp): ValByProp<Record<string, unknown>, K & string>[] {
  const found = data.map((entry) => valueByProperty(entry, keyNameOrPattern as K & string));
  return found.filter((v) => typeof v !== 'undefined');
}

/**
 * Returns an array of object keys sorted
 *
 * IMPORTANT:
 * Sorts in ascending order by default
 * @param obj
 * @param order
 * @returns
 */
export const sortObjKeys = <T extends Record<string | number, unknown>, K extends keyof T>(obj: T, order: ArraySortOrder = 'asc'): K[] => {
  const keys = Object.keys(obj);
  let isNum = true;
  for (const key of keys) {
    if (Number.isNaN(Number(key))) {
      isNum = false;
      break;
    }
  }
  if (isNum) {
    return sortNumArray(keys.map(Number), order) as K[];
  }
  return sortStrArr(keys, order) as K[];
};

interface IGetPathByKey {
  key: string,
  obj: Record<string, any>
  pathToKey?: string,
}

/**
 * Get the JSON path for a given key.
 * @param options
 */
export function getObjPathByKey(options: IGetPathByKey): string[] {
  const results: string[] = [];

  // eslint-disable-next-line require-jsdoc
  function findKey({
    key,
    obj,
    pathToKey,
  }: IGetPathByKey) {
    const oldPath = `${pathToKey ? `${pathToKey}.` : ''}`;
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      results.push(`${oldPath}${key}`);
      return;
    }

    if (obj !== null && typeof obj === 'object' && !Array.isArray(obj)) {
      for (const k in obj) {
        if (Object.prototype.hasOwnProperty.call(obj, k)) {
          if (Array.isArray(obj[k])) {
            for (let j = 0; j < obj[k].length; j += 1) {
              findKey({
                obj: obj[k][j],
                key,
                pathToKey: `${oldPath}${k}[${j}]`,
              });
            }
          }

          if (obj[k] !== null && typeof obj[k] === 'object') {
            findKey({
              obj: obj[k],
              key,
              pathToKey: `${oldPath}${k}`,
            });
          }
        }
      }
    }
  }

  findKey(options);

  return results;
}

/**
 * Recursively remove keys from an object
 * @example
 *
 * const input = {
 *   id: 1,
 *   name: '123',
 *   createdAt: '1020209',
 *   address: {
 *     id: 1,
 *     name: '123',
 *   },
 *   variants: [
 *     20,
 *     {
 *       id: 22,
 *       title: 'hello world',
 *       name: '123',
 *       createdAt: '1020209',
 *       variantOption: {
 *         id: 1,
 *         name: '123',
 *       },
 *     },
 *     {
 *       id: 32,
 *       name: '123',
 *       createdAt: '1020209',
 *     },
 *   ],
 * }
 *
 * omitDeep(input, ['createdAt', 'name'])
 *
 * {
 *   id: 1,
 *   address: { id: 1 },
 *   variants: [
 *     20,
 *     { id: 22, title: 'hello world', variantOption: { id: 1 } },
 *     { id: 32 }
 *   ]
 * }
 *
 *
 * @param {object} input
 * @param {Array<number | string>>} excludes
 * @return {object}
 */
export function omitDeep<T extends Record<string, unknown>>(input: T, excludes: Array<number | string>): Partial<T> {
  return Object.entries(input).reduce((nextInput, [key, value]) => {
    const shouldExclude = excludes.includes(key);
    if (shouldExclude) return nextInput;

    if (Array.isArray(value)) {
      const arrValue = value;
      const nextValue = arrValue.map((arrItem) => {
        if (typeof arrItem === 'object') {
          return omitDeep(arrItem, excludes);
        }
        return arrItem;
      });
      // @ts-ignore
      nextInput[key] = nextValue;
      return nextInput;
    } if (typeof value === 'object') {
      // @ts-ignore
      nextInput[key] = omitDeep(value, excludes);
      return nextInput;
    }
    // @ts-ignore
    nextInput[key] = value;

    return nextInput;
  }, {} as T);
}

/**
 * Recursively modifies keys from an object
 * based os a regex pattern
 * @example
 *
 * const input = {
 *   id: 1,
 *   'name.name': '123',
 *   createdAt: '1020209',
 *   address: {
 *     'name.name': '123',
 *   },
 *   variants: [
 *     {
 *       id: 22,
 *       'name.name': '123',
 *       variantOption: {
 *         id: 1,
 *         'name.name': '123',
 *       },
 *     },
 *     {
 *       id: 32,
 *       name.name: '123',
 *     },
 *   ],
 * }
 *
 * modKeyDeep(input, /\./, '-')
 *
 * const input = {
 *   id: 1,
 *   'name-name': '123',
 *   createdAt: '1020209',
 *   address: {
 *     'name-name': '123',
 *   },
 *   variants: [
 *     {
 *       id: 22,
 *       'name-name': '123',
 *       variantOption: {
 *         id: 1,
 *         'name-name': '123',
 *       },
 *     },
 *     {
 *       id: 32,
 *       name-name: '123',
 *     },
 *   ],
 * }
 *
 * @param input
 * @param pattern
 * @param replacement defaults to ''
 * @return {object}
 */
export function modKeyDeep<T extends Record<string, unknown>>(input: T, pattern: RegExp, replacement = ''): T {
  return Object.entries(input).reduce((nextInput, [key, value]) => {
    if (Array.isArray(value)) {
      const arrValue = value;
      const nextValue = arrValue.map((arrItem) => {
        if (typeof arrItem === 'object') {
          return modKeyDeep(arrItem, pattern, replacement);
        }
        return arrItem;
      });
      // @ts-ignore
      nextInput[key.replace(pattern, replacement)] = nextValue;
      return nextInput;
    }
    if (typeof value === 'object') {
      // @ts-ignore
      nextInput[key.replace(pattern, replacement)] = modKeyDeep(value, pattern, replacement);
      return nextInput;
    }
    // @ts-ignore
    nextInput[key.replace(pattern, replacement)] = value;

    return nextInput;
  }, {} as T);
}

/**
 * Recursively filters keys from an object
 * based on a regex pattern
 * @example
 *
 * const input = {
 *   id: 1,
 *   'name.name': '123',
 *   createdAt: '1020209',
 *   address: {
 *     'name.name': '123',
 *   },
 *   variants: [
 *     {
 *       id: 22,
 *       'name.name': '123',
 *       variantOption: {
 *         id: 1,
 *         'name.name': '123',
 *       },
 *     },
 *     {
 *       id: 32,
 *       'name.name': '123',
 *     },
 *   ],
 * }
 *
 * matchKeyDeep(input, /\./)
 *
 * const input = {
 *   'name.name': '123',
 *   address: {
 *     'name.name': '123',
 *   },
 *   variants: [
 *     {
 *       'name.name': '123',
 *       variantOption: {
 *         'name.name': '123',
 *       },
 *     },
 *     {
 *       name.name: '123',
 *     },
 *   ],
 * }
 *
 * @param input
 * @param pattern
 * @return {object}
 */
export function matchKeyDeep<T extends Record<string, unknown>>(input: T, pattern: RegExp): Partial<T> {
  return Object.entries(input).reduce((nextInput, [key, value]) => {
    const isMatch = pattern.test(key);
    if (Array.isArray(value)) {
      const arrValue = value;
      let nextValue = arrValue.map((arrItem) => {
        if (typeof arrItem === 'object') {
          return matchKeyDeep(arrItem, pattern);
        }
        return arrItem;
      });
      if (!isMatch && Array.isArray(nextValue)) {
        nextValue = nextValue.filter((v) => (typeof v === 'object' && v !== null));
        if (nextValue.length === 0) return nextInput;
      }
      // @ts-ignore
      nextInput[key] = nextValue;
      return nextInput;
    }
    if (typeof value === 'object' && value !== null) {
      const recurse = matchKeyDeep(value as T, pattern);
      if (!isMatch && Object.keys(recurse).length === 0) {
        return nextInput;
      }
      // @ts-ignore
      nextInput[key] = recurse;
      return nextInput;
    }

    if (isMatch) {
      // @ts-ignore
      nextInput[key] = value;
    }

    return nextInput;
  }, {} as T);
}

/**
 * Performs a '.map' of the function 'matchKeysDeep'
 * and returns an array of key matches
 * @param input
 * @param pattern
 * @returns
 */
export function matchKeyDeepInArray<T extends Record<string, unknown>>(input: T[], pattern: RegExp): Partial<T>[] {
  return input.map((item) => matchKeyDeep(item, pattern));
}

/**
 * Filters first level keys of an object
 * based on a regex pattern
 * @example
 *
 * const input = {
 *   id: 1,
 *   'name.name': '123',
 *   createdAt: '1020209',
 *   address: {
 *     'name.name': '123',
 *   },
 * };
 *
 * matchKeyShallow(input, /\./, '-')
 *
 * const input = {
 *   'name.name': '123',
 * };
 *
 * @param input
 * @param pattern
 * @return {object}
 */
export function matchKeyShallow<T extends Record<string, unknown>>(input: T, pattern: RegExp): T {
  return Object.entries(input).reduce((obj, [key, value]) => {
    const isMatch = pattern.test(key);
    if (isMatch) {
      return { ...obj, [key]: value };
    }
    return obj;
  }, {} as T);
}

/**
 * Gets the value of a given nested key. (first match)
 * @param object
 * @param key
 * @returns
 */
export function getValueByKey(object: Record<string, any>, key: string): any | null {
  if (Object.keys(object).includes(key)) return object[key];
  for (let i = 0; i < Object.keys(object).length; i += 1) {
    if (typeof object[Object.keys(object)[i]] === 'object' && object[Object.keys(object)[i]] !== null) {
      const o = getValueByKey(object[Object.keys(object)[i]], key);
      if (o != null) return o;
    }
  }
  return null;
}

/**
 * Gets the key of an object for a given value. (NO NESTED!!)
 *
 *
 * IMPORTANT!!!
 * It returns the first match, so make sure you call this function
 * only on objects that have unique values.
 * @param object
 * @param value
 * @returns
 */
export function getKeyByValue<V, T extends Record<string | number, V>, K extends keyof T>(object: T, value: V): ToString<K> | undefined {
  return Object.keys(object).find((key) => object[key] === value) as ToString<K> | undefined;
}

/**
 * Removes duplicates of an array of objects
 * @param objArr
 */
export function rmvObjDuplicates<T>(objArr: T[]): T[] {
  return lodash.uniqWith(objArr, lodash.isEqual);
}

/**
 * Removes duplicates of an array of objects by a given UNIQUE key
 * @param objArr
 */
export function rmvObjDuplicatesByKey<T extends Record<string, any>[]>(objArr: T, key: string): T {
  return lodash.uniqBy(objArr, key) as unknown as T;
}

/**
 * Returns an array of all object paths
 * @param obj
 * @returns
 *
 * NOTE: Returns arrays in bracket notation
 */
export function getObjPaths<T extends Record<string, any>>(obj: T): string[] {
  const recurse = (innerObj: T, prefix: string, acc: string[]) => {
    if (prefix !== '') acc.push(prefix);
    if (typeof innerObj === 'object' && innerObj !== null) {
      if (Array.isArray(innerObj)) {
        for (let k = 0; k < innerObj.length; k += 1) {
          recurse(innerObj[k], `${prefix}[${k}]`, acc);
        }
      } else {
        const keys = Object.keys(innerObj);
        keys.forEach((k) => {
          recurse(innerObj[k], `${prefix}.${k}`, acc);
        });
      }
    }
    return acc;
  };
  return recurse(obj, '', []);
}

export const safeStringify = (obj:Record<string, unknown>, indent = 2): string => {
  let cache: any[] | null = [];
  const retVal = JSON.stringify(
    obj,
    (key, value) => (typeof value === 'object' && value !== null
      ? cache?.includes(value)
        ? undefined // Duplicate reference found, discard key
        : cache?.push(value) && value // Store value in our collection
      : value),
    indent,
  );
  cache = null;
  return retVal;
};

/**
 * Filters undefined properties.
 *
 * IMPORTANT!
 *
 * Mutates the original object if inPlace left as true
 * @param obj
 * @returns
 */
export function filterObjUndefined <T extends Record<string, unknown>>(obj: T, inplace?: true): void
export function filterObjUndefined <T extends Record<string, unknown>>(obj: T, inplace?: false): T
export function filterObjUndefined <T extends Record<string, unknown>>(obj: T[], inplace?: true): void
export function filterObjUndefined <T extends Record<string, unknown>>(obj: T[], inplace?: false): T[]
// eslint-disable-next-line
export function filterObjUndefined <T extends Record<string, unknown>>(obj: T | T[], inplace = true): void | T | T[] {
  const object = inplace ? obj : cloneDeep(obj);
  const recurse = (innerObj: Record<string, unknown> | unknown[] | unknown) => {
    if (typeof innerObj === 'object' && innerObj !== null) {
      if (Array.isArray(innerObj)) {
        for (let k = 0; k < innerObj.length; k += 1) {
          if (typeof innerObj[k] === 'undefined') delete innerObj[k];
          else recurse(innerObj[k]);
        }
      } else {
        const keys = Object.keys(innerObj);
        keys.forEach((k) => {
          // @ts-ignore
          if (typeof innerObj === 'object' && typeof innerObj[k] === 'undefined') delete innerObj[k];
          // @ts-ignore
          else recurse(innerObj[k]);
        });
      }
    }
  };
  recurse(object);
  if (!inplace) return object;
}

/**
 * Filters an object by another object
 * @param obj
 * @param keyVal
 * @example
 *
 * const obj = {
 *  a: 'blabla',
 *  b: 32,
 *  c: 'Im so sleepy',
 * };
 *
 * const filter = {
 *  a: 'blabla',
 *  b: 32,
 * }
 *
 * filterObjectByKeyValue(obj, filter) => {c: 'Im so sleepy'}
 *
 *
 */
export const filterObjectByKeyValue = <T extends Record<string, string | number>>(obj: T, keyValObj: T): T => {
  const newObj: Record<string, string | number> = cloneDeep(obj);
  const objKeys = Object.keys(obj);
  const filterKeys = Object.keys(keyValObj);
  const lng = objKeys.length;

  for (let i = 0; i < lng; i += 1) {
    const key = objKeys[i];
    if (
      filterKeys.includes(key)
      && newObj[key] === keyValObj[key]
    ) delete newObj[key];
  }

  return newObj as T;
};

export function filterObjectKeys<
 T extends Record<string, unknown>,
 K extends keyof T
 >(
   obj: T,
   match: K[] | ReadonlyArray<K>,
   inplace?: boolean,
): Omit<T, K>
export function filterObjectKeys<
T extends Record<string, unknown>,
K extends keyof T
>(
  obj: T,
  match: (k: K) => boolean,
  inplace?: boolean,
): Partial<T>
/**
 * Removes an array of keys from an object.
 *
 * IMPORTANT: Will remove the keys passed if the filter function returns false.
 * Or will remove the keys passed in an array
 * @param obj
 * @param keysTofilter
 * @param inplace
 * @returns
 */
export function filterObjectKeys<
T extends Record<string, unknown>,
K extends keyof T
>(
  obj: T,
  match: ((k: K) => boolean) | K[] | ReadonlyArray<K>,
  inplace = false,
): Omit<T, K> | Partial<T> {
  const copy = inplace ? obj : cloneDeep(obj);
  if (typeof match === 'function') {
    const keys = Object.keys(obj);
    for (const key of keys) {
      if (!match(key as K)) {
        delete copy[key];
      }
    }
  } else {
    for (const key of match) {
      delete copy[key];
    }
  }
  return inplace ? obj : copy;
}

export const modObjPropsShallow = <T extends Record<string, unknown>>(
  obj: T,
  keysToMod: (keyof T)[] | 'all',
  val: | string | number | Date | boolean | undefined | null,
  inplace = false,
): T => {
  const copy = inplace ? obj : cloneDeep(obj);
  if (keysToMod === 'all') {
    return Object.entries(copy).reduce((ob, [key]) => ({
      ...ob,
      [key]: val,
    }), {} as T);
  }
  return Object.entries(copy).reduce((ob, [key, value]) => {
    if (keysToMod.includes(key)) {
      return {
        ...ob,
        [key]: val,
      };
    }
    return {
      ...ob,
      [key]: value,
    };
  }, {} as T);
};

/**
 * Performs a groupBy operation in an array of objects.
 * @param objArr
 * @param key
 * @example
 *
 * const data = [
 *  { name: 'corn cob', value: 17, group: 'item' },
 *  { name: 'Dirty toilet', value: 6, group: 'item' },
 *  { name: 'snake', value: 2, group: 'animal' },
 *  { name: 'tesla', value: 17, group: 'car' },
 *  { name: 'gurgel', value: 23, group: 'car' },
 * ];
 *
 * groupBy(data, 'group')
 *
 * {
 *   item: [
 *     { name: 'dildo', value: 17, group: 'item' },
 *     { name: 'Dirty toilet', value: 6, group: 'item' }
 *   ],
 *   animal: [ { name: 'snake', value: 2, group: 'animal' } ],
 *   car: [
 *     { name: 'tesla', value: 17, group: 'car' },
 *     { name: 'gurgel', value: 23, group: 'car' }
 *   ]
 * }
 */
export function groupBy<T extends Record<PropertyKey, unknown>, K extends keyof T>(
  objArr: readonly T[],
  property: K | ((d: T) => string | undefined),
): Record<string, T[]> {
  const propGetter = (x: T) => {
    if (typeof property === 'function') {
      return property(x);
    }
    if (x[property]) return String(x[property]);
  };

  return objArr.reduce((memo, x) => {
    const prop = propGetter(x);
    if (!isNullOrUndefined(prop)) {
      if (!memo[prop]) {
        memo[prop] = [];
      }
      memo[prop].push(x);
    }
    return memo;
  }, {} as Record<string, T[]>);
}

type GroupByMulti<T, K extends readonly any[]> =
    K extends readonly [any, ...infer KR] ?
    Record<string, GroupByMulti<T, KR>> : T[];

export const groupByMulti = <
    T extends Record<K[number], {}>,
    K extends readonly (keyof T)[]
>(
    arr: readonly T[],
    keys: readonly [...K],
    propIndex = 0,
  ) => {
  const grouppedObj: any = groupBy(arr, keys[propIndex]);
  Object.keys(grouppedObj).forEach((key) => {
    if (propIndex < keys.length - 1) {
      grouppedObj[key] = groupByMulti<any, any[]>(grouppedObj[key], keys, propIndex + 1);
    }
  });
  return grouppedObj as GroupByMulti<T, K>;
};

/**
 * Performs a merge operation by keys in an array of objects.
 *
 * Useful when used in conjunction with {@link groupByMulti}
 * @param objArr
 * @param rmvDuplicates
 * @example
 *
 * const data = [
 *  { name: 'dildo', value: 17, group: 'item' },
 *  { name: 'Dirty toilet', value: 6, group: 'item' },
 *  { name: 'snake', value: 2, group: 'animal' },
 *  { name: 'tesla', value: 17, group: 'car' },
 *  { name: 'gurgel', value: 23, group: 'car' },
 * ];
 *
 * mergeObjArr(data)
 *
 * {
 *   "name": [
 *     "dildo",
 *     "Dirty toilet",
 *     "snake",
 *     "tesla",
 *     "gurgel"
 *   ],
 *   "value": [
 *     17,
 *     6,
 *     11,
 *     23
 *   ],
 *   "group": [
 *     "item",
 *     "animal",
 *     "car"
 *   ]
 * }
 */
export const mergeObjArr = <T extends Record<string, unknown>>(
  objs: T[],
  rmvDuplicates = true,
): {
  [K in keyof T]: T[K][]
} => {
  const arrayKeys: string[] = [];

  const addArrayKey = (key: string) => {
    if (!arrayKeys.includes(key)) {
      arrayKeys.push(key);
    }
  };

  const unflattenedMerge = [{} as T, ...objs]
    .map((elm, i, arr) => {
      if (i) {
        return Object.entries(elm)
          .forEach((f) => {
            const key = f[0];
            if (arr[0][key] && Array.isArray(arr[0][f[0]])) {
              if (rmvDuplicates) {
                (arr[0] as Record<string, unknown[]>)[key] = Array.from(rmvObjDuplicates([...(arr[0][f[0]] as unknown[]), ...[f[1]].flat()]));
              } else {
                (arr[0] as Record<string, unknown[]>)[key].push(...([f[1]].flat()));
              }

              // @ts-ignore
              if (arr[0][key].length > 1) {
                addArrayKey(key);
              }
            } else {
              (arr[0] as Record<string, unknown[]>)[key] = [f[1]].flat();
            }

            if (
              Array.isArray(elm[key])
            ) {
              addArrayKey(key);
            }
          });
      }
      return elm;
    })[0] as T;

  const entries = Object.entries(unflattenedMerge)
    .map(([key, value]) => {
      if (arrayKeys.includes(key)) {
        return [key, value];
      }
      // @ts-ignore
      return [key, value[0]];
    });

  return Object.fromEntries(entries);
};

type GroupByAndMerge<T extends Record<string, unknown>, U extends keyof T> = {
  [K in keyof T]: K extends U ? T[K] : Exclude<T[K], undefined> extends Array<any> ? T[K]: Exclude<T[K], undefined>[] | T[K];
}[];

/**
 * Performs a groupBy and merge operation by keys in an array of objects.
 *
 * It is a combination of {@link groupByMulti} and {@link mergeObjArr}
 *
 *
 * @param data
 * @param property The property getter
 * @param rmvDuplicates
 * @example
 *
 * const data = [
 *   {
 *     id: '60591791d4d41d0a6817d22b',
 *     value: 'Cor',
 *     subItem: [
 *       {
 *          id: '610d9f71285a7f6c888a4e5a',
 *          value: 'Foda',
 *       },
 *     ],
 *   },
 *   {
 *      id: '611552f970499165d80ff7ec',
 *      value: undefined,
 *   },
 *   {
 *     id: '60591791d4d41d0a6817d236',
 *     value: 'Tamanho',
 *     subItem: [
 *       {
 *          id: '610af5a5588d1e05f829bff1',
 *          value: '34',
 *       },
 *     ],
 *   },
 *   {
 *     id: '60591791d4d41d0a6817d22b',
 *     value: 'Cor',
 *     subItem: [
 *       {
 *          id: '61156cfd70499165d80ffc50',
 *          value: 'ddd',
 *       },
 *     ],
 *   },
 * ];
 *
 * groupByAndMerge(data, 'id')
 *
 * [
 *   {
 *     id: "60591791d4d41d0a6817d22b",
 *     value: "Cor",
 *     subItem: [
 *       {
 *         id: "610d9f71285a7f6c888a4e5a",
 *         value: "Foda"
 *       },
 *       {
 *         id: "61156cfd70499165d80ffc50",
 *         value: "ddd"
 *       }
 *     ]
 *   },
 *   {
 *     id: "611552f970499165d80ff7ec"
 *   },
 *   {
 *     id: "60591791d4d41d0a6817d236",
 *     value: "Tamanho",
 *     subItem: {
 *       id: "610af5a5588d1e05f829bff1",
 *       value: "34"
 *     }
 *   }
 * ]
 *
 *
 */
export const groupByAndMerge = <T extends Record<string, unknown>, U extends keyof T>(
  data: T[],
  property: U,
  rmvDuplicates = true,
): GroupByAndMerge<T, U> => Object
  .values(
    groupBy(
      data,
      property,
    ),
  ).map((v) => mergeObjArr(v as Record<string, unknown>[], rmvDuplicates)) as GroupByAndMerge<T, U>;

/**
 * Parses a JSON if it is a string, otherwise returns the same value.
 */
export const safeJsonParse = <T>(obj: T): ParsedJSON<T> => (typeof obj === 'string' ? JSON.parse(obj) : obj);

/**
 * Checks is a variable is an object
 * @param a
 * @returns
 */
export function isLiteralObject(value: unknown): boolean {
  return value !== null && value !== undefined && Object.is((value as any).constructor, Object);
}

/**
 * Filters all undefined properties of an object.
 *
 * IMPORTANT:
 * Mutates the original object
 * @param obj
 */
export function filterUndefinedObjProperties(obj : Record<any, unknown>): void {
  const recurse = (o: Record<any, unknown>) => {
    Object.keys(o).forEach((key) => {
      const val = o[key];
      if (typeof val === 'object' && val !== null) {
        recurse(val as Record<string, unknown>);
      } else if (val === undefined) {
        delete o[key];
      }
    });
  };
  recurse(obj);
}

type ReindexableObject<K extends string | number | symbol> = Record<string, unknown> & {
  [k in K]: string | number | null | undefined
};

/**
 * Reindexes an object by the value of a given key.
 *
 * IMPORTANT!!
 *
 * If value is undefined or null, it will be removed from the object.
 *
 * @example
 * reindexObjectArrayByValue([
 *   {
 *   _id: 109,
 *   docClass: 'CIA_ABERTA',
 *   docType: 'cad',
 *   fileName: 'cad_cia_aberta.csv',
 *   size: '1.3M',
 *   lastModified: '2022-04-02 06:30',
 *   isSaved: false,
 * },
 * {
 *   _id: 110,
 *   docClass: 'FI',
 *   docType: 'cad',
 *   fileName: 'cad_fi.csv',
 *   size: '28M',
 *   lastModified: '2022-04-02 06:34',
 *   isSaved: false,
 * },
 * ], 'docClass')
 *
 * {
 *   CIA_ABERTA: [
 *     {
 *       _id: 109,
 *       docClass: 'CIA_ABERTA',
 *       docType: 'cad',
 *       fileName: 'cad_cia_aberta.csv',
 *       size: '1.3M',
 *       lastModified: '2022-04-02 06:30',
 *       isSaved: false,
 *     },
 *   ],
 *   FI: [
 *     {
 *       _id: 110,
 *       docClass: 'FI',
 *       docType: 'cad',
 *       fileName: 'cad_fi.csv',
 *       size: '28M',
 *       lastModified: '2022-04-02 06:34',
 *       isSaved: false,
 *     },
 *   ],
 * };
 */
export function reindexObjectArrayByValue<T extends ReindexableObject<K>, K extends keyof T>(obj: T[], key: K): {[key in Exclude<T[K], null | undefined>]: T[]} {
  return obj.reduce((o, v) => {
    const val = v[key];
    if (typeof val === 'string' || typeof val === 'number') {
      return {
        ...o,
        [val]: [
          ...(o[val as keyof typeof o] || []),
          v,
        ],
      };
    }
    if (val === null || typeof val === 'undefined') return o;
    throw new Error('Value must be a string or number');
  }, {} as {[key in Exclude<T[K], null | undefined>]: T[]});
}

/**
 * Picks properties from an object
 * @param obj
 * @param keys
 * @returns
 */
export function pick<O extends object, K extends keyof O>(obj: O, ...keys: K[]): {[key in K]: O[key]} {
  return Object.fromEntries(
    keys
      .filter((key) => key in obj)
      .map((key) => [key, obj[key]]),
  ) as {[key in K]: O[key]};
}

/**
 * Omits keys from an object
 * @param obj
 * @param keys
 * @returns
 */
export function omit<O extends object, K extends keyof O>(obj: O, ...keys: K[]): {[key in Exclude<keyof O, K>]: O[key]} {
  return Object.fromEntries(
    Object.entries(obj)
      .filter(([key]) => !keys.includes(key as K)),
  ) as {[key in Exclude<keyof O, K>]: O[key]};
}

/**
 *  Spreads an object by key and value
 *
 * @example
 *
 * spread([
 *   {
 *     companyCode: '1023',
 *     code: '1.01.04',
 *     desc: 'Relações Interfinanceiras',
 *     value: 1000,
 *     year: 2013,
 *     group: 'A',
 *     type: 'CON',
 *   },
 *   {
 *     companyCode: '1023',
 *     code: '1.01.04',
 *     desc: 'Relações Interfinanceiras',
 *     value: 50000,
 *     year: 2014,
 *     group: 'A',
 *     type: 'CON',
 *   }, {
 *     companyCode: '1023',
 *     code: '1.01.04',
 *     desc: 'Intangível',
 *     value: 63224237000,
 *     year: 2015,
 *     group: 'A',
 *     type: 'CON',
 *   },
 * ], 'year', 'value')
 *
 * //will result
 * {
 *   '2013': 1000,
 *   '2014': 50000,
 *   '2015': 63224237000,
 *   companyCode: '1023',
 *   code: '1.01.04',
 *   desc: 'Relações Interfinanceiras',
 *   group: 'A',
 *   type: 'CON'
 * }
*/
export function spread<T extends Record<string, unknown>, SB extends keyof T, SO extends keyof T>(
  a: T[],
  spreadBy: SB,
  spreadOn: SO,
  fillObj?: object,
): {
  [K in Exclude<keyof T, SB | SO>]: T[K]
} & {
  [K: string]: T[SO]
} {
  return a.reduce((spr, val) => {
    if (!isNullOrUndefined(val[spreadBy]) && (val[spreadBy] as any).toString) {
      const key = (val[spreadBy] as any).toString();
      const as = {
        ...(fillObj || {}),
        ...omit(val, spreadOn, spreadBy as keyof T),
        ...spr,
        [key]: val[spreadOn],
      };
      return as;
    }
    return spr;
  }, {} as {
    [K in Exclude<keyof T, SB | SO>]: T[K]
  } & {
    [K: string]: T[SO]
  });
}

/**
 * Returns a random value from an enum
 */
export function randomEnumVal<T extends string, TEnumValue extends string | number>(e: { [key in T]: TEnumValue }): TEnumValue {
  const enumerator = Object.fromEntries(Object.entries(e).filter(([k]) => Number.isNaN(Number(k))));
  const vals = Object.values(enumerator) as TEnumValue[];
  return vals[Math.floor(Math.random() * vals.length)];
}

/**
 * Returns an array of enum Keys
 */
export function enumKeys<T extends string, TEnumValue extends string | number>(e: { [key in T]: TEnumValue }): string[] {
  const enumerator = Object.fromEntries(Object.entries(e).filter(([k]) => Number.isNaN(Number(k))));
  const keys = Object.keys(enumerator);
  return keys;
}

/**
 * Returns an array of enum values
 */
export function enumValues<T extends string, TEnumValue extends string | number>(e: { [key in T]: TEnumValue }): TEnumValue[] {
  const enumerator = Object.fromEntries(Object.entries(e).filter(([k]) => Number.isNaN(Number(k))));
  const vals = Object.values(enumerator) as TEnumValue[];
  return vals;
}

/**
 * Returns the entries of an enum
 */
export function enumEntries<T extends string, TEnumValue extends string | number>(e: { [key in T]: TEnumValue }): Entries<{ [key in T]: TEnumValue }> {
  const enumerator = Object.fromEntries(Object.entries(e).filter(([k]) => Number.isNaN(Number(k))));
  const vals = Object.entries(enumerator) as Entries<{ [key in T]: TEnumValue }>;
  return vals;
}

/**
 * Gets a random key from an object
 * @param obj
 */
export function getRandomObjKey<O extends object>(obj: O): keyof O {
  const keys = Object.keys(obj) as (keyof O)[];
  return keys[Math.floor(Math.random() * keys.length)];
}

/**
 * Gets a random value from an object
 * @param obj
 */
export function getRandomObjValue<O extends object>(obj: O): O[keyof O] {
  const values = Object.values(obj) as (O[keyof O])[];
  return values[Math.floor(Math.random() * values.length)];
}

/**
 * Gets a random entry from an object
 * @param obj
 */
export function getRandomObjEntry<O extends object>(obj: O): [keyof O, O[keyof O]] {
  const entries = Object.entries(obj) as ([keyof O, O[keyof O]])[];
  return entries[Math.floor(Math.random() * entries.length)];
}

type UnknownObjectLiteral = {
  [key: string]: unknown
}

/**
 * Check if a value is an Object literal
 * @param value
 * @returns
 */
export const isObjectLiteral = (value: unknown): value is UnknownObjectLiteral => {
  if (typeof value !== 'object') return false;
  return value !== null
    && value !== undefined
    && Object.is(value.constructor, Object);
};

type TObjKey<O extends object, K extends keyof O> =
KeyExists<O, K> extends true
? O[K]
: unknown;

type TObj<O, K extends keyof O> =
O extends object
? {[key in K]: TObjKey<O, key>}
: {[key in K]: unknown} & {[key: string]: unknown}

/**
 * Checks if an object has properties
 * @param potentialObj
 * @returns
 */
export function objHasProp<O, K extends string>(
  potentialObj: O,
  keys: K[],
  // @ts-ignore
): potentialObj is (TObj<O, K>) {
  if (
    typeof potentialObj !== 'object'
     || potentialObj === null
     || potentialObj instanceof Date
     || potentialObj instanceof Array
  ) return false;

  if (keys.every((key) => key in potentialObj)) {
    return true;
  }
  return false;
}

/**
 * Filters an object if the values of the second object are equal.
 *
 * Returns the values of the first object
 * @param obj1
 * @param obj2
 * @returns
 */
export const diffObject = <T extends Record<PropertyKey, unknown>>(
  obj1: T,
  obj2: T,
) => {
  const allKeys = Array.from(new Set([
    ...Object.keys(obj1),
    ...Object.keys(obj2),
  ]));
  return allKeys
    .reduce((dObj, k) => {
      if (isEqual(obj1[k], obj2[k])) {
        return dObj;
      }

      return {
        ...dObj,
        [k]: obj1[k],
      };
    }, {} as Partial<T>);
};

export function objFromKeys<T extends string, V extends (k: T) => any, R = ReturnType<V>>(keys: T[], val: V): {[K in T]: R}
export function objFromKeys<T extends string, V>(keys: T[], val: V): {[K in T]: V}
/**
 * Builds an object from an array of keys
 * @param keys
 * @param val
 */
export function objFromKeys<T extends string, V>(keys: T[], val: V): {[K in T]: V} {
  const v = typeof val === 'function'
    ? (k: string) => val(k)
    : () => val;
  return keys.reduce((obj, k) => ({
    ...obj,
    [k]: v(k),
  }), {} as {[K in T]: V});
}
