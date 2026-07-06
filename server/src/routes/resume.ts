import { Router, Request, Response } from 'express'
import prisma from '../utils/prisma'
import { authMiddleware, AuthRequest } from '../middleware/auth'
import { analyzeResume, optimizeResume } from '../services/aiService'

const router = Router()

router.get('/', authMiddleware, async (req: AuthRequest, res: Response) => {
  try {
    const resumes = await prisma.resume.findMany({
      where: { userId: req.userId! },
      orderBy: { createdAt: 'desc' },
      take: 10,
    })
    res.json(resumes)
  } catch {
    res.status(500).json({ error: '获取简历列表失败' })
  }
})

router.get('/:id', authMiddleware, async (req: AuthRequest, res: Response) => {
  try {
    const resume = await prisma.resume.findUnique({
      where: { id: req.params.id, userId: req.userId! },
    })
    if (!resume) {
      return res.status(404).json({ error: '简历不存在' })
    }
    res.json(resume)
  } catch {
    res.status(500).json({ error: '获取简历失败' })
  }
})

router.post('/analyze', authMiddleware, async (req: AuthRequest, res: Response) => {
  const { content, targetJob } = req.body

  if (!content || content.trim().length < 10) {
    return res.status(400).json({ error: '简历内容不能为空且至少需要10个字符' })
  }

  try {
    const result = await analyzeResume(content, targetJob)

    const resume = await prisma.resume.create({
      data: {
        userId: req.userId!,
        content,
        targetJob: targetJob || '',
        analysisScore: result.score,
        analysisResult: JSON.stringify(result),
      },
    })

    await prisma.growthRecord.create({
      data: {
        userId: req.userId!,
        type: 'resume',
        content: JSON.stringify({
          type: '简历分析',
          score: result.score,
          targetJob: targetJob || '不限',
        }),
      },
    })

    res.status(201).json({ resume, analysis: result })
  } catch (error) {
    console.error('AI简历分析失败:', error)
    
    const fallbackResult = generateFallbackAnalysis(content, targetJob)
    
    const resume = await prisma.resume.create({
      data: {
        userId: req.userId!,
        content,
        targetJob: targetJob || '',
        analysisScore: fallbackResult.score,
        analysisResult: JSON.stringify(fallbackResult),
      },
    })

    res.status(201).json({ resume, analysis: fallbackResult })
  }
})

router.post('/optimize', authMiddleware, async (req: AuthRequest, res: Response) => {
  const { content, targetJob, resumeId } = req.body

  if (!content || content.trim().length < 10) {
    return res.status(400).json({ error: '简历内容不能为空且至少需要10个字符' })
  }

  try {
    const optimizedContent = await optimizeResume(content, targetJob)

    let resume
    if (resumeId) {
      resume = await prisma.resume.update({
        where: { id: resumeId, userId: req.userId! },
        data: {
          content,
          targetJob: targetJob || '',
          optimizedContent,
        },
      })
    } else {
      resume = await prisma.resume.create({
        data: {
          userId: req.userId!,
          content,
          targetJob: targetJob || '',
          optimizedContent,
        },
      })
    }

    await prisma.growthRecord.create({
      data: {
        userId: req.userId!,
        type: 'resume',
        content: JSON.stringify({
          type: '简历优化',
          targetJob: targetJob || '不限',
        }),
      },
    })

    res.status(201).json({ resume, optimizedContent })
  } catch (error) {
    console.error('AI简历优化失败:', error)
    
    const optimizedContent = generateFallbackOptimization(content, targetJob)
    
    let resume
    if (resumeId) {
      resume = await prisma.resume.update({
        where: { id: resumeId, userId: req.userId! },
        data: {
          content,
          targetJob: targetJob || '',
          optimizedContent,
        },
      })
    } else {
      resume = await prisma.resume.create({
        data: {
          userId: req.userId!,
          content,
          targetJob: targetJob || '',
          optimizedContent,
        },
      })
    }

    res.status(201).json({ resume, optimizedContent })
  }
})

router.delete('/:id', authMiddleware, async (req: AuthRequest, res: Response) => {
  try {
    const resume = await prisma.resume.findUnique({
      where: { id: req.params.id, userId: req.userId! },
    })
    if (!resume) {
      return res.status(404).json({ error: '简历不存在' })
    }

    await prisma.resume.delete({
      where: { id: req.params.id },
    })

    res.json({ message: '删除成功' })
  } catch {
    res.status(500).json({ error: '删除失败' })
  }
})

function generateFallbackAnalysis(content: string, targetJob?: string): any {
  const hasProject = content.includes('项目') || content.includes('Project')
  const hasSkill = content.includes('技能') || content.includes('Skill')
  const hasExperience = content.includes('实习') || content.includes('经验') || content.includes('Experience')
  const hasEducation = content.includes('教育') || content.includes('学历') || content.includes('Education')
  const hasAchievement = content.includes('获奖') || content.includes('证书') || content.includes('Award')

  let score = 60
  const dimensions: any[] = []

  dimensions.push({
    name: '内容完整性',
    score: hasProject && hasSkill && hasExperience && hasEducation ? 90 : (hasEducation && hasSkill ? 70 : 50),
    comment: hasProject && hasSkill && hasExperience && hasEducation 
      ? '简历内容完整，包含了教育背景、技能、经验和项目' 
      : '建议补充项目经验和实习经历',
  })

  dimensions.push({
    name: '关键词匹配',
    score: targetJob && (content.includes(targetJob) || content.includes('前端') || content.includes('后端')) ? 80 : 60,
    comment: targetJob ? `建议在简历中增加与${targetJob}相关的关键词` : '建议明确目标岗位并针对性优化',
  })

  dimensions.push({
    name: '量化成果',
    score: hasAchievement || content.match(/\d+/) ? 75 : 40,
    comment: hasAchievement ? '有量化成果展示，很好！' : '建议用数据和成果来量化你的经历',
  })

  dimensions.push({
    name: '格式规范',
    score: content.length > 500 ? 80 : 60,
    comment: content.length > 500 ? '内容丰富，格式良好' : '建议适当增加内容，保持一页纸以内',
  })

  dimensions.push({
    name: '语言表达',
    score: 70,
    comment: '整体表达清晰，建议使用更专业的术语',
  })

  score = Math.round(dimensions.reduce((sum, d) => sum + d.score, 0) / dimensions.length)

  const suggestions: string[] = []
  if (!hasProject) suggestions.push('建议添加至少2个项目经验，描述项目背景、职责和成果')
  if (!hasAchievement) suggestions.push('建议增加量化成果，用数字说话')
  if (targetJob) suggestions.push(`建议针对${targetJob}岗位优化简历关键词`)
  suggestions.push('建议使用STAR法则描述项目经验')

  return { score, dimensions, suggestions }
}

function generateFallbackOptimization(content: string, targetJob?: string): string {
  let optimized = content

  if (targetJob) {
    optimized = `【目标岗位：${targetJob}】\n\n` + optimized
  }

  optimized += `\n\n---\n【优化建议】\n1. 使用STAR法则描述项目经验\n2. 突出量化成果和关键数据\n3. 使用专业术语和关键词\n4. 优化语言表达，使其更简洁有力`

  return optimized
}

export default router