export const APP_NAME = 'AI职业教练';

export const STORAGE_KEYS = {
  ACCESS_TOKEN: 'aic_access_token',
  USER_INFO: 'aic_user_info',
};

export const JOB_LEVELS = [
  { value: 'junior', label: '初级' },
  { value: 'intermediate', label: '中级' },
  { value: 'senior', label: '高级' },
  { value: 'lead', label: '主管' },
];

export const CAREER_DIRECTIONS = [
  { value: 'frontend', label: '前端开发' },
  { value: 'backend', label: '后端开发' },
  { value: 'fullstack', label: '全栈开发' },
  { value: 'mobile', label: '移动端开发' },
  { value: 'ai', label: 'AI/机器学习' },
  { value: 'data', label: '数据开发' },
  { value: 'security', label: '安全开发' },
  { value: 'devops', label: 'DevOps' },
];

export const LEARNING_STATUSES = [
  { value: 'active', label: '进行中' },
  { value: 'completed', label: '已完成' },
  { value: 'paused', label: '已暂停' },
];

export const INTERVIEW_STATUSES = [
  { value: 'pending', label: '待开始' },
  { value: 'in_progress', label: '进行中' },
  { value: 'completed', label: '已完成' },
];