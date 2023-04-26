"use strict";
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
exports.windowArray = exports.arrayTo2D = exports.arraySum = exports.arrayAverage = exports.cartesianProduct = exports.arrayToMatrix = exports.sortArrayWithSortingArray = exports.nArraySum1 = exports.range = exports.shuffleArray = exports.asyncFilterSeq = exports.findDuplicateString = exports.findDuplicates = exports.getObjDuplicatesByKey = exports.asyncFilter = exports.pickRandom = exports.removeByIndex = exports.filterObjectByKeys = exports.arrayIncludesAnotherArrayAll = exports.arrayIncludesAnotherArray = exports.replaceItemsInObjArray = exports.replaceInObjArrayByKeyValue = exports.chunkArrOfObjsByKeyAndValue = exports.filterArrOfObjsByKeyValuePair = exports.sum2DArrayCols = exports.matchStringInArrayofSubstr = exports.genRndNumUniqArray = exports.sortObjArrayByArrayAndKey = exports.sortStrArr = exports.sortObjArrayIgCase = exports.sortNumArray = exports.sortObjArray = exports.matchArrayRegex = exports.genChunk = exports.chunk = exports.arrayInnerJoin = exports.arrayOuterJoin = exports.arrayDiff = exports.filterObjArr = exports.countOccurence = exports.countOccurences = exports.getTypesInArray = exports.removeDuplicatesFromObjArrayByPropNames = exports.removeDuplicatesFromObjArrayByPropName = exports.removeValueFromArray = exports.breakChunks = exports.findIndexes = exports.isNumberArray = exports.isArrayEqual = void 0;
/* eslint-disable arrow-body-style */
/**
 * Exports all functions related to array manipulation.
 * @module ArrayUtils
 * @category Array
 */
const lodash_1 = __importStar(require("lodash"));
const Math_1 = require("../Math");
/**
 * Deep comparison of two arrays.
 * @param x
 * @param y
 * @returns
 */
// eslint-disable-next-line func-names
const isArrayEqual = function (x, y) {
    return (0, lodash_1.default)(x).differenceWith(y, lodash_1.isEqual).isEmpty();
};
exports.isArrayEqual = isArrayEqual;
const isNumberArray = (arr, options) => {
    const lng = Math.max(Math.floor(arr.length * (options?.testLengthPct || 0.15)), 1);
    return arr.slice(0, lng).every((e) => {
        if (options?.nullable && (typeof e === 'number' || e === null))
            return true;
        return typeof e === 'number';
    });
};
exports.isNumberArray = isNumberArray;
const findIndexes = (arr, cb) => (arr.reduce((c, v, i) => {
    if (cb(v, i))
        return [...c, i];
    return c;
}, []));
exports.findIndexes = findIndexes;
// eslint-disable-next-line require-jsdoc
async function breakChunks(iter, cb, size, unbox = false) {
    const chunks = [];
    for await (const i of iter) {
        if (unbox && Array.isArray(i)) {
            const flattened = i.flat(Infinity);
            chunks.push(...flattened);
        }
        else
            chunks.push(i);
        if (chunks.length >= size) {
            await cb(chunks);
            chunks.length = 0;
        }
    }
    if (chunks.length) {
        await cb(chunks);
    }
}
exports.breakChunks = breakChunks;
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
const removeValueFromArray = (arr, value) => {
    const index = arr.indexOf(value);
    if (index !== -1) {
        arr.splice(index, 1);
        return true;
    }
    return false;
};
exports.removeValueFromArray = removeValueFromArray;
/**
 * Removes duplicates of an array of objects by property name
 * @param arr
 * @param prop
 * @returns
 */
// @ts-ignore
const removeDuplicatesFromObjArrayByPropName = (arr, prop) => Array.from(arr
    .reduce((acc, item) => ((item && item[prop] && acc.set(item[prop], item),
    acc)), new Map())
    .values());
exports.removeDuplicatesFromObjArrayByPropName = removeDuplicatesFromObjArrayByPropName;
/**
 * Removes duplicates of an array of objects by property name (Multi)
 * @param arr
 * @param prop
 * @returns
 */
const removeDuplicatesFromObjArrayByPropNames = (arr, props) => [...arr.reduce((m, r) => {
        const key = props.reduce((val, acc, i) => {
            if (!i)
                return `${r[val]}${r[acc]}`;
            return `${r[val]}-${r[acc]}`;
        });
        return m.has(key) ? m : m.set(key, r);
    }, new Map()).values()];
