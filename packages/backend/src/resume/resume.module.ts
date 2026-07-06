import { Module } from '@nestjs/common';
import { ResumeController } from './presentation/controllers/resume.controller';
import { ResumeAppService } from './application/services/resume-app.service';
import { ResumeDomainService } from './domain/services/resume.service';
import { PrismaResumeRepository } from './infrastructure/repositories/prisma-resume.repository';
import { RESUME_REPOSITORY } from './domain/repositories/resume.repository';
import { PrismaModule } from '../prisma/prisma.module';
import { StorageModule } from '../storage/storage.module';
import { AiModule } from '../ai/ai.module';

@Module({
  imports: [PrismaModule, StorageModule, AiModule],
  controllers: [ResumeController],
  providers: [
    ResumeAppService,
    ResumeDomainService,
    {
      provide: RESUME_REPOSITORY,
      useClass: PrismaResumeRepository,
    },
  ],
})
export class ResumeModule {}
