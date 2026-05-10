import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as Minio from 'minio';

@Injectable()
export class StorageService implements OnModuleInit {
  private readonly logger = new Logger(StorageService.name);
  private minioClient: Minio.Client;

  constructor(private configService: ConfigService) {
    this.minioClient = new Minio.Client({
      endPoint: this.configService.get<string>('MINIO_ENDPOINT', 'localhost'),
      port: parseInt(this.configService.get<string>('MINIO_PORT', '9000'), 10),
      useSSL: this.configService.get<string>('MINIO_USE_SSL') === 'true',
      accessKey: this.configService.get<string>('MINIO_ROOT_USER'),
      secretKey: this.configService.get<string>('MINIO_ROOT_PASSWORD'),
    });
  }

  async onModuleInit() {
    const buckets = [
      this.configService.get<string>('MINIO_BUCKET_DOCS', 'private-docs'),
      this.configService.get<string>('MINIO_BUCKET_PUBLIC', 'public-assets'),
    ];

    for (const bucket of buckets) {
      try {
        const exists = await this.minioClient.bucketExists(bucket);
        if (!exists) {
          await this.minioClient.makeBucket(bucket);
          this.logger.log(`Bucket "${bucket}" created successfully.`);
        }
      } catch (error: any) {
        this.logger.error(`Error checking/creating bucket "${bucket}":`, error.message || error);
      }
    }
  }

  async uploadFile(
    bucketName: string,
    fileName: string,
    fileContent: Buffer | string,
    metaData: Minio.ItemBucketMetadata = {},
  ): Promise<string> {
    try {
      const size = typeof fileContent === 'string' ? Buffer.byteLength(fileContent) : fileContent.length;
      await this.minioClient.putObject(bucketName, fileName, fileContent, size, metaData);
      return fileName;
    } catch (error: any) {
      this.logger.error(`Error uploading file to "${bucketName}":`, error.message || error);
      throw error;
    }
  }

  async getFileUrl(bucketName: string, fileName: string, expiry = 3600): Promise<string> {
    try {
      return await this.minioClient.presignedGetObject(bucketName, fileName, expiry);
    } catch (error: any) {
      this.logger.error(`Error getting file URL from "${bucketName}":`, error.message || error);
      throw error;
    }
  }

  async getFileBuffer(bucketName: string, fileName: string): Promise<Buffer> {
    try {
      const dataStream = await this.minioClient.getObject(bucketName, fileName);
      const chunks: any[] = [];
      return new Promise((resolve, reject) => {
        dataStream.on('data', (chunk) => chunks.push(chunk));
        dataStream.on('error', (err) => reject(err));
        dataStream.on('end', () => resolve(Buffer.concat(chunks)));
      });
    } catch (error: any) {
      this.logger.error(`Error getting file buffer from "${bucketName}":`, error.message || error);
      throw error;
    }
  }

  async deleteFile(bucketName: string, fileName: string): Promise<void> {
    try {
      await this.minioClient.removeObject(bucketName, fileName);
    } catch (error: any) {
      this.logger.error(`Error deleting file from "${bucketName}":`, error.message || error);
      throw error;
    }
  }
}
