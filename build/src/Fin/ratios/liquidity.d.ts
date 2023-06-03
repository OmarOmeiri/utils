type NullOrUndefNum = null | undefined | number;
export type RatiosCurrentParams = {
    currentAssets: NullOrUndefNum;
    currentLiabilities: NullOrUndefNum;
};
/**
 * Current Ratio (higher is better) (Líq. Corrente)
 *
 * CR <- current_assets / current_liabilities
 */
export declare const RatiosCurrent: ({ currentAssets, currentLiabilities, }: RatiosCurrentParams) => number | null;
export type RatiosQuickParams = {
    currentAssets: NullOrUndefNum;
    currentLiabilities: NullOrUndefNum;
    inventory: NullOrUndefNum;
};
/**
 * Quick Ratio (higher is better) (Líq. Seca)
 *
 * QR <- (current_assets - inventory) / current_liabilities
 */
export declare const RatiosQuick: ({ currentAssets, currentLiabilities, inventory, }: RatiosQuickParams) => number | null;
export type RatiosCashParams = {
    cash: NullOrUndefNum;
    currentLiabilities: NullOrUndefNum;
};
/**
 * (Liq. Imediata)
 * The cash ratio is a measurement of a company's liquidity,
 * specifically the ratio of a company's total cash and cash equivalents to its current liabilities. The metric calculates a company's ability to repay its short-term debt with cash or near-cash resources,
 * such as easily marketable securities.
 *
 */
export declare const RatiosCash: ({ cash, currentLiabilities, }: RatiosCashParams) => number | null;
export type RatiosNetTradeCycleParams = {
    DSO: NullOrUndefNum;
    DIO: NullOrUndefNum;
    DPO: NullOrUndefNum;
};
/**
 * Net trade cycle/ Cash Conversion Cycle (lower is better)
 *
 * NTC <- DSO + DIO - DPO
 */
export declare const RatiosNetTradeCycle: ({ DSO, DIO, DPO, }: RatiosNetTradeCycleParams) => number | null;
export type RatiosDSOParams = {
    receivables: NullOrUndefNum;
    revenue: NullOrUndefNum;
    period?: number;
};
/**
 * receivable days (DSO) (lower is better)
 *
 * DSO <- (receivables / total_revenue) * p
 */
export declare const RatiosDSO: ({ receivables, revenue, period, }: RatiosDSOParams) => number | null;
export type RatiosDIOParams = {
    inventory: NullOrUndefNum;
    COGS: NullOrUndefNum;
    period?: number;
};
/**
 * Inventory days (DIO) (lower is better)
 *
 * DIO <- (inventory / COGS) * p
 */
export declare const RatiosDIO: ({ inventory, COGS, period, }: RatiosDIOParams) => number | null;
export type RatiosDPOParams = {
    payables: NullOrUndefNum;
    COGS: NullOrUndefNum;
    period?: number;
};
/**
 * Payable days (DPO) (lower is better)
 *
 * DPO <- payables * period / COGS
 */
export declare const RatiosDPO: ({ payables, COGS, period, }: RatiosDPOParams) => number | null;
export {};
