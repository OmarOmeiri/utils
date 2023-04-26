/// <reference types="node" />
/**
 * Exports all functions related to AWS S3.
 * @module S3Utils
 * @category AWS
 */
import { PutObjectCommandInput } from '@aws-sdk/client-s3';
import type { ObjectCannedACL, CreateBucketOutput, DeleteBucketCommandOutput, GetObjectCommandOutput, DeleteObjectCommandOutput, GetBucketAclOutput, GetBucketWebsiteOutput, ListObjectsV2Output, HeadObjectCommandOutput, PutBucketAclCommandOutput, PutBucketWebsiteCommandOutput, PutObjectOutput, PutObjectRequest } from '@aws-sdk/client-s3';
export type { ObjectCannedACL, CreateBucketOutput, DeleteBucketCommandOutput, GetObjectCommandOutput, DeleteObjectCommandOutput, GetBucketAclOutput, GetBucketWebsiteOutput, ListObjectsV2Output, HeadObjectCommandOutput, PutBucketAclCommandOutput, PutBucketWebsiteCommandOutput, PutObjectOutput, PutObjectRequest, PutObjectCommandInput, };
declare type Logger<T = undefined> = (args: {
    message: string;
    status?: number;
    extra: T & {
        method: string;
    };
}) => void;
export declare class AWSS3Utils {
    private s3;
    constructor({ awsS3Region, awsS3Id, awsS3Secret, }: {
        awsS3Region: string;
        awsS3Id: string;
        awsS3Secret: string;
    });
    close(): void;
    /**
     * Creates an S3 bucket
     * @param {String} bucket bucket name eg: lullo
     */
    createBucket(bucketName: string, logger?: Logger<{
        name: string;
        Location?: string;
    }>): Promise<CreateBucketOutput>;
    /**
    * Deletes an S3 bucket
    * @param {String} bucket bucket name eg: lullo
    */
    deleteBucket(bucketName: string, logger?: Logger<{
        name: string;
    }>): Promise<DeleteBucketCommandOutput>;
    /**
    * Deletes files in S3 bucket
    * @param {String} bucket bucket name eg: lullo
    * @param {Array} files an array of paths
    */
    s3DeleteFiles({ bucket, files, logger, }: {
        bucket: string;
        files: string[];
        logger?: Logger<{
            name: string;
            deletedFiles: string[];
            failedFiles: {
                name: string;
                error: any;
            }[];
        }>;
    }): Promise<{
        deletedFiles: {
            name: string;
            res: DeleteObjectCommandOutput;
        }[];
        failedFiles: {
            name: string;
            error: any;
        }[];
    }>;
    /**
    * Downloads files in S3 bucket
    * @param {String} bucket bucket name eg: lullo
    * @param {Array} files an array of paths
    */
    s3Download({ bucket, files, logger, }: {
        bucket: string;
        files: string[];
        logger?: Logger<{
            name: string;
            downloadedFiles: string[];
            failedFiles: {
                name: string;
                error: any;
            }[];
        }>;
    }): Promise<{
        downloadedFiles: {
            name: string;
            res: GetObjectCommandOutput;
        }[];
        failedFiles: {
            name: string;
            error: any;
        }[];
    }>;
    /**
    * Gets S3 bucket ACL policy
    * @param {String} bucket bucket name eg: lullo
    */
    getBucketAcl(bucketName: string, logger?: Logger<{
        bucket: string;
    }>): Promise<GetBucketAclOutput>;
    /**
    * Returns the website configuration for a bucket. To host website on Amazon S3, you can configure a bucket as website by adding a website configuration.
    * @param {String} bucket bucket name eg: lullo
    */
    getBucketWebsite(bucketName: string, logger?: Logger<{
        bucket: string;
    }>): Promise<GetBucketWebsiteOutput>;
    /**
    * Lists a directory in S3 bucket
    * @param {*} bucket bucket name eg: lullo
    * @param {*} prefix path
    */
    s3ListObjects(bucket: string, prefix: string, logger?: Logger<{
        bucket: string;
        prefix: string;
    }>): Promise<{
        files: string[];
        dirs: string[];
    }>;
    /**
     * Gets object info
     * @param bucket
     * @param Key
     * @returns
     */
    getObjHead(bucket: string, Key: string, logger?: Logger<{
        bucket: string;
        Key: string;
    }>): Promise<HeadObjectCommandOutput>;
    /**
     * Checks if an object exists
     * @param bucket
     * @param Key
     * @returns
     */
    objExists(bucket: string, Key: string, logger?: Logger<{
        bucket: string;
        Key: string;
        exists: boolean;
    }>): Promise<boolean>;
    /**
   * Sets a bucket policy
   * @param {*} bucket bucket name eg: lull
   */
    putBucketAcl({ bucket, WebsiteConfiguration: { RedirectAllRequestsTo: { HostName, Protocol, }, }, logger, }: {
        bucket: string;
        WebsiteConfiguration: {
            RedirectAllRequestsTo: {
                HostName: string;
                Protocol: string;
            };
        };
        logger?: Logger<{
            bucket: string;
            WebsiteConfiguration: {
                RedirectAllRequestsTo: {
                    HostName: string;
                    Protocol: string;
                };
            };
        }>;
    }): Promise<PutBucketAclCommandOutput>;
    /**
    * Sets a bucket policy
    * @param {*} bucket bucket name eg: lull
    */
    putBucketWebsite({ bucket, WebsiteConfiguration: { RedirectAllRequestsTo: { HostName, Protocol, }, }, logger, }: {
        bucket: string;
        WebsiteConfiguration: {
            RedirectAllRequestsTo: {
                HostName: string;
                Protocol: string;
            };
        };
        logger?: Logger<{
            bucket: string;
            WebsiteConfiguration: {
                RedirectAllRequestsTo: {
                    HostName: string;
                    Protocol: string;
                };
            };
        }>;
    }): Promise<PutBucketWebsiteCommandOutput>;
    /**
    * Writes multiple files to S3
    * @param {String} bucket bucket name eg: lullo
    * @param {Array} files an array of objects containing keys {data: , path:, ContentType:, ACL: }
    */
    s3UploadMulti({ bucket, files, logger, }: {
        bucket: string;
        files: {
            data: PutObjectRequest['Body'];
            path: string;
            ContentType: string;
            ACL?: ObjectCannedACL;
        }[];
        logger?: Logger<{
            bucket: string;
            uploadedFiles: string[];
            failedFiles: string[];
        }>;
    }): Promise<{
        uploadedFiles: {
            Key: string;
            res: PutObjectOutput;
        }[];
        failedFiles: {
            Key: string;
            error: any;
        }[];
    }>;
    /**
    * Writes a single files to S3
    * @param {String} bucket bucket name eg: lullo
    * @param {Array} file an objects containing keys {data: , path:, ContentType:, ACL: }
    */
    uploadFile({ bucket, file, logger, }: {
        bucket: string;
        file: {
            data: PutObjectRequest['Body'] | string | Uint8Array | Buffer;
            path: string;
            ContentType: string;
            ACL?: ObjectCannedACL;
        };
        logger?: Logger<{
            bucket: string;
            Key: string;
        }>;
    }): Promise<PutObjectOutput>;
}
