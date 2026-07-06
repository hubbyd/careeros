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

export interface InterviewSessionProps {
  id?: number;
  userId: number;
  jobTitle: string;
  level?: string;
  status?: string;
}

export interface InterviewQuestionProps {
  id?: number;
  sessionId: number;
  question: string;
  answer?: string | null;
  evaluation?: string | null;
  score?: number | null;
  nextQuestion?: string | null;
}

export class InterviewSessionEntity {
  private readonly props: InterviewSessionProps;

  constructor(props: InterviewSessionProps) {
    this.props = props;
  }

  get id(): number | undefined {
    return this.props.id;
  }

  get userId(): number {
    return this.props.userId;
  }

  get jobTitle(): string {
    return this.props.jobTitle;
  }

  get level(): string {
    return this.props.level || 'entry';
  }

  get status(): string {
    return this.props.status || 'active';
  }

  toDomain(): InterviewSessionProps {
    return {
      id: this.props.id,
      userId: this.props.userId,
      jobTitle: this.props.jobTitle,
      level: this.props.level,
      status: this.props.status,
    };
  }
}

export class InterviewQuestionEntity {
  private readonly props: InterviewQuestionProps;

  constructor(props: InterviewQuestionProps) {
    this.props = props;
  }

  get id(): number | undefined {
    return this.props.id;
  }

  get sessionId(): number {
    return this.props.sessionId;
  }

  get question(): string {
    return this.props.question;
  }

  get answer(): string | null {
    return this.props.answer || null;
  }

  get evaluation(): string | null {
    return this.props.evaluation || null;
  }

  get score(): number | null {
    return this.props.score || null;
  }

  get nextQuestion(): string | null {
    return this.props.nextQuestion || null;
  }

  toDomain(): InterviewQuestionProps {
    return {
      id: this.props.id,
      sessionId: this.props.sessionId,
      question: this.props.question,
      answer: this.props.answer,
      evaluation: this.props.evaluation,
      score: this.props.score,
      nextQuestion: this.props.nextQuestion,
    };
  }
}
