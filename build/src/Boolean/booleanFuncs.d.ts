/**
 * Boolean utility functions
 * @module BooleanUtils
 * @category Boolean
 */
export interface ITranslateBoolean<T = string> {
    value: boolean | string | undefined;
    translation?: {
        true: T;
        false: T;
    };
    fallBack?: boolean | string;
}
/**
 * Translates a boolean value into a user readable string.
 * 'Sim' for true and 'Não' for false, if not translation object was provided.
 * You can customize the translation by providing a translation object like below.
 * @param bool
 * @param translation
 * @example <caption>Example of translation object.</caption>
 * {
 *  true: 'Ativo',
 *  false: 'Desativado',
 * }
 * @returns
 */
export declare const translateBoolean: <T = string>({ value, translation, fallBack }: ITranslateBoolean<T>) => T;
/**
 * Converts a string to a boolean
 * @param val
 * @param fallback the fallback value in case the string param is not 'true' nor 'false
 * @returns
 */
export declare const toBoolean: <T = undefined>(val: unknown, fallback?: T | undefined) => boolean | T;
