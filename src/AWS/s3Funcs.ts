/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable prefer-promise-reject-errors */
/* eslint-disable @typescript-eslint/no-unused-vars */
/**
 * Exports all functions related to AWS S3.
 * @module S3Utils
 * @category AWS
 */
import {
  S3Client,
  CreateBucketCommand,
  DeleteBucketCommand,
  DeleteObjectCommand,
  GetObjectCommand,
  GetBucketAclCommand,
  GetBucketWebsiteCommand,
  ListObjectsV2Command,
  PutBucketAclCommand,
  PutBucketWebsiteCommand,
  PutObjectCommand,
  HeadObjectCommand,
  S3ClientConfig,
  PutObjectCommandInput,
  paginateListObjectsV2,
} from '@aws-sdk/client-s3';
import type {
  ObjectCannedACL,
  CreateBucketOutput,
  DeleteBucketCommandOutput,
  GetObjectCommandOutput,
  DeleteObjectCommandOutput,
  GetBucketAclOutput,
  GetBucketWebsiteOutput,
  ListObjectsV2Output,
  HeadObjectCommandOutput,
  PutBucketAclCommandOutput,
  PutBucketWebsiteCommandOutput,
  PutObjectOutput,
  PutObjectRequest,
} from '@aws-sdk/client-s3';

export type {
  ObjectCannedACL,
  CreateBucketOutput,
  DeleteBucketCommandOutput,
  GetObjectCommandOutput,
  DeleteObjectCommandOutput,
  GetBucketAclOutput,
  GetBucketWebsiteOutput,
  ListObjectsV2Output,
  HeadObjectCommandOutput,
  PutBucketAclCommandOutput,
  PutBucketWebsiteCommandOutput,
  PutObjectOutput,
  PutObjectRequest,
  PutObjectCommandInput,
};

const startWithSlashRegex = /^\//;
const endsWithSlashRegex = /\/$/;

/**
 * Gets the current method name
 * @param obj
 * @returns
 */
