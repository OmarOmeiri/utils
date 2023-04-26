import { mean } from '../../Math';
import { isNullOrUndefined } from '../../Misc';

type NullOrUndefNum = null | undefined | number;

export type RatiosPSParams = {
  price: NullOrUndefNum,
  salesPerShare: NullOrUndefNum,
}
/**
* Price to Sales Ratio (PS)
*
* The price-to-sales (P/S) ratio shows how much investors are willing to pay per dollar of sales for a stock.
* The P/S ratio is calculated by dividing the stock price by the underlying company's sales per share.
* A low ratio could imply the stock is undervalued, while a ratio that is higher-than-average could indicate that the stock is overvalued.
* One of the downsides of the P/S ratio is that it doesn’t take into account whether the company makes any earnings or whether it will ever make earnings.
*
* SPS = Sales / Nº of Shares
*
* PS = Price / Sales per Share (SPS)
*/
export const RatiosPS = ({
  price,
  salesPerShare,
}:RatiosPSParams): number | null => {
  if (!price || !salesPerShare) return null;
  return price / salesPerShare;
};

export type RatiosPBParams = {
  price: NullOrUndefNum,
  shareholdersEquity: NullOrUndefNum,
  sharesOutstanding: NullOrUndefNum
}

/**
* Price to Book Ratio (PB) (P/VPA em port)
*
* The P/B ratio measures the market's valuation of a company relative to its book value.
* The market value of equity is typically higher than the book value of a company,
* P/B ratio is used by value investors to identify potential investments.
* P/B ratios under 1 are typically considered solid investments.
*
* BVPS = (Total Assets - Total Liabilities) /  Nº of Shares
*
* PB = Price / Book Value Per Share
*/export const RatiosPB = ({
  price,
  shareholdersEquity,
  sharesOutstanding,
}: RatiosPBParams): number | null => {
  if (
    !price
    || !shareholdersEquity
    || !sharesOutstanding
  ) return null;
  return price / (shareholdersEquity / sharesOutstanding);
};

export type RatiosPEParams = {
  price: NullOrUndefNum,
  sharesOutstanding: NullOrUndefNum,
  netIncome: NullOrUndefNum,
  preferredDividends: NullOrUndefNum
}
/**
 * Price to Earnings (PE) (P/L em portugues)
 *
 * The price-to-earnings ratio (P/E ratio) is the ratio for
 * valuing a company that measures its current share price relative to its earnings per share (EPS).
 *
 * P/E ratios are used by investors and analysts to determine the relative value of a company's shares in an apples-to-apples comparison.
 * It can also be used to compare a company against its own historical record or to compare aggregate markets against one another or over time.
 *
 * PE <- Price / Earnings per Share (EPS)
 */
export const RatiosPE = ({
  price,
  sharesOutstanding,
  netIncome,
  preferredDividends,
}: RatiosPEParams): number | null => {
  if (
    isNullOrUndefined(netIncome)
    || !sharesOutstanding
    || !price
  ) return null;
  const earningsPerShare = (netIncome - (preferredDividends || 0)) / sharesOutstanding;
  if (earningsPerShare === 0) return null;
  return price / earningsPerShare;
};

export type RatiosDYParams = {
  price: NullOrUndefNum,
  annualDividendsPerShare: NullOrUndefNum
}
/**
* Dividend Yield (DY)
*
* Dividend Yield = Annual Dividends/ Current Price Per Share
*/
export const RatiosDY = ({
  price,
  annualDividendsPerShare,
}: RatiosDYParams): number | null => {
  if (!annualDividendsPerShare) return 0;
  if (!price) return null;
  return Math.max((annualDividendsPerShare / price) || 0, 0);
};

export type RatiosSPSParams = {
  sales: NullOrUndefNum,
  sharesOutstanding: NullOrUndefNum,
}
/**
* Sales per share (SPS)
*/
export const RatiosSPS = ({
  sales,
  sharesOutstanding,
}:RatiosSPSParams): number | null => {
  if (!sharesOutstanding) return null;
  if (isNullOrUndefined(sales)) return null;
  return sales / sharesOutstanding;
};

