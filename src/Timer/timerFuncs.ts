/**
 * Timer utility functions.
 * @module TimerUtils
 * @category Timer
 */

/* eslint-disable func-names */
/**
 * Runs a callback whenever the timer runs out. Resets the timer if is called again before the timer finishes.
 * @param callback
 * @param wait
 * @returns
 */
export function waitAndCallback<T extends Array<any>>(callback: (...args: T) => void, wait: number): (...args: T) => void {
  let timeout: NodeJS.Timeout;
  return (...args: T) => {
    clearTimeout(timeout);
    // @ts-ignore
    timeout = setTimeout(function (): void { callback.apply(this, args); }, wait);
  };
}

/**
 * Sleeps async for a given amount of time.
 * @param milisec
 * @returns
 */
export function asyncDelay(milisec: number): Promise<void> {
  return new Promise<void>((resolve) => {
    setTimeout(() => { resolve(); }, milisec);
  });
}

/**
 * Creates an asynchronous delay.
 *
 *
 * IMPORTANT: This function is not meant to be used in production.
 * @param ms
 */
export function syncDelay(ms: number): void {
  const end = Date.now() + ms;
  while (Date.now() < end) continue;
}

/**
 * Function debouncer
 * @param func
 * @param wait
 * @param immediate runs immediatley when called
 * @returns
 */
export function debounce<T extends Array<any>>(
  func: (...args: T) => void,
  wait: number,
  immediate?: boolean,
) {
  let timeout: NodeJS.Timeout | null = null;

  return function executedFunction(...args: T) {
    // @ts-ignore
    // eslint-disable-next-line @typescript-eslint/no-this-alias
    const context = this;

    const later = function () {
      timeout = null;
      if (!immediate) func.apply(context, args);
    };
    const callNow = immediate && !timeout;
    if (timeout) clearTimeout(timeout);
    timeout = setTimeout(later, wait);
    if (callNow) func.apply(context, args);
  };
}
