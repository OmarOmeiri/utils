/**
 * MongoDB utility functions
 * @module MongoDBUtils
 * @category DB
 */

import {
  SortTypes,
  MongooseSort,
  MongoSort,
  ServerSorting,
} from 'lullo-common-types';

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
export function mongooseSortToMongoSort(mongooseSort: MongooseSort): MongoSort {
  const convertSort: MongoSort = {};
  Object.keys(mongooseSort).forEach((k) => {
    convertSort[k] = mongooseSort[k] === SortTypes.asc ? 1 : -1;
  });
  return convertSort;
}

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
export function serverSortToMongoSort(srvSort: ServerSorting): MongoSort {
  const convertSort: MongoSort = {};
  srvSort.forEach((s) => {
    convertSort[s.id] = s.desc ? -1 : 1;
  });
  return convertSort;
}

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
export function serverSortToMongoosseSort(srvSort: ServerSorting): MongooseSort {
  const convertSort: MongooseSort = {};
  srvSort.forEach((s) => {
    convertSort[s.id] = s.desc ? SortTypes.desc : SortTypes.asc;
  });
  return convertSort;
}
