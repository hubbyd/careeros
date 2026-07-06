import { InterviewRepository } from '../repositories/interview.repository';
import { InterviewSessionEntity, InterviewQuestionEntity } from '../entities/interview.entity';

export class InterviewDomainService {
  constructor(private readonly repository: InterviewRepository) {}

  async createSession(
    userId: number,
    jobTitle: string,
    level: string,
  ): Promise<InterviewSessionEntity> {
    const session = await this.repository.createSession({
      userId,
      jobTitle,
      level,
      status: 'active',
    });

    return new InterviewSessionEntity({
      id: session.id,
      userId: session.userId,
      jobTitle: session.jobTitle,
      level: session.level,
      status: session.status,
    });
  }

  async getSessionById(id: number): Promise<InterviewSessionEntity | null> {
    const session = await this.repository.findSessionById(id);
    if (!session) return null;

    return new InterviewSessionEntity({
      id: session.id,
      userId: session.userId,
      jobTitle: session.jobTitle,
      level: session.level,
      status: session.status,
    });
  }

  async getUserSessions(userId: number): Promise<InterviewSessionEntity[]> {
    const sessions = await this.repository.findSessionsByUserId(userId);
    return sessions.map(
      (s) =>
        new InterviewSessionEntity({
          id: s.id,
          userId: s.userId,
          jobTitle: s.jobTitle,
          level: s.level,
          status: s.status,
        }),
    );
  }

  async endSession(id: number): Promise<InterviewSessionEntity> {
    const session = await this.repository.updateSession(id, { status: 'completed' });
    return new InterviewSessionEntity({
      id: session.id,
      userId: session.userId,
      jobTitle: session.jobTitle,
      level: session.level,
      status: session.status,
    });
  }

  async deleteSession(id: number): Promise<void> {
    await this.repository.deleteSession(id);
  }

  async createQuestion(
    sessionId: number,
    question: string,
  ): Promise<InterviewQuestionEntity> {
    const result = await this.repository.createQuestion({
      sessionId,
      question,
      answer: null,
      evaluation: null,
      score: null,
      nextQuestion: null,
    });

    return new InterviewQuestionEntity({
      id: result.id,
      sessionId: result.sessionId,
      question: result.question,
      answer: result.answer,
      evaluation: result.evaluation,
      score: result.score,
      nextQuestion: result.nextQuestion,
    });
  }

  async getSessionQuestions(sessionId: number): Promise<InterviewQuestionEntity[]> {
    const questions = await this.repository.findQuestionsBySessionId(sessionId);
    return questions.map(
      (q) =>
        new InterviewQuestionEntity({
          id: q.id,
          sessionId: q.sessionId,
          question: q.question,
          answer: q.answer,
          evaluation: q.evaluation,
          score: q.score,
          nextQuestion: q.nextQuestion,
        }),
    );
  }

  async updateQuestion(
    id: number,
    answer: string,
    evaluation: string,
    score: number,
    nextQuestion: string,
  ): Promise<InterviewQuestionEntity> {
    const result = await this.repository.updateQuestion(id, {
      answer,
      evaluation,
      score,
      nextQuestion,
    });

    return new InterviewQuestionEntity({
      id: result.id,
      sessionId: result.sessionId,
      question: result.question,
      answer: result.answer,
      evaluation: result.evaluation,
      score: result.score,
      nextQuestion: result.nextQuestion,
    });
  }
}
