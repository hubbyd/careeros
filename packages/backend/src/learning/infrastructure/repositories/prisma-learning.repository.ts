import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../prisma/prisma.service';
import { LearningRepository, LearningPlan, GrowthRecord } from '../../domain/repositories/learning.repository';

@Injectable()
export class PrismaLearningRepository implements LearningRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async createPlan(plan: Omit<LearningPlan, 'id' | 'createdAt' | 'updatedAt'>): Promise<LearningPlan> {
    const result = await this.prismaService.learningPlan.create({
      data: {
        userId: plan.userId,
        title: plan.title,
        description: plan.description,
        planData: plan.planData,
        progress: plan.progress,
        status: plan.status,
      },
    });

    return {
      id: result.id,
      userId: result.userId,
      title: result.title,
      description: result.description,
      planData: result.planData,
      progress: result.progress,
      status: result.status,
      createdAt: result.createdAt,
      updatedAt: result.updatedAt,
    };
  }

  async findPlanById(id: number): Promise<LearningPlan | null> {
    const result = await this.prismaService.learningPlan.findUnique({
      where: { id },
    });

    if (!result) return null;

    return {
      id: result.id,
      userId: result.userId,
      title: result.title,
      description: result.description,
      planData: result.planData,
      progress: result.progress,
      status: result.status,
      createdAt: result.createdAt,
      updatedAt: result.updatedAt,
    };
  }

  async findPlansByUserId(userId: number): Promise<LearningPlan[]> {
    const results = await this.prismaService.learningPlan.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' },
    });

    return results.map((result) => ({
      id: result.id,
      userId: result.userId,
      title: result.title,
      description: result.description,
      planData: result.planData,
      progress: result.progress,
      status: result.status,
      createdAt: result.createdAt,
      updatedAt: result.updatedAt,
    }));
  }

  async updatePlan(id: number, data: Partial<LearningPlan>): Promise<LearningPlan> {
    const result = await this.prismaService.learningPlan.update({
      where: { id },
      data: {
        title: data.title,
        description: data.description,
        planData: data.planData,
        progress: data.progress,
        status: data.status,
      },
    });

    return {
      id: result.id,
      userId: result.userId,
      title: result.title,
      description: result.description,
      planData: result.planData,
      progress: result.progress,
      status: result.status,
      createdAt: result.createdAt,
      updatedAt: result.updatedAt,
    };
  }

  async deletePlan(id: number): Promise<void> {
    await this.prismaService.learningPlan.delete({
      where: { id },
    });
  }

  async createRecord(record: Omit<GrowthRecord, 'id' | 'createdAt'>): Promise<GrowthRecord> {
    const result = await this.prismaService.growthRecord.create({
      data: {
        userId: record.userId,
        type: record.type,
        content: record.content,
        metadata: record.metadata,
      },
    });

    return {
      id: result.id,
      userId: result.userId,
      type: result.type,
      content: result.content,
      metadata: result.metadata,
      createdAt: result.createdAt,
    };
  }

  async findRecordsByUserId(userId: number): Promise<GrowthRecord[]> {
    const results = await this.prismaService.growthRecord.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' },
    });

    return results.map((result) => ({
      id: result.id,
      userId: result.userId,
      type: result.type,
      content: result.content,
      metadata: result.metadata,
      createdAt: result.createdAt,
    }));
  }

  async findRecordsByUserIdAndType(userId: number, type: string): Promise<GrowthRecord[]> {
    const results = await this.prismaService.growthRecord.findMany({
      where: { userId, type },
      orderBy: { createdAt: 'desc' },
    });

    return results.map((result) => ({
      id: result.id,
      userId: result.userId,
      type: result.type,
      content: result.content,
      metadata: result.metadata,
      createdAt: result.createdAt,
    }));
  }

  async deleteRecord(id: number): Promise<void> {
    await this.prismaService.growthRecord.delete({
      where: { id },
    });
  }
}
