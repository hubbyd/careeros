import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { UpdateUserDto } from './dto';

@Injectable()
export class UserService {
  constructor(private readonly prismaService: PrismaService) {}

  async getUserById(userId: number) {
    return this.prismaService.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        email: true,
        name: true,
        avatarUrl: true,
        phone: true,
        major: true,
        education: true,
        role: true,
        createdAt: true,
        updatedAt: true,
      },
    });
  }

  async getUserByEmail(email: string) {
    return this.prismaService.user.findUnique({
      where: { email },
    });
  }

  async updateUser(userId: number, dto: UpdateUserDto) {
    return this.prismaService.user.update({
      where: { id: userId },
      data: dto,
      select: {
        id: true,
        email: true,
        name: true,
        avatarUrl: true,
        phone: true,
        major: true,
        education: true,
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
