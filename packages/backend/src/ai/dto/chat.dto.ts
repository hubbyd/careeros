import { IsString, IsObject, IsOptional, IsArray } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class ChatDto {
  @ApiProperty({ description: 'Prompt模板Key', example: 'career_assessment' })
  @IsString()
  promptKey: string;

  @ApiProperty({ description: '用户消息', example: '我想了解我的职业发展方向' })
  @IsString()
  message: string;

  @ApiProperty({
    description: 'Prompt变量',
    example: { name: '张三', major: '软件工程' },
    required: false,
  })
  @IsOptional()
  @IsObject()
  variables?: Record<string, string>;

  @ApiProperty({
    description: '历史消息',
    example: [
      { role: 'user', content: '你好' },
      { role: 'assistant', content: '你好！我是你的AI职业教练。' },
    ],
    required: false,
  })
  @IsOptional()
  @IsArray()
  history?: { role: string; content: string }[];
}
