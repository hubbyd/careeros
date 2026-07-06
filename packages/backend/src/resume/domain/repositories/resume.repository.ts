export const RESUME_REPOSITORY = 'ResumeRepository';

export interface ResumeRepository {
  create(resume: Omit<Resume, 'id' | 'createdAt' | 'updatedAt'>): Promise<Resume>;
  findById(id: number): Promise<Resume | null>;
  findByUserId(userId: number): Promise<Resume[]>;
  update(id: number, data: Partial<Resume>): Promise<Resume>;
  delete(id: number): Promise<void>;
}

export interface Resume {
  id: number;
  userId: number;
  fileName: string;
  fileUrl: string;
  parsedData: string;
  analysisResult: string;
  status: string;
  createdAt: Date;
  updatedAt: Date;
}
