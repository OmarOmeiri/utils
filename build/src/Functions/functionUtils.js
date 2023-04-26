"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.tryCatchAsync = exports.tryCatch = void 0;
const tryCatch = (fn, onError) => {
    try {
        const res = fn();
        return res;
    }
    catch (error) {
        return onError(error);
    }
};
exports.tryCatch = tryCatch;
const tryCatchAsync = async (fn, onError) => {
    try {
        const res = await fn();
        return res;
    }
    catch (error) {
        const errRes = await onError(error);
        return errRes;
    }
};
exports.tryCatchAsync = tryCatchAsync;
//# sourceMappingURL=functionUtils.js.map