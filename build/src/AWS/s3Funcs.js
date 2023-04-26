"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AWSS3Utils = void 0;
/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable prefer-promise-reject-errors */
/* eslint-disable @typescript-eslint/no-unused-vars */
/**
 * Exports all functions related to AWS S3.
 * @module S3Utils
 * @category AWS
 */
const client_s3_1 = require("@aws-sdk/client-s3");
const startWithSlashRegex = /^\//;
const endsWithSlashRegex = /\/$/;
/**
 * Gets the current method name
 * @param obj
 * @returns
 */
function getName(obj) {
    if (obj.name) {
        return obj.name;
    }
    let funcNameRegex = /function (.{1,})\(/;
    let results = (funcNameRegex).exec(obj.toString());
    let result = results && results.length > 1 && results[1];
    // Check to see custom implementation
    if (!result) {
        funcNameRegex = /return _this.(.*);/;
        results = (funcNameRegex).exec(obj.toString());
        result = results && results.length > 1 && results[1];
    }
    return result || '';
}
const checkPrefix = (Prefix) => {
    if (startWithSlashRegex.test(Prefix)) {
        return `${Prefix.replace(/^\//, '')}`;
    }
    if (!endsWithSlashRegex.test(Prefix)) {
        return `${Prefix}/`;
    }
    return Prefix;
};
class AWSS3Utils {
    s3;
    constructor({ awsS3Region, awsS3Id, awsS3Secret, }) {
        this.s3 = new client_s3_1.S3Client({
            region: awsS3Region,
            credentials: {
                accessKeyId: awsS3Id,
                secretAccessKey: awsS3Secret,
            },
        });
    }
    close() {
        this.s3.destroy();
        // @ts-ignore
        delete this.s3;
    }
    /**
     * Creates an S3 bucket
     * @param {String} bucket bucket name eg: lullo
     */
    async createBucket(bucketName, logger = () => { }) {
        const params = {
            Bucket: bucketName,
        };
        const output = await this.s3.send(new client_s3_1.CreateBucketCommand(params));
        logger({
            message: 'Bucket created.',
            status: output?.$metadata?.httpStatusCode,
            extra: {
                name: bucketName,
                Location: output.Location,
                method: getName(this.createBucket),
            },
        });
        return output;
    }
    /**
    * Deletes an S3 bucket
    * @param {String} bucket bucket name eg: lullo
    */
    async deleteBucket(bucketName, logger = () => { }) {
        const params = {
            Bucket: bucketName,
        };
        const res = await this.s3.send(new client_s3_1.DeleteBucketCommand(params));
        logger({
            message: 'Bucket deleted.',
            status: res?.$metadata?.httpStatusCode,
            extra: {
                name: bucketName,
                method: getName(this.deleteBucket),
            },
        });
        return res;
    }
    /**
    * Deletes files in S3 bucket
    * @param {String} bucket bucket name eg: lullo
    * @param {Array} files an array of paths
    */
    async s3DeleteFiles({ bucket, files, logger = () => { }, }) {
        const promise = files.map(async (file) => new Promise((resolve, reject) => {
            (async () => {
                try {
                    const params = {
                        Bucket: bucket,
                        Key: file,
                    };
                    const res = await this.s3.send(new client_s3_1.DeleteObjectCommand(params));
                    resolve({
                        res,
                        file,
                    });
                }
                catch (error) {
                    reject({
                        file,
                        error,
                    });
                }
            })();
        }));
        const res = await Promise.allSettled(promise);
        const filesResponse = res.reduce((obj, f) => {
            if (f.status === 'fulfilled') {
                return {
                    ...obj,
                    deletedFiles: [
                        ...obj.deletedFiles,
                        {
                            name: f.value.file,
                            res: f.value.res,
                        },
                    ],
                };
            }
            const reason = f.reason;
            return {
                ...obj,
                failedFiles: [
                    ...obj.failedFiles,
                    {
                        name: reason.file,
                        error: reason.error,
                    },
                ],
            };
        }, {
            deletedFiles: [],
            failedFiles: [],
        });
        logger({
            message: 'Files Deleted.',
            extra: {
                name: bucket,
                deletedFiles: filesResponse.deletedFiles.map((f) => f.name),
                failedFiles: filesResponse.failedFiles,
                method: getName(this.s3DeleteFiles),
            },
        });
        return filesResponse;
    }
    /**
    * Downloads files in S3 bucket
    * @param {String} bucket bucket name eg: lullo
    * @param {Array} files an array of paths
    */
    async s3Download({ bucket, files, logger = () => { }, }) {
        const promise = files.map(async (file) => new Promise((resolve, reject) => {
            (async () => {
                try {
                    const params = {
                        Bucket: bucket,
                        Key: file,
                    };
                    const res = await this.s3.send(new client_s3_1.GetObjectCommand(params));
                    resolve({
                        res,
                        file,
                    });
                }
                catch (error) {
                    reject({
                        file,
                        error,
                    });
                }
            })();
        }));
        const res = await Promise.allSettled(promise);
        const filesResponse = res.reduce((obj, f) => {
            if (f.status === 'fulfilled') {
                return {
                    ...obj,
                    downloadedFiles: [
                        ...obj.downloadedFiles,
                        {
                            name: f.value.file,
                            res: f.value.res,
                        },
                    ],
                };
            }
            const reason = f.reason;
            return {
                ...obj,
                failedFiles: [
                    ...obj.failedFiles,
                    {
                        name: reason.file,
                        error: reason.error,
                    },
                ],
            };
        }, {
            downloadedFiles: [],
            failedFiles: [],
        });
        logger({
            message: 'Files downloaded.',
            extra: {
                name: bucket,
                downloadedFiles: filesResponse.downloadedFiles.map((f) => f.name),
                failedFiles: filesResponse.failedFiles,
                method: getName(this.s3Download),
            },
        });
        return filesResponse;
    }
    /**
    * Gets S3 bucket ACL policy
    * @param {String} bucket bucket name eg: lullo
    */
    async getBucketAcl(bucketName, logger = () => { }) {
        const params = {
            Bucket: bucketName,
        };
        const res = await this.s3.send(new client_s3_1.GetBucketAclCommand(params));
        logger({
            message: 'Fetched bucket ACL.',
            status: res?.$metadata?.httpStatusCode,
            extra: {
                bucket: bucketName,
                method: getName(this.getBucketAcl),
            },
        });
        return res;
    }
    /**
    * Returns the website configuration for a bucket. To host website on Amazon S3, you can configure a bucket as website by adding a website configuration.
    * @param {String} bucket bucket name eg: lullo
    */
    async getBucketWebsite(bucketName, logger = () => { }) {
        const params = {
            Bucket: bucketName,
        };
        const res = await this.s3.send(new client_s3_1.GetBucketWebsiteCommand(params));
        logger({
            message: 'Fetched bucket website config.',
            status: res?.$metadata?.httpStatusCode,
            extra: {
                bucket: bucketName,
                method: getName(this.getBucketWebsite),
            },
        });
        return res;
    }
    /**
    * Lists a directory in S3 bucket
    * @param {*} bucket bucket name eg: lullo
    * @param {*} prefix path
    */
    async s3ListObjects(bucket, prefix, logger = () => { }) {
        const params = {
            Bucket: bucket,
            Prefix: checkPrefix(prefix),
            Delimiter: '/',
        };
        const data = {
            files: [],
            dirs: [],
        };
        for await (const res of (0, client_s3_1.paginateListObjectsV2)({
            client: this.s3,
        }, params)) {
            if (Number(res?.$metadata?.httpStatusCode) !== 200) {
                logger({
                    message: `Request to list S3 directory failed with status ${res.$metadata.httpStatusCode}`,
                    status: res?.$metadata?.httpStatusCode,
                    extra: {
                        bucket,
                        prefix,
                        method: getName(this.s3ListObjects),
                    },
                });
                continue;
            }
            const files = (res.Contents ?? [])
                .filter((i) => i.Key && i.Key !== params.Prefix)
                .map((i) => i.Key);
            const directories = (res.CommonPrefixes ?? [])
                .filter((i) => i.Prefix)
                .map((i) => i.Prefix);
            data.files.push(...files);
            data.dirs.push(...directories);
        }
        logger({
            message: 'Listed objects for bucket',
            extra: {
                bucket,
                prefix,
                method: getName(this.s3ListObjects),
            },
        });
        return data;
    }
    /**
     * Gets object info
     * @param bucket
     * @param Key
     * @returns
     */
    async getObjHead(bucket, Key, logger = () => { }) {
        const params = {
            Bucket: bucket,
            Key,
            Delimiter: '/',
        };
        const res = await this.s3.send(new client_s3_1.HeadObjectCommand(params));
        logger({
            message: 'Fetched object head.',
            status: res?.$metadata?.httpStatusCode,
            extra: {
                bucket,
                Key,
                method: getName(this.getObjHead),
            },
        });
        return res;
    }
    /**
     * Checks if an object exists
     * @param bucket
     * @param Key
     * @returns
     */
    async objExists(bucket, Key, logger = () => { }) {
        try {
            const res = await this.getObjHead(bucket, Key);
            logger({
                message: 'Checked if object exists.',
                status: res?.$metadata?.httpStatusCode,
                extra: {
                    bucket,
                    Key,
                    method: getName(this.objExists),
                    exists: true,
                },
            });
            return true;
        }
        catch (error) {
            logger({
                message: 'Checked if object exists.',
                status: error?.$metadata?.httpStatusCode,
                extra: {
                    bucket,
                    Key,
                    method: getName(this.objExists),
                    exists: false,
                },
            });
            if (error.name === 'NotFound' || error.$response === 404) {
                return false;
            }
            throw error;
        }
    }
    /**
   * Sets a bucket policy
   * @param {*} bucket bucket name eg: lull
   */
    async putBucketAcl({ bucket, WebsiteConfiguration: { RedirectAllRequestsTo: { HostName, Protocol, }, }, logger = () => { }, }) {
        const staticHostParams = {
            Bucket: bucket,
            WebsiteConfiguration: {
                RedirectAllRequestsTo: {
                    HostName,
                    Protocol,
                },
            },
        };
        const res = await this.s3.send(new client_s3_1.PutBucketAclCommand(staticHostParams));
        logger({
            message: 'Updated bucket ACL.',
            status: res?.$metadata?.httpStatusCode,
            extra: {
                bucket,
                WebsiteConfiguration: {
                    RedirectAllRequestsTo: {
                        HostName,
                        Protocol,
                    },
                },
                method: getName(this.putBucketAcl),
            },
        });
        return res;
    }
    /**
    * Sets a bucket policy
    * @param {*} bucket bucket name eg: lull
    */
    async putBucketWebsite({ bucket, WebsiteConfiguration: { RedirectAllRequestsTo: { HostName, Protocol, }, }, logger = () => { }, }) {
        const staticHostParams = {
            Bucket: bucket,
            WebsiteConfiguration: {
                RedirectAllRequestsTo: {
                    HostName,
                    Protocol,
                },
            },
        };
        const res = await this.s3.send(new client_s3_1.PutBucketWebsiteCommand(staticHostParams));
        logger({
            message: 'Updated bucket website ACL.',
            status: res?.$metadata?.httpStatusCode,
            extra: {
                bucket,
                WebsiteConfiguration: {
                    RedirectAllRequestsTo: {
                        HostName,
                        Protocol,
                    },
                },
                method: getName(this.putBucketWebsite),
            },
        });
        return res;
    }
    /**
    * Writes multiple files to S3
    * @param {String} bucket bucket name eg: lullo
    * @param {Array} files an array of objects containing keys {data: , path:, ContentType:, ACL: }
    */
    async s3UploadMulti({ bucket, files, logger = () => { }, }) {
        const promise = files.map(async (file) => new Promise((resolve, reject) => {
            (async () => {
                try {
                    const paramsWrite = {
                        Bucket: bucket,
                        Key: file.path,
                        Body: file.data,
                        ContentType: file.ContentType,
                        ACL: file.ACL,
                    };
                    const res = await this.s3.send(new client_s3_1.PutObjectCommand(paramsWrite));
                    resolve({
                        res,
                        Key: file.path,
                        ContentType: file.ContentType,
                        ACL: file.ACL,
                    });
                }
                catch (error) {
                    reject({
                        Key: file.path,
                        ContentType: file.ContentType,
                        ACL: file.ACL,
                        error,
                    });
                }
            })();
        }));
        const res = await Promise.allSettled(promise);
        const filesResponse = res.reduce((obj, f) => {
            if (f.status === 'fulfilled') {
                return {
                    ...obj,
                    uploadedFiles: [
                        ...obj.uploadedFiles,
                        {
                            Key: f.value.Key,
                            res: f.value.res,
                        },
                    ],
                };
            }
            const reason = f.reason;
            return {
                ...obj,
                failedFiles: [
                    ...obj.failedFiles,
                    {
                        Key: reason.Key,
                        error: reason.error,
                    },
                ],
            };
        }, {
            uploadedFiles: [],
            failedFiles: [],
        });
        logger({
            message: 'Multiple files uploaded.',
            extra: {
                bucket,
                uploadedFiles: filesResponse.uploadedFiles.map((f) => f.Key),
                failedFiles: filesResponse.failedFiles.map((f) => f.Key),
                method: getName(this.s3UploadMulti),
            },
        });
        return filesResponse;
    }
    /**
    * Writes a single files to S3
    * @param {String} bucket bucket name eg: lullo
    * @param {Array} file an objects containing keys {data: , path:, ContentType:, ACL: }
    */
    async uploadFile({ bucket, file, logger = () => { }, }) {
        const paramsWrite = {
            Bucket: bucket,
            Key: file.path,
            Body: file.data,
            ContentType: file.ContentType,
            ACL: file.ACL,
        };
        const res = await this.s3.send(new client_s3_1.PutObjectCommand(paramsWrite));
        logger({
            message: 'File uploaded.',
            status: res?.$metadata?.httpStatusCode,
            extra: {
                bucket,
                Key: file.path,
                method: getName(this.uploadFile),
            },
        });
        return res;
    }
}
exports.AWSS3Utils = AWSS3Utils;
//# sourceMappingURL=s3Funcs.js.map