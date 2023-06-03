/**
 * Returns informations about the error
 * @param e
 * @param options
 */
export declare function superStackTrace(e: Error, options?: {
    onlyPath?: boolean;
}): string[];
type ErrKeysTp<T> = T extends undefined ? unknown : T extends 'unknown' ? unknown : T extends 'any' ? any : unknown;
/**
 * Checks if an error is an object with indexable keys.
 *
 * OBS:
 * The third parameter is just a workaround to set the types of the properties.
 * @param error
 * @returns
 */
export declare function objectErrorGuard<K extends string, T extends 'any' | 'unknown' | undefined>(error: unknown, keys: K[], _t?: T): error is ({
    [key in K]: ErrKeysTp<T>;
} & {
    [key: string]: ErrKeysTp<T>;
});
export declare function objectErrorGuard<K extends string, T extends 'any' | 'unknown' | undefined>(error: unknown, keys?: K[], _t?: T): error is ({
    [key: string]: ErrKeysTp<T>;
});
export {};
