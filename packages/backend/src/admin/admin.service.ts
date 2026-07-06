import { Injectable, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

const VALID_ROLES = ['user', 'admin'];

@Injectable()
export class AdminService {
  constructor(private readonly prismaService: PrismaService) {}

  async getUsers(page: number = 1, pageSize: number = 20) {
    const skip = (page - 1) * pageSize;
    const [users, total] = await Promise.all([
      this.prismaService.user.findMany({
        skip,
        take: pageSize,
        orderBy: { createdAt: 'desc' },
        select: {
          id: true,
          email: true,
          name: true,
          role: true,
          avatarUrl: true,
          createdAt: true,
          updatedAt: true,
        },
      }),
      this.prismaService.user.count(),
    ]);

    return { users, total, page, pageSize };
  }

  async getUserDetail(userId: number) {
    return this.prismaService.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
        avatarUrl: true,
        createdAt: true,
        updatedAt: true,
      },
    });
  }

  async updateUserRole(userId: number, role: string) {
    if (!VALID_ROLES.includes(role)) {
      throw new BadRequestException('无效的角色类型');
    }

    return this.prismaService.user.update({
      where: { id: userId },
      data: { role },
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
      },
    });
  }

  async deleteUser(userId: number) {
    return this.prismaService.user.delete({
      where: { id: userId },
    });
  }
}