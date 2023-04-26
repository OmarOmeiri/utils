/**
 * Path utility functions
 * @module PathUtils
 * @category Path
 */

import path from 'path';

/**
 * Converts a path to posix format.
 * @param pathStr
 * @returns
 */
export function pathToPosix(pathStr: string): string {
  return pathStr.split(path.sep).join(path.posix.sep);
}
