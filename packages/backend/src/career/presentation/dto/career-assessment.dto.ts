import { IsOptional, IsString } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class CareerAssessmentDto {
  @ApiPropertyOptional({ description: '姓名', example: '张三' })
  @IsOptional()
  @IsString()
  name?: string;

  @ApiPropertyOptional({ description: '专业', example: '软件工程' })
  @IsOptional()
  @IsString()
  major?: string;

  @ApiPropertyOptional({ description: '学历', example: '本科' })
  @IsOptional()
  @IsString()
  education?: string;

  @ApiPropertyOptional({ description: '工作经验', example: '2年' })
  @IsOptional()
  @IsString()
  experience?: string;

  @ApiPropertyOptional({ description: '技能', example: 'Java, Python, React' })
  @IsOptional()
  @IsString()
  skills?: string;

  @ApiPropertyOptional({ description: '兴趣爱好', example: '编程, 阅读, 运动' })
  @IsOptional()
  @IsString()
  interests?: string;

  @ApiPropertyOptional({ description: '职业目标', example: '成为高级软件工程师' })
  @IsOptional()
  @IsString()
  goal?: string;

  @ApiPropertyOptional({ description: '目标岗位', example: '前端开发工程师' })
  @IsOptional()
  @IsString()
  targetJob?: string;

  @ApiPropertyOptional({ description: '当前水平', example: '初级' })
  @IsOptional()
  @IsString()
  currentLevel?: string;

  @ApiPropertyOptional({ description: '学习时间', example: '6个月' })
  @IsOptional()
  @IsString()
  studyTime?: string;

  @ApiPropertyOptional({ description: '目标', example: '考研' })
  @IsOptional()
  @IsString()
  target?: string;

  @ApiPropertyOptional({ description: '优势', example: '学习能力强' })
  @IsOptional()
  @IsString()
  strengths?: string;

  @ApiPropertyOptional({ description: '劣势', example: '项目经验不足' })
  @IsOptional()
  @IsString()
  weaknesses?: string;

  @ApiPropertyOptional({ description: '用户自由输入', example: '我是软件工程，会Java，会Python，会SpringBoot，不会算法，不会Vue，不会React，四六级已过，拿过蓝桥杯' })
  @IsOptional()
  @IsString()
  userInput?: string;

  @ApiPropertyOptional({ description: '强项技能', example: 'Java, SpringBoot, MySQL' })
  @IsOptional()
  @IsString()
  strongSkills?: string;

  @ApiPropertyOptional({ description: '弱项技能', example: '算法, Vue, React' })
  @IsOptional()
  @IsString()
  weakSkills?: string;

  @ApiPropertyOptional({ description: '证书', example: '四六级, 蓝桥杯' })
  @IsOptional()
  @IsString()
  certifications?: string;

  @ApiPropertyOptional({ description: '比赛经历', example: '蓝桥杯省二, ACM区域赛' })
  @IsOptional()
  @IsString()
  competition?: string;

  @ApiPropertyOptional({ description: '项目经验', example: '电商系统开发, 博客系统' })
  @IsOptional()
  @IsString()
  projects?: string;

  @ApiPropertyOptional({ description: '目标公司类型', example: '大厂, 中型互联网公司, 创业公司' })
  @IsOptional()
  @IsString()
  companyType?: string;

  @ApiPropertyOptional({ description: '期望薪资', example: '15k' })
  @IsOptional()
  @IsString()
  expectedSalary?: string;
}
