import { Router, Request, Response } from 'express'
import prisma from '../utils/prisma'
import { authMiddleware, AuthRequest } from '../middleware/auth'
import { analyzeCareerDiagnosis } from '../services/aiService'

const router = Router()

router.get('/', authMiddleware, async (req: AuthRequest, res: Response) => {
  try {
    const assessments = await prisma.careerAssessment.findMany({
      where: { userId: req.userId! },
      orderBy: { createdAt: 'desc' },
      take: 5,
    })
    res.json(assessments)
  } catch {
    res.status(500).json({ error: '获取测评结果失败' })
  }
})

router.post('/diagnosis', authMiddleware, async (req: AuthRequest, res: Response) => {
  const { skills, interests, personality, education, major, experience } = req.body

  if (!major || !education) {
    return res.status(400).json({ error: '专业和学历必填' })
  }

  try {
    const result = await analyzeCareerDiagnosis({
      skills: skills || [],
      interests: interests || [],
      personality: personality || [],
      education,
      major,
      experience: experience || '',
    })

    const assessment = await prisma.careerAssessment.create({
      data: {
        userId: req.userId!,
        major,
        education,
        cities: JSON.stringify([]),
        expectedSalary: 0,
        skills: JSON.stringify(skills),
        values: JSON.stringify(personality),
        summary: JSON.stringify(result),
      },
    })

    await prisma.growthRecord.create({
      data: {
        userId: req.userId!,
        type: 'diagnosis',
        content: JSON.stringify({
          type: '职业诊断',
          summary: result.summary,
          matches: result.matches.slice(0, 3).map(m => m.title),
        }),
      },
    })

    res.status(201).json({ assessment, result })
  } catch (error) {
    console.error('AI诊断失败:', error)
    const fallbackResult = generateFallbackReport(major, education, skills)
    
    const assessment = await prisma.careerAssessment.create({
      data: {
        userId: req.userId!,
        major,
        education,
        cities: JSON.stringify([]),
        expectedSalary: 0,
        skills: JSON.stringify(skills),
        values: JSON.stringify(personality),
        summary: JSON.stringify(fallbackResult),
      },
    })

    res.status(201).json({ assessment, result: fallbackResult })
  }
})

function generateFallbackReport(major: string, education: string, skills: any[]): any {
  const skillNames = skills.map((s: any) => s.name).join(', ')
  const recommendations: any[] = []

  if (major.includes('计算机') || major.includes('软件') || major.includes('信息')) {
    recommendations.push({
      title: '前端开发工程师',
      match: 95,
      salaryRange: '15-30K',
      prospects: '前景良好，市场需求大',
      threshold: '掌握HTML/CSS/JS，熟悉React/Vue',
      pros: ['入门相对简单', '可视化成果明显', '市场需求大'],
      cons: ['技术更新快', '竞争激烈'],
      tags: ['Web', 'React', 'Vue'],
    })
    recommendations.push({
      title: '后端开发工程师',
      match: 90,
      salaryRange: '18-35K',
      prospects: '核心岗位，发展稳定',
      threshold: '掌握一门后端语言，了解数据库',
      pros: ['技术壁垒高', '薪资相对较高'],
      cons: ['学习周期长', '压力较大'],
      tags: ['Java', 'Go', 'Python'],
    })
  }

  if (major.includes('数据') || major.includes('统计') || major.includes('数学')) {
    recommendations.push({
      title: '数据分析师',
      match: 92,
      salaryRange: '12-25K',
      prospects: '各行业需求增长',
      threshold: '掌握SQL、Python、统计学',
      pros: ['应用广泛', '薪资稳定'],
      cons: ['天花板相对较低'],
      tags: ['SQL', 'Python', '统计学'],
    })
    recommendations.push({
      title: '算法工程师',
      match: 85,
      salaryRange: '25-50K',
      prospects: 'AI时代核心岗位',
      threshold: '扎实的数学和算法基础',
      pros: ['薪资高', '技术成就感强'],
      cons: ['门槛极高', '竞争激烈'],
      tags: ['机器学习', '深度学习'],
    })
  }

  if (recommendations.length === 0) {
    recommendations.push({
      title: '产品经理',
      match: 75,
      salaryRange: '12-25K',
      prospects: '各行业都有需求',
      threshold: '良好的逻辑思维和沟通能力',
      pros: ['发展路径广', '不局限于技术'],
      cons: ['需要积累经验'],
      tags: ['产品', '需求分析'],
    })
  }

  return {
    summary: `基于你的专业【${major}】和学历【${education}】，以下是适合你的职业方向建议。建议重点关注技能提升和项目积累。`,
    strengths: ['有明确的专业背景', '学习能力强'],
    weaknesses: ['缺乏实战经验', '职业规划不够清晰'],
    suggestions: [
      `重点强化${skillNames || '核心'}技能`,
      '至少完成2-3个完整项目并部署上线',
      '通过模拟面试提升表达能力',
    ],
    matches: recommendations,
  }
}

export default router