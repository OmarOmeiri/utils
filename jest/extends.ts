/* eslint-disable require-jsdoc */
/* eslint-disable no-nested-ternary */
/* eslint-disable @typescript-eslint/no-unused-vars */

import { isEqual } from 'lodash';

// @ts-ignore
global.fail = (
  expected: any,
  received?: any,
  message?: string,
): void => {
  if (!received && received !== false) throw new Error(`\x1b[31m${expected}\x1b[0m`);
  throw new Error(`\x1b[31m
Expected: ${expected}
Received: ${received}
${message ? `Message: ${message}` : ''}
\x1b[0m`);
};

const handleError = ({
  name,
  errors,
  failPct,
  canFailPct,
  passIfOnePasses,
  debug,
  times,
  passes,
  stopOnFail,
}: {
  name: string,
  times: number,
  canFailPct: number,
  passIfOnePasses?: boolean,
  passes: number[]
  errors: [number, any][],
  failPct: number,
  debug?: boolean,
  stopOnFail?: boolean,
}) => {
  if (passIfOnePasses && passes.length) return;

  if (errors.length && failPct > (canFailPct ?? 0)) {
    if (debug) {
      throw new Error(`
${stopOnFail === true ? '\x1b[31mTest stopped on first failure\x1b[0m\n' : ''}
Test: ${name}
Ran: ${times} times
Failures: \x1b[31m${errors.length}\x1b[0m
Passes: \x1b[32m${passes.length}\x1b[0m
Fail rate: \x1b[31m${failPct * 100}%\x1b[0m
${canFailPct ? `Failed more than the ${canFailPct * 100}% limit` : ''}\n
Errors:
${errors.map((e) => `RUN: ${e[0]}\n${e[1].message}`).join('\n\n')}
`);
    } else {
      throw new Error(`
${stopOnFail === true ? '\x1b[31mTest stopped on first failure\x1b[0m\n' : ''}
Test: ${name}
Ran: ${times} times
Failures: \x1b[31m${errors.length}\x1b[0m
Passes: \x1b[32m${passes.length}\x1b[0m
Fail rate: \x1b[31m${failPct * 100}%\x1b[0m
${canFailPct ? `Failed more than the ${canFailPct * 100}% limit` : ''}\n
Last error:
${errors[errors.length - 1][1]}\n
\x1b[0mYou can pass the \x1b[1;33m\`debug: true\`\x1b[0m option to see all errors.
`);
    }
  }
};

const repeatTest = async (
  options: jest.RepeatWithCanFail | jest.RepeatWithPass | jest.RepeatWithDefaults,
  name: string,
  fn?: jest.ProvidesCallback,
  timeout?: number,
) => {
  if (options.canFailPct && (options.canFailPct < 0 || options.canFailPct > 1)) {
    throw new Error('`canFailPct` must be between 0 and 1');
  }

  const passes: number[] = [];
  const errors: [number, any][] = [];

  return test(`${name} \x1b[33m*Repeat: ${options.times}*\x1b[1;32m`, async () => {
    let runCount = 0;
    for await (const i of [...Array(options.times).keys()]) {
      runCount += 1;
      try {
        if (fn) {
          // @ts-ignore
          await fn();
          passes.push(i);
        }
      } catch (error) {
        errors.push([i, error.stack ?? error.toString()]);
        if (options.stopOnFail) break;
      }
    }
    const failPct = errors.length / runCount;

    handleError({
      name,
      errors,
      failPct,
      canFailPct: options.canFailPct ?? 0,
      passIfOnePasses: options.passIfOnePasses,
      debug: options.debug,
      times: runCount,
      passes,
      stopOnFail: options.stopOnFail,
    });
  }, timeout);
};

const repeatTestOnly = async (
  options: jest.RepeatWithCanFail | jest.RepeatWithPass | jest.RepeatWithDefaults,
  name: string,
  fn?: jest.ProvidesCallback,
  timeout?: number,
) => {
  if (options.canFailPct && (options.canFailPct < 0 || options.canFailPct > 1)) {
    throw new Error('`canFailPct` must be between 0 and 1');
  }

  const passes: number[] = [];
  const errors: [number, any][] = [];

  return test.only(`${name} \x1b[33m*Repeat: ${options.times}*\x1b[1;32m`, async () => {
    let runCount = 0;
    for await (const i of [...Array(options.times).keys()]) {
      runCount += 1;
      try {
        if (fn) {
          // @ts-ignore
          await fn();
          passes.push(i);
        }
      } catch (error) {
        errors.push([i, error.stack ?? error.toString()]);
        if (options.stopOnFail) break;
      }
    }
    const failPct = errors.length / runCount;

    handleError({
      name,
      errors,
      failPct,
      canFailPct: options.canFailPct ?? 0,
      passIfOnePasses: options.passIfOnePasses,
      debug: options.debug,
      times: runCount,
      passes,
      stopOnFail: options.stopOnFail,
    });
  }, timeout);
};

test.repeats = repeatTest;
test.only.repeats = repeatTestOnly;
it.repeats = repeatTest;
it.only.repeats = repeatTestOnly;

/**
 * Extends the Jest matcher interface with a array includes matcher.
 * @param received
 * @returns
 */
