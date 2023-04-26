"use strict";
/* eslint-disable @typescript-eslint/ban-types */
/**
 * JSON utility functions
 * @module JSONUtils
 * @category JSON
 */
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.objFromKeys = exports.diffObject = exports.objHasProp = exports.isObjectLiteral = exports.getRandomObjEntry = exports.getRandomObjValue = exports.getRandomObjKey = exports.enumEntries = exports.enumValues = exports.enumKeys = exports.randomEnumVal = exports.spread = exports.omit = exports.pick = exports.reindexObjectArrayByValue = exports.filterUndefinedObjProperties = exports.isLiteralObject = exports.safeJsonParse = exports.groupByAndMerge = exports.mergeObjArr = exports.groupByMulti = exports.groupBy = exports.modObjPropsShallow = exports.filterObjectKeys = exports.filterObjectByKeyValue = exports.filterObjUndefined = exports.safeStringify = exports.getObjPaths = exports.rmvObjDuplicatesByKey = exports.rmvObjDuplicates = exports.getKeyByValue = exports.getValueByKey = exports.matchKeyShallow = exports.matchKeyDeepInArray = exports.matchKeyDeep = exports.modKeyDeep = exports.omitDeep = exports.getObjPathByKey = exports.sortObjKeys = exports.valuesByProperty = exports.valueByProperty = exports.objectPathsWithValues = exports.objectPaths = void 0;
/* eslint-disable no-nested-ternary */
/* eslint-disable no-restricted-syntax */
const lodash_1 = __importStar(require("lodash"));
const Arrays_1 = require("../Arrays");
const miscFuncs_1 = require("../Misc/miscFuncs");
/**
 * Recursively finds all possible paths in an object
 * @param obj
 * @param path
 * @returns
 */
function rKeys(obj, path = '') {
    if (!obj || typeof obj !== 'object')
        return path;
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
const objectPaths = (obj) => rKeys(obj).toString().split(',');
exports.objectPaths = objectPaths;
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
const objectPathsWithValues = (obj) => {
    const paths = (0, exports.objectPaths)(obj);
    const pathsWithVals = {};
    paths.forEach((p) => {
        pathsWithVals[p] = lodash_1.default.get(obj, p);
    });
    return pathsWithVals;
};
exports.objectPathsWithValues = objectPathsWithValues;
// eslint-disable-next-line require-jsdoc
function valueByProperty(data, keyNameOrPattern) {
    // eslint-disable-next-line no-restricted-syntax
    for (const key in data) {
        if (Object.prototype.hasOwnProperty.call(data, key)) {
            const entry = data[key];
            if (typeof keyNameOrPattern === 'string' && key === keyNameOrPattern) {
                return entry;
            }
            if (keyNameOrPattern instanceof RegExp && keyNameOrPattern.test(key)) {
                return entry;
            }
            if (typeof entry === 'object') {
                // @ts-ignore
                const found = valueByProperty(entry, keyNameOrPattern);
                if (found) {
                    return found;
                }
            }
        }
    }
    return undefined;
}
exports.valueByProperty = valueByProperty;
// eslint-disable-next-line require-jsdoc
function valuesByProperty(data, keyNameOrPattern) {
    const found = data.map((entry) => valueByProperty(entry, keyNameOrPattern));
    return found.filter((v) => typeof v !== 'undefined');
}
exports.valuesByProperty = valuesByProperty;
/**
 * Returns an array of object keys sorted
 *
 * IMPORTANT:
 * Sorts in ascending order by default
 * @param obj
 * @param order
 * @returns
 */
const sortObjKeys = (obj, order = 'asc') => {
    const keys = Object.keys(obj);
    let isNum = true;
    for (const key of keys) {
        if (Number.isNaN(Number(key))) {
            isNum = false;
            break;
        }
    }
    if (isNum) {
        return (0, Arrays_1.sortNumArray)(keys.map(Number), order);
    }
    return (0, Arrays_1.sortStrArr)(keys, order);
};
exports.sortObjKeys = sortObjKeys;
/**
 * Get the JSON path for a given key.
 * @param options
 */
function getObjPathByKey(options) {
    const results = [];
    // eslint-disable-next-line require-jsdoc
    function findKey({ key, obj, pathToKey, }) {
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
exports.getObjPathByKey = getObjPathByKey;
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
function omitDeep(input, excludes) {
    return Object.entries(input).reduce((nextInput, [key, value]) => {
        const shouldExclude = excludes.includes(key);
        if (shouldExclude)
            return nextInput;
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
        }
        if (typeof value === 'object') {
            // @ts-ignore
            nextInput[key] = omitDeep(value, excludes);
            return nextInput;
        }
        // @ts-ignore
        nextInput[key] = value;
        return nextInput;
    }, {});
}
exports.omitDeep = omitDeep;
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
function modKeyDeep(input, pattern, replacement = '') {
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
    }, {});
}
exports.modKeyDeep = modKeyDeep;
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
function matchKeyDeep(input, pattern) {
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
                if (nextValue.length === 0)
                    return nextInput;
            }
            // @ts-ignore
            nextInput[key] = nextValue;
            return nextInput;
        }
        if (typeof value === 'object' && value !== null) {
            const recurse = matchKeyDeep(value, pattern);
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
    }, {});
}
exports.matchKeyDeep = matchKeyDeep;
/**
 * Performs a '.map' of the function 'matchKeysDeep'
 * and returns an array of key matches
 * @param input
 * @param pattern
 * @returns
 */
