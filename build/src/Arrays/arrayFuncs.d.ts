export type ArraySortOrder = 'asc' | 'desc';
/**
 * Deep comparison of two arrays.
 * @param x
 * @param y
 * @returns
 */
export declare const isArrayEqual: (x: any[], y: any[]) => boolean;
export declare const isNumberArray: (arr: Array<unknown>, options?: {
    testLengthPct?: number;
    nullable?: boolean;
}) => arr is number[];
export declare const findIndexes: <T>(arr: T[], cb: (value: T, i: number) => boolean) => number[];
/**
 * Calls a callback function
 * whenever the chunks reach the given size
 * @param iter
 * @param cb
 * @param size
 * @param unbox If the iterator yields array, you can pass `true` to flatten
 */
export declare function breakChunks<T>(iter: AsyncGenerator<T[], void, any>, cb: (T: T[]) => Promise<any>, size: number, unbox: true): Promise<void>;
export declare function breakChunks<T>(iter: AsyncGenerator<T[], void, any>, cb: (T: T[]) => Promise<any>, size: number, unbox: false): Promise<void>;
export declare function breakChunks<T>(iter: AsyncGenerator<T, void, any>, cb: (T: T[]) => Promise<any>, size: number, unbox?: undefined): Promise<void>;
export declare function breakChunks<T>(iter: AsyncGenerator<T | T[], void, any>, cb: (T: T[] | T[][number]) => Promise<any>, size: number, unbox?: boolean): Promise<void>;
/**
 * Removes a given value from an array
 *
 * IMPORTANT: This function removes values inPlace!!
 * It modifies the original array!
 * @param arr any array
 * @param value a value to be removed
 * @returns {Boolean} indication that the value was sucessfully removed
 */
export declare const removeValueFromArray: (arr: any[], value: any) => boolean;
/**
 * Removes duplicates of an array of objects by property name
 * @param arr
 * @param prop
 * @returns
 */
export declare const removeDuplicatesFromObjArrayByPropName: <T extends Record<string, unknown>[]>(arr: T, prop: keyof T[number]) => T;
/**
 * Removes duplicates of an array of objects by property name (Multi)
 * @param arr
 * @param prop
 * @returns
 */
export declare const removeDuplicatesFromObjArrayByPropNames: <T extends Record<string, unknown>[]>(arr: T, props: (keyof T[number])[]) => T;
/**
 * Return all data types contained in an array
 * @param arr
 */
export declare function getTypesInArray(arr: any[], unique?: boolean): string[];
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
export declare function countOccurences<T>(arr: T[]): {
    search: T;
    innerCount: number;
}[];
/**
 * Counts occurences of a single element in an array.
 * @param arr
 * @param elm the element to be counted
 * @returns
 */
export declare function countOccurence(arr: any[], elm: unknown): number;
/**
 * Filter an array of objects by a condition that returns a boolean
 * @param obj
 * @param condition
 * @returns
 */
export declare const filterObjArr: <T>(obj: T[], condition: (o: T) => boolean) => T[];
/**
 * Returns the difference between two arrays.
 * @param arr1
 * @param arr2
 * @returns the elements that are in 'arr1' but not in 'arr2'
 */
export declare const arrayDiff: <T>(arr1: T[], arr2: T[]) => T[];
/**
 * Returns the outer join of two arrays.
 * @param arr1
 * @param arr2
 * @returns the elements that are not in both arrays
 */
export declare const arrayOuterJoin: <T>(arr1: T[], arr2: T[]) => T[];
/**
 * Returns the inner join of two arrays.
 * @param arr1
 * @param arr2
 * @returns the elements that are in both arrays
 */
export declare const arrayInnerJoin: <T>(arr1: T[], arr2: T[]) => T[];
/**
 * Aggrupates arrays in a given size
 * @param {Array} array array to be gruped / chunked
 * @param {Number} size size of the chunks
 * @returns
 */
export declare function chunk<T>(array: T[], size: number): T[][];
/**
 * Aggrupates arrays in a given size
 * @param {Array} array array to be gruped / chunked
 * @param {Number} size size of the chunks
 * @returns
 */
export declare function genChunk<T>(array: T[], size: number): Generator<T[], void, unknown>;
/**
 * Searches an array for a regex match.
 * @param arr
 * @param pattern
 * @returns {Boolean}
 */
export declare const matchArrayRegex: (arr: string[], pattern: RegExp) => boolean;
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
export declare const sortObjArray: <T>(arr: T[], key: string, order?: ArraySortOrder) => T[];
export declare const sortNumArray: (arr: number[], order?: ArraySortOrder) => number[];
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
export declare const sortObjArrayIgCase: <T extends Record<string, unknown>>(arr: T[], key: string, order?: ArraySortOrder) => T[];
export declare const sortStrArr: (arr: string[], order?: ArraySortOrder) => string[];
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
export declare const sortObjArrayByArrayAndKey: <T, K extends keyof T>(array: T[], order: T[K][], key: K) => T[];
/**
 * Generates an array of unique numbers
 * @param min
 * @param max
 * @param size
 */
export declare function genRndNumUniqArray(min: number, max: number, size: number): number[];
/**
 * Searches a substring array for a given string
 * @param str
 * @param substrArr
 * @returns
 */
