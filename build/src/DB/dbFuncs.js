"use strict";
/**
 * MongoDB utility functions
 * @module MongoDBUtils
 * @category DB
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.serverSortToMongoosseSort = exports.serverSortToMongoSort = exports.mongooseSortToMongoSort = void 0;
const lullo_common_types_1 = require("lullo-common-types");
/**
 * Converts a Mongoose sort object to the Mongo sort object
 * @param mongooseSort
 *
 * @example
 *
 * //Input :
 * {test: 'asc', val: 'desc'}
 *
 * // Output:
 * {test: 1, val: -1}
 */
function mongooseSortToMongoSort(mongooseSort) {
    const convertSort = {};
    Object.keys(mongooseSort).forEach((k) => {
        convertSort[k] = mongooseSort[k] === lullo_common_types_1.SortTypes.asc ? 1 : -1;
    });
    return convertSort;
}
exports.mongooseSortToMongoSort = mongooseSortToMongoSort;
/**
 * Converts the FrontEnd sortType to the Mongo sort object
 * @param srvSort
 *
 * @example
 *
 * //Input :
 * [
 *  {id: 'ref', desc: true},
 *  {id: 'test', desc: false},
 * ]
 *
 * // Output:
 * {
 *  ref: -1,
 *  test: 1,
 * }
 */
function serverSortToMongoSort(srvSort) {
    const convertSort = {};
    srvSort.forEach((s) => {
        convertSort[s.id] = s.desc ? -1 : 1;
    });
    return convertSort;
}
exports.serverSortToMongoSort = serverSortToMongoSort;
/**
 * Converts the FrontEnd sortType to the Mongooose sort object
 * @param srvSort
 *
 * @example
 *
 * //Input :
 * [
 *  {id: 'ref', desc: true},
 *  {id: 'test', desc: false},
 * ]
 *
 * // Output:
 * {
 *  ref: 'desc',
 *  test: 'asc',
 * }
 */
function serverSortToMongoosseSort(srvSort) {
    const convertSort = {};
    srvSort.forEach((s) => {
        convertSort[s.id] = s.desc ? lullo_common_types_1.SortTypes.desc : lullo_common_types_1.SortTypes.asc;
    });
    return convertSort;
}
exports.serverSortToMongoosseSort = serverSortToMongoosseSort;
//# sourceMappingURL=dbFuncs.js.map