"use strict";
/**
 * Timer utility functions.
 * @module TimerUtils
 * @category Timer
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.debounce = exports.syncDelay = exports.asyncDelay = exports.waitAndCallback = void 0;
/* eslint-disable func-names */
/**
 * Runs a callback whenever the timer runs out. Resets the timer if is called again before the timer finishes.
 * @param callback
 * @param wait
 * @returns
 */
function waitAndCallback(callback, wait) {
    let timeout;
    return (...args) => {
        clearTimeout(timeout);
        // @ts-ignore
        timeout = setTimeout(function () { callback.apply(this, args); }, wait);
    };
}
exports.waitAndCallback = waitAndCallback;
/**
 * Sleeps async for a given amount of time.
 * @param milisec
 * @returns
 */
function asyncDelay(milisec) {
    return new Promise((resolve) => {
        setTimeout(() => { resolve(); }, milisec);
    });
}
exports.asyncDelay = asyncDelay;
/**
 * Creates an asynchronous delay.
 *
 *
 * IMPORTANT: This function is not meant to be used in production.
 * @param ms
 */
function syncDelay(ms) {
    const end = Date.now() + ms;
    while (Date.now() < end)
        continue;
}
exports.syncDelay = syncDelay;
/**
 * Function debouncer
 * @param func
 * @param wait
 * @param immediate runs immediatley when called
 * @returns
 */
function debounce(func, wait, immediate) {
    let timeout = null;
    return function executedFunction(...args) {
        // @ts-ignore
        // eslint-disable-next-line @typescript-eslint/no-this-alias
        const context = this;
        const later = function () {
            timeout = null;
            if (!immediate)
                func.apply(context, args);
        };
        const callNow = immediate && !timeout;
        if (timeout)
            clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow)
            func.apply(context, args);
    };
}
exports.debounce = debounce;
//# sourceMappingURL=timerFuncs.js.map