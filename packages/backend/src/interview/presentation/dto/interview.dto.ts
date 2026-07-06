import { IsString, IsOptional } from 'class-validator';

export class CreateSessionDto {
  @IsString()
  jobTitle: string;

  @IsString()
  @IsOptional()
  level?: string;
}

export class SubmitAnswerDto {
  @IsString()
  answer: string;
}
