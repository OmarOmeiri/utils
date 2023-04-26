/**
 * S3 URL generate functions
 * @module S3UrlGen
 * @category AWS
 */

/* eslint-disable no-param-reassign */
import uniqid from 'uniqid';

/**
 * Gets a S3 product description url
 * @param [storeId]
 * @param [productId]
 * @returns
 */
export const getProductImgKey = (storeId?: string, productId = ''): string => (!storeId ? 'Public/products/images/' : `Public/products/images/${storeId}/${productId ? `${productId}/` : ''}`);

/**
 * Gets a S3 product image Key
 * @param [storeId]
 * @param [productId]
 * @returns
 */
export const getProductDescriptionKey = (storeId?: string, productId = ''): string => (!storeId ? 'Public/products/description/' : `Public/products/description/${storeId}/${productId ? `${productId}/` : ''}`);

/**
 * Gets a S3 store banners url
 * @param [storeId]
 * @param [productId]
 * @returns
 */
export const getBannersKey = (storeId?: string, bannerId = ''): string => (!storeId ? 'Public/images/' : `Public/images/${storeId}/banners/${bannerId ? `${bannerId}/` : ''}`);

/**
 * Gets an icon key
 * @param name
 */
export const getPlatformIconKey = (fileName: string): string => `Public/icons/${fileName}`;

/**
 * Gets a store log key by fileName
 * @param name
 */
export const getStoreLogoKey = (fileName: string, storeId: string): string => `Public/images/${storeId}/logo/${fileName}`;

export const getS3UrlByKey = ({
  bucketUrl,
  Key,
}: {
  bucketUrl: string,
  Key: string,
}): string => (/^\//.test(Key) ? `${bucketUrl}${Key}` : `${bucketUrl}/${Key}`);

export const getS3ProductImgUrlByKey = ({
  bucketUrl,
  Key,
  thumbnail = false,
}: {
  bucketUrl: string,
  Key: string,
  thumbnail?: boolean,
}): string => {
  let key = Key;
  if (thumbnail) {
    const split = key.split('/');
    split.splice(-1, 0, 'thumbnails');
    key = split.join('/');
  }
  return /^\//.test(Key) ? `${bucketUrl}${key}` : `${bucketUrl}/${key}`;
};

/**
 * Generates a product image url
 * @param storeId
 * @param productId
 * @param
 * @returns
 */
export const genProductImageKey = ({
  storeId,
  productId,
  fileExt,
}: {
  storeId: string,
  productId: string,
  fileExt: string,
}): string => (`${getProductImgKey(storeId, productId)}${uniqid()}.${fileExt}`);

/**
 * Transforms a product image URL to the thumbnail URL
 * @param str
 * @returns
 */
export const imgUrlToThumbnail = (str: string): string => {
  const endsWithSlash = /\/$/.test(str);
  if (endsWithSlash) {
    str = str.slice(0, -1);
  }
  const ix = str.lastIndexOf('/') + 1;
  const strArr = str.split('');
  strArr.splice(ix, 0, 'thumbnails/');
  return strArr.join('');
};

export const sampleProdImgs = (awsBucketUrl: string): {url: string, alt: string}[] => [
  { url: `${awsBucketUrl}/Public/images/platform/sampleProducts/sampleProduct.png`, alt: 'sample product 1' },
  { url: `${awsBucketUrl}/Public/images/platform/sampleProducts/sampleProduct2.png`, alt: 'sample product 1' },
];

export const sampleBannerImgs = (awsBucketUrl: string): {url: string, alt: string}[] => [
  { url: `${awsBucketUrl}/Public/images/platform/sampleBanners/banner1.png`, alt: 'sample banner 1' },
  { url: `${awsBucketUrl}/Public/images/platform/sampleBanners/banner2.png`, alt: 'sample banner 2' },
  { url: `${awsBucketUrl}/Public/images/platform/sampleBanners/banner2.png`, alt: 'sample banner 3' },
];

/**
 * Generates a product description HTML file url
 * @param storeId
 * @param productId
 * @param
 * @returns
 */
export const genProductDescriptionKey = ({
  storeId,
  productId,
}: {
  storeId: string,
  productId: string,
}): string => (`${getProductDescriptionKey(storeId, productId)}${uniqid()}.html`);
