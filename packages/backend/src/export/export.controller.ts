import { Controller, Get, UseGuards, Res } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ExportService } from './export.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { GetUser } from '../auth/decorators/get-user.decorator';
import { UserPayload } from '../auth/types/user.type';
import type { Response } from 'express';

@ApiTags('数据导出')
@Controller('export')
@UseGuards(JwtAuthGuard)
export class ExportController {
  constructor(private readonly exportService: ExportService) {}

  @Get('user')
  async exportUserData(@GetUser() user: UserPayload, @Res() res: Response) {
    const data = await this.exportService.exportUserData(user.sub);
    res.setHeader('Content-Type', 'application/json');
    res.setHeader('Content-Disposition', `attachment; filename="user-data-${user.sub}.json"`);
    res.send(data);
  }

  @Get('assessments')
  async exportAssessments(@GetUser() user: UserPayload, @Res() res: Response) {
    const data = await this.exportService.exportAssessmentToCsv(user.sub);
    res.setHeader('Content-Type', 'text/csv');
    res.setHeader('Content-Disposition', `attachment; filename="assessments-${user.sub}.csv"`);
    res.send(data);
  }

  @Get('learning-plans')
  async exportLearningPlans(@GetUser() user: UserPayload, @Res() res: Response) {
    const data = await this.exportService.exportLearningPlanToCsv(user.sub);
    res.setHeader('Content-Type', 'text/csv');
    res.setHeader('Content-Disposition', `attachment; filename="learning-plans-${user.sub}.csv"`);
    res.send(data);
  }
}