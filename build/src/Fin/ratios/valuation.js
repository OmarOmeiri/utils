"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RatiosBVPS = exports.RatiosPayout = exports.RatiosChowderPass = exports.RatiosMarketCap = exports.RatiosEPS = exports.RatiosNAVPS = exports.RatiosCAGR = exports.RatiosAssetTurnover = exports.RatiosNetAssetToAsset = exports.RatiosEVEBIT = exports.RatiosEVEBITDA = exports.RatiosEVS = exports.RatiosSPS = exports.RatiosDY = exports.RatiosPE = exports.RatiosPB = exports.RatiosPS = void 0;
const Math_1 = require("../../Math");
const Misc_1 = require("../../Misc");
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
const RatiosPS = ({ price, salesPerShare, }) => {
    if (!price || !salesPerShare)
        return null;
    return price / salesPerShare;
};
exports.RatiosPS = RatiosPS;
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
*/ const RatiosPB = ({ price, shareholdersEquity, sharesOutstanding, }) => {
    if (!price
        || !shareholdersEquity
        || !sharesOutstanding)
        return null;
    return price / (shareholdersEquity / sharesOutstanding);
};
exports.RatiosPB = RatiosPB;
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
const RatiosPE = ({ price, sharesOutstanding, netIncome, preferredDividends, }) => {
    if ((0, Misc_1.isNullOrUndefined)(netIncome)
        || !sharesOutstanding
        || !price)
        return null;
    const earningsPerShare = (netIncome - (preferredDividends || 0)) / sharesOutstanding;
    if (earningsPerShare === 0)
        return null;
    return price / earningsPerShare;
};
exports.RatiosPE = RatiosPE;
/**
* Dividend Yield (DY)
*
* Dividend Yield = Annual Dividends/ Current Price Per Share
*/
const RatiosDY = ({ price, annualDividendsPerShare, }) => {
    if (!annualDividendsPerShare)
        return 0;
    if (!price)
        return null;
    return Math.max((annualDividendsPerShare / price) || 0, 0);
};
exports.RatiosDY = RatiosDY;
/**
* Sales per share (SPS)
*/
const RatiosSPS = ({ sales, sharesOutstanding, }) => {
    if (!sharesOutstanding)
        return null;
    if ((0, Misc_1.isNullOrUndefined)(sales))
        return null;
    return sales / sharesOutstanding;
};
exports.RatiosSPS = RatiosSPS;
/**
 * Enterprise value to Sales (EVS)
 *
 * EV = (Price * Nº of shares) + Total Debt - Cash
 *
 * EVS = EV / Sales
 */
const RatiosEVS = ({ EV, sales, }) => {
    if (!sales || !EV)
        return null;
    return EV / sales;
};
exports.RatiosEVS = RatiosEVS;
/**
 * Enterprise value to EBITDA
 *
 * EV = (Price * Nº of shares) + Total Debt - Cash
 *
 * EVTEBITDA = EV / EBITDA
 */
const RatiosEVEBITDA = ({ EV, EBITDA, }) => {
    if (!EBITDA || !EV)
        return null;
    return EV / EBITDA;
};
exports.RatiosEVEBITDA = RatiosEVEBITDA;
/**
 * Enterprise value to EBIT
 *
 * EV = (Price * Nº of shares) + Total Debt - Cash
 *
 * EVTEBIT = EV / EBIT
 */
const RatiosEVEBIT = ({ EV, EBIT, }) => {
    if (!EBIT || !EV)
        return null;
    return EV / EBIT;
};
exports.RatiosEVEBIT = RatiosEVEBIT;
/**
 * Net Assets to asset ratio (higher is better)
 *
 * NATA <- net_assets / total_assets
 */
const RatiosNetAssetToAsset = ({ shareholdersEquity, totalAssets, }) => {
    if (!shareholdersEquity || !totalAssets)
        return null;
    return shareholdersEquity / totalAssets;
};
exports.RatiosNetAssetToAsset = RatiosNetAssetToAsset;
/**
 * Asset turnover
 *
 * AT <- total_revenue / ((begin_assets + end_assets) / 2)
 */
