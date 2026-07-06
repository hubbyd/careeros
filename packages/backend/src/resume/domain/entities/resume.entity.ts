export interface Resume {
  id: number;
  userId: number;
  fileName: string;
  fileUrl: string;
  parsedData: string;
  analysisResult: string;
  status: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface ResumeProps {
  id?: number;
  userId: number;
  fileName: string;
  fileUrl: string;
  parsedData: string;
  analysisResult?: string;
  status?: string;
}

export class ResumeEntity {
  private readonly props: ResumeProps;

  constructor(props: ResumeProps) {
    this.props = props;
  }

  get id(): number | undefined {
    return this.props.id;
  }

  get userId(): number {
    return this.props.userId;
  }

  get fileName(): string {
    return this.props.fileName;
  }

  get fileUrl(): string {
    return this.props.fileUrl;
  }

  get parsedData(): string {
    return this.props.parsedData;
  }

  get analysisResult(): string | undefined {
    return this.props.analysisResult;
  }

  get status(): string {
    return this.props.status || 'pending';
  }

  toDomain(): ResumeProps {
    return {
      id: this.props.id,
      userId: this.props.userId,
      fileName: this.props.fileName,
      fileUrl: this.props.fileUrl,
      parsedData: this.props.parsedData,
      analysisResult: this.props.analysisResult,
      status: this.props.status,
    };
  }
}