exports.removeDuplicatesFromObjArrayByPropNames = removeDuplicatesFromObjArrayByPropNames;
/**
 * Return all data types contained in an array
 * @param arr
 */
function getTypesInArray(arr, unique) {
    const types = arr.reduce((tps, val) => {
        if (!tps.includes(typeof val))
            tps.push(typeof val);
        return tps;
    }, []);
    if (!unique)
        return types;
    return Array.from(new Set(types));
}
exports.getTypesInArray = getTypesInArray;
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
function countOccurences(arr) {
    const uniqValues = Array.from(new Set(arr));
    const outerCount = uniqValues.map((search) => {
        const innerCount = arr.reduce((n, val) => n + Number(val === search), 0);
        return { search, innerCount };
    });
    return outerCount;
}
exports.countOccurences = countOccurences;
/**
 * Counts occurences of a single element in an array.
 * @param arr
 * @param elm the element to be counted
 * @returns
 */
function countOccurence(arr, elm) {
    let count = 0;
    arr.forEach((e) => {
        if (e === elm) {
            count += 1;
        }
    });
    return count;
}
exports.countOccurence = countOccurence;
/**
 * Filter an array of objects by a condition that returns a boolean
 * @param obj
 * @param condition
 * @returns
 */
const filterObjArr = (obj, condition) => (0, lodash_1.filter)(obj, condition);
exports.filterObjArr = filterObjArr;
/**
 * Returns the difference between two arrays.
 * @param arr1
 * @param arr2
 * @returns the elements that are in 'arr1' but not in 'arr2'
 */
const arrayDiff = (arr1, arr2) => {
    return arr1.filter((x) => !arr2.some((y) => (0, lodash_1.isEqual)(x, y)));
};
exports.arrayDiff = arrayDiff;
/**
 * Returns the outer join of two arrays.
 * @param arr1
 * @param arr2
 * @returns the elements that are not in both arrays
 */
const arrayOuterJoin = (arr1, arr2) => {
    return [
        ...arr1.filter((x) => !arr2.some((y) => (0, lodash_1.isEqual)(x, y))),
        ...arr2.filter((x) => !arr1.some((y) => (0, lodash_1.isEqual)(x, y))),
    ];
};
exports.arrayOuterJoin = arrayOuterJoin;
/**
 * Returns the inner join of two arrays.
 * @param arr1
 * @param arr2
 * @returns the elements that are in both arrays
 */
const arrayInnerJoin = (arr1, arr2) => {
    return arr1.filter((x) => arr2.some((y) => (0, lodash_1.isEqual)(x, y)));
};
exports.arrayInnerJoin = arrayInnerJoin;
/**
 * Aggrupates arrays in a given size
 * @param {Array} array array to be gruped / chunked
 * @param {Number} size size of the chunks
 * @returns
 */
function chunk(array, size) {
    const chunks = [];
    const arrLength = array.length;
    const chunkNum = arrLength / size;
    for (let i = 0; i < chunkNum; i += 1) {
        chunks.push(array.slice(i * size, (i + 1) * size));
    }
    return chunks;
}
exports.chunk = chunk;
/**
 * Aggrupates arrays in a given size
 * @param {Array} array array to be gruped / chunked
 * @param {Number} size size of the chunks
 * @returns
 */
function* genChunk(array, size) {
    const arrLength = array.length;
    const chunkNum = arrLength / size;
    for (let i = 0; i < chunkNum; i += 1) {
        yield array.slice(i * size, (i + 1) * size);
    }
}
exports.genChunk = genChunk;
/**
 * Searches an array for a regex match.
 * @param arr
 * @param pattern
 * @returns {Boolean}
 */
