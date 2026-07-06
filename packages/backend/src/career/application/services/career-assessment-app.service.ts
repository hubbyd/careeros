import { Injectable } from '@nestjs/common';
import { AiService } from '../../../ai/ai.service';
import { CareerAssessmentDomainService } from '../../domain/services/career-assessment.service';
import { CareerAssessmentEntity } from '../../domain/entities/career-assessment.entity';

interface CareerAssessmentInput {
  name?: string;
  major?: string;
  education?: string;
  experience?: string;
  skills?: string;
  interests?: string;
  goal?: string;
  targetJob?: string;
  currentLevel?: string;
  studyTime?: string;
  target?: string;
  strengths?: string;
  weaknesses?: string;
  userInput?: string;
  strongSkills?: string;
  weakSkills?: string;
  certifications?: string;
  competition?: string;
  projects?: string;
  companyType?: string;
  expectedSalary?: string;
}

@Injectable()
export class CareerAssessmentAppService {
  constructor(
    private readonly domainService: CareerAssessmentDomainService,
    private readonly aiService: AiService,
  ) {}

  async performCareerAssessment(userId: number, input: CareerAssessmentInput): Promise<CareerAssessmentEntity> {
    const variables: Record<string, string> = {
      name: input.name || '',
      major: input.major || '',
      education: input.education || '',
      experience: input.experience || '',
      skills: input.skills || '',
    };

    const response = await this.aiService.completeWithPrompt(
      'career_assessment',
      variables,
      JSON.stringify(input),
    );

    const score = this.extractScore(response.content);

    return this.domainService.createAssessment(
      userId,
      'career_assessment',
      JSON.stringify(input),
      response.content,
      score,
    );
  }

  async analyzeCareerDirection(userId: number, input: CareerAssessmentInput): Promise<CareerAssessmentEntity> {
    const variables: Record<string, string> = {
      name: input.name || '',
      major: input.major || '',
      education: input.education || '',
      interests: input.interests || '',
      skills: input.skills || '',
      goal: input.goal || '',
    };

    const response = await this.aiService.completeWithPrompt(
      'career_direction',
      variables,
      JSON.stringify(input),
    );

    return this.domainService.createAssessment(
      userId,
      'career_direction',
      JSON.stringify(input),
      response.content,
    );
  }

  async generateLearningPath(userId: number, input: CareerAssessmentInput): Promise<CareerAssessmentEntity> {
    const variables: Record<string, string> = {
      targetJob: input.targetJob || '',
      currentLevel: input.currentLevel || '',
      major: input.major || '',
      studyTime: input.studyTime || '',
    };

    const response = await this.aiService.completeWithPrompt(
      'learning_path',
      variables,
      JSON.stringify(input),
    );

    return this.domainService.createAssessment(
      userId,
      'learning_path',
      JSON.stringify(input),
      response.content,
    );
  }

  async getExamAdvice(userId: number, input: CareerAssessmentInput): Promise<CareerAssessmentEntity> {
    const variables: Record<string, string> = {
      name: input.name || '',
      major: input.major || '',
      education: input.education || '',
      target: input.target || '',
      strengths: input.strengths || '',
      weaknesses: input.weaknesses || '',
    };

    const response = await this.aiService.completeWithPrompt(
      'exam_advice',
      variables,
      JSON.stringify(input),
    );

    return this.domainService.createAssessment(
      userId,
      'exam_advice',
      JSON.stringify(input),
      response.content,
    );
  }

  async getUserAssessments(userId: number): Promise<CareerAssessmentEntity[]> {
    return this.domainService.getUserAssessments(userId);
  }

  async getUserAssessmentsByType(userId: number, type: string): Promise<CareerAssessmentEntity[]> {
    return this.domainService.getUserAssessmentsByType(userId, type);
  }

  async getAssessmentById(id: number): Promise<CareerAssessmentEntity | null> {
    return this.domainService.getAssessmentById(id);
  }

  async smartAssessment(userId: number, input: CareerAssessmentInput): Promise<CareerAssessmentEntity> {
    const response = await this.aiService.completeWithPrompt(
      'smart_assessment',
      {
        userInput: input.userInput || '',
      },
      input.userInput || '',
    );

    const score = this.extractScore(response.content);

    return this.domainService.createAssessment(
      userId,
      'smart_assessment',
      JSON.stringify(input),
      response.content,
      score,
    );
  }

  async generateThirtyDayPlan(userId: number, input: CareerAssessmentInput): Promise<CareerAssessmentEntity> {
    const response = await this.aiService.completeWithPrompt(
      'thirty_day_plan',
      {
        targetJob: input.targetJob || '',
        currentLevel: input.currentLevel || '',
        skills: input.skills || '',
        weaknesses: input.weaknesses || '',
      },
      JSON.stringify(input),
    );

    return this.domainService.createAssessment(
      userId,
      'thirty_day_plan',
      JSON.stringify(input),
      response.content,
    );
  }

  async getProjectRecommendations(userId: number, input: CareerAssessmentInput): Promise<CareerAssessmentEntity> {
    const response = await this.aiService.completeWithPrompt(
      'project_recommendation',
      {
        major: input.major || '',
        skills: input.skills || '',
        targetJob: input.targetJob || '',
        currentLevel: input.currentLevel || '',
      },
      JSON.stringify(input),
    );

    return this.domainService.createAssessment(
      userId,
      'project_recommendation',
      JSON.stringify(input),
      response.content,
    );
  }

  async getLeetCodeRecommendations(userId: number, input: CareerAssessmentInput): Promise<CareerAssessmentEntity> {
    const response = await this.aiService.completeWithPrompt(
      'leetcode_recommendation',
      {
        targetJob: input.targetJob || '',
        skills: input.skills || '',
        weaknesses: input.weaknesses || '',
        currentLevel: input.currentLevel || '',
      },
      JSON.stringify(input),
    );

    return this.domainService.createAssessment(
      userId,
      'leetcode_recommendation',
      JSON.stringify(input),
      response.content,
    );
  }

  async getCompetitivenessIndex(userId: number, input: CareerAssessmentInput): Promise<CareerAssessmentEntity> {
    const response = await this.aiService.completeWithPrompt(
      'competitiveness_index',
      {
        major: input.major || '',
        skills: input.skills || '',
        education: input.education || '',
        experience: input.experience || '',
        certifications: input.certifications || '',
        competition: input.competition || '',
        projects: input.projects || '',
        targetJob: input.targetJob || '',
      },
      JSON.stringify(input),
    );

    return this.domainService.createAssessment(
      userId,
      'competitiveness_index',
      JSON.stringify(input),
      response.content,
    );
  }

  async predictOfferProbability(userId: number, input: CareerAssessmentInput): Promise<CareerAssessmentEntity> {
    const response = await this.aiService.completeWithPrompt(
      'offer_probability',
      {
        major: input.major || '',
        skills: input.skills || '',
        education: input.education || '',
        experience: input.experience || '',
        targetJob: input.targetJob || '',
        companyType: input.companyType || '',
        expectedSalary: input.expectedSalary || '',
        currentLevel: input.currentLevel || '',
      },
      JSON.stringify(input),
    );

    return this.domainService.createAssessment(
      userId,
      'offer_probability',
      JSON.stringify(input),
      response.content,
    );
  }

  private extractScore(content: string): number | undefined {
    const match = content.match(/总分[：:]?\s*(\d+)/);
    if (match && match[1]) {
      const score = parseInt(match[1], 10);
      if (!isNaN(score) && score >= 0 && score <= 100) {
        return score;
      }
    }
    return undefined;
  }
}
