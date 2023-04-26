/**
 * JSON utility functions
 * @module JSONUtils
 * @category JSON
 */
import { ArraySortOrder } from '../Arrays';
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
export declare const objectPaths: (obj: {
    [key: string]: any;
}) => string[];
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
export declare const objectPathsWithValues: (obj: {
    [key: string]: any;
}) => {
    [key: string]: any;
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
declare type ValByProp<O extends Record<string, unknown>, K extends keyof O> = KeyExists<O, K> extends true ? O[K] : undefined;
export declare function valueByProperty<V, T extends Record<string, V>, K extends keyof T>(data: T | T[], keyNameOrPattern: K): ValByProp<T, K>;
export declare function valueByProperty<V, T extends Record<string, V>>(data: T | T[], keyNameOrPattern: RegExp): V | undefined;
export declare function valueByProperty<V, T extends Record<string, V>>(data: T | T[], keyNameOrPattern: string): V | undefined;
/**
 * Performs a map of the 'valueByProperty' and
 * returns all matching values of keys
 * @param data
 * @param keyNameOrPattern
 * @returns
 */
export declare function valuesByProperty<V, T extends Record<string, V>, K extends keyof T>(data: T[], keyNameOrPattern: K): ValByProp<T, K>[];
export declare function valuesByProperty<V, T extends Record<string, V>>(data: T[], keyNameOrPattern: RegExp): V[];
export declare function valuesByProperty<V, T extends Record<string, V>>(data: T | T[], keyNameOrPattern: string): V | undefined;
/**
 * Returns an array of object keys sorted
 *
 * IMPORTANT:
 * Sorts in ascending order by default
 * @param obj
 * @param order
 * @returns
 */
export declare const sortObjKeys: <T extends Record<string | number, unknown>, K extends keyof T>(obj: T, order?: ArraySortOrder) => K[];
interface IGetPathByKey {
    key: string;
    obj: Record<string, any>;
    pathToKey?: string;
}
/**
 * Get the JSON path for a given key.
 * @param options
 */
export declare function getObjPathByKey(options: IGetPathByKey): string[];
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
export declare function omitDeep<T extends Record<string, unknown>>(input: T, excludes: Array<number | string>): Partial<T>;
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
export declare function modKeyDeep<T extends Record<string, unknown>>(input: T, pattern: RegExp, replacement?: string): T;
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
export declare function matchKeyDeep<T extends Record<string, unknown>>(input: T, pattern: RegExp): Partial<T>;
/**
 * Performs a '.map' of the function 'matchKeysDeep'
 * and returns an array of key matches
 * @param input
 * @param pattern
 * @returns
 */
export declare function matchKeyDeepInArray<T extends Record<string, unknown>>(input: T[], pattern: RegExp): Partial<T>[];
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
export declare function matchKeyShallow<T extends Record<string, unknown>>(input: T, pattern: RegExp): T;
/**
 * Gets the value of a given nested key. (first match)
 * @param object
 * @param key
 * @returns
 */
export declare function getValueByKey(object: Record<string, any>, key: string): any | null;
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
export declare function getKeyByValue<V, T extends Record<string | number, V>, K extends keyof T>(object: T, value: V): ToString<K> | undefined;
/**
 * Removes duplicates of an array of objects
 * @param objArr
 */
export declare function rmvObjDuplicates<T>(objArr: T[]): T[];
/**
 * Removes duplicates of an array of objects by a given UNIQUE key
 * @param objArr
 */
export declare function rmvObjDuplicatesByKey<T extends Record<string, any>[]>(objArr: T, key: string): T;
/**
 * Returns an array of all object paths
 * @param obj
 * @returns
 *
 * NOTE: Returns arrays in bracket notation
 */
export declare function getObjPaths<T extends Record<string, any>>(obj: T): string[];
export declare const safeStringify: (obj: Record<string, unknown>, indent?: number) => string;
/**
 * Filters undefined properties.
 *
 * IMPORTANT!
 *
 * Mutates the original object if inPlace left as true
 * @param obj
 * @returns
 */
export declare function filterObjUndefined<T extends Record<string, unknown>>(obj: T, inplace?: true): void;
export declare function filterObjUndefined<T extends Record<string, unknown>>(obj: T, inplace?: false): T;
export declare function filterObjUndefined<T extends Record<string, unknown>>(obj: T[], inplace?: true): void;
export declare function filterObjUndefined<T extends Record<string, unknown>>(obj: T[], inplace?: false): T[];
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
export declare const filterObjectByKeyValue: <T extends Record<string, string | number>>(obj: T, keyValObj: T) => T;
export declare function filterObjectKeys<T extends Record<string, unknown>, K extends keyof T>(obj: T, match: K[] | ReadonlyArray<K>, inplace?: boolean): Omit<T, K>;
export declare function filterObjectKeys<T extends Record<string, unknown>, K extends keyof T>(obj: T, match: (k: K) => boolean, inplace?: boolean): Partial<T>;
export declare const modObjPropsShallow: <T extends Record<string, unknown>>(obj: T, keysToMod: (keyof T)[] | "all", val: string | number | Date | boolean | undefined | null, inplace?: boolean) => T;
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
export declare function groupBy<T extends Record<PropertyKey, unknown>, K extends keyof T>(objArr: readonly T[], property: K | ((d: T) => string | undefined)): Record<string, T[]>;
declare type GroupByMulti<T, K extends readonly any[]> = K extends readonly [any, ...infer KR] ? Record<string, GroupByMulti<T, KR>> : T[];
export declare const groupByMulti: <T extends Record<K[number], {}>, K extends readonly (keyof T)[]>(arr: readonly T[], keys: readonly [...K], propIndex?: number) => GroupByMulti<T, K>;
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
export declare const mergeObjArr: <T extends Record<string, unknown>>(objs: T[], rmvDuplicates?: boolean) => { [K in keyof T]: T[K][]; };
declare type GroupByAndMerge<T extends Record<string, unknown>, U extends keyof T> = {
    [K in keyof T]: K extends U ? T[K] : Exclude<T[K], undefined> extends Array<any> ? T[K] : Exclude<T[K], undefined>[] | T[K];
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
export declare const groupByAndMerge: <T extends Record<string, unknown>, U extends keyof T>(data: T[], property: U, rmvDuplicates?: boolean) => GroupByAndMerge<T, U>;
/**
 * Parses a JSON if it is a string, otherwise returns the same value.
 */
export declare const safeJsonParse: <T>(obj: T) => ParsedJSON<T>;
/**
 * Checks is a variable is an object
 * @param a
 * @returns
 */
export declare function isLiteralObject(value: unknown): boolean;
/**
 * Filters all undefined properties of an object.
 *
 * IMPORTANT:
 * Mutates the original object
 * @param obj
 */
export declare function filterUndefinedObjProperties(obj: Record<any, unknown>): void;
declare type ReindexableObject<K extends string | number | symbol> = Record<string, unknown> & {
    [k in K]: string | number | null | undefined;
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
export declare function reindexObjectArrayByValue<T extends ReindexableObject<K>, K extends keyof T>(obj: T[], key: K): {
    [key in Exclude<T[K], null | undefined>]: T[];
};
/**
 * Picks properties from an object
 * @param obj
 * @param keys
 * @returns
 */
export declare function pick<O extends object, K extends keyof O>(obj: O, ...keys: K[]): {
    [key in K]: O[key];
};
/**
 * Omits keys from an object
 * @param obj
 * @param keys
 * @returns
 */
export declare function omit<O extends object, K extends keyof O>(obj: O, ...keys: K[]): {
    [key in Exclude<keyof O, K>]: O[key];
};
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
export declare function spread<T extends Record<string, unknown>, SB extends keyof T, SO extends keyof T>(a: T[], spreadBy: SB, spreadOn: SO, fillObj?: object): {
    [K in Exclude<keyof T, SB | SO>]: T[K];
} & {
    [K: string]: T[SO];
};
/**
 * Returns a random value from an enum
 */
export declare function randomEnumVal<T extends string, TEnumValue extends string | number>(e: {
    [key in T]: TEnumValue;
}): TEnumValue;
/**
 * Returns an array of enum Keys
 */
export declare function enumKeys<T extends string, TEnumValue extends string | number>(e: {
    [key in T]: TEnumValue;
}): string[];
/**
 * Returns an array of enum values
 */
export declare function enumValues<T extends string, TEnumValue extends string | number>(e: {
    [key in T]: TEnumValue;
}): TEnumValue[];
/**
 * Returns the entries of an enum
 */
export declare function enumEntries<T extends string, TEnumValue extends string | number>(e: {
    [key in T]: TEnumValue;
}): Entries<{
    [key in T]: TEnumValue;
}>;
/**
 * Gets a random key from an object
 * @param obj
 */
export declare function getRandomObjKey<O extends object>(obj: O): keyof O;
/**
 * Gets a random value from an object
 * @param obj
 */
export declare function getRandomObjValue<O extends object>(obj: O): O[keyof O];
/**
 * Gets a random entry from an object
 * @param obj
 */
export declare function getRandomObjEntry<O extends object>(obj: O): [keyof O, O[keyof O]];
declare type UnknownObjectLiteral = {
    [key: string]: unknown;
};
/**
 * Check if a value is an Object literal
 * @param value
 * @returns
 */
export declare const isObjectLiteral: (value: unknown) => value is UnknownObjectLiteral;
declare type TObjKey<O extends object, K extends keyof O> = KeyExists<O, K> extends true ? O[K] : unknown;
declare type TObj<O, K extends keyof O> = O extends object ? {
    [key in K]: TObjKey<O, key>;
} : {
    [key in K]: unknown;
} & {
    [key: string]: unknown;
};
/**
 * Checks if an object has properties
 * @param potentialObj
 * @returns
 */
export declare function objHasProp<O, K extends string>(potentialObj: O, keys: K[]): potentialObj is (TObj<O, K>);
/**
 * Filters an object if the values of the second object are equal.
 *
 * Returns the values of the first object
 * @param obj1
 * @param obj2
 * @returns
 */
export declare const diffObject: <T extends Record<PropertyKey, unknown>>(obj1: T, obj2: T) => Partial<T>;
export declare function objFromKeys<T extends string, V extends (k: T) => any, R = ReturnType<V>>(keys: T[], val: V): {
    [K in T]: R;
};
export declare function objFromKeys<T extends string, V>(keys: T[], val: V): {
    [K in T]: V;
};
export {};
