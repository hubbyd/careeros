import { Injectable, ForbiddenException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

interface CreateNotificationDto {
  userId: number;
  type: string;
  title: string;
  content: string;
  metadata?: string;
}

@Injectable()
export class NotificationService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(dto: CreateNotificationDto) {
    return this.prismaService.notification.create({
      data: dto,
    });
  }

  async findByUserId(userId: number) {
    return this.prismaService.notification.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' },
    });
  }

  async findUnreadByUserId(userId: number) {
    return this.prismaService.notification.findMany({
      where: { userId, isRead: 0 },
      orderBy: { createdAt: 'desc' },
    });
  }

  async markAsRead(userId: number, id: number) {
    const notification = await this.prismaService.notification.findUnique({
      where: { id },
    });

    if (!notification || notification.userId !== userId) {
      throw new ForbiddenException('无权操作此通知');
    }

    return this.prismaService.notification.update({
      where: { id },
      data: { isRead: 1 },
    });
  }

  async markAllAsRead(userId: number) {
    return this.prismaService.notification.updateMany({
      where: { userId, isRead: 0 },
      data: { isRead: 1 },
    });
  }

  async countUnread(userId: number) {
    const count = await this.prismaService.notification.count({
      where: { userId, isRead: 0 },
    });
    return { count };
  }

  async delete(userId: number, id: number) {
    const notification = await this.prismaService.notification.findUnique({
      where: { id },
    });

    if (!notification || notification.userId !== userId) {
      throw new ForbiddenException('无权操作此通知');
    }

    return this.prismaService.notification.delete({
      where: { id },
    });
  }
}