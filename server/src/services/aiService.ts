import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

interface CareerDiagnosisInput {
  skills: { name: string; level: number }[];
  interests: string[];
  personality: { trait: string; score: number }[];
  education: string;
  major: string;
  experience: string;
}

interface CareerMatch {
  title: string;
  match: number;
  salaryRange: string;
  prospects: string;
  threshold: string;
  pros: string[];
  cons: string[];
  tags: string[];
}

interface DiagnosisReport {
  summary: string;
  strengths: string[];
  weaknesses: string[];
  suggestions: string[];
  matches: CareerMatch[];
}

export async function analyzeCareerDiagnosis(input: CareerDiagnosisInput): Promise<DiagnosisReport> {
  const prompt = `你是一位资深的职业规划师。请根据以下用户信息进行职业诊断：

用户信息：
- 专业：${input.major}
- 学历：${input.education}
- 技能：${input.skills.map(s => `${s.name}(${s.level}/10)`).join(', ')}
- 兴趣：${input.interests.join(', ')}
- 性格：${input.personality.map(p => `${p.trait}(${p.score}/10)`).join(', ')}
- 经验：${input.experience}

请输出以下内容（JSON格式）：
{
  "summary": "对用户的整体职业建议",
  "strengths": ["优势1", "优势2"],
  "weaknesses": ["劣势1", "劣势2"],
  "suggestions": ["建议1", "建议2"],
  "matches": [
    {
      "title": "职业名称",
      "match": 匹配度(0-100),
      "salaryRange": "薪资范围",
      "prospects": "发展前景",
      "threshold": "入门门槛",
      "pros": ["优点1"],
      "cons": ["缺点1"],
      "tags": ["标签1"]
    }
  ]
}

请推荐3-5个最匹配的职业方向。`;

  const response = await openai.chat.completions.create({
    model: 'gpt-4o-mini',
    messages: [{ role: 'user', content: prompt }],
    temperature: 0.7,
  });

  const content = response.choices[0].message.content || '';
  try {
    return JSON.parse(content);
  } catch {
    return {
      summary: content,
      strengths: [],
      weaknesses: [],
      suggestions: [],
      matches: [],
    };
  }
}

interface ResumeAnalysis {
  score: number;
  dimensions: { name: string; score: number; comment: string }[];
  suggestions: string[];
}

export async function analyzeResume(resumeText: string, targetJob?: string): Promise<ResumeAnalysis> {
  const prompt = `你是一位资深的HR和简历专家。请分析以下简历：

${resumeText}

目标岗位：${targetJob || '不限'}

请输出以下内容（JSON格式）：
{
  "score": 总分(0-100),
  "dimensions": [
    { "name": "内容完整性", "score": 分数, "comment": "评价" },
    { "name": "关键词匹配", "score": 分数, "comment": "评价" },
    { "name": "量化成果", "score": 分数, "comment": "评价" },
    { "name": "格式规范", "score": 分数, "comment": "评价" },
    { "name": "语言表达", "score": 分数, "comment": "评价" }
  ],
  "suggestions": ["具体建议1", "具体建议2"]
}

请给出专业的评价和具体的改进建议。`;

  const response = await openai.chat.completions.create({
    model: 'gpt-4o-mini',
    messages: [{ role: 'user', content: prompt }],
    temperature: 0.7,
  });

  const content = response.choices[0].message.content || '';
  try {
    return JSON.parse(content);
  } catch {
    return {
      score: 0,
      dimensions: [],
      suggestions: [],
    };
  }
}

export async function optimizeResume(resumeText: string, targetJob?: string): Promise<string> {
  const prompt = `你是一位资深的简历优化专家。请优化以下简历，使其更符合目标岗位要求：

原始简历：
${resumeText}

目标岗位：${targetJob || '不限'}

请输出优化后的完整简历内容，保持原有结构但进行以下优化：
1. 使用STAR法则描述项目经验
2. 突出量化成果和关键数据
3. 使用专业术语和关键词
4. 优化语言表达，使其更简洁有力
5. 调整格式，使其更易读

直接输出优化后的简历文本即可。`;

  const response = await openai.chat.completions.create({
    model: 'gpt-4o-mini',
    messages: [{ role: 'user', content: prompt }],
    temperature: 0.7,
  });

  return response.choices[0].message.content || '';
}

interface InterviewQuestion {
  question: string;
  questionType: string;
  expectedPoints: string[];
}

