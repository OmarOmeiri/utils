"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.objectErrorGuard = exports.superStackTrace = void 0;
/**
 * Returns informations about the error
 * @param e
 * @param options
 */
function superStackTrace(e, options) {
    let stack = (e.stack?.toString() ?? '').split(/\r\n|\n/);
    if (!options)
        return stack;
    if (options.onlyPath)
        stack = stack.map((s) => (s.match(/\(.*?\)/)?.[0] ?? '').replace(/\(|\)/g, ''));
    return stack;
}
exports.superStackTrace = superStackTrace;
// eslint-disable-next-line require-jsdoc
function objectErrorGuard(error, keys, _t) {
    if (keys) {
        if (typeof error === 'object'
            && error !== null
            && !(error instanceof Date)
            && !(error instanceof Array)) {
            if (keys.every((key) => key in error)) {
                return true;
            }
        }
    }
    if (typeof error === 'object'
        && error !== null
        && !(error instanceof Date)
        && !(error instanceof Array)) {
        return true;
    }
    return false;
}
exports.objectErrorGuard = objectErrorGuard;
//# sourceMappingURL=errorFuncs.js.map