import { Inject, Injectable } from '@nestjs/common';
import { ResumeDomainService } from '../../domain/services/resume.service';
import { ResumeEntity } from '../../domain/entities/resume.entity';
import { RESUME_REPOSITORY } from '../../domain/repositories/resume.repository';
import { ResumeRepository } from '../../domain/repositories/resume.repository';
import { AiService } from '../../../ai/ai.service';
import { ResumeParserService } from '../../../ai/resume-parser.service';
import { MinioService } from '../../../storage/minio.service';

interface MulterFile {
  fieldname: string;
  originalname: string;
  encoding: string;
  mimetype: string;
  buffer: Buffer;
  size: number;
}

@Injectable()
export class ResumeAppService {
  constructor(
    @Inject(RESUME_REPOSITORY)
    private readonly repository: ResumeRepository,
    private readonly domainService: ResumeDomainService,
    private readonly aiService: AiService,
    private readonly resumeParserService: ResumeParserService,
    private readonly minioService: MinioService,
  ) {}

  async uploadAndAnalyze(
    userId: number,
    file: MulterFile,
  ): Promise<ResumeEntity> {
    const filename = `${Date.now()}-${file.originalname}`;
    const fileUrl = await this.minioService.uploadFile(
      filename,
      file.buffer,
      file.mimetype,
    );

    let parsedData = '';
    if (file.mimetype.includes('pdf')) {
      parsedData = await this.resumeParserService.extractTextFromPdf(file.buffer);
    } else if (file.mimetype.includes('docx')) {
      parsedData = await this.resumeParserService.extractTextFromDocx(file.buffer);
    } else {
      parsedData = file.buffer.toString('utf-8');
    }

    const resume = await this.domainService.createResume(
      userId,
      file.originalname,
      fileUrl,
      parsedData,
    );

    const analysis = await this.aiService.completeWithPrompt(
      'resume_analysis',
      {},
      parsedData,
    );

    return this.domainService.updateResumeAnalysis(resume.id!, analysis.content);
  }

  async getResumeById(id: number): Promise<ResumeEntity | null> {
    return this.domainService.getResumeById(id);
  }

  async getUserResumes(userId: number): Promise<ResumeEntity[]> {
    return this.domainService.getUserResumes(userId);
  }

  async deleteResume(id: number): Promise<void> {
    const resume = await this.domainService.getResumeById(id);
    if (resume) {
      await this.minioService.deleteFile(resume.fileUrl.split('/').pop()!);
    }
    await this.domainService.deleteResume(id);
  }
}
