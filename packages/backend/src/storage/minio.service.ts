import { Injectable } from '@nestjs/common';
import * as Minio from 'minio';

@Injectable()
export class MinioService {
  private readonly client: Minio.Client | null;
  private readonly bucketName = 'aic-resumes';

  constructor() {
    try {
      const url = process.env.MINIO_URL || 'http://localhost:9000';
      const parsedUrl = new URL(url);
      this.client = new Minio.Client({
        endPoint: parsedUrl.hostname,
        port: parseInt(parsedUrl.port || '9000', 10),
        useSSL: parsedUrl.protocol === 'https:',
        accessKey: process.env.MINIO_ACCESS_KEY || 'admin',
        secretKey: process.env.MINIO_SECRET_KEY || 'password',
      });
      this.ensureBucket();
    } catch {
      this.client = null;
      console.log('MinIO not available, using fallback storage');
    }
  }

  private async ensureBucket() {
    if (!this.client) return;
    try {
      const exists = await this.client.bucketExists(this.bucketName);
      if (!exists) {
        await this.client.makeBucket(this.bucketName);
      }
    } catch {
      console.log('MinIO not available, using fallback storage');
    }
  }

  async uploadFile(filename: string, fileBuffer: Buffer, contentType: string): Promise<string> {
    if (!this.client) {
      return this.saveLocalFile(filename, fileBuffer);
    }
    try {
      await this.client.putObject(this.bucketName, filename, fileBuffer, fileBuffer.length, {
        'Content-Type': contentType,
      });
      return `${process.env.MINIO_URL}/${this.bucketName}/${filename}`;
    } catch {
      return this.saveLocalFile(filename, fileBuffer);
    }
  }

  async getFile(filename: string): Promise<Buffer | null> {
    if (!this.client) {
      return this.getLocalFile(filename);
    }
    try {
      const stream = await this.client.getObject(this.bucketName, filename);
      return new Promise((resolve, reject) => {
        const chunks: Buffer[] = [];
        stream.on('data', (chunk) => chunks.push(chunk));
        stream.on('end', () => resolve(Buffer.concat(chunks)));
        stream.on('error', reject);
      });
    } catch {
      return this.getLocalFile(filename);
    }
  }

  async deleteFile(filename: string): Promise<void> {
    if (!this.client) {
      this.deleteLocalFile(filename);
      return;
    }
    try {
      await this.client.removeObject(this.bucketName, filename);
    } catch {
      this.deleteLocalFile(filename);
    }
  }

  async getPresignedUrl(filename: string, expiresIn: number = 3600): Promise<string> {
    if (!this.client) {
      return `${process.env.MINIO_URL}/${this.bucketName}/${filename}`;
    }
    try {
      return this.client.presignedUrl('GET', this.bucketName, filename, expiresIn);
    } catch {
      return `${process.env.MINIO_URL}/${this.bucketName}/${filename}`;
    }
  }

  private saveLocalFile(filename: string, fileBuffer: Buffer): string {
    const fs = require('fs');
    const path = require('path');
    const uploadDir = path.join(__dirname, '..', '..', 'uploads');
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }
    const filePath = path.join(uploadDir, filename);
    fs.writeFileSync(filePath, fileBuffer);
    return `/uploads/${filename}`;
  }

  private getLocalFile(filename: string): Buffer | null {
    const fs = require('fs');
    const path = require('path');
    const filePath = path.join(__dirname, '..', '..', 'uploads', filename);
    if (fs.existsSync(filePath)) {
      return fs.readFileSync(filePath);
    }
    return null;
  }

  private deleteLocalFile(filename: string): void {
    const fs = require('fs');
    const path = require('path');
    const filePath = path.join(__dirname, '..', '..', 'uploads', filename);
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
    }
  }
}
