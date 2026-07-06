import { Module } from '@nestjs/common';
import { InterviewController } from './presentation/controllers/interview.controller';
import { InterviewAppService } from './application/services/interview-app.service';
import { InterviewDomainService } from './domain/services/interview.service';
import { PrismaInterviewRepository } from './infrastructure/repositories/prisma-interview.repository';
import { INTERVIEW_REPOSITORY } from './domain/repositories/interview.repository';
import { PrismaModule } from '../prisma/prisma.module';
import { AiModule } from '../ai/ai.module';

@Module({
  imports: [PrismaModule, AiModule],
  controllers: [InterviewController],
  providers: [
    InterviewAppService,
    InterviewDomainService,
    {
      provide: INTERVIEW_REPOSITORY,
      useClass: PrismaInterviewRepository,
    },
  ],
})
export class InterviewModule {}