export declare const matchStringInArrayofSubstr: (str: string, substrArr: string[]) => boolean;
/**
 * Sums a 2D array by columns
 * @param arr
 * @returns
 */
export declare const sum2DArrayCols: (arr: number[][]) => number[];
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
export declare const filterArrOfObjsByKeyValuePair: <T extends Record<any, any>>(arr: T[], filterPairs: [any, any][]) => T[];
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
export declare const chunkArrOfObjsByKeyAndValue: <T extends Record<any, any>>(arr: T[], key: keyof T) => [{
    [key: string]: T[];
}, (keyof T)[]];
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
export declare const replaceInObjArrayByKeyValue: <T extends Record<any, any>>(arr: T[], replacement: T, keyVal: [keyof T, any]) => T[];
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
export declare const replaceItemsInObjArray: <T>(arr: T[], replacements: T[], keyToMatch: keyof T, insertIfNotFound?: boolean) => T[];
/**
 * Checks if an array has any element contained in another array
 * @param arrToFind
 * @param arr
 * @returns
 */
export declare const arrayIncludesAnotherArray: <T extends unknown[]>(arrToFind: T, arr: T) => boolean;
/**
 * Checks if an array has every element contained in another array
 * @param arrToFind
 * @param arr
 * @returns
 */
export declare const arrayIncludesAnotherArrayAll: <T extends unknown[]>(arrToFind: T, arr: T) => boolean;
type filterObjectByKeysOverload = {
    <T>(obj: T, keys: string | string[], inplace: true): undefined;
    <T>(obj: T, keys: string | string[], inplace?: false): Partial<T>;
};
/**
 * Filters an object by a key or an array of keys.
 *
 * inplace = true modifies the original object
 * @param obj
 * @param keys
 */
export declare const filterObjectByKeys: filterObjectByKeysOverload;
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
export declare function removeByIndex<T>(arr: T[], index: number, inPlace?: false): T[];
export declare function removeByIndex<T>(arr: T[], index: number, inPlace: true): void;
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
export declare function pickRandom<T>(arr: T[] | ReadonlyArray<T>, n?: undefined, unique?: boolean): T;
export declare function pickRandom<T>(arr: T[] | ReadonlyArray<T>, n: number, unique?: boolean): T[];
export declare function pickRandom<T>(arr: T[] | ReadonlyArray<T>, n?: number, unique?: boolean): T[] | ReadonlyArray<T> | T;
/**
 * Performs a asynchronous filter concurrently
 * @param arr
 * @param cb
 * @returns
 */
export declare function asyncFilter<T>(arr: T[], cb: (...args: [e: T, i: number]) => Promise<boolean>): Promise<T[]>;
/**
 * Gets the duplicate elements of an object array by key
 *
 * IMPORTANT!
 *
 * Will return the duplicates elements more than once
 */
export declare function getObjDuplicatesByKey<O extends Record<PropertyKey, unknown>>(arr: O[], key: keyof O): O[];
/**
 * Gets the duplicate elements of an object array by key
 *
 * IMPORTANT!
 *
 * If unique is false or undefined will return the duplicated elements more than once.
 * if true, will return only once
 */
export declare function findDuplicates<T extends Exclude<Primitives, symbol> | Date>(arr: T[], unique?: boolean): T[];
export declare const findDuplicateString: (strings: string[]) => boolean;
/**
 * Perform an asynchronous filter sequentially
 * @param arr
 * @param cb
 * @returns
 */
export declare function asyncFilterSeq<T>(arr: T[], cb: (...args: [e: T, i: number]) => Promise<boolean>): Promise<T[]>;
/**
 * Shuffles an array
 * @param array
 */
export declare function shuffleArray<T>(array: T[]): T[];
/**
 * Returns a range of numbers
 * @param from
 * @param to
 * @param step
 * @returns
 */
export declare function range(from: number, to: number, step?: number): number[];
/**
 * Generates an array of N numbers in which all elements summed equals to 1
 * @param n
 */
export declare function nArraySum1(n: number): number[];
/**
 * Filters an array based on another array.
 * Puts elements not found in the sorting array at the end
 */
export declare const sortArrayWithSortingArray: <T extends Primitives>(arr: T[], sortingArray: T[]) => T[];
/**
 * Transforms an array into a matrix (2D array) with dimensions M(arr.length / cols, cols)
 * @param arr
 * @param cols
 * @returns
 */
export declare function arrayToMatrix<T>(arr: Array<T>, cols: number): T[][];
/**
 * Performs the cartesian product of multiple arrays
 * @param a
 * @param more
 * @returns
 */
export declare function cartesianProduct<T>(a: T[], ...more: T[][]): Generator<T[][], void, any>;
/**
 * Calculates the average of an array of numbers
 * @param arr
 * @returns
 */
export declare function arrayAverage(...arr: number[]): number;
export declare const arraySum: (...arr: number[]) => number;
export declare const arrayTo2D: <T>(arr: T[], size: number) => T[][];
/**
 * Generator that yields an array chunked by the size param
 * @param arr
 * @param size
 */
export declare function windowArray<T>(arr: Array<T>, size: number): Generator<Array<T>>;
/**
 * Maps through chunks of an array of a given sizencu
 */
export declare function mapChunk<T, const S extends number, R>(arr: T[], callback: (t: T[], i: number) => R, size: S): R[];
export {};
