/**
 * Blob utility functions
 * @module BlobUtils
 * @category Blob
 */

import axios, { AxiosRequestConfig } from 'axios';

/**
 * Get a blob url size in bytes
 * @param url
 * @returns
 */
export async function getBlobSize(url: string): Promise<{
  size: number,
  type: string,
} | undefined> {
  try {
    const config = { responseType: 'blob' } as AxiosRequestConfig;
    const res = await axios.get<Blob>(url, config);
    return {
      size: res.data.size,
      type: res.data.type,
    };
  } catch (err) {
    return undefined;
  }
}
