import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../prisma/prisma.service';
import { ResumeRepository, Resume } from '../../domain/repositories/resume.repository';

@Injectable()
export class PrismaResumeRepository implements ResumeRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async create(resume: Omit<Resume, 'id' | 'createdAt' | 'updatedAt'>): Promise<Resume> {
    const result = await this.prismaService.resume.create({
      data: {
        userId: resume.userId,
        fileName: resume.fileName,
        fileUrl: resume.fileUrl,
        parsedData: resume.parsedData,
        analysisResult: resume.analysisResult,
        status: resume.status,
      },
    });

    return {
      id: result.id,
      userId: result.userId,
      fileName: result.fileName,
      fileUrl: result.fileUrl,
      parsedData: result.parsedData,
      analysisResult: result.analysisResult,
      status: result.status,
      createdAt: result.createdAt,
      updatedAt: result.updatedAt,
    };
  }

  async findById(id: number): Promise<Resume | null> {
    const result = await this.prismaService.resume.findUnique({
      where: { id },
    });

    if (!result) return null;

    return {
      id: result.id,
      userId: result.userId,
      fileName: result.fileName,
      fileUrl: result.fileUrl,
      parsedData: result.parsedData,
      analysisResult: result.analysisResult,
      status: result.status,
      createdAt: result.createdAt,
      updatedAt: result.updatedAt,
    };
  }

  async findByUserId(userId: number): Promise<Resume[]> {
    const results = await this.prismaService.resume.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' },
    });

    return results.map((result) => ({
      id: result.id,
      userId: result.userId,
      fileName: result.fileName,
      fileUrl: result.fileUrl,
      parsedData: result.parsedData,
      analysisResult: result.analysisResult,
      status: result.status,
      createdAt: result.createdAt,
      updatedAt: result.updatedAt,
    }));
  }

  async update(id: number, data: Partial<Resume>): Promise<Resume> {
    const result = await this.prismaService.resume.update({
      where: { id },
      data: {
        fileName: data.fileName,
        fileUrl: data.fileUrl,
        parsedData: data.parsedData,
        analysisResult: data.analysisResult,
        status: data.status,
      },
    });

    return {
      id: result.id,
      userId: result.userId,
      fileName: result.fileName,
      fileUrl: result.fileUrl,
      parsedData: result.parsedData,
      analysisResult: result.analysisResult,
      status: result.status,
      createdAt: result.createdAt,
      updatedAt: result.updatedAt,
    };
  }

  async delete(id: number): Promise<void> {
    await this.prismaService.resume.delete({
      where: { id },
    });
  }
}
