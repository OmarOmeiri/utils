declare type NullOrUndefNum = null | undefined | number;
export declare type RatiosPSParams = {
    price: NullOrUndefNum;
    salesPerShare: NullOrUndefNum;
};
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
export declare const RatiosPS: ({ price, salesPerShare, }: RatiosPSParams) => number | null;
export declare type RatiosPBParams = {
    price: NullOrUndefNum;
    shareholdersEquity: NullOrUndefNum;
    sharesOutstanding: NullOrUndefNum;
};
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
*/ export declare const RatiosPB: ({ price, shareholdersEquity, sharesOutstanding, }: RatiosPBParams) => number | null;
export declare type RatiosPEParams = {
    price: NullOrUndefNum;
    sharesOutstanding: NullOrUndefNum;
    netIncome: NullOrUndefNum;
    preferredDividends: NullOrUndefNum;
};
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
export declare const RatiosPE: ({ price, sharesOutstanding, netIncome, preferredDividends, }: RatiosPEParams) => number | null;
export declare type RatiosDYParams = {
    price: NullOrUndefNum;
    annualDividendsPerShare: NullOrUndefNum;
};
/**
* Dividend Yield (DY)
*
* Dividend Yield = Annual Dividends/ Current Price Per Share
*/
export declare const RatiosDY: ({ price, annualDividendsPerShare, }: RatiosDYParams) => number | null;
export declare type RatiosSPSParams = {
    sales: NullOrUndefNum;
    sharesOutstanding: NullOrUndefNum;
};
/**
* Sales per share (SPS)
*/
export declare const RatiosSPS: ({ sales, sharesOutstanding, }: RatiosSPSParams) => number | null;
export declare type RatiosEVSParams = {
    EV: NullOrUndefNum;
    sales: NullOrUndefNum;
};
/**
 * Enterprise value to Sales (EVS)
 *
 * EV = (Price * Nº of shares) + Total Debt - Cash
 *
 * EVS = EV / Sales
 */
export declare const RatiosEVS: ({ EV, sales, }: RatiosEVSParams) => number | null;
export declare type RatiosEVEBITDAParams = {
    EV: NullOrUndefNum;
    EBITDA: NullOrUndefNum;
};
/**
 * Enterprise value to EBITDA
 *
 * EV = (Price * Nº of shares) + Total Debt - Cash
 *
 * EVTEBITDA = EV / EBITDA
 */
export declare const RatiosEVEBITDA: ({ EV, EBITDA, }: RatiosEVEBITDAParams) => number | null;
export declare type RatiosEVEBITParams = {
    EV: NullOrUndefNum;
    EBIT: NullOrUndefNum;
};
/**
 * Enterprise value to EBIT
 *
 * EV = (Price * Nº of shares) + Total Debt - Cash
 *
 * EVTEBIT = EV / EBIT
 */
export declare const RatiosEVEBIT: ({ EV, EBIT, }: RatiosEVEBITParams) => number | null;
export declare type RatiosNetAssetToAssetParams = {
    shareholdersEquity: NullOrUndefNum;
    totalAssets: NullOrUndefNum;
};
/**
 * Net Assets to asset ratio (higher is better)
 *
 * NATA <- net_assets / total_assets
 */
export declare const RatiosNetAssetToAsset: ({ shareholdersEquity, totalAssets, }: RatiosNetAssetToAssetParams) => number | null;
export declare type RatiosAssetTurnoverParams = {
    revenue: NullOrUndefNum;
    beginAssets: NullOrUndefNum;
    endAssets: NullOrUndefNum;
};
/**
 * Asset turnover
 *
 * AT <- total_revenue / ((begin_assets + end_assets) / 2)
 */
export declare const RatiosAssetTurnover: ({ revenue, beginAssets, endAssets, }: RatiosAssetTurnoverParams) => number | null;
export declare type RatiosCAGRParams = {
    beginValue: NullOrUndefNum;
    endValue: NullOrUndefNum;
    period: number;
};
/**
 * Compound annual growth rate
 */
export declare const RatiosCAGR: ({ beginValue, endValue, period, }: RatiosCAGRParams) => number | null;
export declare type RatiosNAVPSParams = {
    shareholdersEquity: NullOrUndefNum;
    sharesOutstanding: NullOrUndefNum;
};
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
export declare const RatiosNAVPS: ({ shareholdersEquity, sharesOutstanding, }: RatiosNAVPSParams) => number | null;
export declare type RatiosEPSParams = {
    netIncome: NullOrUndefNum;
    sharesOutstanding: NullOrUndefNum;
    preferredDividends: NullOrUndefNum;
};
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
export declare const RatiosEPS: ({ netIncome, sharesOutstanding, preferredDividends, }: RatiosEPSParams) => number | null;
export declare type RatiosMarketCapParams = {
    price: NullOrUndefNum;
    sharesOutstanding: NullOrUndefNum;
};
export declare const RatiosMarketCap: ({ price, sharesOutstanding, }: RatiosMarketCapParams) => number | null;
export declare type RatiosChowderPassParams = {
    DY: NullOrUndefNum;
    CAGR5D: NullOrUndefNum;
};
export declare const RatiosChowderPass: ({ DY, CAGR5D, }: RatiosChowderPassParams) => boolean;
export declare type RatiosPayoutParams = {
    annualDividends: NullOrUndefNum;
    netIncome: NullOrUndefNum;
};
/**
 *  Dividend payout Ratio
 *
 * DP <- annualDividend / netIncome
 * @param param0
 * @returns
 */
export declare const RatiosPayout: ({ annualDividends, netIncome, }: RatiosPayoutParams) => number | null;
export declare type RatiosBVPSParams = {
    shareholdersEquity: NullOrUndefNum;
    sharesOutstanding: NullOrUndefNum;
};
/**
 * Book Value Per Share (BVPS) (VPA em port.)
 *
 * Book value per share (BVPS) is the ratio of equity
 * available to common shareholders divided by the number of outstanding shares.
 * @param param0
 * @returns
 */
export declare const RatiosBVPS: ({ shareholdersEquity, sharesOutstanding, }: RatiosBVPSParams) => number | null;
export {};
