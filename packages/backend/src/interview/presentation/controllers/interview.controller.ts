import { Controller, Post, Get, Delete, Param, Body, UseGuards, Request } from '@nestjs/common';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { InterviewAppService } from '../../application/services/interview-app.service';

@ApiTags('面试模拟')
@ApiBearerAuth()
@Controller('interview')
@UseGuards(AuthGuard('jwt'))
export class InterviewController {
  constructor(private readonly appService: InterviewAppService) {}

  @Post('sessions')
  async createSession(@Request() req: { user: { id: number } }, @Body() body: { jobTitle: string; level?: string }) {
    const result = await this.appService.createSession(req.user.id, body.jobTitle, body.level || 'entry');
    return {
      id: result.id,
      jobTitle: result.jobTitle,
      level: result.level,
      status: result.status,
      createdAt: new Date(),
    };
  }

  @Get('sessions')
  async getUserSessions(@Request() req: { user: { id: number } }) {
    const sessions = await this.appService.getUserSessions(req.user.id);
    return sessions.map((s) => ({
      id: s.id,
      jobTitle: s.jobTitle,
      level: s.level,
      status: s.status,
      createdAt: new Date(),
    }));
  }

  @Get('sessions/:id')
  async getSession(@Param('id') id: number) {
    const session = await this.appService.getSessionById(id);
    if (!session) {
      return { error: 'Session not found' };
    }
    return {
      id: session.id,
      jobTitle: session.jobTitle,
      level: session.level,
      status: session.status,
    };
  }

  @Post('sessions/:id/end')
  async endSession(@Param('id') id: number) {
    const result = await this.appService.endSession(id);
    return {
      id: result.id,
      status: result.status,
      message: 'Interview session ended',
    };
  }

  @Delete('sessions/:id')
  async deleteSession(@Param('id') id: number) {
    await this.appService.deleteSession(id);
    return { message: 'Session deleted successfully' };
  }

  @Post('sessions/:id/questions')
  async getNextQuestion(@Param('id') id: number) {
    const result = await this.appService.getNextQuestion(id);
    return {
      id: result.id,
      sessionId: result.sessionId,
      question: result.question,
      createdAt: new Date(),
    };
  }

  @Post('questions/:id/answer')
  async submitAnswer(@Param('id') id: number, @Body() body: { answer: string }) {
    const result = await this.appService.submitAnswer(id, body.answer);
    return {
      id: result.id,
      question: result.question,
      answer: result.answer,
      evaluation: result.evaluation,
      score: result.score,
      nextQuestion: result.nextQuestion,
    };
  }

  @Get('sessions/:id/report')
  async getSessionReport(@Param('id') id: number) {
    const result = await this.appService.getSessionReport(id);
    return {
      session: {
        id: result.session.id,
        jobTitle: result.session.jobTitle,
        level: result.session.level,
      },
      questions: result.questions.map((q) => ({
        id: q.id,
        question: q.question,
        answer: q.answer,
        score: q.score,
      })),
      summary: result.summary,
      averageScore: result.averageScore,
    };
  }
}
