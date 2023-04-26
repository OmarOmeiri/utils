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
export declare const getDurationInMilliseconds: (start: bigint) => number;
/**
 * Converts a time (ms) to a human readable string
 * @param ms
 * @param bits - number of bits to convert BigInt
 * @returns
 */
export declare function readableTime(ms: number | bigint, bits?: number): string;
export declare const TimeConv: {
    MS(value: number): {
        toS(): number;
        toMin(): number;
        toH(): number;
        toD(): number;
    };
    S(value: number): {
        toMs(): number;
        toMin(): number;
        toH(): number;
        toD(): number;
    };
    MIN(value: number): {
        toMs(): number;
        toS(): number;
        toH(): number;
        toD(): number;
    };
    H(value: number): {
        toMs(): number;
        toS(): number;
        toMin(): number;
        toD(): number;
    };
    D(value: number): {
        toMs(): number;
        toS(): number;
        toMin(): number;
        toH(): number;
    };
};
