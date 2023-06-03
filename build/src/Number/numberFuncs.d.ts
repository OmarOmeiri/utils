/**
 * Parses a string to a number
 *
 * @param number
 * @returns
 */
export declare function parseStrToNumber(number: string | number, thousandSep?: string): number;
type isNumberConfig = {
    int?: boolean;
    nan?: boolean;
};
/**
 * Checks if is a number.
 *
 * IMPORANT!!!
 *
 * NAN returns false by default. You can change the behavior in the config param
 * @param value
 * @param config
 * @returns
 */
export declare function isNumber(value: unknown, config?: isNumberConfig): value is number;
export {};
