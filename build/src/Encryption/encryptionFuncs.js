"use strict";
/**
 * Enciption utility functions
 * @module EncryptionUtils
 * @category Encryption
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.randomToken = exports.decrypt = exports.encrypt = void 0;
const crypto_js_1 = require("crypto-js");
const crypto_1 = require("crypto");
/**
 * Encrypts a string with a given key (AES)
 * @param value
 * @param key
 * @returns
 */
const encrypt = (value, key) => {
    let encryptValue;
    switch (typeof value) {
        case 'string':
            encryptValue = value;
            break;
        case 'object':
            encryptValue = JSON.stringify(value);
            break;
        case 'bigint':
        case 'number':
        case 'boolean':
            encryptValue = value.toString();
            break;
        default: {
            const err = {
                message: `Encryption Error: This value cannot be encrypted. ${typeof value}`,
            };
            throw err;
        }
    }
    return crypto_js_1.AES.encrypt(encryptValue, key).toString();
};
exports.encrypt = encrypt;
/**
 * Decrypts a string with a given key (AES)
 * @param value
 * @param key
 * @returns
 */
const decrypt = (value, key) => {
    const bytes = crypto_js_1.AES.decrypt(value, key);
    return bytes.toString(crypto_js_1.enc.Utf8);
};
exports.decrypt = decrypt;
const randomToken = (byteSize = 64) => (0, crypto_1.randomBytes)(byteSize).toString('base64url');
exports.randomToken = randomToken;
//# sourceMappingURL=encryptionFuncs.js.map