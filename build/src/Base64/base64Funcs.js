"use strict";
/**
 * Base64 utility functions
 * @module Base64Utils
 * @category Base64
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.base64ToBlob = exports.base64Size = exports.getContentType = void 0;
/**
 * Returns the contentType of a given base64 string
 * @param base64
 * @returns
 */
const getContentType = (base64) => base64.substring('data:'.length, base64.indexOf(';base64'));
exports.getContentType = getContentType;
const base64Size = (base64) => base64.length * (4 / 3);
exports.base64Size = base64Size;
/**
 * Convert BASE64 to BLOB
 * @param base64Image Pass Base64 image data to convert into the BLOB
 */
function base64ToBlob(base64) {
    const contentType = (0, exports.getContentType)(base64);
    const parts = base64.split(';base64,');
    const decodedData = window.atob(parts[1]);
    const uInt8Array = new Uint8Array(decodedData.length);
    for (let i = 0; i < decodedData.length; i += 1) {
        uInt8Array[i] = decodedData.charCodeAt(i);
    }
    return new Blob([uInt8Array], { type: contentType });
}
exports.base64ToBlob = base64ToBlob;
//# sourceMappingURL=base64Funcs.js.map