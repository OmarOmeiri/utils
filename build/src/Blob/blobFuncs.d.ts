/**
 * Blob utility functions
 * @module BlobUtils
 * @category Blob
 */
/**
 * Get a blob url size in bytes
 * @param url
 * @returns
 */
export declare function getBlobSize(url: string): Promise<{
    size: number;
    type: string;
} | undefined>;
