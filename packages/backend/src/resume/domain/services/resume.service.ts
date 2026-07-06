import { ResumeRepository } from '../repositories/resume.repository';
import { ResumeEntity } from '../entities/resume.entity';

export class ResumeDomainService {
  constructor(private readonly repository: ResumeRepository) {}

  async createResume(
    userId: number,
    fileName: string,
    fileUrl: string,
    parsedData: string,
  ): Promise<ResumeEntity> {
    const resume = await this.repository.create({
      userId,
      fileName,
      fileUrl,
      parsedData,
      analysisResult: '',
      status: 'parsed',
    });

    return new ResumeEntity({
      id: resume.id,
      userId: resume.userId,
      fileName: resume.fileName,
      fileUrl: resume.fileUrl,
      parsedData: resume.parsedData,
      analysisResult: resume.analysisResult,
      status: resume.status,
    });
  }

  async updateResumeAnalysis(id: number, analysisResult: string): Promise<ResumeEntity> {
    const resume = await this.repository.update(id, {
      analysisResult,
      status: 'analyzed',
    });

    return new ResumeEntity({
      id: resume.id,
      userId: resume.userId,
      fileName: resume.fileName,
      fileUrl: resume.fileUrl,
      parsedData: resume.parsedData,
      analysisResult: resume.analysisResult,
      status: resume.status,
    });
  }

  async getResumeById(id: number): Promise<ResumeEntity | null> {
    const resume = await this.repository.findById(id);
    if (!resume) return null;

    return new ResumeEntity({
      id: resume.id,
      userId: resume.userId,
      fileName: resume.fileName,
      fileUrl: resume.fileUrl,
      parsedData: resume.parsedData,
      analysisResult: resume.analysisResult,
      status: resume.status,
    });
  }

  async getUserResumes(userId: number): Promise<ResumeEntity[]> {
    const resumes = await this.repository.findByUserId(userId);
    return resumes.map(
      (r) =>
        new ResumeEntity({
          id: r.id,
          userId: r.userId,
          fileName: r.fileName,
          fileUrl: r.fileUrl,
          parsedData: r.parsedData,
          analysisResult: r.analysisResult,
          status: r.status,
        }),
    );
  }

  async deleteResume(id: number): Promise<void> {
    await this.repository.delete(id);
  }
}
