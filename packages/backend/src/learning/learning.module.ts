import { Module } from '@nestjs/common';
import { LearningController } from './presentation/controllers/learning.controller';
import { LearningAppService } from './application/services/learning-app.service';
import { LearningDomainService } from './domain/services/learning.service';
import { PrismaLearningRepository } from './infrastructure/repositories/prisma-learning.repository';
import { LEARNING_REPOSITORY } from './domain/repositories/learning.repository';
import { PrismaModule } from '../prisma/prisma.module';
import { AiModule } from '../ai/ai.module';

@Module({
  imports: [PrismaModule, AiModule],
  controllers: [LearningController],
  providers: [
    LearningAppService,
    LearningDomainService,
    {
      provide: LEARNING_REPOSITORY,
      useClass: PrismaLearningRepository,
    },
  ],
})
export class LearningModule {}
