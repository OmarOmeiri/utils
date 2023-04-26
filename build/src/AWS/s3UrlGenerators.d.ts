/**
 * S3 URL generate functions
 * @module S3UrlGen
 * @category AWS
 */
/**
 * Gets a S3 product description url
 * @param [storeId]
 * @param [productId]
 * @returns
 */
export declare const getProductImgKey: (storeId?: string, productId?: string) => string;
/**
 * Gets a S3 product image Key
 * @param [storeId]
 * @param [productId]
 * @returns
 */
export declare const getProductDescriptionKey: (storeId?: string, productId?: string) => string;
/**
 * Gets a S3 store banners url
 * @param [storeId]
 * @param [productId]
 * @returns
 */
export declare const getBannersKey: (storeId?: string, bannerId?: string) => string;
/**
 * Gets an icon key
 * @param name
 */
export declare const getPlatformIconKey: (fileName: string) => string;
/**
 * Gets a store log key by fileName
 * @param name
 */
export declare const getStoreLogoKey: (fileName: string, storeId: string) => string;
export declare const getS3UrlByKey: ({ bucketUrl, Key, }: {
    bucketUrl: string;
    Key: string;
}) => string;
export declare const getS3ProductImgUrlByKey: ({ bucketUrl, Key, thumbnail, }: {
    bucketUrl: string;
    Key: string;
    thumbnail?: boolean | undefined;
}) => string;
/**
 * Generates a product image url
 * @param storeId
 * @param productId
 * @param
 * @returns
 */
export declare const genProductImageKey: ({ storeId, productId, fileExt, }: {
    storeId: string;
    productId: string;
    fileExt: string;
}) => string;
/**
 * Transforms a product image URL to the thumbnail URL
 * @param str
 * @returns
 */
export declare const imgUrlToThumbnail: (str: string) => string;
export declare const sampleProdImgs: (awsBucketUrl: string) => {
    url: string;
    alt: string;
}[];
export declare const sampleBannerImgs: (awsBucketUrl: string) => {
    url: string;
    alt: string;
}[];
/**
 * Generates a product description HTML file url
 * @param storeId
 * @param productId
 * @param
 * @returns
 */
export declare const genProductDescriptionKey: ({ storeId, productId, }: {
    storeId: string;
    productId: string;
}) => string;
