import { Controller, Post, Get, Body, Param, UseGuards, Request } from '@nestjs/common';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { CareerAssessmentAppService } from '../../application/services/career-assessment-app.service';
import { CareerAssessmentDto } from '../dto/career-assessment.dto';

@ApiTags('职业诊断')
@ApiBearerAuth()
@Controller('career')
@UseGuards(AuthGuard('jwt'))
export class CareerAssessmentController {
  constructor(private readonly appService: CareerAssessmentAppService) {}

  @Post('assessment')
  async performAssessment(@Request() req: { user: { id: number } }, @Body() dto: CareerAssessmentDto) {
    const result = await this.appService.performCareerAssessment(req.user.id, dto);
    return {
      id: result.id,
      assessmentType: result.assessmentType,
      resultData: result.resultData,
      score: result.score,
      createdAt: new Date(),
    };
  }

  @Post('direction')
  async analyzeDirection(@Request() req: { user: { id: number } }, @Body() dto: CareerAssessmentDto) {
    const result = await this.appService.analyzeCareerDirection(req.user.id, dto);
    return {
      id: result.id,
      assessmentType: result.assessmentType,
      resultData: result.resultData,
      createdAt: new Date(),
    };
  }

  @Post('learning-path')
  async generateLearningPath(@Request() req: { user: { id: number } }, @Body() dto: CareerAssessmentDto) {
    const result = await this.appService.generateLearningPath(req.user.id, dto);
    return {
      id: result.id,
      assessmentType: result.assessmentType,
      resultData: result.resultData,
      createdAt: new Date(),
    };
  }

  @Post('exam-advice')
  async getExamAdvice(@Request() req: { user: { id: number } }, @Body() dto: CareerAssessmentDto) {
    const result = await this.appService.getExamAdvice(req.user.id, dto);
    return {
      id: result.id,
      assessmentType: result.assessmentType,
      resultData: result.resultData,
      createdAt: new Date(),
    };
  }

  @Get('assessments')
  async getUserAssessments(@Request() req: { user: { id: number } }) {
    const assessments = await this.appService.getUserAssessments(req.user.id);
    return assessments.map((a) => ({
      id: a.id,
      assessmentType: a.assessmentType,
      score: a.score,
      createdAt: new Date(),
    }));
  }

  @Get('assessments/:type')
  async getUserAssessmentsByType(
    @Request() req: { user: { id: number } },
    @Param('type') type: string,
  ) {
    const assessments = await this.appService.getUserAssessmentsByType(req.user.id, type);
    return assessments.map((a) => ({
      id: a.id,
      assessmentType: a.assessmentType,
      score: a.score,
      inputData: JSON.parse(a.inputData),
      resultData: a.resultData,
      createdAt: new Date(),
    }));
  }

  @Post('smart-assessment')
  async smartAssessment(@Request() req: { user: { id: number } }, @Body() dto: CareerAssessmentDto) {
    const result = await this.appService.smartAssessment(req.user.id, dto);
    return {
      id: result.id,
      assessmentType: result.assessmentType,
      resultData: result.resultData,
      score: result.score,
      createdAt: new Date(),
    };
  }

  @Post('thirty-day-plan')
  async generateThirtyDayPlan(@Request() req: { user: { id: number } }, @Body() dto: CareerAssessmentDto) {
    const result = await this.appService.generateThirtyDayPlan(req.user.id, dto);
    return {
      id: result.id,
      assessmentType: result.assessmentType,
      resultData: result.resultData,
      createdAt: new Date(),
    };
  }

  @Post('project-recommendations')
  async getProjectRecommendations(@Request() req: { user: { id: number } }, @Body() dto: CareerAssessmentDto) {
    const result = await this.appService.getProjectRecommendations(req.user.id, dto);
    return {
      id: result.id,
      assessmentType: result.assessmentType,
      resultData: result.resultData,
      createdAt: new Date(),
    };
  }

  @Post('leetcode-recommendations')
  async getLeetCodeRecommendations(@Request() req: { user: { id: number } }, @Body() dto: CareerAssessmentDto) {
    const result = await this.appService.getLeetCodeRecommendations(req.user.id, dto);
    return {
      id: result.id,
      assessmentType: result.assessmentType,
      resultData: result.resultData,
      createdAt: new Date(),
    };
  }

  @Post('competitiveness-index')
  async getCompetitivenessIndex(@Request() req: { user: { id: number } }, @Body() dto: CareerAssessmentDto) {
    const result = await this.appService.getCompetitivenessIndex(req.user.id, dto);
    return {
      id: result.id,
      assessmentType: result.assessmentType,
      resultData: result.resultData,
      createdAt: new Date(),
    };
  }

  @Post('offer-probability')
  async predictOfferProbability(@Request() req: { user: { id: number } }, @Body() dto: CareerAssessmentDto) {
    const result = await this.appService.predictOfferProbability(req.user.id, dto);
    return {
      id: result.id,
      assessmentType: result.assessmentType,
      resultData: result.resultData,
      createdAt: new Date(),
    };
  }

  @Get('assessment/:id')
  async getAssessmentById(@Param('id') id: number) {
    const assessment = await this.appService.getAssessmentById(id);
    if (!assessment) {
      return { error: 'Assessment not found' };
    }
    return {
      id: assessment.id,
      assessmentType: assessment.assessmentType,
      inputData: JSON.parse(assessment.inputData),
      resultData: assessment.resultData,
      score: assessment.score,
      createdAt: new Date(),
    };
  }
}
