import { CAREER_ASSESSMENT_REPOSITORY, CareerAssessmentRepository } from '../repositories/career-assessment.repository';
import { CareerAssessmentEntity } from '../entities/career-assessment.entity';

export class CareerAssessmentDomainService {
  constructor(private readonly repository: CareerAssessmentRepository) {}

  async createAssessment(
    userId: number,
    assessmentType: string,
    inputData: string,
    resultData: string,
    score?: number | null,
  ): Promise<CareerAssessmentEntity> {
    const assessment = await this.repository.create({
      userId,
      assessmentType,
      inputData,
      resultData,
      score: score ?? null,
    });

    return new CareerAssessmentEntity({
      id: assessment.id,
      userId: assessment.userId,
      assessmentType: assessment.assessmentType,
      inputData: assessment.inputData,
      resultData: assessment.resultData,
      score: assessment.score,
    });
  }

  async getAssessmentById(id: number): Promise<CareerAssessmentEntity | null> {
    const assessment = await this.repository.findById(id);
    if (!assessment) return null;

    return new CareerAssessmentEntity({
      id: assessment.id,
      userId: assessment.userId,
      assessmentType: assessment.assessmentType,
      inputData: assessment.inputData,
      resultData: assessment.resultData,
      score: assessment.score,
    });
  }

  async getUserAssessments(userId: number): Promise<CareerAssessmentEntity[]> {
    const assessments = await this.repository.findByUserId(userId);
    return assessments.map(
      (a) =>
        new CareerAssessmentEntity({
          id: a.id,
          userId: a.userId,
          assessmentType: a.assessmentType,
          inputData: a.inputData,
          resultData: a.resultData,
          score: a.score,
        }),
    );
  }

  async getUserAssessmentsByType(userId: number, type: string): Promise<CareerAssessmentEntity[]> {
    const assessments = await this.repository.findByUserIdAndType(userId, type);
    return assessments.map(
      (a) =>
        new CareerAssessmentEntity({
          id: a.id,
          userId: a.userId,
          assessmentType: a.assessmentType,
          inputData: a.inputData,
          resultData: a.resultData,
          score: a.score,
        }),
    );
  }
}
