import { Module } from '@nestjs/common';
import { CareerAssessmentController } from './presentation/controllers/career-assessment.controller';
import { CareerAssessmentAppService } from './application/services/career-assessment-app.service';
import { CareerAssessmentDomainService } from './domain/services/career-assessment.service';
import { PrismaCareerAssessmentRepository } from './infrastructure/repositories/prisma-career-assessment.repository';
import { CAREER_ASSESSMENT_REPOSITORY } from './domain/repositories/career-assessment.repository';
import { PrismaModule } from '../prisma/prisma.module';
import { AiModule } from '../ai/ai.module';

@Module({
  imports: [PrismaModule, AiModule],
  controllers: [CareerAssessmentController],
  providers: [
    CareerAssessmentAppService,
    CareerAssessmentDomainService,
    {
      provide: CAREER_ASSESSMENT_REPOSITORY,
      useClass: PrismaCareerAssessmentRepository,
    },
  ],
})
export class CareerModule {}
