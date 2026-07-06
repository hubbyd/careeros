import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class StatsService {
  constructor(private readonly prismaService: PrismaService) {}

  async getUserStats(userId: number) {
    const [assessments, resumes, sessions, plans, growthRecords] = await Promise.all([
      this.prismaService.careerAssessment.count({ where: { userId } }),
      this.prismaService.resume.count({ where: { userId } }),
      this.prismaService.interviewSession.count({ where: { userId } }),
      this.prismaService.learningPlan.count({ where: { userId } }),
      this.prismaService.growthRecord.count({ where: { userId } }),
    ]);

    return {
      assessments,
      resumes,
      sessions,
      plans,
      growthRecords,
      totalActivities: assessments + resumes + sessions + plans + growthRecords,
    };
  }

  async getUserActivityTrend(userId: number, days: number = 7) {
    const now = new Date();
    const startDate = new Date(now);
    startDate.setDate(startDate.getDate() - (days - 1));
    const startDateStr = startDate.toISOString().split('T')[0];
    const endDateStr = now.toISOString().split('T')[0];

    const [assessments, resumes, sessions, plans, growthRecords] = await Promise.all([
      this.prismaService.careerAssessment.findMany({
        where: { userId, createdAt: { gte: new Date(startDateStr), lte: new Date(endDateStr + 'T23:59:59') } },
        select: { createdAt: true },
      }),
      this.prismaService.resume.findMany({
        where: { userId, createdAt: { gte: new Date(startDateStr), lte: new Date(endDateStr + 'T23:59:59') } },
        select: { createdAt: true },
      }),
      this.prismaService.interviewSession.findMany({
        where: { userId, createdAt: { gte: new Date(startDateStr), lte: new Date(endDateStr + 'T23:59:59') } },
        select: { createdAt: true },
      }),
      this.prismaService.learningPlan.findMany({
        where: { userId, createdAt: { gte: new Date(startDateStr), lte: new Date(endDateStr + 'T23:59:59') } },
        select: { createdAt: true },
      }),
      this.prismaService.growthRecord.findMany({
        where: { userId, createdAt: { gte: new Date(startDateStr), lte: new Date(endDateStr + 'T23:59:59') } },
        select: { createdAt: true },
      }),
    ]);

    type ActivityType = 'assessments' | 'resumes' | 'sessions' | 'plans' | 'growthRecords';
    const dateMap = new Map<string, Record<ActivityType, number>>();
    for (let i = days - 1; i >= 0; i--) {
      const date = new Date(now);
      date.setDate(date.getDate() - i);
      const dateStr = date.toISOString().split('T')[0];
      dateMap.set(dateStr, { assessments: 0, resumes: 0, sessions: 0, plans: 0, growthRecords: 0 });
    }

    const countByDate = (items: { createdAt: Date }[], type: ActivityType) => {
      items.forEach((item) => {
        const dateStr = item.createdAt.toISOString().split('T')[0];
        const entry = dateMap.get(dateStr);
        if (entry) {
          entry[type]++;
        }
      });
    };

    countByDate(assessments, 'assessments');
    countByDate(resumes, 'resumes');
    countByDate(sessions, 'sessions');
    countByDate(plans, 'plans');
    countByDate(growthRecords, 'growthRecords');

    const result = [];
    for (let i = days - 1; i >= 0; i--) {
      const date = new Date(now);
      date.setDate(date.getDate() - i);
      const dateStr = date.toISOString().split('T')[0];
      const entry = dateMap.get(dateStr)!;
      result.push({
        date: dateStr,
        ...entry,
        total: entry.assessments + entry.resumes + entry.sessions + entry.plans + entry.growthRecords,
      });
    }

    return result;
  }

  async getGlobalStats() {
    const [users, assessments, resumes, sessions, plans] = await Promise.all([
      this.prismaService.user.count(),
      this.prismaService.careerAssessment.count(),
      this.prismaService.resume.count(),
      this.prismaService.interviewSession.count(),
      this.prismaService.learningPlan.count(),
    ]);

    return {
      users,
      assessments,
      resumes,
      sessions,
      plans,
    };
  }
}