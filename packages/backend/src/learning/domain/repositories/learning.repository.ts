export const LEARNING_REPOSITORY = 'LearningRepository';

export interface LearningRepository {
  createPlan(plan: Omit<LearningPlan, 'id' | 'createdAt' | 'updatedAt'>): Promise<LearningPlan>;
  findPlanById(id: number): Promise<LearningPlan | null>;
  findPlansByUserId(userId: number): Promise<LearningPlan[]>;
  updatePlan(id: number, data: Partial<LearningPlan>): Promise<LearningPlan>;
  deletePlan(id: number): Promise<void>;

  createRecord(record: Omit<GrowthRecord, 'id' | 'createdAt'>): Promise<GrowthRecord>;
  findRecordsByUserId(userId: number): Promise<GrowthRecord[]>;
  findRecordsByUserIdAndType(userId: number, type: string): Promise<GrowthRecord[]>;
  deleteRecord(id: number): Promise<void>;
}

export interface LearningPlan {
  id: number;
  userId: number;
  title: string;
  description: string | null;
  planData: string;
  progress: number;
  status: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface GrowthRecord {
  id: number;
  userId: number;
  type: string;
  content: string;
  metadata: string | null;
  createdAt: Date;
}
