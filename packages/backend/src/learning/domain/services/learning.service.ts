import { LearningRepository } from '../repositories/learning.repository';
import { LearningPlanEntity, GrowthRecordEntity } from '../entities/learning.entity';

export class LearningDomainService {
  constructor(private readonly repository: LearningRepository) {}

  async createPlan(
    userId: number,
    title: string,
    description: string,
    planData: string,
  ): Promise<LearningPlanEntity> {
    const plan = await this.repository.createPlan({
      userId,
      title,
      description,
      planData,
      progress: 0,
      status: 'active',
    });

    return this.mapToPlanEntity(plan);
  }

  async getPlanById(userId: number, id: number): Promise<LearningPlanEntity | null> {
    const plan = await this.repository.findPlanById(id);
    if (!plan || plan.userId !== userId) return null;

    return this.mapToPlanEntity(plan);
  }

  async getUserPlans(userId: number): Promise<LearningPlanEntity[]> {
    const plans = await this.repository.findPlansByUserId(userId);
    return plans.map((p) => this.mapToPlanEntity(p));
  }

  async updatePlanProgress(userId: number, id: number, progress: number): Promise<LearningPlanEntity> {
    const plan = await this.repository.findPlanById(id);
    if (!plan || plan.userId !== userId) {
      throw new Error('无权操作此学习计划');
    }

    const updated = await this.repository.updatePlan(id, { progress });
    return this.mapToPlanEntity(updated);
  }

  async completePlan(userId: number, id: number): Promise<LearningPlanEntity> {
    const plan = await this.repository.findPlanById(id);
    if (!plan || plan.userId !== userId) {
      throw new Error('无权操作此学习计划');
    }

    const updated = await this.repository.updatePlan(id, { progress: 100, status: 'completed' });
    return this.mapToPlanEntity(updated);
  }

  async deletePlan(userId: number, id: number): Promise<void> {
    const plan = await this.repository.findPlanById(id);
    if (!plan || plan.userId !== userId) {
      throw new Error('无权删除此学习计划');
    }

    await this.repository.deletePlan(id);
  }

  async createGrowthRecord(
    userId: number,
    type: string,
    content: string,
    metadata?: string,
  ): Promise<GrowthRecordEntity> {
    const record = await this.repository.createRecord({
      userId,
      type,
      content,
      metadata: metadata || null,
    });

    return this.mapToGrowthRecordEntity(record);
  }

  async getUserGrowthRecords(userId: number): Promise<GrowthRecordEntity[]> {
    const records = await this.repository.findRecordsByUserId(userId);
    return records.map((r) => this.mapToGrowthRecordEntity(r));
  }

  async getUserGrowthRecordsByType(userId: number, type: string): Promise<GrowthRecordEntity[]> {
    const records = await this.repository.findRecordsByUserIdAndType(userId, type);
    return records.map((r) => this.mapToGrowthRecordEntity(r));
  }

  async deleteGrowthRecord(userId: number, id: number): Promise<void> {
    const records = await this.repository.findRecordsByUserId(userId);
    const record = records.find((r) => r.id === id);
    if (!record) {
      throw new Error('无权删除此成长记录');
    }

    await this.repository.deleteRecord(id);
  }

  private mapToPlanEntity(plan: { id: number; userId: number; title: string; description: string | null; planData: string; progress: number; status: string }): LearningPlanEntity {
    return new LearningPlanEntity({
      id: plan.id,
      userId: plan.userId,
      title: plan.title,
      description: plan.description || undefined,
      planData: plan.planData,
      progress: plan.progress,
      status: plan.status,
    });
  }

  private mapToGrowthRecordEntity(record: { id: number; userId: number; type: string; content: string; metadata: string | null }): GrowthRecordEntity {
    return new GrowthRecordEntity({
      id: record.id,
      userId: record.userId,
      type: record.type,
      content: record.content,
      metadata: record.metadata || undefined,
    });
  }
}
