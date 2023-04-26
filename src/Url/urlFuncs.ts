/**
 * URL utility functions
 * @module UrlUtils
 * @category URL
 */

import http from 'http';
import { URL } from 'url';

/**
 * Checks if a URL is valid
 * @param str
 * @returns
 */
function isUrl(str: string): URL | false {
  if (typeof str !== 'string') {
    return false;
  }

  const trimmedStr = str.trim();
  if (trimmedStr.includes(' ')) {
    return false;
  }

  try {
    return new URL(str);
  } catch {
    return false;
  }
}

/**
 * Checks if a url exists
 * @param url
 * @returns
 */
export async function urlExists(url: string): Promise<boolean> {
  const validUrl = isUrl(url);
  if (!validUrl) return false;

  const options = {
    method: 'HEAD',
    host: validUrl.host,
    path: validUrl.pathname,
    port: 80,
  };

  return (async () => new Promise<boolean>((resolve) => {
    const req = http.request(options, (res) => {
      if (!res.statusCode) {
        resolve(false);
        return;
      }
      resolve(res.statusCode < 400 || res.statusCode >= 500);
    });

    req.end();
  }))();
}
