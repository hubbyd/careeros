export interface CareerAssessment {
  id: number;
  userId: number;
  assessmentType: string;
  inputData: string;
  resultData: string;
  score: number | null;
  createdAt: Date;
  updatedAt: Date;
}

export interface CareerAssessmentProps {
  id?: number;
  userId: number;
  assessmentType: string;
  inputData: string;
  resultData: string;
  score?: number | null;
}

export class CareerAssessmentEntity {
  private readonly props: CareerAssessmentProps;

  constructor(props: CareerAssessmentProps) {
    this.props = props;
  }

  get id(): number | undefined {
    return this.props.id;
  }

  get userId(): number {
    return this.props.userId;
  }

  get assessmentType(): string {
    return this.props.assessmentType;
  }

  get inputData(): string {
    return this.props.inputData;
  }

  get resultData(): string {
    return this.props.resultData;
  }

  get score(): number | null | undefined {
    return this.props.score;
  }

  toDomain(): CareerAssessmentProps {
    return {
      id: this.props.id,
      userId: this.props.userId,
      assessmentType: this.props.assessmentType,
      inputData: this.props.inputData,
      resultData: this.props.resultData,
      score: this.props.score,
    };
  }
}
