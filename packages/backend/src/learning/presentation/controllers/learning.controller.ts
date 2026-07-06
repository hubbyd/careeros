import { Controller, Post, Get, Delete, Put, Param, Body, UseGuards, Request } from '@nestjs/common';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { LearningAppService } from '../../application/services/learning-app.service';

@ApiTags('学习计划')
@ApiBearerAuth()
@Controller('learning')
@UseGuards(AuthGuard('jwt'))
export class LearningController {
  constructor(private readonly appService: LearningAppService) {}

  @Post('plans/generate')
  async generatePlan(@Request() req: { user: { id: number } }, @Body() body: { targetJob: string; currentLevel: string; studyTime: string }) {
    const result = await this.appService.generateLearningPlan(req.user.id, body.targetJob, body.currentLevel, body.studyTime);
    return {
      id: result.id,
      title: result.title,
      description: result.description,
      progress: result.progress,
      status: result.status,
      createdAt: new Date(),
    };
  }

  @Get('plans')
  async getUserPlans(@Request() req: { user: { id: number } }) {
    const plans = await this.appService.getUserPlans(req.user.id);
    return plans.map((p) => ({
      id: p.id,
      title: p.title,
      description: p.description,
      progress: p.progress,
      status: p.status,
      createdAt: new Date(),
    }));
  }

  @Get('plans/:id')
  async getPlan(@Request() req: { user: { id: number } }, @Param('id') id: number) {
    const plan = await this.appService.getPlanById(req.user.id, id);
    if (!plan) {
      return { error: 'Plan not found' };
    }
    return {
      id: plan.id,
      title: plan.title,
      description: plan.description,
      planData: plan.planData,
      progress: plan.progress,
      status: plan.status,
    };
  }

  @Put('plans/:id/progress')
  async updateProgress(@Request() req: { user: { id: number } }, @Param('id') id: number, @Body() body: { progress: number }) {
    const result = await this.appService.updatePlanProgress(req.user.id, id, body.progress);
    return {
      id: result.id,
      progress: result.progress,
      status: result.status,
    };
  }

  @Post('plans/:id/complete')
  async completePlan(@Request() req: { user: { id: number } }, @Param('id') id: number) {
    const result = await this.appService.completePlan(req.user.id, id);
    return {
      id: result.id,
      progress: result.progress,
      status: result.status,
      message: 'Plan completed',
    };
  }

  @Delete('plans/:id')
  async deletePlan(@Request() req: { user: { id: number } }, @Param('id') id: number) {
    await this.appService.deletePlan(req.user.id, id);
    return { message: 'Plan deleted successfully' };
  }

  @Post('growth-records')
  async createGrowthRecord(@Request() req: { user: { id: number } }, @Body() body: { type: string; content: string; metadata?: string }) {
    const result = await this.appService.createGrowthRecord(req.user.id, body.type, body.content, body.metadata);
    return {
      id: result.id,
      type: result.type,
      content: result.content,
      createdAt: new Date(),
    };
  }

  @Get('growth-records')
  async getUserGrowthRecords(@Request() req: { user: { id: number } }) {
    const records = await this.appService.getUserGrowthRecords(req.user.id);
    return records.map((r) => ({
      id: r.id,
      type: r.type,
      content: r.content,
      createdAt: new Date(),
    }));
  }

  @Get('growth-records/:type')
  async getUserGrowthRecordsByType(@Request() req: { user: { id: number } }, @Param('type') type: string) {
    const records = await this.appService.getUserGrowthRecordsByType(req.user.id, type);
    return records.map((r) => ({
      id: r.id,
      type: r.type,
      content: r.content,
      createdAt: new Date(),
    }));
  }

  @Get('growth-summary')
  async getGrowthSummary(@Request() req: { user: { id: number } }) {
    return this.appService.getGrowthSummary(req.user.id);
  }

  @Delete('growth-records/:id')
  async deleteGrowthRecord(@Request() req: { user: { id: number } }, @Param('id') id: number) {
    await this.appService.deleteGrowthRecord(req.user.id, id);
    return { message: 'Growth record deleted successfully' };
  }
}
