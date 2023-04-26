"use strict";
/**
 * Boolean utility functions
 * @module BooleanUtils
 * @category Boolean
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.toBoolean = exports.translateBoolean = void 0;
/**
 * Translates a boolean value into a user readable string.
 * 'Sim' for true and 'Não' for false, if not translation object was provided.
 * You can customize the translation by providing a translation object like below.
 * @param bool
 * @param translation
 * @example <caption>Example of translation object.</caption>
 * {
 *  true: 'Ativo',
 *  false: 'Desativado',
 * }
 * @returns
 */
const translateBoolean = ({ value, translation, fallBack }) => {
    let isTrue;
    if (value !== false && !value)
        return fallBack ?? '';
    if (typeof value === 'string')
        isTrue = (value.trim() === 'true');
    else
        isTrue = value;
    if (translation && isTrue)
        return translation.true;
    if (translation && !isTrue)
        return translation.false;
    if (!translation && !isTrue)
        return 'Não';
    return 'Sim';
};
exports.translateBoolean = translateBoolean;
/**
 * Converts a string to a boolean
 * @param val
 * @param fallback the fallback value in case the string param is not 'true' nor 'false
 * @returns
 */
const toBoolean = (val, fallback) => {
    if (typeof val === 'string') {
        if (val.trim() === 'true')
            return true;
        if (val.trim() === 'false')
            return false;
    }
    else if (typeof val === 'boolean')
        return val;
    return fallback;
};
exports.toBoolean = toBoolean;
//# sourceMappingURL=booleanFuncs.js.map