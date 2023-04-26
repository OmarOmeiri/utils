"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RatiosDPO = exports.RatiosDIO = exports.RatiosDSO = exports.RatiosNetTradeCycle = exports.RatiosCash = exports.RatiosQuick = exports.RatiosCurrent = void 0;
const Misc_1 = require("../../Misc");
/**
 * Current Ratio (higher is better) (Líq. Corrente)
 *
 * CR <- current_assets / current_liabilities
 */
const RatiosCurrent = ({ currentAssets, currentLiabilities, }) => {
    if ((0, Misc_1.isNullOrUndefined)(currentAssets)
        || !currentLiabilities)
        return null;
    return currentAssets / currentLiabilities;
};
exports.RatiosCurrent = RatiosCurrent;
/**
 * Quick Ratio (higher is better) (Líq. Seca)
 *
 * QR <- (current_assets - inventory) / current_liabilities
 */
const RatiosQuick = ({ currentAssets, currentLiabilities, inventory, }) => {
    if ((0, Misc_1.isNullOrUndefined)(currentAssets)
        || !currentLiabilities
        || (0, Misc_1.isNullOrUndefined)(inventory))
        return null;
    return (currentAssets - inventory) / currentLiabilities;
};
exports.RatiosQuick = RatiosQuick;
/**
 * (Liq. Imediata)
 * The cash ratio is a measurement of a company's liquidity,
 * specifically the ratio of a company's total cash and cash equivalents to its current liabilities. The metric calculates a company's ability to repay its short-term debt with cash or near-cash resources,
 * such as easily marketable securities.
 *
 */
const RatiosCash = ({ cash, currentLiabilities, }) => {
    if ((0, Misc_1.isNullOrUndefined)(cash)
        || !currentLiabilities)
        return null;
    return cash / currentLiabilities;
};
exports.RatiosCash = RatiosCash;
/**
 * Net trade cycle/ Cash Conversion Cycle (lower is better)
 *
 * NTC <- DSO + DIO - DPO
 */
const RatiosNetTradeCycle = ({ DSO, DIO, DPO, }) => {
    if ((0, Misc_1.isNullOrUndefined)(DSO)
        || (0, Misc_1.isNullOrUndefined)(DIO)
        || (0, Misc_1.isNullOrUndefined)(DPO))
        return null;
    return DSO + DIO - DPO;
};
exports.RatiosNetTradeCycle = RatiosNetTradeCycle;
/**
 * receivable days (DSO) (lower is better)
 *
 * DSO <- (receivables / total_revenue) * p
 */
const RatiosDSO = ({ receivables, revenue, period = 365, }) => {
    if (!receivables
        || !revenue
        || revenue < 0)
        return null;
    return (receivables / revenue) * period;
};
exports.RatiosDSO = RatiosDSO;
/**
 * Inventory days (DIO) (lower is better)
 *
 * DIO <- (inventory / COGS) * p
 */
const RatiosDIO = ({ inventory, COGS, period = 365, }) => {
    if ((!inventory)
        || (!COGS))
        return null;
    return (inventory / Math.abs(COGS)) * period;
};
exports.RatiosDIO = RatiosDIO;
/**
 * Payable days (DPO) (lower is better)
 *
 * DPO <- payables * period / COGS
 */
const RatiosDPO = ({ payables, COGS, period = 365, }) => {
    if ((0, Misc_1.isNullOrUndefined)(payables)
        || (!COGS))
        return null;
    return (payables * period) / Math.abs(COGS);
};
exports.RatiosDPO = RatiosDPO;
//# sourceMappingURL=liquidity.js.map