import { isNullOrUndefined } from '../Misc';

type NullOrUndefNum = null | undefined | number;

export type EVParams = {
  price: NullOrUndefNum,
  sharesOutstanding: NullOrUndefNum,
  totalDebt: NullOrUndefNum,
  cash: NullOrUndefNum,
}
/**
 * Enterprise value
 *
 * EV = (Price * Nº of shares) + (Total Debt - Cash)
 *
 */
export const EV = ({
  price,
  sharesOutstanding,
  totalDebt,
  cash,
}:EVParams): number | null => {
  if (
    !price
    || (!sharesOutstanding)
    || isNullOrUndefined(totalDebt)
    || isNullOrUndefined(cash)
  ) return null;
  return (price * sharesOutstanding) + (totalDebt - cash);
};

export type TaxRateParams = {
  earningsBeforeTax: NullOrUndefNum,
  totalTax: NullOrUndefNum,
}
/**
 * The corporate tax rate is also known
 * as the effective tax rate. It is the percentage of a company's income it pays in taxes.
 * @returns
 */
export const taxRate = ({
  earningsBeforeTax,
  totalTax,
}: TaxRateParams): number | null => {
  if (
    isNullOrUndefined(totalTax)
    || isNullOrUndefined(earningsBeforeTax)
  ) return null;
  return totalTax / earningsBeforeTax;
};

export type NOPATParams = {
  EBIT: NullOrUndefNum
  taxRate: NullOrUndefNum,
}
/**
 * NOPAT is after-tax operating cash generated
 * by a company and available for all investors—both shareholders and debtholders.
 * @returns
 */
export const NOPAT = ({
  EBIT,
  // eslint-disable-next-line @typescript-eslint/no-shadow
  taxRate,
}: NOPATParams): number | null => {
  if (isNullOrUndefined(EBIT) || isNullOrUndefined(taxRate)) return null;
  return EBIT * (1 - taxRate);
};

export type InvestedCapitalParams = {
  totalDebt: NullOrUndefNum,
  totalEquity: NullOrUndefNum,
  nonOperatingCashAndInvestments: NullOrUndefNum
}
/**
 * Invested capital is the investment made by both shareholders and debtholders in a company
 * @returns
 */
export const investedCapital = ({
  totalDebt,
  totalEquity,
  nonOperatingCashAndInvestments,
}: InvestedCapitalParams): number | null => {
  if (
    isNullOrUndefined(totalDebt)
    || !totalEquity
    || isNullOrUndefined(nonOperatingCashAndInvestments)
  ) return null;
  return totalDebt + totalEquity + nonOperatingCashAndInvestments;
};

export type OperatingIncomeParams = {
  grossIncome: NullOrUndefNum,
  operatingExpenses: NullOrUndefNum,
}
/**
 * Operating income is a measurement that shows
 * how much of a company's revenue will eventually become profits.
 */
export const operatingIncome = ({
  grossIncome,
  operatingExpenses,
}: OperatingIncomeParams): number | null => {
  if (
    isNullOrUndefined(grossIncome)
    || isNullOrUndefined(operatingExpenses)
  ) return null;
  return grossIncome - operatingExpenses;
};

export type GrossMarginParams = {
  grossIncome: NullOrUndefNum,
  COGS: NullOrUndefNum,
}

export type NetDebtParams = {
  totalDebt: NullOrUndefNum,
  cash: NullOrUndefNum
}
/**
 * Net debt is a financial liquidity metric that
 * measures a company’s ability to pay all its debts if they were due today.
 */
export const netDebt = ({
  totalDebt,
  cash,
}: NetDebtParams): number | null => {
  if (
    isNullOrUndefined(totalDebt)
    || isNullOrUndefined(cash)
  ) return null;
  return totalDebt - cash;
};

export type EBITParams = {
  netIncome: NullOrUndefNum,
  taxes: NullOrUndefNum
  interest: NullOrUndefNum,
}

export const EBIT = ({
  netIncome,
  taxes,
  interest,
}:EBITParams): number | null => {
  if (
    isNullOrUndefined(netIncome)
    || isNullOrUndefined(taxes)
    || isNullOrUndefined(interest)
  ) return null;
  return netIncome + interest + taxes;
};

export const growthStreak = (vals: number[], asc = true): number => {
  let streak = 0;
  let last = vals[0];
  for (const val of vals) {
    if (asc && val > last) streak += 1;
    else if (!asc && val < last) streak += 1;
    else streak = 0;
    last = val;
  }
  return streak;
};
