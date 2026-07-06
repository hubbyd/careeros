import { Inject, Injectable } from '@nestjs/common';
import { InterviewDomainService } from '../../domain/services/interview.service';
import { InterviewSessionEntity, InterviewQuestionEntity } from '../../domain/entities/interview.entity';
import { INTERVIEW_REPOSITORY } from '../../domain/repositories/interview.repository';
import { InterviewRepository } from '../../domain/repositories/interview.repository';
import { AiService } from '../../../ai/ai.service';

@Injectable()
export class InterviewAppService {
  constructor(
    @Inject(INTERVIEW_REPOSITORY)
    private readonly repository: InterviewRepository,
    private readonly domainService: InterviewDomainService,
    private readonly aiService: AiService,
  ) {}

  async createSession(userId: number, jobTitle: string, level: string = 'entry'): Promise<InterviewSessionEntity> {
    return this.domainService.createSession(userId, jobTitle, level);
  }

  async getSessionById(id: number): Promise<InterviewSessionEntity | null> {
    return this.domainService.getSessionById(id);
  }

  async getUserSessions(userId: number): Promise<InterviewSessionEntity[]> {
    return this.domainService.getUserSessions(userId);
  }

  async endSession(id: number): Promise<InterviewSessionEntity> {
    return this.domainService.endSession(id);
  }

  async deleteSession(id: number): Promise<void> {
    await this.domainService.deleteSession(id);
  }

  async getNextQuestion(sessionId: number): Promise<InterviewQuestionEntity> {
    const session = await this.domainService.getSessionById(sessionId);
    if (!session) {
      throw new Error('Session not found');
    }

    const questions = await this.domainService.getSessionQuestions(sessionId);
    const history = questions.map((q, i) => {
      const answer = q.answer ? `\n回答：${q.answer}` : '';
      return `${i + 1}. 问题：${q.question}${answer}`;
    }).join('\n\n');

    const response = await this.aiService.completeWithPrompt(
      'interview_question',
      {
        jobTitle: session.jobTitle,
        level: session.level,
        history: history || '（第一轮面试）',
      },
      '',
    );

    const questionText = response.content.trim();
    return this.domainService.createQuestion(sessionId, questionText);
  }

  async submitAnswer(questionId: number, answer: string): Promise<InterviewQuestionEntity> {
    const question = await this.repository.findQuestionById(questionId);

    if (!question) {
      throw new Error('Question not found');
    }

    const session = await this.domainService.getSessionById(question.sessionId);
    if (!session) {
      throw new Error('Session not found');
    }

    const evaluationResponse = await this.aiService.completeWithPrompt(
      'interview_evaluation',
      {
        question: question.question,
        answer: answer,
        jobTitle: session.jobTitle,
      },
      '',
    );

    let evaluationData = { score: 0, evaluation: '', suggestion: '', nextQuestion: '' };
    try {
      const jsonMatch = evaluationResponse.content.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        evaluationData = JSON.parse(jsonMatch[0]);
      } else {
        evaluationData.evaluation = evaluationResponse.content;
      }
    } catch {
      evaluationData.evaluation = evaluationResponse.content;
    }

    return this.domainService.updateQuestion(
      questionId,
      answer,
      evaluationData.evaluation,
      evaluationData.score,
      evaluationData.nextQuestion,
    );
  }

  async getSessionReport(sessionId: number): Promise<{
    session: InterviewSessionEntity;
    questions: InterviewQuestionEntity[];
    summary: string;
    averageScore: number;
  }> {
    const session = await this.domainService.getSessionById(sessionId);
    if (!session) {
      throw new Error('Session not found');
    }

    const questions = await this.domainService.getSessionQuestions(sessionId);
    const answeredQuestions = questions.filter((q) => q.score !== null);

    const totalScore = answeredQuestions.reduce((sum, q) => sum + (q.score || 0), 0);
    const averageScore = answeredQuestions.length > 0 ? totalScore / answeredQuestions.length : 0;

    const questionHistory = questions.map((q, i) => {
      const answer = q.answer || '未回答';
      const score = q.score !== null ? `（得分：${q.score}）` : '';
      return `${i + 1}. Q: ${q.question}\n   A: ${answer}${score}`;
    }).join('\n\n');

    const summaryResponse = await this.aiService.complete(
      [
        {
          role: 'system',
          content: '你是一位资深面试官。请根据面试记录，给出综合评估和改进建议。',
        },
        {
          role: 'user',
          content: `目标岗位：${session.jobTitle}
职位级别：${session.level}
面试问题和回答：
${questionHistory}
平均得分：${averageScore.toFixed(1)}

请给出综合评估报告，包括：
1. 整体表现评价
2. 优势和不足
3. 改进建议
4. 最终结论`,
        },
      ],
    );

    return {
      session,
      questions,
      summary: summaryResponse.content,
      averageScore: parseFloat(averageScore.toFixed(1)),
    };
  }
}
