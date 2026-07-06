import { IsString, IsOptional } from 'class-validator';

export class ResumeDto {
  @IsString()
  @IsOptional()
  fileName?: string;

  @IsString()
  @IsOptional()
  fileUrl?: string;

  @IsString()
  @IsOptional()
  parsedData?: string;

  @IsString()
  @IsOptional()
  analysisResult?: string;

  @IsString()
  @IsOptional()
  status?: string;
}
