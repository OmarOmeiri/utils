/**
 * Timer utility functions.
 * @module TimerUtils
 * @category Timer
 */
/**
 * Runs a callback whenever the timer runs out. Resets the timer if is called again before the timer finishes.
 * @param callback
 * @param wait
 * @returns
 */
export declare function waitAndCallback<T extends Array<any>>(callback: (...args: T) => void, wait: number): (...args: T) => void;
/**
 * Sleeps async for a given amount of time.
 * @param milisec
 * @returns
 */
export declare function asyncDelay(milisec: number): Promise<void>;
/**
 * Creates an asynchronous delay.
 *
 *
 * IMPORTANT: This function is not meant to be used in production.
 * @param ms
 */
export declare function syncDelay(ms: number): void;
/**
 * Function debouncer
 * @param func
 * @param wait
 * @param immediate runs immediatley when called
 * @returns
 */
export declare function debounce<T extends Array<any>>(func: (...args: T) => void, wait: number, immediate?: boolean): (...args: T) => void;
