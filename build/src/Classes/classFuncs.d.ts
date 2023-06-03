/**
 * Classes ultility functions
 * @module ClassUtils
 * @category Classes
 */
/**
 * Lists all function names in a class.
 * @param cls some class
 * @returns
 */
export declare function getAllFuncs(cls: Class): string[];
/**
 * Checks if an object is a class
 * @param obj
 * @returns
 */
export declare function isClass(obj: any): boolean;
/**
 * Returns an array of method names
 * @param cls
 */
export declare function getMethodNames<C extends Class>(cls: C): (keyof C['prototype'])[];
export declare function getMethodNames<C extends {}>(cls: C): (keyof C)[];
export type ProxiedClass<T extends Record<string, any>, E extends Record<string, any>> = {
    [KT in keyof T]: T[KT];
} & {
    [KE in keyof E]: E[KE];
};
/**
 * Merges two classes
 * @param target
 * @param extension
 * @returns
 */
export declare function ProxyClass<T extends Record<string, any>, E extends Record<string, any>>(target: T, extension: E): ProxiedClass<T, E>;
