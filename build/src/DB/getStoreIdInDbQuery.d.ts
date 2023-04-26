/**
 * Finds the storeId in a DB query
 * @param query
 * @returns
 */
declare function getStoreIdInDbQuery(query: Record<string, unknown> | Array<Record<string, unknown>>): string;
export default getStoreIdInDbQuery;