function getName(obj: any): string {
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

const checkPrefix = (Prefix: string) => {
  if (startWithSlashRegex.test(Prefix)) {
    return `${Prefix.replace(/^\//, '')}`;
  }
  if (!endsWithSlashRegex.test(Prefix)) {
    return `${Prefix}/`;
  }
  return Prefix;
};

type Logger<T = undefined> = (args: {
  message: string
  status?: number
  extra: T & {
    method: string
  }
}) => void

export class AWSS3Utils {
  private s3: S3Client;

  constructor({
    awsS3Region,
    awsS3Id,
    awsS3Secret,
  }: {
    awsS3Region: string,
    awsS3Id: string,
    awsS3Secret: string,
  }) {
    this.s3 = new S3Client({
      region: awsS3Region,
      credentials: {
        accessKeyId: awsS3Id,
        secretAccessKey: awsS3Secret,
      },
    });
  }

  close(): void {
    this.s3.destroy();
    // @ts-ignore
    delete this.s3;
  }

  /**
   * Creates an S3 bucket
   * @param {String} bucket bucket name eg: lullo
   */
  async createBucket(
    bucketName: string,
    logger: Logger<{
      name: string
      Location?: string,
    }> = () => {},
  ): Promise<CreateBucketOutput> {
    const params = {
      Bucket: bucketName,
    };
    const output = await this.s3.send(new CreateBucketCommand(params));

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
  async deleteBucket(
    bucketName: string,
    logger: Logger<{
      name: string
    }> = () => {},
  ): Promise<DeleteBucketCommandOutput> {
    const params = {
      Bucket: bucketName,
    };
    const res = await this.s3.send(new DeleteBucketCommand(params));

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
  async s3DeleteFiles({
    bucket,
    files,
    logger = () => {},
  }: {
    bucket: string,
    files: string[],
    logger?: Logger<{
      name: string
      deletedFiles: string[];
      failedFiles: {
          name: string;
          error: any;
      }[];
    }>
  }) : Promise<{
    deletedFiles: {
        name: string;
        res: DeleteObjectCommandOutput;
    }[];
    failedFiles: {
        name: string;
        error: any;
    }[];
  }> {
    const promise = files.map(async (file) => new Promise<{
      file: string,
      res: DeleteObjectCommandOutput
    }>((resolve, reject) => {
      (async () => {
        try {
          const params = {
            Bucket: bucket,
            Key: file,
          };
          const res = await this.s3.send(new DeleteObjectCommand(params));
          resolve({
            res,
            file,
          });
        } catch (error) {
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

      const reason = f.reason as {
        file: string,
        error: any
      };

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
    } as {
      deletedFiles: {
        name: string,
        res: DeleteObjectCommandOutput,
      }[],
      failedFiles: {
        name: string,
        error: any,
      }[]
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
  async s3Download({
    bucket,
    files,
    logger = () => {},
  }: {
    bucket: string,
    files: string[],
    logger?: Logger<{
      name: string
      downloadedFiles: string[];
      failedFiles: {
          name: string;
          error: any;
      }[];
    }>
  }): Promise<{
    downloadedFiles: {
        name: string;
        res: GetObjectCommandOutput;
    }[];
    failedFiles: {
        name: string;
        error: any;
    }[];
  }> {
    const promise = files.map(async (file) => new Promise<{
      file: string,
      res: GetObjectCommandOutput
    }>((resolve, reject) => {
      (async () => {
        try {
          const params = {
            Bucket: bucket,
            Key: file,
          };

          const res = await this.s3.send(new GetObjectCommand(params));
          resolve({
            res,
            file,
          });
        } catch (error) {
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

      const reason = f.reason as {
        file: string,
        error: any
      };

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
    } as {
      downloadedFiles: {
        name: string,
        res: GetObjectCommandOutput,
      }[],
      failedFiles: {
        name: string,
        error: any,
      }[]
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
  async getBucketAcl(
    bucketName: string,
    logger: Logger<{
      bucket: string
    }> = () => {},
  ): Promise<GetBucketAclOutput> {
    const params = {
      Bucket: bucketName,
    };
    const res = await this.s3.send(new GetBucketAclCommand(params));
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
  async getBucketWebsite(
    bucketName: string,
    logger: Logger<{
      bucket: string
    }> = () => {},
  ): Promise<GetBucketWebsiteOutput> {
    const params = {
      Bucket: bucketName,
    };
    const res = await this.s3.send(new GetBucketWebsiteCommand(params));

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
  async s3ListObjects(
    bucket: string,
    prefix: string,
    logger: Logger<{
      bucket: string,
      prefix: string
    }> = () => {},
  ): Promise<{
    files: string[],
    dirs: string[]
  }> {
    const params = {
      Bucket: bucket,
      Prefix: checkPrefix(prefix),
      Delimiter: '/',
    };

    const data: {
      files: string[],
      dirs: string[]
    } = {
      files: [],
      dirs: [],
    };
    for await (const res of paginateListObjectsV2({
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
        .map((i) => i.Key as string);

      const directories = (res.CommonPrefixes ?? [])
        .filter((i) => i.Prefix)
        .map((i) => i.Prefix) as string[];

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
  async getObjHead(
    bucket: string,
    Key: string,
    logger: Logger<{
      bucket: string,
      Key: string
    }> = () => {},
  ): Promise<HeadObjectCommandOutput> {
    const params = {
      Bucket: bucket,
      Key,
      Delimiter: '/',
    };
    const res = await this.s3.send(new HeadObjectCommand(params));

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
  async objExists(
    bucket: string,
    Key: string,
    logger: Logger<{
      bucket: string,
      Key: string,
      exists: boolean
    }> = () => {},
  ): Promise<boolean> {
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
    } catch (error) {
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
  async putBucketAcl({
    bucket,
    WebsiteConfiguration: {
      RedirectAllRequestsTo: {
        HostName,
        Protocol,
      },
    },
    logger = () => {},
  }: {
    bucket: string,
    WebsiteConfiguration: {
      RedirectAllRequestsTo: {
        HostName: string,
        Protocol: string,
      },
    },
    logger?: Logger<{
      bucket: string,
      WebsiteConfiguration: {
        RedirectAllRequestsTo: {
          HostName: string,
          Protocol: string,
        },
      }
    }>
  }): Promise<PutBucketAclCommandOutput> {
    const staticHostParams = {
      Bucket: bucket,
      WebsiteConfiguration: {
        RedirectAllRequestsTo: {
          HostName,
          Protocol,
        },
      },
    };
    const res = await this.s3.send(new PutBucketAclCommand(staticHostParams));

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
  async putBucketWebsite({
    bucket,
    WebsiteConfiguration: {
      RedirectAllRequestsTo: {
        HostName,
        Protocol,
      },
    },
    logger = () => {},
  }: {
    bucket: string,
    WebsiteConfiguration: {
      RedirectAllRequestsTo: {
        HostName: string,
        Protocol: string,
      },
    },
    logger?: Logger<{
      bucket: string,
      WebsiteConfiguration: {
        RedirectAllRequestsTo: {
          HostName: string,
          Protocol: string,
        },
      }
    }>
  }):Promise<PutBucketWebsiteCommandOutput> {
    const staticHostParams = {
      Bucket: bucket,
      WebsiteConfiguration: {
        RedirectAllRequestsTo: {
          HostName,
          Protocol,
        },
      },
    };

    const res = await this.s3.send(new PutBucketWebsiteCommand(staticHostParams));

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
  async s3UploadMulti({
    bucket,
    files,
    logger = () => {},
  }: {
    bucket: string,
    files:{
      data: PutObjectRequest['Body'],
      path: string,
      ContentType: string,
      ACL?: ObjectCannedACL,
    }[],
    logger?: Logger<{
      bucket: string,
      uploadedFiles: string[],
      failedFiles: string[]
    }>
  }): Promise<{
    uploadedFiles: {
        Key: string;
        res: PutObjectOutput;
    }[];
    failedFiles: {
        Key: string;
        error: any;
    }[];
}> {
    const promise = files.map(async (file) => new Promise<{
      res: PutObjectOutput
      Key: string,
      ContentType: string,
      ACL?: ObjectCannedACL,
    }>((resolve, reject) => {
      (async () => {
        try {
          const paramsWrite: PutObjectRequest = {
            Bucket: bucket,
            Key: file.path,
            Body: file.data,
            ContentType: file.ContentType,
            ACL: file.ACL,
          };

          const res = await this.s3.send(new PutObjectCommand(paramsWrite));

          resolve({
            res,
            Key: file.path,
            ContentType: file.ContentType,
            ACL: file.ACL,
          });
        } catch (error) {
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

      const reason = f.reason as {
        Key: string,
        ContentType: string,
        ACL: ObjectCannedACL,
        error: any,
      };

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
    } as {
      uploadedFiles: {
        Key: string,
        res: PutObjectOutput,
      }[],
      failedFiles: {
        Key: string,
        error: any,
      }[]
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
  async uploadFile({
    bucket,
    file,
    logger = () => {},
  }: {
    bucket: string,
    file: {
      data: PutObjectRequest['Body'] | string | Uint8Array | Buffer,
      path: string,
      ContentType: string,
      ACL?: ObjectCannedACL,
    },
    logger?: Logger<{
      bucket: string,
      Key: string
    }>
  }): Promise<PutObjectOutput> {
    const paramsWrite: PutObjectCommandInput = {
      Bucket: bucket,
      Key: file.path,
      Body: file.data,
      ContentType: file.ContentType,
      ACL: file.ACL,
    };

    const res = await this.s3.send(new PutObjectCommand(paramsWrite));
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
