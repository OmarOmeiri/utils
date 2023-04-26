"use strict";
/**
 * Blob utility functions
 * @module BlobUtils
 * @category Blob
 */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getBlobSize = void 0;
const axios_1 = __importDefault(require("axios"));
/**
 * Get a blob url size in bytes
 * @param url
 * @returns
 */
async function getBlobSize(url) {
    try {
        const config = { responseType: 'blob' };
        const res = await axios_1.default.get(url, config);
        return {
            size: res.data.size,
            type: res.data.type,
        };
    }
    catch (err) {
        return undefined;
    }
}
exports.getBlobSize = getBlobSize;
//# sourceMappingURL=blobFuncs.js.map