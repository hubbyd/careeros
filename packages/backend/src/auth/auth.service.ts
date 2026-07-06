import { Injectable, UnauthorizedException, BadRequestException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../prisma/prisma.service';
import { MinioService } from '../storage/minio.service';
import { LoginDto, RegisterDto, ForgotPasswordDto, ResetPasswordDto } from './dto';
import * as bcrypt from 'bcrypt';
import * as crypto from 'crypto';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly prismaService: PrismaService,
    private readonly minioService: MinioService,
  ) {}

  async register(dto: RegisterDto) {
    const existingUser = await this.prismaService.user.findUnique({
      where: { email: dto.email },
    });

    if (existingUser) {
      throw new UnauthorizedException('该邮箱已被注册');
    }

    const passwordHash = await bcrypt.hash(dto.password, 10);

    const user = await this.prismaService.user.create({
      data: {
        email: dto.email,
        passwordHash,
        name: dto.name,
      },
    });

    const tokens = await this.generateTokens(user.id, user.email, user.role);

    return {
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
        avatarUrl: user.avatarUrl,
      },
      ...tokens,
    };
  }

  async login(dto: LoginDto) {
    const user = await this.prismaService.user.findUnique({
      where: { email: dto.email },
    });

    if (!user) {
      throw new UnauthorizedException('邮箱或密码错误');
    }

    const isPasswordValid = await bcrypt.compare(dto.password, user.passwordHash);

    if (!isPasswordValid) {
      throw new UnauthorizedException('邮箱或密码错误');
    }

    const tokens = await this.generateTokens(user.id, user.email, user.role);

    return {
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
        avatarUrl: user.avatarUrl,
      },
      ...tokens,
    };
  }

  async generateTokens(userId: number, email: string, role: string) {
    const payload = {
      sub: userId,
      email,
      role,
    };

    const accessToken = this.jwtService.sign(payload);
    const refreshToken = this.jwtService.sign(payload, {
      expiresIn: process.env.JWT_REFRESH_EXPIRES_IN || '7d',
    });

    return { accessToken, refreshToken };
  }

  async forgotPassword(dto: ForgotPasswordDto) {
    const user = await this.prismaService.user.findUnique({
      where: { email: dto.email },
    });

    if (user) {
      const resetToken = crypto.randomBytes(32).toString('hex');
      const resetTokenExpires = new Date(Date.now() + 3600000);

      await this.prismaService.user.update({
        where: { id: user.id },
        data: { resetToken, resetTokenExpires },
      });
    }

    return { message: '如果该邮箱已注册，重置链接已发送到您的邮箱' };
  }

  async resetPassword(dto: ResetPasswordDto) {
    const user = await this.prismaService.user.findFirst({
      where: { resetToken: dto.token },
    });

    if (!user || !user.resetTokenExpires || user.resetTokenExpires < new Date()) {
      throw new BadRequestException('无效或过期的重置链接');
    }

    const passwordHash = await bcrypt.hash(dto.password, 10);

    await this.prismaService.user.update({
      where: { id: user.id },
      data: { passwordHash, resetToken: null, resetTokenExpires: null },
    });

    return { message: '密码重置成功' };
  }

  async refreshToken(refreshToken: string) {
    try {
      const payload = this.jwtService.verify(refreshToken);
      const user = await this.prismaService.user.findUnique({
        where: { id: payload.sub },
      });

      if (!user) {
        throw new UnauthorizedException('用户不存在');
      }

      const tokens = await this.generateTokens(user.id, user.email, user.role);
      return { ...tokens };
    } catch {
      throw new UnauthorizedException('无效或过期的刷新令牌');
    }
  }

  async getProfile(userId: number) {
    const user = await this.prismaService.user.findUnique({
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

    if (!user) {
      throw new UnauthorizedException('用户不存在');
    }

    return user;
  }

  async updateProfile(userId: number, data: { username?: string; email?: string }) {
    const user = await this.prismaService.user.findUnique({
      where: { id: userId },
    });

    if (!user) {
      throw new UnauthorizedException('用户不存在');
    }

    if (data.email && data.email !== user.email) {
      const existing = await this.prismaService.user.findUnique({
        where: { email: data.email },
      });
      if (existing) {
        throw new BadRequestException('该邮箱已被使用');
      }
    }

    const updated = await this.prismaService.user.update({
      where: { id: userId },
      data: {
        ...(data.username && { name: data.username }),
        ...(data.email && { email: data.email }),
      },
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

    return updated;
  }

  async uploadAvatar(userId: number, file: Express.Multer.File) {
    if (!file) {
      throw new BadRequestException('请选择要上传的文件');
    }

    const allowedTypes = ['image/jpeg', 'image/png', 'image/gif'];
    if (!allowedTypes.includes(file.mimetype)) {
      throw new BadRequestException('只允许上传图片文件');
    }

    const filename = `avatars/${userId}-${Date.now()}-${file.originalname}`;
    const avatarUrl = await this.minioService.uploadFile(filename, file.buffer, file.mimetype);

    const updated = await this.prismaService.user.update({
      where: { id: userId },
      data: { avatarUrl },
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

    return updated;
  }

  async changePassword(userId: number, oldPassword: string, newPassword: string) {
    const user = await this.prismaService.user.findUnique({
      where: { id: userId },
    });

    if (!user) {
      throw new UnauthorizedException('用户不存在');
    }

    const isPasswordValid = await bcrypt.compare(oldPassword, user.passwordHash);
    if (!isPasswordValid) {
      throw new BadRequestException('原密码不正确');
    }

    if (newPassword.length < 6) {
      throw new BadRequestException('密码长度至少为6位');
    }

    const passwordHash = await bcrypt.hash(newPassword, 10);

    await this.prismaService.user.update({
      where: { id: userId },
      data: { passwordHash },
    });

    return { message: '密码修改成功' };
  }
}
