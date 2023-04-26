"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isHtmlElement = void 0;
const hasProp = (value, property) => {
    if (value !== null
        && property in value) {
        return true;
    }
    return false;
};
/**
 * Check if a value is an HTML element
 * @param value
 * @param view
 * @returns
 */
function isHtmlElement(value) {
    if (value instanceof HTMLElement)
        return true;
    return !!(value
        && typeof value === 'object'
        && value !== null
        && hasProp(value, 'nodeType')
        && hasProp(value, 'nodeName')
        && value.nodeType === 1
        && typeof value.nodeName === 'string');
}
exports.isHtmlElement = isHtmlElement;
//# sourceMappingURL=htmlFuncs.js.map