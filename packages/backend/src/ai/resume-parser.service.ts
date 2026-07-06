import { Injectable } from '@nestjs/common';
import pdfParse from 'pdf-parse';
import * as mammoth from 'mammoth';
import { AiService } from './ai.service';

interface ParsedResume {
  name: string;
  email: string;
  phone: string;
  education: string;
  major: string;
  graduationYear: string;
  workExperience: string[];
  skills: string[];
  projects: string[];
  summary: string;
}

@Injectable()
export class ResumeParserService {
  private readonly resumeSchema = {
    type: 'object' as const,
    properties: {
      name: { type: 'string', description: '姓名' },
      email: { type: 'string', description: '邮箱' },
      phone: { type: 'string', description: '手机号' },
      education: { type: 'string', description: '学历' },
      major: { type: 'string', description: '专业' },
      graduationYear: { type: 'string', description: '毕业年份' },
      workExperience: { type: 'array', description: '工作经历列表' },
      skills: { type: 'array', description: '技能列表' },
      projects: { type: 'array', description: '项目经历列表' },
      summary: { type: 'string', description: '个人总结' },
    },
    required: ['name', 'skills'],
  };

  constructor(private readonly aiService: AiService) {}

  async parseResume(text: string): Promise<ParsedResume> {
    const prompt = `你是一个专业的简历解析助手。请分析以下简历文本，提取结构化信息。

简历文本：
${text}

请按照以下JSON格式输出解析结果：
{
  "name": "姓名",
  "email": "邮箱",
  "phone": "手机号",
  "education": "学历",
  "major": "专业",
  "graduationYear": "毕业年份",
  "workExperience": ["工作经历1", "工作经历2"],
  "skills": ["技能1", "技能2"],
  "projects": ["项目1", "项目2"],
  "summary": "个人总结"
}

如果某个字段无法从简历中提取，请留空字符串或空数组。`;

    const response = await this.aiService.complete([
      { role: 'system', content: '你是专业的简历解析助手，只输出JSON格式结果。' },
      { role: 'user', content: prompt },
    ]);

    return this.aiService.parseStructuredOutput<ParsedResume>(response.content, this.resumeSchema);
  }

  async extractTextFromPdf(fileBuffer: Buffer): Promise<string> {
    try {
      const data = await pdfParse(fileBuffer);
      return this.truncateText(data.text);
    } catch {
      return this.extractTextFromBuffer(fileBuffer);
    }
  }

  async extractTextFromDocx(fileBuffer: Buffer): Promise<string> {
    try {
      const result = await mammoth.extractRawText({ buffer: fileBuffer });
      return this.truncateText(result.value);
    } catch {
      return this.extractTextFromBuffer(fileBuffer);
    }
  }

  private truncateText(text: string): string {
    if (!text || text.length === 0) {
      return '';
    }
    return text.substring(0, 20000);
  }

  private async extractTextFromBuffer(buffer: Buffer): Promise<string> {
    const text = buffer.toString('utf-8');
    return this.truncateText(text);
  }
}
