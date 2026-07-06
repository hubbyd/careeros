import { IsString, IsNumber, IsOptional } from 'class-validator';

export class GeneratePlanDto {
  @IsString()
  targetJob: string;

  @IsString()
  currentLevel: string;

  @IsString()
  studyTime: string;
}

export class UpdateProgressDto {
  @IsNumber()
  progress: number;
}

export class CreateGrowthRecordDto {
  @IsString()
  type: string;

  @IsString()
  content: string;

  @IsString()
  @IsOptional()
  metadata?: string;
}
