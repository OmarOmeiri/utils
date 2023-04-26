import { isNullOrUndefined } from '../../Misc';

type NullOrUndefNum = null | undefined | number;

export type RatiosCurrentParams = {
  currentAssets: NullOrUndefNum,
  currentLiabilities: NullOrUndefNum,
}
/**
 * Current Ratio (higher is better) (Líq. Corrente)
 *
 * CR <- current_assets / current_liabilities
 */
export const RatiosCurrent = ({
  currentAssets,
  currentLiabilities,
}: RatiosCurrentParams): number | null => {
  if (
    isNullOrUndefined(currentAssets)
    || !currentLiabilities
  ) return null;
  return currentAssets / currentLiabilities;
};

export type RatiosQuickParams = {
  currentAssets: NullOrUndefNum,
  currentLiabilities: NullOrUndefNum,
  inventory: NullOrUndefNum,
}
/**
 * Quick Ratio (higher is better) (Líq. Seca)
 *
 * QR <- (current_assets - inventory) / current_liabilities
 */
export const RatiosQuick = ({
  currentAssets,
  currentLiabilities,
  inventory,
}: RatiosQuickParams): number | null => {
  if (
    isNullOrUndefined(currentAssets)
    || !currentLiabilities
    || isNullOrUndefined(inventory)
  ) return null;
  return (currentAssets - inventory) / currentLiabilities;
};

export type RatiosCashParams = {
  cash: NullOrUndefNum,
  currentLiabilities: NullOrUndefNum,
}
/**
 * (Liq. Imediata)
 * The cash ratio is a measurement of a company's liquidity,
 * specifically the ratio of a company's total cash and cash equivalents to its current liabilities. The metric calculates a company's ability to repay its short-term debt with cash or near-cash resources,
 * such as easily marketable securities.
 *
 */
export const RatiosCash = ({
  cash,
  currentLiabilities,
}: RatiosCashParams): number | null => {
  if (
    isNullOrUndefined(cash)
    || !currentLiabilities
  ) return null;

  return cash / currentLiabilities;
};

export type RatiosNetTradeCycleParams = {
  DSO: NullOrUndefNum,
  DIO: NullOrUndefNum,
  DPO: NullOrUndefNum,
}
/**
 * Net trade cycle/ Cash Conversion Cycle (lower is better)
 *
 * NTC <- DSO + DIO - DPO
 */
export const RatiosNetTradeCycle = ({
  DSO,
  DIO,
  DPO,
}: RatiosNetTradeCycleParams): number | null => {
  if (
    isNullOrUndefined(DSO)
    || isNullOrUndefined(DIO)
    || isNullOrUndefined(DPO)
  ) return null;
  return DSO + DIO - DPO;
};

export type RatiosDSOParams = {
  receivables: NullOrUndefNum,
  revenue: NullOrUndefNum,
  period?: number
}
/**
 * receivable days (DSO) (lower is better)
 *
 * DSO <- (receivables / total_revenue) * p
 */
export const RatiosDSO = ({
  receivables,
  revenue,
  period = 365,
}: RatiosDSOParams): number | null => {
  if (
    !receivables
    || !revenue
    || revenue < 0
  ) return null;
  return (receivables / revenue) * period;
};

export type RatiosDIOParams = {
  inventory: NullOrUndefNum,
  COGS: NullOrUndefNum,
  period?: number
}
/**
 * Inventory days (DIO) (lower is better)
 *
 * DIO <- (inventory / COGS) * p
 */
export const RatiosDIO = ({
  inventory,
  COGS,
  period = 365,
}: RatiosDIOParams): number | null => {
  if (
    (!inventory)
    || (!COGS)
  ) return null;
  return (inventory / Math.abs(COGS)) * period;
};

export type RatiosDPOParams = {
  payables: NullOrUndefNum,
  COGS: NullOrUndefNum,
  period?: number
}
/**
 * Payable days (DPO) (lower is better)
 *
 * DPO <- payables * period / COGS
 */
export const RatiosDPO = ({
  payables,
  COGS,
  period = 365,
}: RatiosDPOParams): number | null => {
  if (
    isNullOrUndefined(payables)
    || (!COGS)
  ) return null;
  return (payables * period) / Math.abs(COGS);
};
