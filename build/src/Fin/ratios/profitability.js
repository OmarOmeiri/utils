"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RatiosROIC = exports.RatiosROE = exports.RatiosROCE = exports.RatiosROA = exports.RatiosEBITMargin = exports.RatiosEBITDAMargin = exports.RatiosNetMargin = exports.RatiosGM = exports.RatiosROS = void 0;
const Misc_1 = require("../../Misc");
/**
 * Return On Sales / Operating Margin (ROS) (higher is better)
 *
 * Return on sales (ROS) is a ratio used to evaluate a company's operational efficiency.
 * This measure provides insight into how much profit is being produced per dollar of sales.
 * An increasing ROS indicates that a company is improving efficiency, while a decreasing ROS could signal impending financial troubles.
 * ROS is closely related to a firm's operating profit margin.
 *
 * ROS <- operating_income / total_revenue
 */
const RatiosROS = ({ operatingIncome, sales, }) => {
    if (!sales
        || (0, Misc_1.isNullOrUndefined)(operatingIncome))
        return null;
    return sales > 0
        ? operatingIncome / sales
        : Math.abs(operatingIncome / sales) * -1;
};
exports.RatiosROS = RatiosROS;
/**
 * Gross Margin (higher is better)
 *
 * A company’s gross margin is the profitability percentage of its generated revenues.
 *
 * GM <- (Revenue - COGS) / Revenue
 */
const RatiosGM = ({ revenue, COGS, }) => {
    if ((0, Misc_1.isNullOrUndefined)(revenue)
        || (0, Misc_1.isNullOrUndefined)(COGS))
        return null;
    if (revenue === 0 && COGS === 0)
        return null;
    const GM = Math.abs((revenue - Math.abs(COGS)) / revenue);
    return revenue < 0
        ? GM * -1
        : GM;
};
exports.RatiosGM = RatiosGM;
/**
 * Net Margin (higher is better)
 *
 *
 * NM <- Net Profit / Net Revenue
 */
const RatiosNetMargin = ({ revenue, netIncome, }) => {
    if (!revenue
        || !netIncome)
        return null;
    const NM = netIncome / revenue;
    return revenue > 0
        ? NM
        : Math.abs(NM) * -1;
};
exports.RatiosNetMargin = RatiosNetMargin;
/**
 * EBITDA Margin (higher is better)
 *
 * The EBITDA margin is a measure of a company's operating profit as a percentage of its revenue.
 *
 * EBITDA_M <- EBITDA / Total Revenue
 */
const RatiosEBITDAMargin = ({ EBITDA, revenue, }) => {
    if (!EBITDA
        || !revenue)
        return null;
    const res = Math.abs(EBITDA) / Math.abs(revenue);
    return revenue > 0
        ? res
        : Math.abs(res) * -1;
};
exports.RatiosEBITDAMargin = RatiosEBITDAMargin;
/**
 * EBIT Margin (higher is better)
 *
 * The EBIT margin is a measure of a company's operating profit as a percentage of its revenue.
 *
 * EBIT_M <- EBIT / Total Revenue
 */
const RatiosEBITMargin = ({ EBIT, revenue, }) => {
    if ((0, Misc_1.isNullOrUndefined)(EBIT)
        || !revenue)
        return null;
    const res = Math.abs(EBIT) / Math.abs(revenue);
    return revenue > 0
        ? res
        : Math.abs(res) * -1;
};
exports.RatiosEBITMargin = RatiosEBITMargin;
/**
 * Return on Assets (ROA) (higher is better)
 *
 * O retorno sobre os ativos ou Return on Assets, é um indicador de rentabilidade,
 * que calcula a capacidade de uma empresa gerar lucro a partir dos seus ativos,
 * além de indiretamente, indicar a eficiência dos seus gestores.
 *
 * ROA <- Net Income / total Assets
 */
const RatiosROA = ({ netIncome, totalAssets, }) => {
    if ((0, Misc_1.isNullOrUndefined)(netIncome)
        || (0, Misc_1.isNullOrUndefined)(totalAssets))
        return null;
    return netIncome / totalAssets;
};
exports.RatiosROA = RatiosROA;
/**
 * Return On Capital Employed (ROCE) (higher is better)
 *
 * Return on capital employed (ROCE) is a financial ratio that can be used to assess a company's profitability and capital efficiency.
 * In other words, this ratio can help to understand how well a company is generating profits from its capital as it is put to use.
 *
 * ROCE <- operating_income / (total_assets - current_liabilities)
 */
const RatiosROCE = ({ EBIT, totalAssets, currentLiabilities, }) => {
    if ((0, Misc_1.isNullOrUndefined)(EBIT)
        || (0, Misc_1.isNullOrUndefined)(totalAssets)
        || (0, Misc_1.isNullOrUndefined)(currentLiabilities))
        return null;
    return EBIT / (Math.abs(totalAssets) - Math.abs(currentLiabilities));
};
exports.RatiosROCE = RatiosROCE;
/**
  * Return on Equity (ROE) (higher is better)
  *
  * Mede a capacidade de agregar valor de uma empresa a partir de seus próprios recursos e do dinheiro de investidores.
  *
  * ROE <-  net_income / Net Asset (Patrimonio líquido)
  */
const RatiosROE = ({ netIncome, shareholdersEquity, }) => {
    if ((0, Misc_1.isNullOrUndefined)(netIncome)
        || (0, Misc_1.isNullOrUndefined)(shareholdersEquity))
        return null;
    const res = Math.abs(netIncome) / Math.abs(shareholdersEquity);
    return shareholdersEquity > 0
        ? res
        : Math.abs(res) * -1;
};
exports.RatiosROE = RatiosROE;
/**
 * Return On Invested Capital (ROIC) (higher is better)
 *
 * Analysts use the return on invested capital (ROIC) metric to evaluate a company's capital allocation decisions.
 * In particular, it's common to use ROIC in comparison with a company's weighted average cost of capital (WACC).
 *
 * In general, if a company has an ROIC higher than its WACC,
 * it has a strong economic moat and is generating a positive return on its investments.
 * On the contrary, if a company has more to access funding than it can earn on new investments,
 * the company will struggle to generate strong shareholder returns.
 *
 * ROIC is useful both as a standalone metric and to compare companies within the same industry.
 * If one firm consistently earns higher returns than its peers, it will likely be able to capture market share over time.
 *
 * An ROIC higher than the cost of capital means a company is healthy and growing,
 * while an ROIC lower than the cost of capital suggests an unsustainable business model.
 *
 * ROIC <- NOPAT / Invested Capital
 */
const RatiosROIC = ({ operatingIncome, taxes, totalDebt, shareholdersEquity, }) => {
    if ((0, Misc_1.isNullOrUndefined)(operatingIncome)
        || (0, Misc_1.isNullOrUndefined)(totalDebt)
        || (0, Misc_1.isNullOrUndefined)(shareholdersEquity)
        || (0, Misc_1.isNullOrUndefined)(taxes)
        || (totalDebt + shareholdersEquity) === 0)
        return null;
    const roic = (operatingIncome - Math.abs(taxes)) / (Math.abs(totalDebt) + Math.abs(shareholdersEquity));
    return shareholdersEquity < 0
        ? roic * -1
        : roic;
};
exports.RatiosROIC = RatiosROIC;
//# sourceMappingURL=profitability.js.map