export async function generateInterviewQuestion(jobTitle: string, company: string, questionType?: string): Promise<InterviewQuestion> {
  const prompt = `你是一位资深的技术面试官。请为以下岗位生成一个面试问题：

岗位：${jobTitle}
公司：${company}
问题类型：${questionType || '综合'}

请输出以下内容（JSON格式）：
{
  "question": "面试问题",
  "questionType": "问题类型（如：算法、系统设计、行为面试、项目经验、技术基础）",
  "expectedPoints": ["考察要点1", "考察要点2"]
}

问题应该符合该岗位的真实面试难度。`;

  const response = await openai.chat.completions.create({
    model: 'gpt-4o-mini',
    messages: [{ role: 'user', content: prompt }],
    temperature: 0.8,
  });

  const content = response.choices[0].message.content || '';
  try {
    return JSON.parse(content);
  } catch {
    return {
      question: content,
      questionType: '综合',
      expectedPoints: [],
    };
  }
}

interface InterviewFeedback {
  score: number;
  feedback: string;
  improvements: string[];
  sampleAnswer: string;
}

export async function evaluateInterviewAnswer(question: string, answer: string, jobTitle: string): Promise<InterviewFeedback> {
  const prompt = `你是一位资深的技术面试官。请评价以下面试回答：

问题：${question}
回答：${answer}
岗位：${jobTitle}

请输出以下内容（JSON格式）：
{
  "score": 分数(0-100),
  "feedback": "详细评价",
  "improvements": ["改进点1", "改进点2"],
  "sampleAnswer": "一个优秀的参考回答"
}

请给出专业、具体的评价和建议。`;

  const response = await openai.chat.completions.create({
    model: 'gpt-4o-mini',
    messages: [{ role: 'user', content: prompt }],
    temperature: 0.7,
  });

  const content = response.choices[0].message.content || '';
  try {
    return JSON.parse(content);
  } catch {
    return {
      score: 0,
      feedback: content,
      improvements: [],
      sampleAnswer: '',
    };
  }
}

interface InterviewReport {
  summary: string;
  strengths: string[];
  weaknesses: string[];
  suggestions: string[];
  overallScore: number;
}

export async function generateInterviewReport(questions: string[], answers: string[], feedbacks: string[], jobTitle: string): Promise<InterviewReport> {
  const prompt = `你是一位资深的技术面试官。请根据以下面试记录生成完整的面试报告：

岗位：${jobTitle}

面试记录：
${questions.map((q, i) => `问题${i + 1}: ${q}\n回答${i + 1}: ${answers[i]}\n反馈${i + 1}: ${feedbacks[i]}\n`).join('\n')}

请输出以下内容（JSON格式）：
{
  "summary": "整体评价",
  "strengths": ["优点1", "优点2"],
  "weaknesses": ["缺点1", "缺点2"],
  "suggestions": ["改进建议1", "改进建议2"],
  "overallScore": 总分(0-100)
}

请给出全面、专业的评价。`;

  const response = await openai.chat.completions.create({
    model: 'gpt-4o-mini',
    messages: [{ role: 'user', content: prompt }],
    temperature: 0.7,
  });

  const content = response.choices[0].message.content || '';
  try {
    return JSON.parse(content);
  } catch {
    return {
      summary: content,
      strengths: [],
      weaknesses: [],
      suggestions: [],
      overallScore: 0,
    };
  }
}

interface LearningPhase {
  phase: string;
  duration: string;
  objectives: string[];
  tasks: string[];
}

interface LearningPlan {
  phases: LearningPhase[];
  milestones: string[];
  resources: string[];
}

export async function generateLearningPlan(targetJob: string, timeline: string, currentSkills: string[]): Promise<LearningPlan> {
  const prompt = `你是一位资深的技术导师。请为以下目标岗位制定学习计划：

目标岗位：${targetJob}
学习周期：${timeline}
现有技能：${currentSkills.join(', ') || '无'}

请输出以下内容（JSON格式）：
{
  "phases": [
    {
      "phase": "阶段名称",
      "duration": "时长",
      "objectives": ["目标1", "目标2"],
      "tasks": ["任务1", "任务2"]
    }
  ],
  "milestones": ["里程碑1", "里程碑2"],
  "resources": ["推荐资源1", "推荐资源2"]
}

学习计划应该详细、可执行，包含具体的学习任务和推荐资源。`;

  const response = await openai.chat.completions.create({
    model: 'gpt-4o-mini',
    messages: [{ role: 'user', content: prompt }],
    temperature: 0.7,
  });

  const content = response.choices[0].message.content || '';
  try {
    return JSON.parse(content);
  } catch {
    return {
      phases: [],
      milestones: [],
      resources: [],
    };
  }
}