const matchArrayRegex = (arr, pattern) => {
    return !!arr.find((s) => pattern.test(s));
};
exports.matchArrayRegex = matchArrayRegex;
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
const sortObjArray = (arr, key, order = 'asc') => {
    return (0, lodash_1.orderBy)(arr, [key], [order]);
};
exports.sortObjArray = sortObjArray;
const sortNumArray = (arr, order = 'asc') => {
    if (order === 'asc') {
        return [...arr].sort((a, b) => a - b);
    }
    return [...arr].sort((a, b) => b - a);
};
exports.sortNumArray = sortNumArray;
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
const sortObjArrayIgCase = (arr, key, order = 'asc') => {
    if (!arr.length)
        return arr;
    let isNum = true;
    for (const v of arr) {
        if (Number.isNaN(Number(v[key]))) {
            isNum = false;
            break;
        }
    }
    if (isNum) {
        return (0, lodash_1.orderBy)(arr, [(val) => Number(val[key])], [order]);
    }
    return (0, lodash_1.orderBy)(arr, [(val) => (val[key].toString()).normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase()], [order]);
};
exports.sortObjArrayIgCase = sortObjArrayIgCase;
const sortStrArr = (arr, order = 'asc') => {
    const sorted = [...arr]
        .sort((a, b) => a
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .localeCompare(b, 'en', { sensitivity: 'base' }));
    if (order === 'asc')
        return sorted;
    return sorted.reverse();
};
exports.sortStrArr = sortStrArr;
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
const sortObjArrayByArrayAndKey = (array, order, key) => {
    const [includedInSortingIndex, notIncludedInSortingArray,] = array.reduce((incl, val) => {
        if (order.includes(val[key]))
            incl[0].push(val);
        else
            incl[1].push(val);
        return incl;
    }, [[], []]);
    return [
        ...includedInSortingIndex.slice().sort((a, b) => {
            const A = a[key];
            const B = b[key];
            return order.indexOf(A) - order.indexOf(B);
        }),
        ...notIncludedInSortingArray,
    ];
};
exports.sortObjArrayByArrayAndKey = sortObjArrayByArrayAndKey;
/**
 * Generates an array of unique numbers
 * @param min
 * @param max
 * @param size
 */
function genRndNumUniqArray(min, max, size) {
    const rng = Math.min(max - min, size);
    if (rng < 1)
        return [];
    const nums = new Set();
    while (nums.size !== rng) {
        const n = (0, Math_1.getRandomInt)(min, max);
        nums.add(n);
    }
    return Array.from(nums);
}
exports.genRndNumUniqArray = genRndNumUniqArray;
/**
 * Searches a substring array for a given string
 * @param str
 * @param substrArr
 * @returns
 */
