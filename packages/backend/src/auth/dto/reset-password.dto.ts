import { IsNotEmpty, IsString, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class ResetPasswordDto {
  @ApiProperty({ description: '重置令牌', example: 'abc123' })
  @IsNotEmpty()
  @IsString()
  token: string;

  @ApiProperty({ description: '新密码', example: 'newPassword123' })
  @IsNotEmpty()
  @IsString()
  @MinLength(6)
  password: string;
}