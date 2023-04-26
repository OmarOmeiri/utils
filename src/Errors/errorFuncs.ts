/**
 * Returns informations about the error
 * @param e
 * @param options
 */
export function superStackTrace(
  e: Error,
  options?: {
    onlyPath?: boolean
  },
): string[] {
  let stack = (e.stack?.toString() ?? '').split(/\r\n|\n/);
  if (!options) return stack;
  if (options.onlyPath) stack = stack.map((s) => (s.match(/\(.*?\)/)?.[0] ?? '').replace(/\(|\)/g, ''));
  return stack;
}

type ErrKeysTp<T> =
T extends undefined
? unknown
: T extends 'unknown'
? unknown
: T extends 'any'
? any
: unknown

/**
 * Checks if an error is an object with indexable keys.
 *
 * OBS:
 * The third parameter is just a workaround to set the types of the properties.
 * @param error
 * @returns
 */
export function objectErrorGuard<K extends string, T extends 'any' | 'unknown' | undefined>(
  error: unknown,
  keys: K[],
  _t?: T,
): error is ({[key in K]: ErrKeysTp<T>} & {[key: string]: ErrKeysTp<T>})
export function objectErrorGuard<K extends string, T extends 'any' | 'unknown' | undefined>(
  error: unknown,
  keys?: K[],
  _t?: T,
): error is ({[key: string]: ErrKeysTp<T>})
// eslint-disable-next-line require-jsdoc
export function objectErrorGuard<K extends string, T extends 'any' | 'unknown' | undefined>(
  error: unknown,
  keys?: K[],
  _t?: T,
): error is {[key: string]: ErrKeysTp<T>} | ({[key in K]: ErrKeysTp<T>} & {[key: string]: ErrKeysTp<T>}) {
  if (keys) {
    if (
      typeof error === 'object'
       && error !== null
       && !(error instanceof Date)
       && !(error instanceof Array)
    ) {
      if (keys.every((key) => key in error)) {
        return true;
      }
    }
  }
  if (
    typeof error === 'object'
     && error !== null
     && !(error instanceof Date)
     && !(error instanceof Array)
  ) {
    return true;
  }
  return false;
}
