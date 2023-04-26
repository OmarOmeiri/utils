"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RatiosInterestCoverage = exports.RatiosDebtToEquity = exports.RatiosNetDebtToEbit = exports.RatiosNetDebtToEBITDA = exports.RatiosNetDebtToNetAsset = exports.RatiosNetDebtToAsset = exports.RatiosDebtToAsset = void 0;
const Misc_1 = require("../../Misc");
/**
 * Debt ratio (lower is better) (0.67 is acceptable)
 *
 * DR <- total_debt / total_assets
 */
const RatiosDebtToAsset = ({ totalAssets, totalDebt, }) => {
    if (!totalAssets
        || (0, Misc_1.isNullOrUndefined)(totalDebt))
        return null;
    return totalDebt / totalAssets;
};
exports.RatiosDebtToAsset = RatiosDebtToAsset;
/**
 * Net Debt to asset ratio (lower is better)
 *
 * NDTA <- net_debt / total_assets
 */
const RatiosNetDebtToAsset = ({ totalAssets, netDebt, }) => {
    if (!totalAssets
        || (0, Misc_1.isNullOrUndefined)(netDebt))
        return null;
    return netDebt / totalAssets;
};
exports.RatiosNetDebtToAsset = RatiosNetDebtToAsset;
/**
 * Net Debt to net asset ratio (lower is better)
 *
 * NDTNA <- net_debt / net_assets
 */
const RatiosNetDebtToNetAsset = ({ shareholdersEquity, netDebt, }) => {
    if ((0, Misc_1.isNullOrUndefined)(netDebt)
        || !shareholdersEquity)
        return null;
    return netDebt / shareholdersEquity;
};
exports.RatiosNetDebtToNetAsset = RatiosNetDebtToNetAsset;
/**
 * Net Debt to EBITDA (lower is better)
 *
 * NDEBITDA <- net_debt / EBITDA
 */
const RatiosNetDebtToEBITDA = ({ netDebt, EBITDA, }) => {
    if ((0, Misc_1.isNullOrUndefined)(EBITDA)
        || (0, Misc_1.isNullOrUndefined)(netDebt)
        || EBITDA)
        return null;
    return netDebt / EBITDA;
};
exports.RatiosNetDebtToEBITDA = RatiosNetDebtToEBITDA;
/**
 * Net Debt to EBIT (lower is better)
 *
 * NDEBIT <- net_debt / EBIT
 */
const RatiosNetDebtToEbit = ({ netDebt, EBIT, }) => {
    if ((0, Misc_1.isNullOrUndefined)(netDebt)
        || (0, Misc_1.isNullOrUndefined)(EBIT))
        return null;
    return netDebt / EBIT;
};
exports.RatiosNetDebtToEbit = RatiosNetDebtToEbit;
const RatiosDebtToEquity = ({ shareholdersEquity, totalLiabilities, }) => {
    if ((0, Misc_1.isNullOrUndefined)(shareholdersEquity)
        || (0, Misc_1.isNullOrUndefined)(totalLiabilities))
        return null;
    return totalLiabilities / shareholdersEquity;
};
exports.RatiosDebtToEquity = RatiosDebtToEquity;
/**
* Interest coverage ratio (Higher is better)
*
* The interest coverage ratio is used to measure how well a firm can pay the interest due on outstanding debt.
*
* ICC <- EBIT / interest_expenses
*/
const RatiosInterestCoverage = ({ interestExpenses, EBIT, }) => {
    if (!interestExpenses
        || (0, Misc_1.isNullOrUndefined)(EBIT))
        return null;
    return EBIT / interestExpenses;
};
exports.RatiosInterestCoverage = RatiosInterestCoverage;
//# sourceMappingURL=solvency.js.map