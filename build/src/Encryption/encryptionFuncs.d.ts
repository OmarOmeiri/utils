/**
 * Enciption utility functions
 * @module EncryptionUtils
 * @category Encryption
 */
/**
 * Encrypts a string with a given key (AES)
 * @param value
 * @param key
 * @returns
 */
export declare const encrypt: (value: unknown, key: string) => string;
/**
 * Decrypts a string with a given key (AES)
 * @param value
 * @param key
 * @returns
 */
export declare const decrypt: (value: string, key: string) => string;
export declare const randomToken: (byteSize?: number) => string;
