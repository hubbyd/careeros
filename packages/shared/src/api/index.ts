export const API_ENDPOINTS = {
  AUTH: {
    LOGIN: '/api/auth/login',
    REGISTER: '/api/auth/register',
    ME: '/api/auth/me',
  },
  USER: {
    BASE: '/api/users',
    UPDATE: '/api/users/:id',
    DELETE: '/api/users/:id',
  },
  CAREER: {
    ASSESSMENT: '/api/career/assessment',
    DIRECTION: '/api/career/direction',
    LEARNING_PATH: '/api/career/learning-path',
    EXAM_ADVICE: '/api/career/exam-advice',
    RECORDS: '/api/career/assessment-records',
  },
  RESUME: {
    BASE: '/api/resumes',
    UPLOAD: '/api/resumes/upload',
    ANALYZE: '/api/resumes/:id/analyze',
  },
  INTERVIEW: {
    SESSIONS: '/api/interview/sessions',
    QUESTIONS: '/api/interview/questions',
    SUBMIT_ANSWER: '/api/interview/questions/:id/answer',
    REPORT: '/api/interview/sessions/:id/report',
  },
  LEARNING: {
    PLANS: '/api/learning/plans',
    GROWTH: '/api/learning/growth',
    GENERATE: '/api/learning/plans/generate',
    UPDATE_PROGRESS: '/api/learning/plans/:id/progress',
  },
  AI: {
    CHAT: '/api/ai/chat',
    CHAT_STREAM: '/api/ai/chat-stream',
    COMPLETE: '/api/ai/complete',
  },
};