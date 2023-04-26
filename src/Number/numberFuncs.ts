const REGEX_UNWANTED_CHARACTERS = /[^\d\-.,]/g;
const REGEX_DASHES_EXCEPT_BEGINNING = /(?!^)-/g;
const REGEX_PERIODS_EXEPT_LAST = /\.(?=.*\.)/g;

/** */
function formatNumber(number: string, thousandSep?: string): string {
  if (typeof number !== 'string') return 'NaN';
  // eslint-disable-next-line no-param-reassign
  number = number.trim();
  if (thousandSep) {
    const thousandSplit = number.split(thousandSep);
    thousandSplit.shift();
    if (thousandSplit.every((s) => s.length === 3)) {
      // eslint-disable-next-line no-param-reassign
      number = number.replace(new RegExp(`\\${thousandSep}`, 'g'), '');
    }
  }

  // Handle exponentials
  if ((number.match(/e/g) ?? []).length === 1) {
    const numberParts = number.split('e');
    return `${formatNumber(numberParts[0])}e${formatNumber(numberParts[1])}`;
  }

  const sanitizedNumber = number
    .replace(REGEX_UNWANTED_CHARACTERS, '')
    .replace(REGEX_DASHES_EXCEPT_BEGINNING, '');

  // Handle only thousands separator
  if (
    ((sanitizedNumber.match(/,/g) ?? []).length >= 2 && !sanitizedNumber.includes('.'))
    || ((sanitizedNumber.match(/\./g) ?? []).length >= 2 && !sanitizedNumber.includes(','))
  ) {
    return sanitizedNumber.replace(/[.,]/g, '');
  }

  return sanitizedNumber.replace(/,/g, '.').replace(REGEX_PERIODS_EXEPT_LAST, '');
}
/**
 * Parses a string to a number
 *
 * @param number
 * @returns
 */
export function parseStrToNumber(number: string | number, thousandSep?: string): number {
  if (typeof number === 'number') return number;
  return Number(formatNumber(number, thousandSep));
}

type isNumberConfig = {
  int?: boolean,
  nan?: boolean
}

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
export function isNumber(value: unknown, config: isNumberConfig = { nan: true }): value is number {
  if (typeof value !== 'number') return false;
  if (!config) return true;
  if (config.nan && Number.isNaN(Number(value))) return false;
  if (config.int && !Number.isInteger(value)) return false;
  return true;
}
