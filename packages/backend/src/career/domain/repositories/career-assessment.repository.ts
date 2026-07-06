export const CAREER_ASSESSMENT_REPOSITORY = 'CareerAssessmentRepository';

export interface CareerAssessmentRepository {
  create(assessment: Omit<CareerAssessment, 'id' | 'createdAt' | 'updatedAt'>): Promise<CareerAssessment>;
  findById(id: number): Promise<CareerAssessment | null>;
  findByUserId(userId: number): Promise<CareerAssessment[]>;
  findByUserIdAndType(userId: number, type: string): Promise<CareerAssessment[]>;
  update(id: number, data: Partial<CareerAssessment>): Promise<CareerAssessment>;
  delete(id: number): Promise<void>;
}

export interface CareerAssessment {
  id: number;
  userId: number;
  assessmentType: string;
  inputData: string;
  resultData: string;
  score: number | null;
  createdAt: Date;
  updatedAt: Date;
}
