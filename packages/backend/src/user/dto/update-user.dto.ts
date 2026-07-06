import { IsOptional, IsString, IsEmail, Matches } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateUserDto {
  @ApiPropertyOptional({ description: '姓名', example: '张三' })
  @IsOptional()
  @IsString()
  name?: string;

  @ApiPropertyOptional({ description: '邮箱', example: 'user@example.com' })
  @IsOptional()
  @IsEmail()
  email?: string;

  @ApiPropertyOptional({ description: '头像URL', example: 'https://example.com/avatar.png' })
  @IsOptional()
  @IsString()
  avatarUrl?: string;

  @ApiPropertyOptional({ description: '手机号', example: '13800138000' })
  @IsOptional()
  @IsString()
  @Matches(/^1[3-9]\d{9}$/)
  phone?: string;

  @ApiPropertyOptional({ description: '专业', example: '软件工程' })
  @IsOptional()
  @IsString()
  major?: string;

  @ApiPropertyOptional({ description: '学历', example: '本科' })
  @IsOptional()
  @IsString()
  education?: string;
}
