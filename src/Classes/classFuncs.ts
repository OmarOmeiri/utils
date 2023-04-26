/* eslint-disable require-jsdoc */
/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
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
export function getAllFuncs(cls: Class): string[] {
  return Object.getOwnPropertyNames(Object.getPrototypeOf(cls));
}

/**
 * Checks if an object is a class
 * @param obj
 * @returns
 */
export function isClass(obj: any): boolean {
  if (obj == null || typeof obj === 'undefined') { return false; }
  const isCtorClass = obj.constructor
      && obj.constructor.toString().substring(0, 5) === 'class';
  const isNativeCtorClass = obj.constructor
                                && obj.constructor.name !== 'Function'
                                && obj.constructor.name in global;
  if (obj.prototype === undefined) {
    return isCtorClass || isNativeCtorClass;
  }
  const isPrototypeCtorClass = obj.prototype.constructor
      && obj.prototype.constructor.toString
      && obj.prototype.constructor.toString().substring(0, 5) === 'class';

  const isNativePrototypeCtorClass = obj.prototype.constructor.name in global && (
    (global as any)[obj.prototype.constructor.name] === obj.constructor
          || (global as any)[obj.prototype.constructor.name] === obj
  );
  return isCtorClass || isPrototypeCtorClass || isNativeCtorClass || isNativePrototypeCtorClass;
}

/**
 * Returns an array of method names
 * @param cls
 */
export function getMethodNames<C extends Class>(cls: C): (keyof C['prototype'])[]
export function getMethodNames<C extends {}>(cls: C): (keyof C)[]
// @ts-ignore
export function getMethodNames<C extends Class | {}>(cls: C): (keyof C | keyof C['prototype'])[] {
  if ('prototype' in cls) {
    return Object.getOwnPropertyNames(cls?.prototype).reduce((arr, k) => {
      if (k !== 'constructor') {
        // @ts-ignore
        return [...arr, k as keyof C['prototype']];
      }
      return arr;
      // @ts-ignore
    }, [] as (keyof C['prototype'])[]);
  }
  return Object.getOwnPropertyNames(Object.getPrototypeOf(cls)).reduce((arr, k) => {
    if (k !== 'constructor') {
      return [...arr, k as keyof C];
    }
    return arr;
  }, [] as (keyof C)[]);
}

export type ProxiedClass<
  T extends Record<string, any>,
  E extends Record<string, any>,
> = {
  [KT in keyof T]: T[KT]
} & {
  [KE in keyof E]: E[KE]
}

/**
 * Merges two classes
 * @param target
 * @param extension
 * @returns
 */
export function ProxyClass<
  T extends Record<string, any>,
  E extends Record<string, any>,
>(
  target: T,
  extension: E,
): ProxiedClass<T, E> {
  const extended = new Proxy(target, {
    get(t, prop: string) {
      if (prop === '__extension__') return extension;
      const value = t[prop] || extension[prop];
      if (value instanceof Function) {
        return function (...args: any[]) {
          return value.apply(prop in target ? target : extension, args as any);
        };
      }
      return value;
    },
    ownKeys(t) {
      return Array.from(new Set([
        ...Object.getOwnPropertyNames(t),
        ...Object.getOwnPropertyNames(extension),
        ...Object.getOwnPropertyNames(Object.getPrototypeOf(t)),
        ...Object.getOwnPropertyNames(Object.getPrototypeOf(extension)),
      ])).filter((k) => k !== 'constructor');
    },
    getOwnPropertyDescriptor(t, prop) {
      return Object.getOwnPropertyDescriptor(
        t[prop as keyof T] ? t : extension,
        prop,
      ) || Object.getOwnPropertyDescriptor(
        Object.getPrototypeOf(t[prop as keyof T] ? t : extension),
        prop,
      );
    },
  });

  return extended as ProxiedClass<T, E>;
}
