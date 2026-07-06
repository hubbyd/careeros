import { IsEmail, IsString, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class RegisterDto {
  @ApiProperty({ description: '邮箱', example: 'user@example.com' })
  @IsEmail()
  email: string;

  @ApiProperty({ description: '密码', example: 'password123', minLength: 6 })
  @IsString()
  @MinLength(6)
  password: string;

  @ApiProperty({ description: '姓名', example: '张三' })
  @IsString()
  name: string;
}
