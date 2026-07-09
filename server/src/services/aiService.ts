export interface ModelConfig {
  name: string;
  provider: string;
  model: string;
  baseUrl?: string;
  description: string;
  free: boolean;
  freeTier: boolean;
  signUpUrl: string;
}

const defaultModels: ModelConfig[] = [
  {
    name: 'Qwen-Turbo',
    provider: 'aliyun',
    model: 'qwen-turbo',
    baseUrl: 'https://dashscope.aliyuncs.com/compatible-mode/v1',
    description: '阿里云通义千问Turbo，响应快，免费额度充足，国内可用',
    free: false,
    freeTier: true,
    signUpUrl: 'https://dashscope.console.aliyun.com/',
  },
  {
    name: 'Qwen-Plus',
    provider: 'aliyun',
    model: 'qwen-plus',
    baseUrl: 'https://dashscope.aliyuncs.com/compatible-mode/v1',
    description: '阿里云通义千问Plus，推理能力强，国内可用',
    free: false,
    freeTier: true,
    signUpUrl: 'https://dashscope.console.aliyun.com/',
  },
  {
    name: 'ERNIE-4.0',
    provider: 'baidu',
    model: 'ernie-4.0',
    baseUrl: 'https://aip.baidubce.com/rpc/2.0/ai_custom/v1/wenxinworkshop/chat/completions_pro',
    description: '百度文心一言4.0，中文能力强，国内可用',
    free: false,
    freeTier: true,
    signUpUrl: 'https://console.bce.baidu.com/qianfan/',
  },
  {
    name: 'ERNIE-3.5',
    provider: 'baidu',
    model: 'ernie-3.5',
    baseUrl: 'https://aip.baidubce.com/rpc/2.0/ai_custom/v1/wenxinworkshop/chat/completions_pro',
    description: '百度文心一言3.5，响应快，国内可用',
    free: false,
    freeTier: true,
    signUpUrl: 'https://console.bce.baidu.com/qianfan/',
  },
  {
    name: 'Doubao-8K',
    provider: 'bytedance',
    model: 'doubao-8k',
    baseUrl: 'https://ark.bytedance.net/api/open/v1/ai/text',
    description: '字节跳动豆包8K，响应快，国内可用',
    free: false,
    freeTier: true,
    signUpUrl: 'https://ark.bytedance.net/',
  },
  {
    name: 'DeepSeek-R1',
    provider: 'deepseek',
    model: 'deepseek-r1',
    baseUrl: 'https://api.deepseek.com/v1',
    description: 'DeepSeek R1大模型，推理能力强，免费额度充足',
    free: false,
    freeTier: true,
    signUpUrl: 'https://platform.deepseek.com/api_keys',
  },
  {
    name: 'DeepSeek-R1-Lite',
    provider: 'deepseek',
    model: 'deepseek-r1-lite',
    baseUrl: 'https://api.deepseek.com/v1',
    description: 'DeepSeek R1轻量版，响应快，免费额度充足',
    free: false,
    freeTier: true,
    signUpUrl: 'https://platform.deepseek.com/api_keys',
  },
  {
    name: 'Groq-Llama-3.3-70B',
    provider: 'groq',
    model: 'llama-3.3-70b-versatile',
    baseUrl: 'https://api.groq.com/openai/v1',
    description: 'Groq Llama 3.3 70B，极速响应（需海外网络）',
    free: false,
    freeTier: true,
    signUpUrl: 'https://console.groq.com/keys',
  },
  {
    name: 'Groq-Llama-3.3-8B',
    provider: 'groq',
    model: 'llama-3.3-8b',
    baseUrl: 'https://api.groq.com/openai/v1',
    description: 'Groq Llama 3.3 8B，极速响应（需海外网络）',
    free: false,
    freeTier: true,
    signUpUrl: 'https://console.groq.com/keys',
  },
  {
    name: 'GPT-4o-mini',
    provider: 'openai',
    model: 'gpt-4o-mini',
    description: 'OpenAI GPT-4o-mini，性能均衡（需海外网络）',
    free: false,
    freeTier: false,
    signUpUrl: 'https://platform.openai.com/api-keys',
  },
];