function matchKeyDeepInArray(input, pattern) {
    return input.map((item) => matchKeyDeep(item, pattern));
}
exports.matchKeyDeepInArray = matchKeyDeepInArray;
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
function matchKeyShallow(input, pattern) {
    return Object.entries(input).reduce((obj, [key, value]) => {
        const isMatch = pattern.test(key);
        if (isMatch) {
            return { ...obj, [key]: value };
        }
        return obj;
    }, {});
}
exports.matchKeyShallow = matchKeyShallow;
/**
 * Gets the value of a given nested key. (first match)
 * @param object
 * @param key
 * @returns
 */
function getValueByKey(object, key) {
    if (Object.keys(object).includes(key))
        return object[key];
    for (let i = 0; i < Object.keys(object).length; i += 1) {
        if (typeof object[Object.keys(object)[i]] === 'object' && object[Object.keys(object)[i]] !== null) {
            const o = getValueByKey(object[Object.keys(object)[i]], key);
            if (o != null)
                return o;
        }
    }
    return null;
}
exports.getValueByKey = getValueByKey;
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
function getKeyByValue(object, value) {
    return Object.keys(object).find((key) => object[key] === value);
}
exports.getKeyByValue = getKeyByValue;
/**
 * Removes duplicates of an array of objects
 * @param objArr
 */
function rmvObjDuplicates(objArr) {
    return lodash_1.default.uniqWith(objArr, lodash_1.default.isEqual);
}
exports.rmvObjDuplicates = rmvObjDuplicates;
/**
 * Removes duplicates of an array of objects by a given UNIQUE key
 * @param objArr
 */
function rmvObjDuplicatesByKey(objArr, key) {
    return lodash_1.default.uniqBy(objArr, key);
}
exports.rmvObjDuplicatesByKey = rmvObjDuplicatesByKey;
/**
 * Returns an array of all object paths
 * @param obj
 * @returns
 *
 * NOTE: Returns arrays in bracket notation
 */
