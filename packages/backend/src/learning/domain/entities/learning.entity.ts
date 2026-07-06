export interface LearningPlan {
  id: number;
  userId: number;
  title: string;
  description: string | null;
  planData: string;
  progress: number;
  status: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface GrowthRecord {
  id: number;
  userId: number;
  type: string;
  content: string;
  metadata: string | null;
  createdAt: Date;
}

export interface LearningPlanProps {
  id?: number;
  userId: number;
  title: string;
  description?: string;
  planData: string;
  progress?: number;
  status?: string;
}

export interface GrowthRecordProps {
  id?: number;
  userId: number;
  type: string;
  content: string;
  metadata?: string;
}

export class LearningPlanEntity {
  private readonly props: LearningPlanProps;

  constructor(props: LearningPlanProps) {
    this.props = props;
  }

  get id(): number | undefined {
    return this.props.id;
  }

  get userId(): number {
    return this.props.userId;
  }

  get title(): string {
    return this.props.title;
  }

  get description(): string | undefined {
    return this.props.description;
  }

  get planData(): string {
    return this.props.planData;
  }

  get progress(): number {
    return this.props.progress || 0;
  }

  get status(): string {
    return this.props.status || 'active';
  }

  toDomain(): LearningPlanProps {
    return {
      id: this.props.id,
      userId: this.props.userId,
      title: this.props.title,
      description: this.props.description,
      planData: this.props.planData,
      progress: this.props.progress,
      status: this.props.status,
    };
  }
}

export class GrowthRecordEntity {
  private readonly props: GrowthRecordProps;

  constructor(props: GrowthRecordProps) {
    this.props = props;
  }

  get id(): number | undefined {
    return this.props.id;
  }

  get userId(): number {
    return this.props.userId;
  }

  get type(): string {
    return this.props.type;
  }

  get content(): string {
    return this.props.content;
  }

  get metadata(): string | undefined {
    return this.props.metadata;
  }

  toDomain(): GrowthRecordProps {
    return {
      id: this.props.id,
      userId: this.props.userId,
      type: this.props.type,
      content: this.props.content,
      metadata: this.props.metadata,
    };
  }
}
