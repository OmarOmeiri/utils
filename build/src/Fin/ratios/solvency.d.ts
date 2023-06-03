type NullOrUndefNum = null | undefined | number;
export type RatiosDebtToAssetParams = {
    totalAssets: NullOrUndefNum;
    totalDebt: NullOrUndefNum;
};
/**
 * Debt ratio (lower is better) (0.67 is acceptable)
 *
 * DR <- total_debt / total_assets
 */
export declare const RatiosDebtToAsset: ({ totalAssets, totalDebt, }: RatiosDebtToAssetParams) => number | null;
export type RatiosNetDebtToAssetParams = {
    totalAssets: NullOrUndefNum;
    netDebt: NullOrUndefNum;
};
/**
 * Net Debt to asset ratio (lower is better)
 *
 * NDTA <- net_debt / total_assets
 */
export declare const RatiosNetDebtToAsset: ({ totalAssets, netDebt, }: RatiosNetDebtToAssetParams) => number | null;
export type RatiosNetDebtToNetAssetParams = {
    shareholdersEquity: NullOrUndefNum;
    netDebt: NullOrUndefNum;
};
/**
 * Net Debt to net asset ratio (lower is better)
 *
 * NDTNA <- net_debt / net_assets
 */
export declare const RatiosNetDebtToNetAsset: ({ shareholdersEquity, netDebt, }: RatiosNetDebtToNetAssetParams) => number | null;
export type RatiosNetDebtToEBITDAParams = {
    netDebt: NullOrUndefNum;
    EBITDA: NullOrUndefNum;
};
/**
 * Net Debt to EBITDA (lower is better)
 *
 * NDEBITDA <- net_debt / EBITDA
 */
export declare const RatiosNetDebtToEBITDA: ({ netDebt, EBITDA, }: RatiosNetDebtToEBITDAParams) => number | null;
export type RatiosNetDebtToEbitParams = {
    netDebt: NullOrUndefNum;
    EBIT: NullOrUndefNum;
};
/**
 * Net Debt to EBIT (lower is better)
 *
 * NDEBIT <- net_debt / EBIT
 */
export declare const RatiosNetDebtToEbit: ({ netDebt, EBIT, }: RatiosNetDebtToEbitParams) => number | null;
/**
* Debt to equity ratio (lower is better)
*
* The debt-to-equity (D/E) ratio is used to evaluate a company's financial leverage
* and is calculated by dividing a company’s total liabilities by its shareholder equity.
*
* The D/E ratio is an important metric used in corporate finance.
* It is a measure of the degree to which a company is financing its operations through debt versus wholly owned funds.
*
* More specifically, it reflects the ability of shareholder equity to cover all outstanding debts in the event of a business downturn.
*
* DTE <- total_liabilities / shareholders_equity
*/
export type RatiosDebtToEquityParams = {
    shareholdersEquity: NullOrUndefNum;
    totalLiabilities: NullOrUndefNum;
};
export declare const RatiosDebtToEquity: ({ shareholdersEquity, totalLiabilities, }: RatiosDebtToEquityParams) => number | null;
export type RatiosInterestCoverageParams = {
    interestExpenses: NullOrUndefNum;
    EBIT: NullOrUndefNum;
};
/**
* Interest coverage ratio (Higher is better)
*
* The interest coverage ratio is used to measure how well a firm can pay the interest due on outstanding debt.
*
* ICC <- EBIT / interest_expenses
*/
export declare const RatiosInterestCoverage: ({ interestExpenses, EBIT, }: RatiosInterestCoverageParams) => number | null;
export {};
