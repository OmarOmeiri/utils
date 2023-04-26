"use strict";
/**
 * URL utility functions
 * @module UrlUtils
 * @category URL
 */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.urlExists = void 0;
const http_1 = __importDefault(require("http"));
const url_1 = require("url");
/**
 * Checks if a URL is valid
 * @param str
 * @returns
 */
function isUrl(str) {
    if (typeof str !== 'string') {
        return false;
    }
    const trimmedStr = str.trim();
    if (trimmedStr.includes(' ')) {
        return false;
    }
    try {
        return new url_1.URL(str);
    }
    catch {
        return false;
    }
}
/**
 * Checks if a url exists
 * @param url
 * @returns
 */
async function urlExists(url) {
    const validUrl = isUrl(url);
    if (!validUrl)
        return false;
    const options = {
        method: 'HEAD',
        host: validUrl.host,
        path: validUrl.pathname,
        port: 80,
    };
    return (async () => new Promise((resolve) => {
        const req = http_1.default.request(options, (res) => {
            if (!res.statusCode) {
                resolve(false);
                return;
            }
            resolve(res.statusCode < 400 || res.statusCode >= 500);
        });
        req.end();
    }))();
}
exports.urlExists = urlExists;
//# sourceMappingURL=urlFuncs.js.map