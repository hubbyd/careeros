import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  await prisma.prompt.deleteMany();

  const prompts = [
    {
      key: 'career_assessment',
      name: '职业能力评估',
      category: 'career',
      template: `你是一位专业的职业规划师。请根据用户的个人信息和能力描述，进行全面的职业能力评估。

用户信息：
姓名：{{name}}
专业：{{major}}
学历：{{education}}
工作经验：{{experience}}
技能：{{skills}}

请从以下维度进行评估：
1. 专业能力：技术功底、项目经验、专业知识深度
2. 软技能：沟通能力、团队协作、学习能力、时间管理
3. 职业匹配度：当前技能与目标岗位的匹配程度
4. 发展潜力：未来3-5年的发展潜力评估

输出格式要求：
- 总分：0-100分
- 各维度评分：专业能力、软技能、职业匹配度、发展潜力
- 评估建议：针对薄弱环节的改进建议
- 适合岗位：推荐3-5个适合的岗位方向

请输出详细的评估报告。`,
      variables: '{"name":"姓名","major":"专业","education":"学历","experience":"工作经验","skills":"技能"}',
      version: '1.0.0',
      isActive: 1,
    },
    {
      key: 'career_direction',
      name: '职业方向分析',
      category: 'career',
      template: `你是一位资深职业规划顾问。请根据用户的背景信息，分析适合的职业发展方向。

用户信息：
姓名：{{name}}
专业：{{major}}
学历：{{education}}
兴趣爱好：{{interests}}
技能特长：{{skills}}
职业目标：{{goal}}

请分析：
1. 行业选择：推荐适合的行业领域
2. 岗位推荐：针对用户背景推荐具体岗位
3. 发展路径：短期（1-2年）、中期（3-5年）、长期（5年以上）发展规划
4. 优势分析：用户的核心竞争力
5. 风险提示：需要注意的挑战和风险

请提供详细的职业方向分析报告。`,
      variables: '{"name":"姓名","major":"专业","education":"学历","interests":"兴趣爱好","skills":"技能特长","goal":"职业目标"}',
      version: '1.0.0',
      isActive: 1,
    },
    {
      key: 'learning_path',
      name: '学习路线建议',
      category: 'learning',
      template: `你是一位专业的技术导师。请根据用户的目标岗位，制定详细的学习路线。

用户信息：
目标岗位：{{targetJob}}
当前水平：{{currentLevel}}
专业背景：{{major}}
学习时间：{{studyTime}}

请制定学习计划：
1. 基础阶段（第1-3个月）：需要学习的基础知识
2. 进阶阶段（第4-6个月）：深入学习的核心技能
3. 实战阶段（第7-12个月）：项目实践和技能提升
4. 进阶方向：持续学习的方向和资源推荐
5. 学习资源：推荐优质的学习平台和书籍

请输出详细的学习路线规划。`,
      variables: '{"targetJob":"目标岗位","currentLevel":"当前水平","major":"专业背景","studyTime":"学习时间"}',
      version: '1.0.0',
      isActive: 1,
    },
    {
      key: 'exam_advice',
      name: '考研/考公建议',
      category: 'advice',
      template: `你是一位专业的升学就业顾问。请根据用户的情况，提供考研或考公的专业建议。

用户信息：
姓名：{{name}}
专业：{{major}}
学历：{{education}}
目标：{{target}}
优势：{{strengths}}
劣势：{{weaknesses}}

请分析：
1. 可行性分析：考研或考公的成功率评估
2. 专业选择：推荐适合的专业方向
3. 备考计划：详细的备考时间表
4. 资源推荐：优质的备考资料和学习资源
5. 风险提示：需要注意的事项和风险

请提供详细的建议报告。`,
      variables: '{"name":"姓名","major":"专业","education":"学历","target":"目标","strengths":"优势","weaknesses":"劣势"}',
      version: '1.0.0',
      isActive: 1,
    },
    {
      key: 'resume_analysis',
      name: '简历分析',
      category: 'resume',
      template: `你是一位资深HR。请分析用户的简历内容，提供专业的优化建议。

简历内容：
{{resumeContent}}

请从以下维度分析：
1. 整体结构：简历的组织和排版
2. 内容质量：项目经验、技能描述、成果量化
3. 匹配度：与目标岗位的匹配程度
4. 优化建议：具体的修改建议
5. 评分：0-100分

请输出详细的简历分析报告。`,
      variables: '{"resumeContent":"简历内容"}',
      version: '1.0.0',
      isActive: 1,
    },
    {
      key: 'interview_prep',
      name: '面试准备',
      category: 'interview',
      template: `你是一位资深技术面试官。请根据用户的目标岗位，提供面试准备建议。

目标岗位：{{jobTitle}}
用户技能：{{skills}}

请提供：
1. 常见面试题：该岗位常见的技术面试题
2. 回答思路：针对每个问题的回答思路和要点
3. 技术准备：需要重点复习的技术点
4. 行为面试：常见的行为面试问题及回答建议
5. 面试技巧：提高面试成功率的技巧

请输出详细的面试准备指南。`,
      variables: '{"jobTitle":"目标岗位","skills":"用户技能"}',
      version: '1.0.0',
      isActive: 1,
    },
    {
      key: 'interview_question',
      name: '面试问题生成',
      category: 'interview',
      template: `你是一位资深技术面试官。请根据对话历史和目标岗位，生成下一个面试问题。

目标岗位：{{jobTitle}}
职位级别：{{level}}
对话历史：
{{history}}

要求：
1. 问题要与岗位高度相关，考察核心技能
2. 难度适中，符合职位级别要求
3. 如果是第一轮，从基础问题开始
4. 根据历史回答难度逐步提升
5. 可以是技术问题或行为问题
6. 输出格式：直接输出问题内容，不要包含其他解释

请生成下一个面试问题：`,
      variables: '{"jobTitle":"目标岗位","level":"职位级别","history":"对话历史"}',
      version: '1.0.0',
      isActive: 1,
    },
    {
      key: 'interview_evaluation',
      name: '面试回答评估',
      category: 'interview',
      template: `你是一位资深技术面试官。请评估用户的回答质量。

面试问题：{{question}}
用户回答：{{answer}}
目标岗位：{{jobTitle}}

请从以下维度评估：
1. 准确性：回答是否正确
2. 深度：回答的深度和广度
3. 逻辑性：回答的逻辑结构
4. 完整性：是否覆盖了关键点

评分标准：
- 优秀（8-10分）：回答准确、深入、逻辑清晰、完整
- 良好（6-7分）：回答基本正确，有一定深度
- 一般（4-5分）：回答基本正确，但不够深入
- 较差（0-3分）：回答错误或不完整

输出格式：
{
  "score": 数字评分,
  "evaluation": "评估评语",
  "suggestion": "改进建议",
  "nextQuestion": "下一个问题的方向或具体问题"
}

请输出JSON格式的评估结果：`,
      variables: '{"question":"面试问题","answer":"用户回答","jobTitle":"目标岗位"}',
      version: '1.0.0',
      isActive: 1,
    },
    {
      key: 'smart_assessment',
      name: '智能综合评估',
      category: 'career',
      template: `你是一位专业的职业规划师。请根据用户的个人信息和能力描述，进行全面的智能综合评估。

用户输入：
{{userInput}}

请按照以下格式输出评估结果：

## 能力评分
⭐⭐⭐⭐☆

## 竞争力得分
78分

## 短板分析
- 算法
- 项目经验
- 前端技术
- 英语口语

## 建议岗位
1. Java开发工程师
2. 后端开发工程师
3. AI应用开发工程师
4. 测试开发工程师

## 评估详情
请详细分析用户的优势和劣势，并给出针对性建议。`,
      variables: '{"userInput":"用户输入的个人信息和能力描述"}',
      version: '1.0.0',
      isActive: 1,
    },
    {
      key: 'thirty_day_plan',
      name: '30天学习计划',
      category: 'learning',
      template: `你是一位专业的技术导师。请根据用户的目标岗位和当前水平，制定详细的30天学习计划。

用户信息：
目标岗位：{{targetJob}}
当前水平：{{currentLevel}}
已有技能：{{skills}}
短板：{{weaknesses}}

请按照以下格式输出30天学习计划：

## 未来30天学习计划

### 第一阶段：基础巩固（第1-7天）
Day1: Java基础复习 - HashMap、ArrayList源码分析
Day2: SpringBoot核心 - IoC、AOP原理
Day3: MySQL优化 - 索引原理、查询优化
Day4: Redis实战 - 缓存策略、分布式锁
Day5: 计算机网络 - TCP/IP协议、HTTP
Day6: 操作系统 - 进程线程、内存管理
Day7: 算法基础 - 排序、查找算法

### 第二阶段：技能提升（第8-14天）
Day8: SpringCloud微服务 - Eureka、Feign
Day9: Docker容器化 - Dockerfile、Docker Compose
Day10: Linux运维 - Shell脚本、服务器部署
Day11: Git进阶 - 分支管理、代码review
Day12: 设计模式 - 常用设计模式实战
Day13: 单元测试 - JUnit、Mockito
Day14: 项目复盘 - 整理学习笔记

### 第三阶段：项目实战（第15-21天）
Day15: 需求分析 - 电商系统需求梳理
Day16: 技术选型 - SpringBoot+Vue架构设计
Day17: 数据库设计 - ER图、表结构设计
Day18: 后端开发 - 用户认证模块
Day19: 后端开发 - 商品管理模块
Day20: 后端开发 - 订单模块
Day21: 接口测试 - Postman接口联调

### 第四阶段：冲刺提升（第22-30天）
Day22: LeetCode刷题 - 数组、链表
Day23: LeetCode刷题 - 树、图
Day24: LeetCode刷题 - 动态规划
Day25: 简历优化 - STAR法则改写项目经验
Day26: 面试模拟 - 常见面试题准备
Day27: 模拟面试 - 技术面练习
Day28: 模拟面试 - HR面练习
Day29: 查漏补缺 - 复习薄弱知识点
Day30: 心态调整 - 准备正式面试

请输出详细的30天学习计划。`,
      variables: '{"targetJob":"目标岗位","currentLevel":"当前水平","skills":"已有技能","weaknesses":"短板"}',
      version: '1.0.0',
      isActive: 1,
    },
    {
      key: 'project_recommendation',
      name: '项目与比赛推荐',
      category: 'career',
      template: `你是一位资深技术导师。请根据用户的技术栈和职业目标，推荐适合的项目、比赛和开源项目。

用户信息：
专业：{{major}}
技能：{{skills}}
目标岗位：{{targetJob}}
当前水平：{{currentLevel}}

请按照以下格式输出推荐：

## 📁 推荐项目
1. **项目名称** - 技术栈、项目描述、学习价值
2. **项目名称** - 技术栈、项目描述、学习价值
3. **项目名称** - 技术栈、项目描述、学习价值

## 🏆 推荐比赛
1. **比赛名称** - 主办方、报名时间、适合人群、官网链接
2. **比赛名称** - 主办方、报名时间、适合人群、官网链接

## 🚀 推荐开源项目
1. **项目名称** - GitHub地址、技术栈、适合学习的点
2. **项目名称** - GitHub地址、技术栈、适合学习的点

## 📚 推荐学习路线
1. **学习方向** - 推荐资源、学习顺序、重点内容

请输出详细的推荐内容。`,
      variables: '{"major":"专业","skills":"技能","targetJob":"目标岗位","currentLevel":"当前水平"}',
      version: '1.0.0',
      isActive: 1,
    },
    {
      key: 'leetcode_recommendation',
      name: 'LeetCode题目推荐',
      category: 'learning',
      template: `你是一位算法辅导专家。请根据用户的技术栈和目标岗位，推荐适合的LeetCode题目。

用户信息：
目标岗位：{{targetJob}}
已有技能：{{skills}}
薄弱环节：{{weaknesses}}
当前水平：{{currentLevel}}

请按照以下格式输出推荐：

## 🎯 LeetCode刷题计划

### 基础必刷（20题）
| 题号 | 题目名称 | 难度 | 知识点 | 推荐理由 |
|------|----------|------|--------|----------|
| 1    | Two Sum  | 简单 | 哈希表 | 入门题，理解哈希表应用 |

### 进阶提升（30题）
| 题号 | 题目名称 | 难度 | 知识点 | 推荐理由 |

### 面试高频（20题）
| 题号 | 题目名称 | 难度 | 知识点 | 推荐理由 |

### 专项突破（针对薄弱环节）
| 题号 | 题目名称 | 难度 | 知识点 | 推荐理由 |

## 💡 刷题建议
1. 每天刷2-3题，保持连续性
2. 注重解题思路，不只是AC
3. 复习旧题，总结解题模板
4. 参加周赛，提升实战能力

请输出详细的题目推荐。`,
      variables: '{"targetJob":"目标岗位","skills":"技能","weaknesses":"薄弱环节","currentLevel":"当前水平"}',
      version: '1.0.0',
      isActive: 1,
    },
    {
      key: 'competitiveness_index',
      name: '竞争力指数与雷达图',
      category: 'career',
      template: `你是一位专业的职业数据分析师。请根据用户信息，生成能力雷达图数据和就业竞争力指数。

用户信息：
专业：{{major}}
技能：{{skills}}
学历：{{education}}
工作经验：{{experience}}
证书：{{certifications}}
比赛经历：{{competition}}
项目经验：{{projects}}
目标岗位：{{targetJob}}

请按照以下JSON格式输出：
{
  "competitivenessScore": 78,
  "competitivenessLevel": "良好",
  "radarData": {
    "labels": ["专业能力", "算法能力", "项目经验", "沟通能力", "学习能力", "英语能力"],
    "values": [85, 60, 70, 75, 80, 85],
    "maxValues": [100, 100, 100, 100, 100, 100]
  },
  "analysis": {
    "strengths": ["Java基础扎实", "SpringBoot经验丰富", "英语能力优秀"],
    "weaknesses": ["算法能力薄弱", "前端知识不足", "项目经验较少"],
    "suggestions": ["加强算法学习，每天刷2道LeetCode", "学习Vue/React前端技术", "参与开源项目积累经验"]
  },
  "improvementPlan": {
    "shortTerm": "1-3个月：补全算法基础，完成50道LeetCode",
    "mediumTerm": "3-6个月：学习前端技术，参与完整项目开发",
    "longTerm": "6-12个月：积累项目经验，提升架构设计能力"
  }
}

请输出JSON格式的结果。`,
      variables: '{"major":"专业","skills":"技能","education":"学历","experience":"工作经验","certifications":"证书","competition":"比赛经历","projects":"项目经验","targetJob":"目标岗位"}',
      version: '1.0.0',
      isActive: 1,
    },
    {
      key: 'offer_probability',
      name: 'Offer概率预测',
      category: 'career',
      template: `你是一位资深的技术招聘专家。请根据用户信息，预测拿到目标岗位Offer的概率。

用户信息：
专业：{{major}}
技能：{{skills}}
学历：{{education}}
工作经验：{{experience}}
目标岗位：{{targetJob}}
目标公司类型：{{companyType}}
期望薪资：{{expectedSalary}}
当前水平：{{currentLevel}}

请按照以下JSON格式输出：
{
  "overallProbability": 65,
  "probabilityLevel": "中等",
  "breakdown": {
    "technicalAbility": 70,
    "projectExperience": 55,
    "algorithmSkill": 50,
    "communicationSkill": 75,
    "culturalFit": 60
  },
  "analysis": {
    "factors": ["技术能力较强", "项目经验不足", "算法能力薄弱", "沟通能力良好"],
    "risks": ["算法面试可能表现不佳", "项目经验较少难以通过面试"],
    "opportunities": ["技术栈匹配度高", "沟通能力优秀加分"]
  },
  "suggestions": [
    "加强算法训练，重点突破动态规划和图论",
    "补充项目经验，可以参与开源项目",
    "准备项目经历的STAR描述",
    "模拟面试提高临场应变能力"
  ],
  "targetCompanies": [
    {"name": "中型互联网公司", "probability": 75, "reason": "技术要求相对适中"},
    {"name": "大厂", "probability": 45, "reason": "竞争激烈，算法要求高"},
    {"name": "创业公司", "probability": 85, "reason": "更看重综合能力"}
  ]
}

请输出JSON格式的结果。`,
      variables: '{"major":"专业","skills":"技能","education":"学历","experience":"工作经验","targetJob":"目标岗位","companyType":"目标公司类型","expectedSalary":"期望薪资","currentLevel":"当前水平"}',
      version: '1.0.0',
      isActive: 1,
    },
  ];

  for (const prompt of prompts) {
    await prisma.prompt.create({
      data: prompt,
    });
  }

  console.log('Seed data created successfully!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
