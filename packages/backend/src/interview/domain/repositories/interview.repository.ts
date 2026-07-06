export const INTERVIEW_REPOSITORY = 'InterviewRepository';

export interface InterviewRepository {
  createSession(session: Omit<InterviewSession, 'id' | 'createdAt' | 'updatedAt'>): Promise<InterviewSession>;
  findSessionById(id: number): Promise<InterviewSession | null>;
  findSessionsByUserId(userId: number): Promise<InterviewSession[]>;
  updateSession(id: number, data: Partial<InterviewSession>): Promise<InterviewSession>;
  deleteSession(id: number): Promise<void>;

  createQuestion(question: Omit<InterviewQuestion, 'id' | 'createdAt'>): Promise<InterviewQuestion>;
  findQuestionById(id: number): Promise<InterviewQuestion | null>;
  findQuestionsBySessionId(sessionId: number): Promise<InterviewQuestion[]>;
  updateQuestion(id: number, data: Partial<InterviewQuestion>): Promise<InterviewQuestion>;
}

export interface InterviewSession {
  id: number;
  userId: number;
  jobTitle: string;
  level: string;
  status: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface InterviewQuestion {
  id: number;
  sessionId: number;
  question: string;
  answer: string | null;
  evaluation: string | null;
  score: number | null;
  nextQuestion: string | null;
  createdAt: Date;
}