const RatiosAssetTurnover = ({ revenue, beginAssets, endAssets, }) => {
    if ((0, Misc_1.isNullOrUndefined)(revenue)
        || !beginAssets
        || !endAssets)
        return null;
    return revenue / ((0, Math_1.mean)(beginAssets, endAssets));
};
exports.RatiosAssetTurnover = RatiosAssetTurnover;
/**
 * Compound annual growth rate
 */
const RatiosCAGR = ({ beginValue, endValue, period, }) => {
    if ((0, Misc_1.isNullOrUndefined)(endValue)
        || (0, Misc_1.isNullOrUndefined)(beginValue))
        return null;
    if (beginValue > 0 && endValue > 0)
        return (endValue / beginValue) ** (1 / period) - 1;
    if (beginValue < 0 && endValue < 0)
        return (-1) * ((Math.abs(endValue) / Math.abs(beginValue)) ** (1 / period) - 1);
    if (beginValue < 0 && endValue > 0)
        return ((endValue + 2 * Math.abs(beginValue)) / Math.abs(beginValue)) ** (1 / period) - 1;
    if (beginValue > 0 && endValue < 0)
        return (-1) * (((Math.abs(endValue) + 2 * beginValue) / beginValue) ** (1 / period) - 1);
    return null;
};
exports.RatiosCAGR = RatiosCAGR;
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
const RatiosNAVPS = ({ shareholdersEquity, sharesOutstanding, }) => {
    if ((0, Misc_1.isNullOrUndefined)(shareholdersEquity)
        || !sharesOutstanding)
        return null;
    return shareholdersEquity / sharesOutstanding;
};
exports.RatiosNAVPS = RatiosNAVPS;
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
const RatiosEPS = ({ netIncome, sharesOutstanding, preferredDividends, }) => {
    if ((0, Misc_1.isNullOrUndefined)(netIncome)
        || !sharesOutstanding)
        return null;
    return (netIncome - (preferredDividends || 0)) / sharesOutstanding;
};
exports.RatiosEPS = RatiosEPS;
const RatiosMarketCap = ({ price, sharesOutstanding, }) => {
    if (!price || !sharesOutstanding)
        return null;
    return price * sharesOutstanding;
};
exports.RatiosMarketCap = RatiosMarketCap;
const RatiosChowderPass = ({ DY, CAGR5D, }) => {
    if (!DY || !CAGR5D)
        return false;
    if (CAGR5D < 0)
        return false;
    const chowderNumber = DY + CAGR5D;
    if (DY > 0.03 && chowderNumber > 0.12)
        return true;
    if (DY <= 0.03 && chowderNumber > 0.15)
        return true;
    return false;
};
exports.RatiosChowderPass = RatiosChowderPass;
/**
 *  Dividend payout Ratio
 *
 * DP <- annualDividend / netIncome
 * @param param0
 * @returns
 */
const RatiosPayout = ({ annualDividends, netIncome, }) => {
    if (!annualDividends || annualDividends === 0)
        return 0;
    if (!netIncome || netIncome === 0)
        return null;
    return annualDividends / netIncome;
};
exports.RatiosPayout = RatiosPayout;
/**
 * Book Value Per Share (BVPS) (VPA em port.)
 *
 * Book value per share (BVPS) is the ratio of equity
 * available to common shareholders divided by the number of outstanding shares.
 * @param param0
 * @returns
 */
const RatiosBVPS = ({ shareholdersEquity, sharesOutstanding, }) => {
    if (!shareholdersEquity || !sharesOutstanding)
        return null;
    return shareholdersEquity / sharesOutstanding;
};
exports.RatiosBVPS = RatiosBVPS;
//# sourceMappingURL=valuation.js.map