export type RatiosEVSParams = {
  EV: NullOrUndefNum,
  sales: NullOrUndefNum,
}
/**
 * Enterprise value to Sales (EVS)
 *
 * EV = (Price * Nº of shares) + Total Debt - Cash
 *
 * EVS = EV / Sales
 */
export const RatiosEVS = ({
  EV,
  sales,
}:RatiosEVSParams): number | null => {
  if (!sales || !EV) return null;
  return EV / sales;
};

export type RatiosEVEBITDAParams = {
  EV: NullOrUndefNum,
  EBITDA: NullOrUndefNum,
}
/**
 * Enterprise value to EBITDA
 *
 * EV = (Price * Nº of shares) + Total Debt - Cash
 *
 * EVTEBITDA = EV / EBITDA
 */
export const RatiosEVEBITDA = ({
  EV,
  EBITDA,
}: RatiosEVEBITDAParams): number | null => {
  if (!EBITDA || !EV) return null;
  return EV / EBITDA;
};

export type RatiosEVEBITParams = {
  EV: NullOrUndefNum,
  EBIT: NullOrUndefNum,
}
/**
 * Enterprise value to EBIT
 *
 * EV = (Price * Nº of shares) + Total Debt - Cash
 *
 * EVTEBIT = EV / EBIT
 */
export const RatiosEVEBIT = ({
  EV,
  EBIT,
}: RatiosEVEBITParams): number | null => {
  if (!EBIT || !EV) return null;
  return EV / EBIT;
};

export type RatiosNetAssetToAssetParams = {
  shareholdersEquity: NullOrUndefNum,
  totalAssets: NullOrUndefNum,
}
/**
 * Net Assets to asset ratio (higher is better)
 *
 * NATA <- net_assets / total_assets
 */
export const RatiosNetAssetToAsset = ({
  shareholdersEquity,
  totalAssets,
}: RatiosNetAssetToAssetParams): number | null => {
  if (!shareholdersEquity || !totalAssets) return null;
  return shareholdersEquity / totalAssets;
};

export type RatiosAssetTurnoverParams = {
  revenue: NullOrUndefNum,
  beginAssets: NullOrUndefNum,
  endAssets: NullOrUndefNum
}
/**
 * Asset turnover
 *
 * AT <- total_revenue / ((begin_assets + end_assets) / 2)
 */
export const RatiosAssetTurnover = ({
  revenue,
  beginAssets,
  endAssets,
}: RatiosAssetTurnoverParams): number | null => {
  if (
    isNullOrUndefined(revenue)
    || !beginAssets
    || !endAssets
  ) return null;
  return revenue / (mean(beginAssets, endAssets));
};

export type RatiosCAGRParams = {
  beginValue: NullOrUndefNum,
  endValue: NullOrUndefNum,
  period: number,
}
/**
 * Compound annual growth rate
 */
export const RatiosCAGR = ({
  beginValue,
  endValue,
  period,
}: RatiosCAGRParams): number | null => {
  if (
    isNullOrUndefined(endValue)
    || isNullOrUndefined(beginValue)
  ) return null;
  if (beginValue > 0 && endValue > 0) return (endValue / beginValue) ** (1 / period) - 1;
  if (beginValue < 0 && endValue < 0) return (-1) * ((Math.abs(endValue) / Math.abs(beginValue)) ** (1 / period) - 1);
  if (beginValue < 0 && endValue > 0) return ((endValue + 2 * Math.abs(beginValue)) / Math.abs(beginValue)) ** (1 / period) - 1;
  if (beginValue > 0 && endValue < 0) return (-1) * (((Math.abs(endValue) + 2 * beginValue) / beginValue) ** (1 / period) - 1);
  return null;
};

