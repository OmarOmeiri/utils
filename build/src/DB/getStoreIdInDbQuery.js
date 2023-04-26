"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const __1 = require("..");
const objectFuncs_1 = require("../Objects/objectFuncs");
/**
 * Finds the storeId in a DB query
 * @param query
 * @returns
 */
function getStoreIdInDbQuery(query) {
    const found = (0, objectFuncs_1.valueByProperty)(query, 'storeId');
    if (!found)
        return '0';
    if (typeof found === 'string')
        return found;
    const storeIdMatch = JSON.stringify(found).match(__1.objectIdInStringRegex);
    if (storeIdMatch)
        return storeIdMatch[0];
    return '0';
}
exports.default = getStoreIdInDbQuery;
//# sourceMappingURL=getStoreIdInDbQuery.js.map