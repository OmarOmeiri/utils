/**
 * Base64 utility functions
 * @module Base64Utils
 * @category Base64
 */
/**
 * Returns the contentType of a given base64 string
 * @param base64
 * @returns
 */
export declare const getContentType: (base64: string) => string;
export declare const base64Size: (base64: string) => number;
/**
 * Convert BASE64 to BLOB
 * @param base64Image Pass Base64 image data to convert into the BLOB
 */
export declare function base64ToBlob(base64: string): Blob;
