"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.growthStreak = exports.EBIT = exports.netDebt = exports.operatingIncome = exports.investedCapital = exports.NOPAT = exports.taxRate = exports.EV = void 0;
const Misc_1 = require("../Misc");
/**
 * Enterprise value
 *
 * EV = (Price * Nº of shares) + (Total Debt - Cash)
 *
 */
const EV = ({ price, sharesOutstanding, totalDebt, cash, }) => {
    if (!price
        || (!sharesOutstanding)
        || (0, Misc_1.isNullOrUndefined)(totalDebt)
        || (0, Misc_1.isNullOrUndefined)(cash))
        return null;
    return (price * sharesOutstanding) + (totalDebt - cash);
};
exports.EV = EV;
/**
 * The corporate tax rate is also known
 * as the effective tax rate. It is the percentage of a company's income it pays in taxes.
 * @returns
 */
const taxRate = ({ earningsBeforeTax, totalTax, }) => {
    if ((0, Misc_1.isNullOrUndefined)(totalTax)
        || (0, Misc_1.isNullOrUndefined)(earningsBeforeTax))
        return null;
    return totalTax / earningsBeforeTax;
};
exports.taxRate = taxRate;
/**
 * NOPAT is after-tax operating cash generated
 * by a company and available for all investors—both shareholders and debtholders.
 * @returns
 */
const NOPAT = ({ EBIT, 
// eslint-disable-next-line @typescript-eslint/no-shadow
taxRate, }) => {
    if ((0, Misc_1.isNullOrUndefined)(EBIT) || (0, Misc_1.isNullOrUndefined)(taxRate))
        return null;
    return EBIT * (1 - taxRate);
};
exports.NOPAT = NOPAT;
/**
 * Invested capital is the investment made by both shareholders and debtholders in a company
 * @returns
 */
const investedCapital = ({ totalDebt, totalEquity, nonOperatingCashAndInvestments, }) => {
    if ((0, Misc_1.isNullOrUndefined)(totalDebt)
        || !totalEquity
        || (0, Misc_1.isNullOrUndefined)(nonOperatingCashAndInvestments))
        return null;
    return totalDebt + totalEquity + nonOperatingCashAndInvestments;
};
exports.investedCapital = investedCapital;
/**
 * Operating income is a measurement that shows
 * how much of a company's revenue will eventually become profits.
 */
const operatingIncome = ({ grossIncome, operatingExpenses, }) => {
    if ((0, Misc_1.isNullOrUndefined)(grossIncome)
        || (0, Misc_1.isNullOrUndefined)(operatingExpenses))
        return null;
    return grossIncome - operatingExpenses;
};
exports.operatingIncome = operatingIncome;
/**
 * Net debt is a financial liquidity metric that
 * measures a company’s ability to pay all its debts if they were due today.
 */
const netDebt = ({ totalDebt, cash, }) => {
    if ((0, Misc_1.isNullOrUndefined)(totalDebt)
        || (0, Misc_1.isNullOrUndefined)(cash))
        return null;
    return totalDebt - cash;
};
exports.netDebt = netDebt;
const EBIT = ({ netIncome, taxes, interest, }) => {
    if ((0, Misc_1.isNullOrUndefined)(netIncome)
        || (0, Misc_1.isNullOrUndefined)(taxes)
        || (0, Misc_1.isNullOrUndefined)(interest))
        return null;
    return netIncome + interest + taxes;
};
exports.EBIT = EBIT;
const growthStreak = (vals, asc = true) => {
    let streak = 0;
    let last = vals[0];
    for (const val of vals) {
        if (asc && val > last)
            streak += 1;
        else if (!asc && val < last)
            streak += 1;
        else
            streak = 0;
        last = val;
    }
    return streak;
};
exports.growthStreak = growthStreak;
//# sourceMappingURL=calculated.js.map