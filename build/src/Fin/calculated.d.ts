declare type NullOrUndefNum = null | undefined | number;
export declare type EVParams = {
    price: NullOrUndefNum;
    sharesOutstanding: NullOrUndefNum;
    totalDebt: NullOrUndefNum;
    cash: NullOrUndefNum;
};
/**
 * Enterprise value
 *
 * EV = (Price * Nº of shares) + (Total Debt - Cash)
 *
 */
export declare const EV: ({ price, sharesOutstanding, totalDebt, cash, }: EVParams) => number | null;
export declare type TaxRateParams = {
    earningsBeforeTax: NullOrUndefNum;
    totalTax: NullOrUndefNum;
};
/**
 * The corporate tax rate is also known
 * as the effective tax rate. It is the percentage of a company's income it pays in taxes.
 * @returns
 */
export declare const taxRate: ({ earningsBeforeTax, totalTax, }: TaxRateParams) => number | null;
export declare type NOPATParams = {
    EBIT: NullOrUndefNum;
    taxRate: NullOrUndefNum;
};
/**
 * NOPAT is after-tax operating cash generated
 * by a company and available for all investors—both shareholders and debtholders.
 * @returns
 */
export declare const NOPAT: ({ EBIT, taxRate, }: NOPATParams) => number | null;
export declare type InvestedCapitalParams = {
    totalDebt: NullOrUndefNum;
    totalEquity: NullOrUndefNum;
    nonOperatingCashAndInvestments: NullOrUndefNum;
};
/**
 * Invested capital is the investment made by both shareholders and debtholders in a company
 * @returns
 */
export declare const investedCapital: ({ totalDebt, totalEquity, nonOperatingCashAndInvestments, }: InvestedCapitalParams) => number | null;
export declare type OperatingIncomeParams = {
    grossIncome: NullOrUndefNum;
    operatingExpenses: NullOrUndefNum;
};
/**
 * Operating income is a measurement that shows
 * how much of a company's revenue will eventually become profits.
 */
export declare const operatingIncome: ({ grossIncome, operatingExpenses, }: OperatingIncomeParams) => number | null;
export declare type GrossMarginParams = {
    grossIncome: NullOrUndefNum;
    COGS: NullOrUndefNum;
};
export declare type NetDebtParams = {
    totalDebt: NullOrUndefNum;
    cash: NullOrUndefNum;
};
/**
 * Net debt is a financial liquidity metric that
 * measures a company’s ability to pay all its debts if they were due today.
 */
export declare const netDebt: ({ totalDebt, cash, }: NetDebtParams) => number | null;
export declare type EBITParams = {
    netIncome: NullOrUndefNum;
    taxes: NullOrUndefNum;
    interest: NullOrUndefNum;
};
export declare const EBIT: ({ netIncome, taxes, interest, }: EBITParams) => number | null;
export declare const growthStreak: (vals: number[], asc?: boolean) => number;
export {};
