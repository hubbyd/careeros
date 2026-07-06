import { Module } from '@nestjs/common';
import { AiService } from './ai.service';
import { AiController } from './ai.controller';
import { ResumeParserService } from './resume-parser.service';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [AiController],
  providers: [AiService, ResumeParserService],
  exports: [AiService, ResumeParserService],
})
export class AiModule {}