function toBeIncludedIn<T>(this: jest.MatcherUtils, received: any, expected: Array<T>): jest.CustomMatcherResult {
  if (!Array.isArray(received)) {
    const pass = expected.includes(received);
    return {
      message: () => `\x1b[31m
  Expected: [\n\t${expected.join(',\n\t')}\n]
  Received: ${received.toString()}
  \x1b[0m`,
      pass,
    };
  }

  const pass = expected.every((e) => received.includes(e));
  const shouldNotBeIncluded = received.filter((e) => !expected.includes(e));

  return {
    message: () => `\x1b[31m
Received: [\n\t${received.join(',\n\t')}\n]
Expected: [\n\t${expected.join(',\n\t')}\n]
${shouldNotBeIncluded.length ? `Should NOT be included: [\n\t${shouldNotBeIncluded.join(',\n\t')}\n]` : ''}
\x1b[0m`,
    pass,
  };
}

/**
 * Extends the Jest matcher interface with a array includes matcher.
 * @param received
 * @returns
 */
function toInclude(this: jest.MatcherUtils, received: any, expected: Primitives): jest.CustomMatcherResult {
  if (!Array.isArray(received)) throw new Error('`toInclude` can only be used with arrays');

  const pass = received.includes(expected);

  return {
    message: () => `\x1b[31m
Received: [\n\t${received.join(',\n\t')}\n]
Expected: ${expected.toString()} to be in the array
\x1b[0m`,
    pass,
  };
}

/**
 * Extends the Jest matcher interface with a number close to.
 * @param expected [number, number] [The number, plusOrMinus]
 * @returns
 */
function toBeInRange(this: jest.MatcherUtils, received: any, expected: [number, number]): jest.CustomMatcherResult {
  const number = expected[0];
  const plusOrMinus = Math.abs(expected[1]);
  const pass = Math.abs(received - number) <= plusOrMinus;

  return {
    message: () => `\x1b[31m
Received: ${received}
Expected: ${received} to be between ${number - plusOrMinus} and ${number + plusOrMinus}
\x1b[0m`,
    pass,
  };
}

/**
 * Extends the Jest matcher interface with a type assertion
 * @param received
 * @returns
 */
function toHaveType<T>(this: jest.MatcherUtils, received: any, expected: 'date' | 'string' | 'boolean' | 'number' | 'array' | 'object' | 'buffer'): jest.CustomMatcherResult {
  let pass = false;

  if (expected === 'buffer') pass = Buffer.isBuffer(received);
  if (expected === 'date') pass = received instanceof Date;
  if (expected === 'string') pass = typeof received === 'string';
  if (expected === 'boolean') pass = typeof received === 'boolean';
  if (expected === 'number') pass = typeof received === 'number';
  if (expected === 'array') pass = Array.isArray(received);
  if (expected === 'object') pass = (typeof received === 'object' && received !== null);

  const receivedType = received === null
    ? 'null'
    : received instanceof Date
      ? 'Date'
      : Array.isArray(received)
        ? 'Array'
        : typeof received;

  return {
    message: () => `\x1b[31m
Expected: ${expected}
Received: ${receivedType}
\x1b[0m`,
    pass,
  };
}

/**
 * Extends the Jest matcher interface with a array includes matcher.
 * @param received
 * @returns
 */
function twoWayIncludes<T extends Primitives>(this: jest.MatcherUtils, received: any, expected: Array<T>): jest.CustomMatcherResult {
  if (!Array.isArray(received)) {
    return {
      message: () => `\x1b[31m
  Expected: [\n\t${expected.join(',\n\t')}\n]
  Received: ${received.toString()}
  \x1b[0m`,
      pass: false,
    };
  }

  const pass = expected.every((e) => received.includes(e)) && received.every((e) => expected.includes(e));
  const shouldBeIncluded = expected.filter((e) => !received.includes(e));
  const shouldNotBeIncluded = received.filter((e) => !expected.includes(e));

  return {
    message: () => `\x1b[31m
Received: [\n\t${received.join(',\n\t')}\n]
Expected: [\n\t${expected.join(',\n\t')}\n]
${shouldBeIncluded.length ? `Should be Included: [\n\t${shouldBeIncluded.join(',\n\t')}\n]` : ''}
${shouldNotBeIncluded.length ? `Should NOT be included: [\n\t${shouldNotBeIncluded.join(',\n\t')}\n]` : ''}
\x1b[0m`,
    pass,
  };
}

function toHaveLengthGtThan(this: jest.MatcherUtils, received: any, expected:number) {
  if (!Array.isArray(received)) {
    return {
      message: () => `\x1b[31m
  Expected value to be instance of Array.
  Received: ${received.toString()}
  \x1b[0m`,
      pass: false,
    };
  }

  const pass = received.length > expected;

  return {
    message: () => `\x1b[31m
Expected: Array to have length greater than: ${expected}
Received: ${received.length.toString()}
\x1b[0m`,
    pass,
  };
}

function toHaveLengthLtThan(this: jest.MatcherUtils, received: any, expected:number) {
  if (!Array.isArray(received)) {
    return {
      message: () => `\x1b[31m
  Expected value to be instance of Array.
  Received: ${received.toString()}
  \x1b[0m`,
      pass: false,
    };
  }

  const pass = received.length < expected;

  return {
    message: () => `\x1b[31m
Expected: Array to have length less than: ${expected}
Received: ${received.length.toString()}
\x1b[0m`,
    pass,
  };
}

expect.extend({
  toBeIncludedIn,
  toInclude,
  twoWayIncludes,
  toHaveType,
  toHaveLengthGtThan,
  toHaveLengthLtThan,
  toBeInRange,
});
