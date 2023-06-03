type NullOrUndefNum = null | undefined | number;
export type RatiosROSParams = {
    operatingIncome: NullOrUndefNum;
    sales: NullOrUndefNum;
};
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
export declare const RatiosROS: ({ operatingIncome, sales, }: RatiosROSParams) => number | null;
export type RatiosGMParams = {
    revenue: NullOrUndefNum;
    COGS: NullOrUndefNum;
};
/**
 * Gross Margin (higher is better)
 *
 * A company’s gross margin is the profitability percentage of its generated revenues.
 *
 * GM <- (Revenue - COGS) / Revenue
 */
export declare const RatiosGM: ({ revenue, COGS, }: RatiosGMParams) => number | null;
export type RatiosNetMarginParams = {
    revenue: NullOrUndefNum;
    netIncome: NullOrUndefNum;
};
/**
 * Net Margin (higher is better)
 *
 *
 * NM <- Net Profit / Net Revenue
 */
export declare const RatiosNetMargin: ({ revenue, netIncome, }: RatiosNetMarginParams) => number | null;
export type RatiosEBITDAMarginParams = {
    EBITDA: NullOrUndefNum;
    revenue: NullOrUndefNum;
};
/**
 * EBITDA Margin (higher is better)
 *
 * The EBITDA margin is a measure of a company's operating profit as a percentage of its revenue.
 *
 * EBITDA_M <- EBITDA / Total Revenue
 */
export declare const RatiosEBITDAMargin: ({ EBITDA, revenue, }: RatiosEBITDAMarginParams) => number | null;
export type RatiosEBITMarginParams = {
    EBIT: NullOrUndefNum;
    revenue: NullOrUndefNum;
};
/**
 * EBIT Margin (higher is better)
 *
 * The EBIT margin is a measure of a company's operating profit as a percentage of its revenue.
 *
 * EBIT_M <- EBIT / Total Revenue
 */
export declare const RatiosEBITMargin: ({ EBIT, revenue, }: RatiosEBITMarginParams) => number | null;
export type RatiosROAParams = {
    netIncome: NullOrUndefNum;
    totalAssets: NullOrUndefNum;
};
/**
 * Return on Assets (ROA) (higher is better)
 *
 * O retorno sobre os ativos ou Return on Assets, é um indicador de rentabilidade,
 * que calcula a capacidade de uma empresa gerar lucro a partir dos seus ativos,
 * além de indiretamente, indicar a eficiência dos seus gestores.
 *
 * ROA <- Net Income / total Assets
 */
export declare const RatiosROA: ({ netIncome, totalAssets, }: RatiosROAParams) => number | null;
export type RatiosROCEParams = {
    EBIT: NullOrUndefNum;
    totalAssets: NullOrUndefNum;
    currentLiabilities: NullOrUndefNum;
};
/**
 * Return On Capital Employed (ROCE) (higher is better)
 *
 * Return on capital employed (ROCE) is a financial ratio that can be used to assess a company's profitability and capital efficiency.
 * In other words, this ratio can help to understand how well a company is generating profits from its capital as it is put to use.
 *
 * ROCE <- operating_income / (total_assets - current_liabilities)
 */
export declare const RatiosROCE: ({ EBIT, totalAssets, currentLiabilities, }: RatiosROCEParams) => number | null;
export type RatiosROEParams = {
    netIncome: NullOrUndefNum;
    shareholdersEquity: NullOrUndefNum;
};
/**
  * Return on Equity (ROE) (higher is better)
  *
  * Mede a capacidade de agregar valor de uma empresa a partir de seus próprios recursos e do dinheiro de investidores.
  *
  * ROE <-  net_income / Net Asset (Patrimonio líquido)
  */
export declare const RatiosROE: ({ netIncome, shareholdersEquity, }: RatiosROEParams) => number | null;
export type RatiosROICParams = {
    operatingIncome: NullOrUndefNum;
    taxes: NullOrUndefNum;
    totalDebt: NullOrUndefNum;
    shareholdersEquity: NullOrUndefNum;
};
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
export declare const RatiosROIC: ({ operatingIncome, taxes, totalDebt, shareholdersEquity, }: RatiosROICParams) => number | null;
export {};
