import { objectIdInStringRegex } from '..';
import { valueByProperty } from '../Objects/objectFuncs';

/**
 * Finds the storeId in a DB query
 * @param query
 * @returns
 */
function getStoreIdInDbQuery(query: Record<string, unknown> | Array<Record<string, unknown>>): string {
  const found = valueByProperty(query, 'storeId');
  if (!found) return '0';
  if (typeof found === 'string') return found;

  const storeIdMatch = JSON.stringify(found).match(objectIdInStringRegex) as RegExpMatchArray | null;
  if (storeIdMatch) return storeIdMatch[0];
  return '0';
}

export default getStoreIdInDbQuery;
