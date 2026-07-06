import { Inject, Injectable } from '@nestjs/common';
import { LearningDomainService } from '../../domain/services/learning.service';
import { LearningPlanEntity, GrowthRecordEntity } from '../../domain/entities/learning.entity';
import { LEARNING_REPOSITORY } from '../../domain/repositories/learning.repository';
import { LearningRepository } from '../../domain/repositories/learning.repository';
import { AiService } from '../../../ai/ai.service';

@Injectable()
export class LearningAppService {
  constructor(
    @Inject(LEARNING_REPOSITORY)
    private readonly repository: LearningRepository,
    private readonly domainService: LearningDomainService,
    private readonly aiService: AiService,
  ) {}

  async generateLearningPlan(
    userId: number,
    targetJob: string,
    currentLevel: string,
    studyTime: string,
  ): Promise<LearningPlanEntity> {
    const response = await this.aiService.completeWithPrompt(
      'learning_path',
      {
        targetJob,
        currentLevel,
        major: '',
        studyTime,
      },
      '',
    );

    const title = `${targetJob}学习计划`;
    const description = `针对${targetJob}岗位的学习路线规划，当前水平：${currentLevel}`;

    return this.domainService.createPlan(userId, title, description, response.content);
  }

  async getPlanById(userId: number, id: number): Promise<LearningPlanEntity | null> {
    return this.domainService.getPlanById(userId, id);
  }

  async getUserPlans(userId: number): Promise<LearningPlanEntity[]> {
    return this.domainService.getUserPlans(userId);
  }

  async updatePlanProgress(userId: number, id: number, progress: number): Promise<LearningPlanEntity> {
    return this.domainService.updatePlanProgress(userId, id, progress);
  }

  async completePlan(userId: number, id: number): Promise<LearningPlanEntity> {
    return this.domainService.completePlan(userId, id);
  }

  async deletePlan(userId: number, id: number): Promise<void> {
    await this.domainService.deletePlan(userId, id);
  }

  async createGrowthRecord(
    userId: number,
    type: string,
    content: string,
    metadata?: string,
  ): Promise<GrowthRecordEntity> {
    return this.domainService.createGrowthRecord(userId, type, content, metadata);
  }

  async getUserGrowthRecords(userId: number): Promise<GrowthRecordEntity[]> {
    return this.domainService.getUserGrowthRecords(userId);
  }

  async getUserGrowthRecordsByType(userId: number, type: string): Promise<GrowthRecordEntity[]> {
    return this.domainService.getUserGrowthRecordsByType(userId, type);
  }

  async deleteGrowthRecord(userId: number, id: number): Promise<void> {
    await this.domainService.deleteGrowthRecord(userId, id);
  }

  async getGrowthSummary(userId: number): Promise<{
    totalRecords: number;
    recordTypes: { type: string; count: number }[];
    recentRecords: GrowthRecordEntity[];
  }> {
    const records = await this.domainService.getUserGrowthRecords(userId);
    const recentRecords = records.slice(0, 10);

    const typeCount = records.reduce((acc, r) => {
      acc[r.type] = (acc[r.type] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    const recordTypes = Object.entries(typeCount).map(([type, count]) => ({ type, count }));

    return {
      totalRecords: records.length,
      recordTypes,
      recentRecords,
    };
  }
}
