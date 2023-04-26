export {};
declare global {
  namespace jest {
    interface Matchers<R> {
      toBeIncludedIn<T>(expected: Array<T>): CustomMatcherResult;
      twoWayIncludes<T>(expected: Array<T>): CustomMatcherResult;
      toInclude(expected: Primitives): CustomMatcherResult;
      toThrowErrorWith<E extends Errors, K extends ErrorKeys<E>>(...expected: ExpectedErrorWith<E, K>): Promise<CustomMatcherResult>
      toRun(): CustomMatcherResult;
      toHaveType(expected: 'date' | 'string' | 'boolean' | 'number' | 'array' | 'object' | 'buffer'): CustomMatcherResult
      toHaveLengthGtThan(expected:number): CustomMatcherResult;
      toHaveLengthLtThan(expected:number): CustomMatcherResult;
      toBeInRange(expected: [number, number]): jest.CustomMatcherResult
    }

    type RepeatWithCanFail = {
      times: number,
      stopOnFail?: undefined,
      canFailPct: number,
      passIfOnePasses?: undefined,
      debug?: boolean,
    }

    type RepeatWithPass = {
      times: number,
      stopOnFail?: undefined,
      canFailPct?: undefined,
      passIfOnePasses: boolean,
      debug?: boolean,
    }

    type RepeatWithDefaults = {
      times: number,
      stopOnFail?: boolean,
      canFailPct?: undefined,
      passIfOnePasses?: undefined,
      debug?: boolean,
    }

    type RepeatOpts<O = any> =
    O extends RepeatWithCanFail
    ? RepeatWithCanFail
    : O extends RepeatWithPass
    ? RepeatWithPass
    : RepeatWithDefaults;

    interface It {
      repeats: <O extends RepeatOpts>(
        options: RepeatOpts<O>,
        name: string,
        fn?: jest.ProvidesCallback,
        timeout?: number,
      ) => void;
    }
  }
}
