import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { MentorAnswer, CareerDirection } from '../types'

interface CareerStore {
  mentorAnswer: MentorAnswer | null;
  directions: CareerDirection[];
  assessmentDone: boolean;
  submitAssessment: (answer: MentorAnswer) => void;
}

const mockDirections: CareerDirection[] = [
  {
    id: '1',
    title: '前端开发工程师',
    match: 92,
    salaryRange: '12-35K',
    prospects: '市场需求旺盛，远程工作机会多，AI 辅助提升效率',
    threshold: '需要扎实的 JS/CSS 基础 + 主流框架经验',
    pros: ['入门相对容易', '就业机会多', '薪资增长快', '可远程工作'],
    cons: ['技术更新快需持续学习', '内卷较严重'],
    tags: ['推荐', '高匹配', '市场需求大'],
  },
  {
    id: '2',
    title: '全栈开发工程师',
    match: 78,
    salaryRange: '15-40K',
    prospects: '创业公司偏好全栈，AI 工具降低全栈门槛',
    threshold: '需要前后端都具备生产能力',
    pros: ['技能全面', '创业友好', '职业灵活度高'],
    cons: ['学习曲线陡', '深度可能不如专科'],
    tags: ['技能全面', '创业优选'],
  },
  {
    id: '3',
    title: 'AI 应用开发',
    match: 71,
    salaryRange: '20-50K',
    prospects: 'AI 赛道爆发，复合型人才稀缺',
    threshold: '需要传统开发能力 + AI/ML 基础知识',
    pros: ['薪资天花板高', '未来趋势', '竞争相对小'],
    cons: ['技术迭代极快', '需要持续学习 AI 新进展'],
    tags: ['高薪', '未来趋势'],
  },
]

export const useCareerStore = create<CareerStore>()(
  persist(
    (set) => ({
      mentorAnswer: null,
      directions: [],
      assessmentDone: false,
      submitAssessment: (answer) =>
        set({
          mentorAnswer: answer,
          directions: mockDirections,
          assessmentDone: true,
        }),
    }),
    { name: 'jobsprint-career' },
  ),
)
