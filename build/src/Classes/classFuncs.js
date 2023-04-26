"use strict";
/* eslint-disable require-jsdoc */
/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/**
 * Classes ultility functions
 * @module ClassUtils
 * @category Classes
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProxyClass = exports.getMethodNames = exports.isClass = exports.getAllFuncs = void 0;
/**
 * Lists all function names in a class.
 * @param cls some class
 * @returns
 */
function getAllFuncs(cls) {
    return Object.getOwnPropertyNames(Object.getPrototypeOf(cls));
}
exports.getAllFuncs = getAllFuncs;
/**
 * Checks if an object is a class
 * @param obj
 * @returns
 */
function isClass(obj) {
    if (obj == null || typeof obj === 'undefined') {
        return false;
    }
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
    const isNativePrototypeCtorClass = obj.prototype.constructor.name in global && (global[obj.prototype.constructor.name] === obj.constructor
        || global[obj.prototype.constructor.name] === obj);
    return isCtorClass || isPrototypeCtorClass || isNativeCtorClass || isNativePrototypeCtorClass;
}
exports.isClass = isClass;
// @ts-ignore
function getMethodNames(cls) {
    if ('prototype' in cls) {
        return Object.getOwnPropertyNames(cls?.prototype).reduce((arr, k) => {
            if (k !== 'constructor') {
                // @ts-ignore
                return [...arr, k];
            }
            return arr;
            // @ts-ignore
        }, []);
    }
    return Object.getOwnPropertyNames(Object.getPrototypeOf(cls)).reduce((arr, k) => {
        if (k !== 'constructor') {
            return [...arr, k];
        }
        return arr;
    }, []);
}
exports.getMethodNames = getMethodNames;
/**
 * Merges two classes
 * @param target
 * @param extension
 * @returns
 */
function ProxyClass(target, extension) {
    const extended = new Proxy(target, {
        get(t, prop) {
            if (prop === '__extension__')
                return extension;
            const value = t[prop] || extension[prop];
            if (value instanceof Function) {
                return function (...args) {
                    return value.apply(prop in target ? target : extension, args);
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
            return Object.getOwnPropertyDescriptor(t[prop] ? t : extension, prop) || Object.getOwnPropertyDescriptor(Object.getPrototypeOf(t[prop] ? t : extension), prop);
        },
    });
    return extended;
}
exports.ProxyClass = ProxyClass;
//# sourceMappingURL=classFuncs.js.map