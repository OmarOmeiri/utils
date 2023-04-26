"use strict";
/**
 * S3 URL generate functions
 * @module S3UrlGen
 * @category AWS
 */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.genProductDescriptionKey = exports.sampleBannerImgs = exports.sampleProdImgs = exports.imgUrlToThumbnail = exports.genProductImageKey = exports.getS3ProductImgUrlByKey = exports.getS3UrlByKey = exports.getStoreLogoKey = exports.getPlatformIconKey = exports.getBannersKey = exports.getProductDescriptionKey = exports.getProductImgKey = void 0;
/* eslint-disable no-param-reassign */
const uniqid_1 = __importDefault(require("uniqid"));
/**
 * Gets a S3 product description url
 * @param [storeId]
 * @param [productId]
 * @returns
 */
const getProductImgKey = (storeId, productId = '') => (!storeId ? 'Public/products/images/' : `Public/products/images/${storeId}/${productId ? `${productId}/` : ''}`);
exports.getProductImgKey = getProductImgKey;
/**
 * Gets a S3 product image Key
 * @param [storeId]
 * @param [productId]
 * @returns
 */
const getProductDescriptionKey = (storeId, productId = '') => (!storeId ? 'Public/products/description/' : `Public/products/description/${storeId}/${productId ? `${productId}/` : ''}`);
exports.getProductDescriptionKey = getProductDescriptionKey;
/**
 * Gets a S3 store banners url
 * @param [storeId]
 * @param [productId]
 * @returns
 */
const getBannersKey = (storeId, bannerId = '') => (!storeId ? 'Public/images/' : `Public/images/${storeId}/banners/${bannerId ? `${bannerId}/` : ''}`);
exports.getBannersKey = getBannersKey;
/**
 * Gets an icon key
 * @param name
 */
const getPlatformIconKey = (fileName) => `Public/icons/${fileName}`;
exports.getPlatformIconKey = getPlatformIconKey;
/**
 * Gets a store log key by fileName
 * @param name
 */
const getStoreLogoKey = (fileName, storeId) => `Public/images/${storeId}/logo/${fileName}`;
exports.getStoreLogoKey = getStoreLogoKey;
const getS3UrlByKey = ({ bucketUrl, Key, }) => (/^\//.test(Key) ? `${bucketUrl}${Key}` : `${bucketUrl}/${Key}`);
exports.getS3UrlByKey = getS3UrlByKey;
const getS3ProductImgUrlByKey = ({ bucketUrl, Key, thumbnail = false, }) => {
    let key = Key;
    if (thumbnail) {
        const split = key.split('/');
        split.splice(-1, 0, 'thumbnails');
        key = split.join('/');
    }
    return /^\//.test(Key) ? `${bucketUrl}${key}` : `${bucketUrl}/${key}`;
};
exports.getS3ProductImgUrlByKey = getS3ProductImgUrlByKey;
/**
 * Generates a product image url
 * @param storeId
 * @param productId
 * @param
 * @returns
 */
const genProductImageKey = ({ storeId, productId, fileExt, }) => (`${(0, exports.getProductImgKey)(storeId, productId)}${(0, uniqid_1.default)()}.${fileExt}`);
exports.genProductImageKey = genProductImageKey;
/**
 * Transforms a product image URL to the thumbnail URL
 * @param str
 * @returns
 */
const imgUrlToThumbnail = (str) => {
    const endsWithSlash = /\/$/.test(str);
    if (endsWithSlash) {
        str = str.slice(0, -1);
    }
    const ix = str.lastIndexOf('/') + 1;
    const strArr = str.split('');
    strArr.splice(ix, 0, 'thumbnails/');
    return strArr.join('');
};
exports.imgUrlToThumbnail = imgUrlToThumbnail;
const sampleProdImgs = (awsBucketUrl) => [
    { url: `${awsBucketUrl}/Public/images/platform/sampleProducts/sampleProduct.png`, alt: 'sample product 1' },
    { url: `${awsBucketUrl}/Public/images/platform/sampleProducts/sampleProduct2.png`, alt: 'sample product 1' },
];
exports.sampleProdImgs = sampleProdImgs;
const sampleBannerImgs = (awsBucketUrl) => [
    { url: `${awsBucketUrl}/Public/images/platform/sampleBanners/banner1.png`, alt: 'sample banner 1' },
    { url: `${awsBucketUrl}/Public/images/platform/sampleBanners/banner2.png`, alt: 'sample banner 2' },
    { url: `${awsBucketUrl}/Public/images/platform/sampleBanners/banner2.png`, alt: 'sample banner 3' },
];
exports.sampleBannerImgs = sampleBannerImgs;
/**
 * Generates a product description HTML file url
 * @param storeId
 * @param productId
 * @param
 * @returns
 */
const genProductDescriptionKey = ({ storeId, productId, }) => (`${(0, exports.getProductDescriptionKey)(storeId, productId)}${(0, uniqid_1.default)()}.html`);
exports.genProductDescriptionKey = genProductDescriptionKey;
//# sourceMappingURL=s3UrlGenerators.js.map