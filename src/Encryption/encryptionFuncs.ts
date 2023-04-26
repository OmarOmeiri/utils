/**
 * Enciption utility functions
 * @module EncryptionUtils
 * @category Encryption
 */

import { AES, enc } from 'crypto-js';
import { randomBytes } from 'crypto';

/**
 * Encrypts a string with a given key (AES)
 * @param value
 * @param key
 * @returns
 */
export const encrypt = (value: unknown, key:string): string => {
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

  return AES.encrypt(encryptValue, key).toString();
};

/**
 * Decrypts a string with a given key (AES)
 * @param value
 * @param key
 * @returns
 */
export const decrypt = (value: string, key: string) => {
  const bytes = AES.decrypt(value, key);
  return bytes.toString(enc.Utf8);
};

export const randomToken = (byteSize = 64) => randomBytes(byteSize).toString('base64url');