export function getAvailableModels(): ModelConfig[] {
  return defaultModels;
}

export function getDefaultModel(): ModelConfig | null {
  const available = defaultModels.filter(m => {
    const apiKeyEnv = `${m.provider.toUpperCase()}_API_KEY`;
    return process.env[apiKeyEnv];
  });

  if (available.length === 0) {
    return defaultModels.find(m => m.freeTier) || null;
  }

  const isProduction = process.env.NODE_ENV === 'production';
  if (isProduction) {
    const deepseek = available.find(m => m.provider === 'deepseek');
    if (deepseek) return deepseek;

    const groq = available.find(m => m.provider === 'groq');
    if (groq) return groq;
  }

  return available[0] || null;
}

export function getModelByProvider(provider: string): ModelConfig | undefined {
  return defaultModels.find(m => m.provider === provider);
}

function getAuthHeaders(provider: string): { Authorization: string } | null {
  const apiKey = process.env[`${provider.toUpperCase()}_API_KEY`];
  if (apiKey) {
    return { Authorization: `Bearer ${apiKey}` };
  }
  return null;
}

async function callAiApi(prompt: string, modelConfig?: ModelConfig, apiKey?: string): Promise<string> {
  const model = modelConfig || getDefaultModel();
  if (!model) {
    return '未配置任何AI模型';
  }

  const authHeaders = apiKey ? { Authorization: `Bearer ${apiKey}` } : getAuthHeaders(model.provider);
  if (!authHeaders) {
    return `${model.name} 未配置API密钥`;
  }

  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 15000);

    const response = await fetch(`${model.baseUrl || 'https://api.openai.com/v1'}/chat/completions`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...authHeaders,
      },
      body: JSON.stringify({
        model: model.model,
        messages: [{ role: 'user', content: prompt }],
        temperature: 0.7,
        max_tokens: 2000,
      }),
      signal: controller.signal,
    });

    clearTimeout(timeoutId);

    const data = await response.json() as { error?: { message: string }; choices?: { message: { content: string } }[] };
    
    if (!response.ok) {
      const errorMsg = data.error?.message || 'API调用失败';
      return `错误: ${errorMsg}`;
    }

    return data.choices?.[0]?.message?.content || '未获取到响应';
  } catch (error: any) {
    if (error.name === 'AbortError') {
      return 'AI服务超时';
    }
    return 'AI服务暂时不可用';
  }
}

export async function chatCompletion(
  messages: { role: string; content: string }[],
  modelConfig?: ModelConfig,
  userApiKey?: string
): Promise<string> {
  const model = modelConfig || getDefaultModel();
  if (!model) {
    return '未配置任何AI模型，请联系管理员';
  }

  const authHeaders = userApiKey ? { Authorization: `Bearer ${userApiKey}` } : getAuthHeaders(model.provider);
  if (!authHeaders) {
    return `${model.name} 未配置API密钥`;
  }

  try {
    const systemPrompt = {
      role: 'system',
      content: `你是一个专业的AI求职助手，帮助用户解决职业规划、简历优化、面试准备、学习建议等问题。请用简洁、专业、友好的语言回答。`,
    };

    const response = await fetch(`${model.baseUrl || 'https://api.openai.com/v1'}/chat/completions`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...authHeaders,
      },
      body: JSON.stringify({
        model: model.model,
        messages: [systemPrompt, ...messages],
        temperature: 0.7,
        max_tokens: 2000,
      }),
    });

    const data = await response.json() as { error?: { message: string }; choices?: { message: { content: string } }[] };
    
    if (!response.ok) {
      const errorMsg = data.error?.message || 'API调用失败';
      return `错误: ${errorMsg}`;
    }

    return data.choices?.[0]?.message?.content || '未获取到响应';
  } catch {
    return 'AI服务暂时不可用，请稍后重试';
  }
}

