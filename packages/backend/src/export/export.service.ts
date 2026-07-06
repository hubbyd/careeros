import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class ExportService {
  constructor(private readonly prismaService: PrismaService) {}

  async exportUserData(userId: number): Promise<string> {
    const user = await this.prismaService.user.findUnique({
      where: { id: userId },
      include: {
        CareerAssessment: true,
        Resume: true,
        InterviewSession: true,
        LearningPlan: true,
        GrowthRecord: true,
        Notification: true,
      },
    });

    if (!user) {
      throw new NotFoundException('用户不存在');
    }

    const exportData = {
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
      },
      assessments: user.CareerAssessment,
      resumes: user.Resume,
      interviews: user.InterviewSession,
      learningPlans: user.LearningPlan,
      growthRecords: user.GrowthRecord,
      notifications: user.Notification,
      exportedAt: new Date().toISOString(),
    };

    return JSON.stringify(exportData, null, 2);
  }

  async exportAssessmentToCsv(userId: number): Promise<string> {
    const assessments = await this.prismaService.careerAssessment.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' },
    });

    const headers = ['ID', '评估类型', '分数', '结果摘要', '创建时间'];
    const rows = assessments.map((a) => [
      a.id,
      a.assessmentType || '',
      a.score || '',
      (a.resultData && a.resultData.length > 100 ? a.resultData.substring(0, 100) + '...' : a.resultData) || '',
      new Date(a.createdAt).toLocaleString(),
    ]);

    const BOM = '\uFEFF';
    return BOM + [headers.join(','), ...rows.map((row) => row.join(','))].join('\n');
  }

  async exportLearningPlanToCsv(userId: number): Promise<string> {
    const plans = await this.prismaService.learningPlan.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' },
    });

    const headers = ['ID', '标题', '描述', '进度', '状态', '创建时间'];
    const rows = plans.map((p) => [
      p.id,
      p.title || '',
      (p.description && p.description.length > 100 ? p.description.substring(0, 100) + '...' : p.description) || '',
      p.progress || 0,
      p.status || '',
      new Date(p.createdAt).toLocaleString(),
    ]);

    const BOM = '\uFEFF';
    return BOM + [headers.join(','), ...rows.map((row) => row.join(','))].join('\n');
  }
}