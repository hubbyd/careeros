import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ThrottlerModule } from '@nestjs/throttler';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { AiModule } from './ai/ai.module';
import { CareerModule } from './career/career.module';
import { StorageModule } from './storage/storage.module';
import { ResumeModule } from './resume/resume.module';
import { InterviewModule } from './interview/interview.module';
import { LearningModule } from './learning/learning.module';
import { NotificationModule } from './notification/notification.module';
import { AiChatModule } from './ai-chat/ai-chat.module';
import { StatsModule } from './stats/stats.module';
import { AdminModule } from './admin/admin.module';
import { ExportModule } from './export/export.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    ThrottlerModule.forRoot([
      {
        ttl: 60000,
        limit: 100,
      },
    ]),
    PrismaModule,
    AuthModule,
    UserModule,
    AiModule,
    CareerModule,
    StorageModule,
    ResumeModule,
    InterviewModule,
    LearningModule,
    NotificationModule,
    AiChatModule,
    StatsModule,
    AdminModule,
    ExportModule,
  ],
})
export class AppModule {}