const matchStringInArrayofSubstr = (str, substrArr) => {
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
exports.matchStringInArrayofSubstr = matchStringInArrayofSubstr;
/**
 * Sums a 2D array by columns
 * @param arr
 * @returns
 */
const sum2DArrayCols = (arr) => {
    const newArray = [];
    arr.forEach((sub) => {
        sub.forEach((num, index) => {
            if (newArray[index]) {
                newArray[index] += num;
            }
            else {
                newArray[index] = num;
            }
        });
    });
    return newArray;
};
exports.sum2DArrayCols = sum2DArrayCols;
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
const filterArrOfObjsByKeyValuePair = (arr, filterPairs) => {
    const copy = (0, lodash_1.cloneDeep)(arr)
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
exports.filterArrOfObjsByKeyValuePair = filterArrOfObjsByKeyValuePair;
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
const chunkArrOfObjsByKeyAndValue = (arr, key) => {
    const copy = (0, lodash_1.cloneDeep)(arr);
    const chunkNames = Array.from(new Set(copy.map((i) => i[key])));
    const chunked = {};
    chunkNames.forEach((n) => {
        chunked[n] = copy.filter((c) => c[key] === n);
    });
    return [chunked, chunkNames.map((n) => n.toString())];
};
exports.chunkArrOfObjsByKeyAndValue = chunkArrOfObjsByKeyAndValue;
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
const replaceInObjArrayByKeyValue = (arr, replacement, keyVal) => {
    let found = false;
    const newObj = arr.map((obj) => {
        if (obj[keyVal[0]] === keyVal[1]) {
            found = true;
            // eslint-disable-next-line no-param-reassign
            obj = replacement;
        }
        return obj;
    });
    if (!found)
        return [...arr, replacement];
    return newObj;
};
exports.replaceInObjArrayByKeyValue = replaceInObjArrayByKeyValue;
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
const replaceItemsInObjArray = (arr, replacements, keyToMatch, insertIfNotFound = false) => {
    const notFoundKeys = [];
    const replMap = new Map(replacements.map((e) => [e[keyToMatch], e]));
    const newArr = arr.map((obj) => {
        if (replMap.has(obj[keyToMatch])) {
            return replMap.get(obj[keyToMatch]);
        }
        notFoundKeys.push(obj[keyToMatch]);
        return obj;
    });
    if (!insertIfNotFound) {
        return newArr;
    }
    return [
        ...newArr,
        ...notFoundKeys.map((k) => replacements.find((r) => r[keyToMatch] === k)),
    ];
};
exports.replaceItemsInObjArray = replaceItemsInObjArray;
/**
 * Checks if an array has any element contained in another array
 * @param arrToFind
 * @param arr
 * @returns
 */
const arrayIncludesAnotherArray = (arrToFind, arr) => (arrToFind ?? []).some((v) => arr.includes(v));
exports.arrayIncludesAnotherArray = arrayIncludesAnotherArray;
/**
 * Checks if an array has every element contained in another array
 * @param arrToFind
 * @param arr
 * @returns
 */
const arrayIncludesAnotherArrayAll = (arrToFind, arr) => (arrToFind ?? []).every((v) => arr.includes(v));
exports.arrayIncludesAnotherArrayAll = arrayIncludesAnotherArrayAll;
/**
 * Filters an object by a key or an array of keys.
 *
 * inplace = true modifies the original object
 * @param obj
 * @param keys
 */
const filterObjectByKeys = (obj, keys, inplace = false) => {
    const ks = Array.isArray(keys) ? keys : [keys];
    if (inplace) {
        Object.fromEntries(Object.entries(obj).filter(([key]) => ks.includes(key)));
    }
    else {
        const copy = (0, lodash_1.cloneDeep)(obj);
        return Object.fromEntries(Object.entries(copy).filter(([key]) => ks.includes(key)));
    }
};
exports.filterObjectByKeys = filterObjectByKeys;
// eslint-disable-next-line consistent-return, require-jsdoc
function removeByIndex(arr, index, inPlace = false) {
    if (!inPlace)
        return arr.slice(0, index).concat(arr.slice(index + 1));
    arr.splice(index, 1);
}
exports.removeByIndex = removeByIndex;
// eslint-disable-next-line require-jsdoc
function pickRandom(arr, n, unique) {
    const isUndefParam = !!(!n && n !== 0);
    // eslint-disable-next-line no-param-reassign
    if (!n && n !== 0)
        n = 1;
    if (n < 1)
        return [];
    const { length } = arr;
    if (n >= length && !unique) {
        if (isUndefParam)
            return arr[(0, Math_1.getRandomInt)(0, length)];
        return arr;
    }
    if (n >= length && unique) {
        const uniq = (0, lodash_1.uniqWith)(arr, lodash_1.isEqual);
        if (isUndefParam)
            return uniq[(0, Math_1.getRandomInt)(0, uniq.length)];
        return uniq;
    }
    const pick = () => Math.floor(Math.random() * (Math.floor(length) - Math.ceil(0)) + Math.ceil(0));
    if (!unique) {
        const picked = [...Array(n)].map(() => arr[pick()]);
        if (n === 1 && isUndefParam)
            return picked[0];
        return picked;
    }
    const rng = Math.min(arr.length, n);
    const nums = new Set();
    while (nums.size !== rng) {
        nums.add((0, Math_1.getRandomInt)(0, length));
    }
    const picked = [...nums].map((i) => arr[i]);
    if (n === 1 && isUndefParam)
        return picked[0];
    return picked;
}
exports.pickRandom = pickRandom;
/**
 * Performs a asynchronous filter concurrently
 * @param arr
 * @param cb
 * @returns
 */
async function asyncFilter(arr, cb) {
    const results = await Promise.all(arr.map(cb));
    return arr.filter((_v, index) => results[index]);
}
exports.asyncFilter = asyncFilter;
/**
 * Gets the duplicate elements of an object array by key
 *
 * IMPORTANT!
 *
 * Will return the duplicates elements more than once
 */
function getObjDuplicatesByKey(arr, key) {
    const lookup = arr.reduce((a, e) => {
        a.set(e[key], (a.get(e[key]) ?? 0) + 1);
        return a;
    }, new Map());
    return arr.filter((e) => lookup.get(e[key]) > 1);
}
exports.getObjDuplicatesByKey = getObjDuplicatesByKey;
/**
 * Gets the duplicate elements of an object array by key
 *
 * IMPORTANT!
 *
 * If unique is false or undefined will return the duplicated elements more than once.
 * if true, will return only once
 */
function findDuplicates(arr, unique) {
    const primArr = arr.map((e) => {
        if (e instanceof Date)
            return e.toString();
        return e;
    });
    const lookup = primArr.reduce((a, e) => {
        a.set(e, (a.get(e) ?? 0) + 1);
        return a;
    }, new Map());
    const dupes = arr.filter((e) => lookup.get(e) > 1);
    if (!unique)
        return dupes;
    return [...new Set(dupes)];
}
exports.findDuplicates = findDuplicates;
const findDuplicateString = (strings) => {
    const table = {};
    for (const string of strings) {
        if (string in table)
            return true;
        table[string] = true;
    }
    return false;
};
exports.findDuplicateString = findDuplicateString;
/**
 * Perform an asynchronous filter sequentially
 * @param arr
 * @param cb
 * @returns
 */
async function asyncFilterSeq(arr, cb) {
    return arr.reduce(async (memo, e, i) => [...await memo, ...await cb(e, i) ? [e] : []], Promise.resolve([]));
}
exports.asyncFilterSeq = asyncFilterSeq;
/**
 * Shuffles an array
 * @param array
 */
function shuffleArray(array) {
    return array.sort(() => (Math.random() > 0.5 ? 1 : -1));
}
exports.shuffleArray = shuffleArray;
/**
 * Returns a range of numbers
 * @param from
 * @param to
 * @param step
 * @returns
 */
function range(from, to, step = 1) {
    let rev = false;
    if (!step)
        return [];
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
    if (amplitude < 1 || amplitude < step)
        return [from];
    if (rev)
        return [...Array(Math.floor((to - from) / step) + 1)].map((v, i) => from + i * step).reverse();
    return [...Array(Math.floor((to - from) / step) + 1)].map((v, i) => from + i * step);
}
exports.range = range;
/**
 * Generates an array of N numbers in which all elements summed equals to 1
 * @param n
 */
function nArraySum1(n) {
    const rnd = [...Array(n)]
        .map(() => Math.random());
    const sum = rnd.reduce((val, acc) => val + acc);
    return rnd.map((val) => val / sum);
}
exports.nArraySum1 = nArraySum1;
/**
 * Filters an array based on another array.
 * Puts elements not found in the sorting array at the end
 */
const sortArrayWithSortingArray = (arr, sortingArray) => {
    const [includedInSortingIndex, notIncludedInSortingArray,] = arr.reduce((incl, val) => {
        if (sortingArray.includes(val))
            incl[0].push(val);
        else
            incl[1].push(val);
        return incl;
    }, [[], []]);
    return [
        ...includedInSortingIndex.slice().sort((a, b) => {
            return sortingArray.indexOf(a) - sortingArray.indexOf(b);
        }),
        ...notIncludedInSortingArray,
    ];
};
exports.sortArrayWithSortingArray = sortArrayWithSortingArray;
/**
 * Transforms an array into a matrix (2D array) with dimensions M(arr.length / cols, cols)
 * @param arr
 * @param cols
 * @returns
 */
function arrayToMatrix(arr, cols) {
    return arr.reduce((matrix, item, index) => {
        if (index % cols === 0) {
            matrix.push([]);
        }
        matrix[matrix.length - 1].push(item);
        return matrix;
    }, []);
}
exports.arrayToMatrix = arrayToMatrix;
/**
 * Performs the cartesian product of multiple arrays
 * @param a
 * @param more
 * @returns
 */
function* cartesianProduct(a, ...more) {
    if (a == null)
        return yield [];
    for (const v of a) {
        // @ts-ignore
        for (const c of cartesianProduct(...more)) {
            // @ts-ignore
            yield [v, ...c];
        }
    }
}
exports.cartesianProduct = cartesianProduct;
/**
 * Calculates the average of an array of numbers
 * @param arr
 * @returns
 */
function arrayAverage(...arr) {
    if (!arr.length)
        return 0;
    return (arr.reduce((acc, v) => acc + v, 0)) / arr.length;
}
exports.arrayAverage = arrayAverage;
const arraySum = (...arr) => {
    if (!arr.length)
        return 0;
    return arr.reduce((acc, val) => acc + val, 0);
};
exports.arraySum = arraySum;
const arrayTo2D = (arr, size) => (arr.reduce((mat, item, i) => {
    if (i % size === 0) {
        mat.push([]);
    }
    mat[mat.length - 1].push(item);
    return mat;
}, []));
exports.arrayTo2D = arrayTo2D;
/**
 * Generator that yields an array chunked by the size param
 * @param arr
 * @param size
 */
function* windowArray(arr, size) {
    const lng = arr.length;
    const iterations = lng - (size - 1);
    for (const i of Array(iterations).keys()) {
        yield range(i, i + (size - 1)).map((j) => arr[j]);
    }
}
exports.windowArray = windowArray;
//# sourceMappingURL=arrayFuncs.js.map