export async function* chatCompletionStream(
  messages: { role: string; content: string }[],
  modelConfig?: ModelConfig,
  userApiKey?: string
): AsyncGenerator<string> {
  const model = modelConfig || getDefaultModel();
  if (!model) {
    yield '未配置任何AI模型，请联系管理员';
    return;
  }

  const authHeaders = userApiKey ? { Authorization: `Bearer ${userApiKey}` } : getAuthHeaders(model.provider);
  console.log(`[AI Debug] Model: ${model.name}, Provider: ${model.provider}, Auth headers exist: ${!!authHeaders}`);
  console.log(`[AI Debug] API URL: ${model.baseUrl || 'https://api.openai.com/v1'}/chat/completions`);
  console.log(`[AI Debug] Messages count: ${messages.length}`);
  if (!authHeaders) {
    yield `当前模型【${model.name}】未配置API密钥。`;
    yield '你可以在以下平台免费注册获取：';
    yield `${model.signUpUrl}`;
    yield '\n配置后即可享受AI智能问答服务！';
    return;
  }

  try {
    const systemPrompt = {
      role: 'system',
      content: `你是一个专业的AI求职助手，帮助用户解决职业规划、简历优化、面试准备、学习建议等问题。请用简洁、专业、友好的语言回答。`,
    };

    const response = await fetch(`${model.baseUrl || 'https://api.openai.com/v1'}/chat/completions`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...authHeaders,
      },
      body: JSON.stringify({
        model: model.model,
        messages: [systemPrompt, ...messages],
        temperature: 0.7,
        max_tokens: 2000,
        stream: true,
      }),
    });

    if (!response.ok) {
      console.error(`[AI Error] API response not ok, status: ${response.status}`);
      const data = await response.json().catch(() => ({})) as { error?: { message: string }; message?: string };
      console.error(`[AI Error] API error data: ${JSON.stringify(data)}`);
      const errorMsg = data.error?.message || data.message || 'API调用失败';
      yield `错误: ${errorMsg}`;
      return;
    }

    const reader = response.body?.getReader();
    if (!reader) {
      yield '无法获取响应流';
      return;
    }

    const decoder = new TextDecoder();
    let buffer = '';

    while (true) {
      const { done, value } = await reader.read();
      if (done) break;

      buffer += decoder.decode(value, { stream: true });
      const lines = buffer.split('\n');
      buffer = lines.pop() || '';

      for (const line of lines) {
        if (line.startsWith('data: ')) {
          const data = line.slice(6);
          if (data === '[DONE]') {
            return;
          }

          try {
            const json = JSON.parse(data) as { choices?: { delta?: { content?: string } }[] };
            const content = json.choices?.[0]?.delta?.content;
            if (content) {
              yield content;
            }
          } catch {}
        }
      }
    }
  } catch (error) {
    console.error(`[AI Error] ${error}`);
    yield 'AI服务暂时不可用，请稍后重试';
  }
}

export async function analyzeCareerDiagnosis(data: {
  skills: any[];
  interests: string[];
  personality: any[];
  education: string;
  major: string;
  experience?: string;
}): Promise<any> {
  const prompt = `请根据以下信息为用户进行职业诊断分析：
专业：${data.major}
学历：${data.education}
技能：${data.skills.map((s: any) => s.name).join(', ') || '暂无'}
兴趣：${data.interests.join(', ') || '暂无'}
性格特质：${data.personality.map((p: any) => p.name).join(', ') || '暂无'}
工作经验：${data.experience || '暂无'}

请返回一个JSON对象，包含以下字段：
- summary: 综合评估总结
- strengths: 优势列表
- weaknesses: 劣势列表
- suggestions: 改进建议列表
- matches: 职业匹配列表（每个包含title, match, salaryRange, prospects, threshold, pros, cons, tags）

请确保返回的是合法的JSON格式，不要包含Markdown标记。`;

  const response = await callAiApi(prompt);
  
  try {
    return JSON.parse(response);
  } catch {
    throw new Error('AI返回格式错误');
  }
}

export async function analyzeResume(content: string, targetJob?: string): Promise<any> {
  const prompt = `请分析以下简历内容：
目标岗位：${targetJob || '不限'}

简历内容：
${content}

请返回一个JSON对象，包含以下字段：
- score: 综合评分（0-100）
- dimensions: 各维度评分列表（每个包含name, score, comment）
- suggestions: 优化建议列表

请确保返回的是合法的JSON格式，不要包含Markdown标记。`;

  const response = await callAiApi(prompt);
  
  try {
    return JSON.parse(response);
  } catch {
    throw new Error('AI返回格式错误');
  }
}

