import { Module } from '@nestjs/common';
import { AiChatService } from './ai-chat.service';
import { AiChatController } from './ai-chat.controller';
import { AiModule } from '../ai/ai.module';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [AiModule, PrismaModule],
  providers: [AiChatService],
  controllers: [AiChatController],
})
export class AiChatModule {}