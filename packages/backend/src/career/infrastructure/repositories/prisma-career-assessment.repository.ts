import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../prisma/prisma.service';
import { CareerAssessmentRepository, CareerAssessment } from '../../domain/repositories/career-assessment.repository';

@Injectable()
export class PrismaCareerAssessmentRepository implements CareerAssessmentRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async create(assessment: Omit<CareerAssessment, 'id' | 'createdAt' | 'updatedAt'>): Promise<CareerAssessment> {
    const result = await this.prismaService.careerAssessment.create({
      data: {
        userId: assessment.userId,
        assessmentType: assessment.assessmentType,
        inputData: assessment.inputData,
        resultData: assessment.resultData,
        score: assessment.score ?? null,
      },
    });

    return {
      id: result.id,
      userId: result.userId,
      assessmentType: result.assessmentType,
      inputData: result.inputData,
      resultData: result.resultData,
      score: result.score,
      createdAt: result.createdAt,
      updatedAt: result.updatedAt,
    };
  }

  async findById(id: number): Promise<CareerAssessment | null> {
    const result = await this.prismaService.careerAssessment.findUnique({
      where: { id },
    });

    if (!result) return null;

    return {
      id: result.id,
      userId: result.userId,
      assessmentType: result.assessmentType,
      inputData: result.inputData,
      resultData: result.resultData,
      score: result.score,
      createdAt: result.createdAt,
      updatedAt: result.updatedAt,
    };
  }

  async findByUserId(userId: number): Promise<CareerAssessment[]> {
    const results = await this.prismaService.careerAssessment.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' },
    });

    return results.map((result) => ({
      id: result.id,
      userId: result.userId,
      assessmentType: result.assessmentType,
      inputData: result.inputData,
      resultData: result.resultData,
      score: result.score,
      createdAt: result.createdAt,
      updatedAt: result.updatedAt,
    }));
  }

  async findByUserIdAndType(userId: number, type: string): Promise<CareerAssessment[]> {
    const results = await this.prismaService.careerAssessment.findMany({
      where: { userId, assessmentType: type },
      orderBy: { createdAt: 'desc' },
    });

    return results.map((result) => ({
      id: result.id,
      userId: result.userId,
      assessmentType: result.assessmentType,
      inputData: result.inputData,
      resultData: result.resultData,
      score: result.score,
      createdAt: result.createdAt,
      updatedAt: result.updatedAt,
    }));
  }

  async update(id: number, data: Partial<CareerAssessment>): Promise<CareerAssessment> {
    const result = await this.prismaService.careerAssessment.update({
      where: { id },
      data: {
        assessmentType: data.assessmentType,
        inputData: data.inputData,
        resultData: data.resultData,
        score: data.score ?? undefined,
      },
    });

    return {
      id: result.id,
      userId: result.userId,
      assessmentType: result.assessmentType,
      inputData: result.inputData,
      resultData: result.resultData,
      score: result.score,
      createdAt: result.createdAt,
      updatedAt: result.updatedAt,
    };
  }

  async delete(id: number): Promise<void> {
    await this.prismaService.careerAssessment.delete({
      where: { id },
    });
  }
}