function getObjPaths(obj) {
    const recurse = (innerObj, prefix, acc) => {
        if (prefix !== '')
            acc.push(prefix);
        if (typeof innerObj === 'object' && innerObj !== null) {
            if (Array.isArray(innerObj)) {
                for (let k = 0; k < innerObj.length; k += 1) {
                    recurse(innerObj[k], `${prefix}[${k}]`, acc);
                }
            }
            else {
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
exports.getObjPaths = getObjPaths;
const safeStringify = (obj, indent = 2) => {
    let cache = [];
    const retVal = JSON.stringify(obj, (key, value) => (typeof value === 'object' && value !== null
        ? cache?.includes(value)
            ? undefined // Duplicate reference found, discard key
            : cache?.push(value) && value // Store value in our collection
        : value), indent);
    cache = null;
    return retVal;
};
exports.safeStringify = safeStringify;
// eslint-disable-next-line
function filterObjUndefined(obj, inplace = true) {
    const object = inplace ? obj : (0, lodash_1.cloneDeep)(obj);
    const recurse = (innerObj) => {
        if (typeof innerObj === 'object' && innerObj !== null) {
            if (Array.isArray(innerObj)) {
                for (let k = 0; k < innerObj.length; k += 1) {
                    if (typeof innerObj[k] === 'undefined')
                        delete innerObj[k];
                    else
                        recurse(innerObj[k]);
                }
            }
            else {
                const keys = Object.keys(innerObj);
                keys.forEach((k) => {
                    // @ts-ignore
                    if (typeof innerObj === 'object' && typeof innerObj[k] === 'undefined')
                        delete innerObj[k];
                    // @ts-ignore
                    else
                        recurse(innerObj[k]);
                });
            }
        }
    };
    recurse(object);
    if (!inplace)
        return object;
}
exports.filterObjUndefined = filterObjUndefined;
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
const filterObjectByKeyValue = (obj, keyValObj) => {
    const newObj = (0, lodash_1.cloneDeep)(obj);
    const objKeys = Object.keys(obj);
    const filterKeys = Object.keys(keyValObj);
    const lng = objKeys.length;
    for (let i = 0; i < lng; i += 1) {
        const key = objKeys[i];
        if (filterKeys.includes(key)
            && newObj[key] === keyValObj[key])
            delete newObj[key];
    }
    return newObj;
};
exports.filterObjectByKeyValue = filterObjectByKeyValue;
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
function filterObjectKeys(obj, match, inplace = false) {
    const copy = inplace ? obj : (0, lodash_1.cloneDeep)(obj);
    if (typeof match === 'function') {
        const keys = Object.keys(obj);
        for (const key of keys) {
            if (!match(key)) {
                delete copy[key];
            }
        }
    }
    else {
        for (const key of match) {
            delete copy[key];
        }
    }
    return inplace ? obj : copy;
}
exports.filterObjectKeys = filterObjectKeys;
const modObjPropsShallow = (obj, keysToMod, val, inplace = false) => {
    const copy = inplace ? obj : (0, lodash_1.cloneDeep)(obj);
    if (keysToMod === 'all') {
        return Object.entries(copy).reduce((ob, [key]) => ({
            ...ob,
            [key]: val,
        }), {});
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
    }, {});
};
exports.modObjPropsShallow = modObjPropsShallow;
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
function groupBy(objArr, property) {
    const propGetter = (x) => {
        if (typeof property === 'function') {
            return property(x);
        }
        if (x[property])
            return String(x[property]);
    };
    return objArr.reduce((memo, x) => {
        const prop = propGetter(x);
        if (!(0, miscFuncs_1.isNullOrUndefined)(prop)) {
            if (!memo[prop]) {
                memo[prop] = [];
            }
            memo[prop].push(x);
        }
        return memo;
    }, {});
}
exports.groupBy = groupBy;
const groupByMulti = (arr, keys, propIndex = 0) => {
    const grouppedObj = groupBy(arr, keys[propIndex]);
    Object.keys(grouppedObj).forEach((key) => {
        if (propIndex < keys.length - 1) {
            grouppedObj[key] = (0, exports.groupByMulti)(grouppedObj[key], keys, propIndex + 1);
        }
    });
    return grouppedObj;
};
exports.groupByMulti = groupByMulti;
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
const mergeObjArr = (objs, rmvDuplicates = true) => {
    const arrayKeys = [];
    const addArrayKey = (key) => {
        if (!arrayKeys.includes(key)) {
            arrayKeys.push(key);
        }
    };
    const unflattenedMerge = [{}, ...objs]
        .map((elm, i, arr) => {
        if (i) {
            return Object.entries(elm)
                .forEach((f) => {
                const key = f[0];
                if (arr[0][key] && Array.isArray(arr[0][f[0]])) {
                    if (rmvDuplicates) {
                        arr[0][key] = Array.from(rmvObjDuplicates([...arr[0][f[0]], ...[f[1]].flat()]));
                    }
                    else {
                        arr[0][key].push(...([f[1]].flat()));
                    }
                    // @ts-ignore
                    if (arr[0][key].length > 1) {
                        addArrayKey(key);
                    }
                }
                else {
                    arr[0][key] = [f[1]].flat();
                }
                if (Array.isArray(elm[key])) {
                    addArrayKey(key);
                }
            });
        }
        return elm;
    })[0];
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
exports.mergeObjArr = mergeObjArr;
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
const groupByAndMerge = (data, property, rmvDuplicates = true) => Object
    .values(groupBy(data, property)).map((v) => (0, exports.mergeObjArr)(v, rmvDuplicates));
exports.groupByAndMerge = groupByAndMerge;
/**
 * Parses a JSON if it is a string, otherwise returns the same value.
 */
const safeJsonParse = (obj) => (typeof obj === 'string' ? JSON.parse(obj) : obj);
exports.safeJsonParse = safeJsonParse;
/**
 * Checks is a variable is an object
 * @param a
 * @returns
 */
function isLiteralObject(value) {
    return value !== null && value !== undefined && Object.is(value.constructor, Object);
}
exports.isLiteralObject = isLiteralObject;
/**
 * Filters all undefined properties of an object.
 *
 * IMPORTANT:
 * Mutates the original object
 * @param obj
 */
function filterUndefinedObjProperties(obj) {
    const recurse = (o) => {
        Object.keys(o).forEach((key) => {
            const val = o[key];
            if (typeof val === 'object' && val !== null) {
                recurse(val);
            }
            else if (val === undefined) {
                delete o[key];
            }
        });
    };
    recurse(obj);
}
exports.filterUndefinedObjProperties = filterUndefinedObjProperties;
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
function reindexObjectArrayByValue(obj, key) {
    return obj.reduce((o, v) => {
        const val = v[key];
        if (typeof val === 'string' || typeof val === 'number') {
            return {
                ...o,
                [val]: [
                    ...(o[val] || []),
                    v,
                ],
            };
        }
        if (val === null || typeof val === 'undefined')
            return o;
        throw new Error('Value must be a string or number');
    }, {});
}
exports.reindexObjectArrayByValue = reindexObjectArrayByValue;
/**
 * Picks properties from an object
 * @param obj
 * @param keys
 * @returns
 */
function pick(obj, ...keys) {
    return Object.fromEntries(keys
        .filter((key) => key in obj)
        .map((key) => [key, obj[key]]));
}
exports.pick = pick;
/**
 * Omits keys from an object
 * @param obj
 * @param keys
 * @returns
 */
function omit(obj, ...keys) {
    return Object.fromEntries(Object.entries(obj)
        .filter(([key]) => !keys.includes(key)));
}
exports.omit = omit;
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
function spread(a, spreadBy, spreadOn, fillObj) {
    return a.reduce((spr, val) => {
        if (!(0, miscFuncs_1.isNullOrUndefined)(val[spreadBy]) && val[spreadBy].toString) {
            const key = val[spreadBy].toString();
            const as = {
                ...(fillObj || {}),
                ...omit(val, spreadOn, spreadBy),
                ...spr,
                [key]: val[spreadOn],
            };
            return as;
        }
        return spr;
    }, {});
}
exports.spread = spread;
/**
 * Returns a random value from an enum
 */
function randomEnumVal(e) {
    const enumerator = Object.fromEntries(Object.entries(e).filter(([k]) => Number.isNaN(Number(k))));
    const vals = Object.values(enumerator);
    return vals[Math.floor(Math.random() * vals.length)];
}
exports.randomEnumVal = randomEnumVal;
/**
 * Returns an array of enum Keys
 */
function enumKeys(e) {
    const enumerator = Object.fromEntries(Object.entries(e).filter(([k]) => Number.isNaN(Number(k))));
    const keys = Object.keys(enumerator);
    return keys;
}
exports.enumKeys = enumKeys;
/**
 * Returns an array of enum values
 */
function enumValues(e) {
    const enumerator = Object.fromEntries(Object.entries(e).filter(([k]) => Number.isNaN(Number(k))));
    const vals = Object.values(enumerator);
    return vals;
}
exports.enumValues = enumValues;
/**
 * Returns the entries of an enum
 */
function enumEntries(e) {
    const enumerator = Object.fromEntries(Object.entries(e).filter(([k]) => Number.isNaN(Number(k))));
    const vals = Object.entries(enumerator);
    return vals;
}
exports.enumEntries = enumEntries;
/**
 * Gets a random key from an object
 * @param obj
 */
function getRandomObjKey(obj) {
    const keys = Object.keys(obj);
    return keys[Math.floor(Math.random() * keys.length)];
}
exports.getRandomObjKey = getRandomObjKey;
/**
 * Gets a random value from an object
 * @param obj
 */
function getRandomObjValue(obj) {
    const values = Object.values(obj);
    return values[Math.floor(Math.random() * values.length)];
}
exports.getRandomObjValue = getRandomObjValue;
/**
 * Gets a random entry from an object
 * @param obj
 */
function getRandomObjEntry(obj) {
    const entries = Object.entries(obj);
    return entries[Math.floor(Math.random() * entries.length)];
}
exports.getRandomObjEntry = getRandomObjEntry;
/**
 * Check if a value is an Object literal
 * @param value
 * @returns
 */
const isObjectLiteral = (value) => {
    if (typeof value !== 'object')
        return false;
    return value !== null
        && value !== undefined
        && Object.is(value.constructor, Object);
};
exports.isObjectLiteral = isObjectLiteral;
/**
 * Checks if an object has properties
 * @param potentialObj
 * @returns
 */
function objHasProp(potentialObj, keys) {
    if (typeof potentialObj !== 'object'
        || potentialObj === null
        || potentialObj instanceof Date
        || potentialObj instanceof Array)
        return false;
    if (keys.every((key) => key in potentialObj)) {
        return true;
    }
    return false;
}
exports.objHasProp = objHasProp;
/**
 * Filters an object if the values of the second object are equal.
 *
 * Returns the values of the first object
 * @param obj1
 * @param obj2
 * @returns
 */
const diffObject = (obj1, obj2) => {
    const allKeys = Array.from(new Set([
        ...Object.keys(obj1),
        ...Object.keys(obj2),
    ]));
    return allKeys
        .reduce((dObj, k) => {
        if ((0, lodash_1.isEqual)(obj1[k], obj2[k])) {
            return dObj;
        }
        return {
            ...dObj,
            [k]: obj1[k],
        };
    }, {});
};
exports.diffObject = diffObject;
/**
 * Builds an object from an array of keys
 * @param keys
 * @param val
 */
function objFromKeys(keys, val) {
    const v = typeof val === 'function'
        ? (k) => val(k)
        : () => val;
    return keys.reduce((obj, k) => ({
        ...obj,
        [k]: v(k),
    }), {});
}
exports.objFromKeys = objFromKeys;
//# sourceMappingURL=objectFuncs.js.map