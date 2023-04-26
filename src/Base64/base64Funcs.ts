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
export const getContentType = (base64: string): string => base64.substring('data:'.length, base64.indexOf(';base64'));

export const base64Size = (base64: string): number => base64.length * (4 / 3);

/**
 * Convert BASE64 to BLOB
 * @param base64Image Pass Base64 image data to convert into the BLOB
 */
export function base64ToBlob(base64: string): Blob {
  const contentType = getContentType(base64);
  const parts = base64.split(';base64,');
  const decodedData = window.atob(parts[1]);
  const uInt8Array = new Uint8Array(decodedData.length);
  for (let i = 0; i < decodedData.length; i += 1) {
    uInt8Array[i] = decodedData.charCodeAt(i);
  }
  return new Blob([uInt8Array], { type: contentType });
}
