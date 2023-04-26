/**
 * Boolean utility functions
 * @module BooleanUtils
 * @category Boolean
 */

export interface ITranslateBoolean<T = string> {
  value: boolean | string | undefined
  translation?: {
    true: T,
    false: T,
  }
  fallBack?: boolean | string
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
export const translateBoolean = <T = string>({ value, translation, fallBack }: ITranslateBoolean<T>): T => {
  let isTrue;
  if (value !== false && !value) return fallBack ?? ('' as any);

  if (typeof value === 'string') isTrue = (value.trim() === 'true');
  else isTrue = value;

  if (translation && isTrue) return translation.true;

  if (translation && !isTrue) return translation.false;

  if (!translation && !isTrue) return 'Não' as any;

  return 'Sim' as any;
};

/**
 * Converts a string to a boolean
 * @param val
 * @param fallback the fallback value in case the string param is not 'true' nor 'false
 * @returns
 */
export const toBoolean = <T = undefined>(
  val: unknown,
  fallback?: T,
): T | boolean => {
  if (typeof val === 'string') {
    if (val.trim() === 'true') return true;
    if (val.trim() === 'false') return false;
  } else if (typeof val === 'boolean') return val;
  return fallback as T;
};
