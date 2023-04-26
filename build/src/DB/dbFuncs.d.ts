/**
 * MongoDB utility functions
 * @module MongoDBUtils
 * @category DB
 */
import { MongooseSort, MongoSort, ServerSorting } from 'lullo-common-types';
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
export declare function mongooseSortToMongoSort(mongooseSort: MongooseSort): MongoSort;
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
export declare function serverSortToMongoSort(srvSort: ServerSorting): MongoSort;
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
export declare function serverSortToMongoosseSort(srvSort: ServerSorting): MongooseSort;
