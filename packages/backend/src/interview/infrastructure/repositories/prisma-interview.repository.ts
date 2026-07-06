import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../prisma/prisma.service';
import { InterviewRepository, InterviewSession, InterviewQuestion } from '../../domain/repositories/interview.repository';

@Injectable()
export class PrismaInterviewRepository implements InterviewRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async createSession(session: Omit<InterviewSession, 'id' | 'createdAt' | 'updatedAt'>): Promise<InterviewSession> {
    const result = await this.prismaService.interviewSession.create({
      data: {
        userId: session.userId,
        jobTitle: session.jobTitle,
        level: session.level,
        status: session.status,
      },
    });

    return {
      id: result.id,
      userId: result.userId,
      jobTitle: result.jobTitle,
      level: result.level,
      status: result.status,
      createdAt: result.createdAt,
      updatedAt: result.updatedAt,
    };
  }

  async findSessionById(id: number): Promise<InterviewSession | null> {
    const result = await this.prismaService.interviewSession.findUnique({
      where: { id },
    });

    if (!result) return null;

    return {
      id: result.id,
      userId: result.userId,
      jobTitle: result.jobTitle,
      level: result.level,
      status: result.status,
      createdAt: result.createdAt,
      updatedAt: result.updatedAt,
    };
  }

  async findSessionsByUserId(userId: number): Promise<InterviewSession[]> {
    const results = await this.prismaService.interviewSession.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' },
    });

    return results.map((result) => ({
      id: result.id,
      userId: result.userId,
      jobTitle: result.jobTitle,
      level: result.level,
      status: result.status,
      createdAt: result.createdAt,
      updatedAt: result.updatedAt,
    }));
  }

  async updateSession(id: number, data: Partial<InterviewSession>): Promise<InterviewSession> {
    const result = await this.prismaService.interviewSession.update({
      where: { id },
      data: {
        jobTitle: data.jobTitle,
        level: data.level,
        status: data.status,
      },
    });

    return {
      id: result.id,
      userId: result.userId,
      jobTitle: result.jobTitle,
      level: result.level,
      status: result.status,
      createdAt: result.createdAt,
      updatedAt: result.updatedAt,
    };
  }

  async deleteSession(id: number): Promise<void> {
    await this.prismaService.interviewSession.delete({
      where: { id },
    });
  }

  async createQuestion(question: Omit<InterviewQuestion, 'id' | 'createdAt'>): Promise<InterviewQuestion> {
    const result = await this.prismaService.interviewQuestion.create({
      data: {
        sessionId: question.sessionId,
        question: question.question,
        answer: question.answer,
        evaluation: question.evaluation,
        score: question.score,
        nextQuestion: question.nextQuestion,
      },
    });

    return {
      id: result.id,
      sessionId: result.sessionId,
      question: result.question,
      answer: result.answer,
      evaluation: result.evaluation,
      score: result.score,
      nextQuestion: result.nextQuestion,
      createdAt: result.createdAt,
    };
  }

  async findQuestionById(id: number): Promise<InterviewQuestion | null> {
    const result = await this.prismaService.interviewQuestion.findUnique({
      where: { id },
    });

    if (!result) return null;

    return {
      id: result.id,
      sessionId: result.sessionId,
      question: result.question,
      answer: result.answer,
      evaluation: result.evaluation,
      score: result.score,
      nextQuestion: result.nextQuestion,
      createdAt: result.createdAt,
    };
  }

  async findQuestionsBySessionId(sessionId: number): Promise<InterviewQuestion[]> {
    const results = await this.prismaService.interviewQuestion.findMany({
      where: { sessionId },
      orderBy: { createdAt: 'asc' },
    });

    return results.map((result) => ({
      id: result.id,
      sessionId: result.sessionId,
      question: result.question,
      answer: result.answer,
      evaluation: result.evaluation,
      score: result.score,
      nextQuestion: result.nextQuestion,
      createdAt: result.createdAt,
    }));
  }

  async updateQuestion(id: number, data: Partial<InterviewQuestion>): Promise<InterviewQuestion> {
    const result = await this.prismaService.interviewQuestion.update({
      where: { id },
      data: {
        answer: data.answer,
        evaluation: data.evaluation,
        score: data.score,
        nextQuestion: data.nextQuestion,
      },
    });

    return {
      id: result.id,
      sessionId: result.sessionId,
      question: result.question,
      answer: result.answer,
      evaluation: result.evaluation,
      score: result.score,
      nextQuestion: result.nextQuestion,
      createdAt: result.createdAt,
    };
  }
}
