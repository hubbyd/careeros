import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { AiService } from '../ai/ai.service';

interface CreateMessageDto {
  sessionId: number;
  content: string;
}

@Injectable()
export class AiChatService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly aiService: AiService,
  ) {}

  async createSession(userId: number, chatType: string = 'general') {
    return this.prismaService.aiChatSession.create({
      data: { userId, chatType },
    });
  }

  async getSessionsByUserId(userId: number) {
    return this.prismaService.aiChatSession.findMany({
      where: { userId },
      orderBy: { updatedAt: 'desc' },
      include: {
        AiChatMessage: {
          take: 1,
          orderBy: { createdAt: 'desc' },
        },
      },
    });
  }

  async getSessionById(id: number) {
    return this.prismaService.aiChatSession.findUnique({
      where: { id },
    });
  }

  async getMessagesBySessionId(sessionId: number) {
    return this.prismaService.aiChatMessage.findMany({
      where: { sessionId },
      orderBy: { createdAt: 'asc' },
    });
  }

  async sendMessage(userId: number, dto: CreateMessageDto) {
    const session = await this.prismaService.aiChatSession.findUnique({
      where: { id: dto.sessionId },
    });

    if (!session) {
      throw new NotFoundException('会话不存在');
    }

    if (session.userId !== userId) {
      throw new ForbiddenException('无权访问此会话');
    }

    const userMessage = await this.prismaService.aiChatMessage.create({
      data: {
        sessionId: dto.sessionId,
        role: 'user',
        content: dto.content,
      },
    });

    try {
      const history = await this.getMessagesBySessionId(dto.sessionId);
      const historyText = history.map((m) => `${m.role}: ${m.content}`).join('\n');

      const response = await this.aiService.completeWithPrompt(
        'smart_assessment',
        {},
        `用户对话历史：\n${historyText}\n\n请继续对话，给出专业、友好的回复：`,
      );

      const [aiMessage] = await this.prismaService.$transaction([
        this.prismaService.aiChatMessage.create({
          data: {
            sessionId: dto.sessionId,
            role: 'assistant',
            content: response.content,
          },
        }),
        this.prismaService.aiChatSession.update({
          where: { id: dto.sessionId },
          data: { updatedAt: new Date() },
        }),
      ]);

      return aiMessage;
    } catch (error) {
      await this.prismaService.aiChatMessage.delete({
        where: { id: userMessage.id },
      });
      throw error;
    }
  }

  async deleteSession(id: number, userId: number) {
    const session = await this.prismaService.aiChatSession.findUnique({
      where: { id },
    });

    if (!session) {
      throw new NotFoundException('会话不存在');
    }

    if (session.userId !== userId) {
      throw new ForbiddenException('无权删除此会话');
    }

    return this.prismaService.aiChatSession.delete({
      where: { id },
    });
  }
}