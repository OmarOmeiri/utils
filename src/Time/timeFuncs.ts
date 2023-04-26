/**
 * Time utility functions
 * @module TimeUtils
 * @category Time
 */

/**
 * Returns the time elapsed
 * of two timestamps in miliseconds
 * @param start
 * @returns
 */
export const getDurationInMilliseconds = (start: bigint): number => {
  // const NS_PER_SEC = BigInt(1e9);
  const NS_TO_MS = 1e6;
  const time = process.hrtime.bigint();
  const diff = time - start;

  return (Number(diff) / NS_TO_MS);
};

const toTimeString = (value: number, name: string) => `${value} ${name}${Math.floor(value) > 1 && !name.endsWith('s') ? 's' : ''}`;

/**
 * Converts a time (ms) to a human readable string
 * @param ms
 * @param bits - number of bits to convert BigInt
 * @returns
 */
export function readableTime(ms: number | bigint, bits = 64): string {
  const timeMs = typeof ms === 'bigint' ? Number(BigInt.asIntN(bits, ms)) : ms;
  const days = Math.floor(timeMs / (24 * 60 * 60 * 1000));
  const daysMs = timeMs % (24 * 60 * 60 * 1000);
  const hours = Math.floor(daysMs / (60 * 60 * 1000));
  const hoursMs = timeMs % (60 * 60 * 1000);
  const minutes = Math.floor(hoursMs / (60 * 1000));
  const minutesMs = timeMs % (60 * 1000);
  const seconds = Math.round(minutesMs / 1000);
  const miliseconds = timeMs % 1000;

  const data: [number, string][] = [
    [days, 'day'],
    [hours, 'hour'],
    [minutes, 'minute'],
    [seconds, 'second'],
  ];

  if (
    days === 0
    && hours === 0
    && minutes === 0
  ) {
    data.push([miliseconds, 'ms']);
  }

  return data
    .filter(([value]) => value > 0)
    .map(([value, name]) => toTimeString(value, name))
    .join(', ');
}

export const TimeConv = (function _() {
  const { floor } = Math;
  return {
    MS(value: number) {
      return {
        toS() {
          return floor(value / 1000);
        },
        toMin() {
          return floor(value / (60 * 1000));
        },
        toH() {
          return floor(value / (60 * 60 * 1000));
        },
        toD() {
          return floor(value / (60 * 60 * 24 * 1000));
        },
      };
    },
    S(value: number) {
      return {
        toMs() {
          return value * 1000;
        },
        toMin() {
          return floor(value / 60);
        },
        toH() {
          return floor(value / (60 * 60));
        },
        toD() {
          return floor(value / (60 * 60 * 24));
        },
      };
    },
    MIN(value: number) {
      return {
        toMs() {
          return value * 1000 * 60;
        },
        toS() {
          return value * 60;
        },
        toH() {
          return floor(value / 60);
        },
        toD() {
          return floor(value / (60 * 24));
        },
      };
    },
    H(value: number) {
      return {
        toMs() {
          return value * 60 * 60 * 1000;
        },
        toS() {
          return value * 60 * 60;
        },
        toMin() {
          return value * 60;
        },
        toD() {
          return floor(value / 24);
        },
      };
    },
    D(value: number) {
      return {
        toMs() {
          return value * 60 * 60 * 1000 * 24;
        },
        toS() {
          return value * 60 * 60 * 24;
        },
        toMin() {
          return value * 60 * 24;
        },
        toH() {
          return value * 24;
        },
      };
    },
  };
}());