export async function optimizeResume(content: string, targetJob?: string): Promise<string> {
  const prompt = `请优化以下简历内容，针对${targetJob || '目标岗位'}：

原始简历：
${content}

请直接返回优化后的简历内容，不要包含其他解释性文字。`;

  return await callAiApi(prompt);
}

export async function generateInterviewQuestion(jobTitle: string, company?: string, level: string = 'entry'): Promise<any> {
  const levelDesc = {
    'entry': '初级/校招',
    'junior': '初级工程师',
    'mid': '中级工程师',
    'senior': '高级工程师',
    'lead': '技术负责人',
  }[level] || '初级';
  
  const prompt = `请为${company || '某公司'}的${jobTitle}岗位（${levelDesc}）生成一个面试问题。

请返回一个JSON对象，包含以下字段：
- question: 面试问题
- questionType: 问题类型（如：技术基础、项目经验、算法、行为面试等）
- expectedPoints: 回答要点列表

请确保返回的是合法的JSON格式，不要包含Markdown标记。`;

  const response = await callAiApi(prompt);
  
  console.log('[AI Debug] generateInterviewQuestion response:', response.substring(0, 200));
  
  if (response.startsWith('错误:') || response.startsWith('AI服务') || response === '未配置任何AI模型') {
    throw new Error(`AI调用失败: ${response}`);
  }
  
  try {
    const result = JSON.parse(response);
    if (!result.question) {
      throw new Error('AI返回的问题格式不完整');
    }
    return result;
  } catch (parseError) {
    console.error('[AI Error] JSON解析失败:', parseError);
    throw new Error('AI返回格式错误');
  }
}

export async function evaluateInterviewAnswer(question: string, answer: string, jobTitle: string): Promise<any> {
  const prompt = `请评估以下面试回答：

岗位：${jobTitle}
问题：${question}
回答：${answer}

请返回一个JSON对象，包含以下字段：
- score: 评分（0-100）
- feedback: 评价反馈
- improvements: 改进建议列表
- sampleAnswer: 参考回答

请确保返回的是合法的JSON格式，不要包含Markdown标记。`;

  const response = await callAiApi(prompt);
  
  try {
    return JSON.parse(response);
  } catch {
    throw new Error('AI返回格式错误');
  }
}

export async function generateInterviewReport(questions: string[], answers: string[], feedbacks: string[], jobTitle: string): Promise<any> {
  const prompt = `请根据以下面试记录生成一份完整的面试报告：

岗位：${jobTitle}

问题列表：
${questions.map((q, i) => `${i + 1}. ${q}`).join('\n')}

回答列表：
${answers.map((a, i) => `${i + 1}. ${a}`).join('\n')}

反馈列表：
${feedbacks.map((f, i) => `${i + 1}. ${f}`).join('\n')}

请返回一个JSON对象，包含以下字段：
- summary: 面试总结
- strengths: 优势列表
- weaknesses: 劣势列表
- suggestions: 改进建议列表
- overallScore: 综合评分（0-100）

请确保返回的是合法的JSON格式，不要包含Markdown标记。`;

  const response = await callAiApi(prompt);
  
  try {
    return JSON.parse(response);
  } catch {
    throw new Error('AI返回格式错误');
  }
}

export async function generateLearningPlan(targetJob: string, timeline: string, currentSkills: string[]): Promise<any> {
  const prompt = `请为目标岗位【${targetJob}】生成一个${timeline}的学习计划。

当前技能：${currentSkills.join(', ') || '暂无'}

请返回一个JSON对象，包含以下字段：
- phases: 阶段列表（每个包含phase, duration, objectives, tasks）
- milestones: 里程碑列表
- resources: 推荐资源列表

请确保返回的是合法的JSON格式，不要包含Markdown标记。`;

  const response = await callAiApi(prompt);
  
  try {
    return JSON.parse(response);
  } catch {
    throw new Error('AI返回格式错误');
  }
}