export type RatiosNAVPSParams = {
  shareholdersEquity: NullOrUndefNum,
  sharesOutstanding: NullOrUndefNum,
}
/**
 * Net Asset Value Per Share (NAVPS)
 *
 *  net_assets = Total Assets – Total Liabilities
 *
 * Net asset value per share (NAVPS) is an expression for net asset value that
 * represents the value per share of a mutual fund, an exchange-traded fund (ETF), or a closed-end fund.
 *
 * It is calculated by dividing the total net asset value of the fund or company by the
 * number of shares outstanding and is also known as book value per share.
 *
 * NAVPS <- Net Assets / Number of Shares
 */
export const RatiosNAVPS = ({
  shareholdersEquity,
  sharesOutstanding,
}: RatiosNAVPSParams): number | null => {
  if (
    isNullOrUndefined(shareholdersEquity)
    || !sharesOutstanding
  ) return null;
  return shareholdersEquity / sharesOutstanding;
};

export type RatiosEPSParams = {
  netIncome: NullOrUndefNum,
  sharesOutstanding: NullOrUndefNum,
  preferredDividends: NullOrUndefNum
}
/**
 * Earnings per share (EPS) (LPA em port)
 *
 * EPS, which stands for earnings per share, represents a company's annualized net profit
 * divided by the number of common shares of stock it has outstanding.
 *
 * Because it's a measure of profitability on a per-share basis,
 * EPS is commonly used by investors to estimate the value of a company, per share.
 *
 * EPS = (Net Income – Preferred Dividends) / End of period Shares Outstanding
  */
export const RatiosEPS = ({
  netIncome,
  sharesOutstanding,
  preferredDividends,
}: RatiosEPSParams): number | null => {
  if (
    isNullOrUndefined(netIncome)
    || !sharesOutstanding
  ) return null;
  return (netIncome - (preferredDividends || 0)) / sharesOutstanding;
};

export type RatiosMarketCapParams = {
  price: NullOrUndefNum,
  sharesOutstanding: NullOrUndefNum,
}

export const RatiosMarketCap = ({
  price,
  sharesOutstanding,
}: RatiosMarketCapParams): number | null => {
  if (!price || !sharesOutstanding) return null;
  return price * sharesOutstanding;
};

export type RatiosChowderPassParams = {
  DY: NullOrUndefNum,
  CAGR5D: NullOrUndefNum,
}
export const RatiosChowderPass = ({
  DY,
  CAGR5D,
}: RatiosChowderPassParams): boolean => {
  if (!DY || !CAGR5D) return false;
  if (CAGR5D < 0) return false;

  const chowderNumber = DY + CAGR5D;
  if (DY > 0.03 && chowderNumber > 0.12) return true;
  if (DY <= 0.03 && chowderNumber > 0.15) return true;
  return false;
};

export type RatiosPayoutParams = {
  annualDividends: NullOrUndefNum,
  netIncome: NullOrUndefNum,
}
/**
 *  Dividend payout Ratio
 *
 * DP <- annualDividend / netIncome
 * @param param0
 * @returns
 */
export const RatiosPayout = ({
  annualDividends,
  netIncome,
}: RatiosPayoutParams): number | null => {
  if (!annualDividends || annualDividends === 0) return 0;
  if (!netIncome || netIncome === 0) return null;
  return annualDividends / netIncome;
};

export type RatiosBVPSParams = {
  shareholdersEquity: NullOrUndefNum,
  sharesOutstanding: NullOrUndefNum,
}
/**
 * Book Value Per Share (BVPS) (VPA em port.)
 *
 * Book value per share (BVPS) is the ratio of equity
 * available to common shareholders divided by the number of outstanding shares.
 * @param param0
 * @returns
 */
export const RatiosBVPS = ({
  shareholdersEquity,
  sharesOutstanding,
}: RatiosBVPSParams): number | null => {
  if (!shareholdersEquity || !sharesOutstanding) return null;
  return shareholdersEquity / sharesOutstanding;
};
