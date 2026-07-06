import { Router, Request, Response } from 'express'
import prisma from '../utils/prisma'
import { authMiddleware, AuthRequest } from '../middleware/auth'
import { generateLearningPlan } from '../services/aiService'

const router = Router()

router.get('/plans', authMiddleware, async (req: AuthRequest, res: Response) => {
  try {
    const plans = await prisma.learningPlan.findMany({
      where: { userId: req.userId! },
      orderBy: { createdAt: 'desc' },
      take: 10,
    })
    res.json(plans)
  } catch {
    res.status(500).json({ error: '获取学习计划失败' })
  }
})

router.get('/plans/:id', authMiddleware, async (req: AuthRequest, res: Response) => {
  try {
    const plan = await prisma.learningPlan.findUnique({
      where: { id: req.params.id, userId: req.userId! },
    })
    if (!plan) {
      return res.status(404).json({ error: '学习计划不存在' })
    }
    res.json(plan)
  } catch {
    res.status(500).json({ error: '获取学习计划失败' })
  }
})

router.post('/plans', authMiddleware, async (req: AuthRequest, res: Response) => {
  const { targetJob, timeline, currentSkills } = req.body

  if (!targetJob) {
    return res.status(400).json({ error: '目标岗位必填' })
  }

  try {
    const result = await generateLearningPlan(targetJob, timeline || '3个月', currentSkills || [])

    const plan = await prisma.learningPlan.create({
      data: {
        userId: req.userId!,
        targetJob,
        timeline: timeline || '3个月',
        phases: JSON.stringify(result.phases),
        tasks: JSON.stringify([]),
        progress: 0,
      },
    })

    await prisma.growthRecord.create({
      data: {
        userId: req.userId!,
        type: 'learning',
        content: JSON.stringify({
          type: '学习路线生成',
          targetJob,
          timeline: timeline || '3个月',
          phases: result.phases.length,
        }),
      },
    })

    res.status(201).json({ plan, result })
  } catch (error) {
    console.error('AI学习计划生成失败:', error)

    const fallbackResult = generateFallbackPlan(targetJob, timeline || '3个月', currentSkills || [])

    const plan = await prisma.learningPlan.create({
      data: {
        userId: req.userId!,
        targetJob,
        timeline: timeline || '3个月',
        phases: JSON.stringify(fallbackResult.phases),
        tasks: JSON.stringify([]),
        progress: 0,
      },
    })

    res.status(201).json({ plan, result: fallbackResult })
  }
})

router.put('/plans/:id', authMiddleware, async (req: AuthRequest, res: Response) => {
  const { progress, tasks } = req.body

  try {
    const plan = await prisma.learningPlan.findUnique({
      where: { id: req.params.id, userId: req.userId! },
    })
    if (!plan) {
      return res.status(404).json({ error: '学习计划不存在' })
    }

    const updated = await prisma.learningPlan.update({
      where: { id: req.params.id },
      data: {
        progress: progress !== undefined ? progress : plan.progress,
        tasks: tasks !== undefined ? JSON.stringify(tasks) : plan.tasks,
      },
    })

    res.json(updated)
  } catch {
    res.status(500).json({ error: '更新学习计划失败' })
  }
})

router.delete('/plans/:id', authMiddleware, async (req: AuthRequest, res: Response) => {
  try {
    const plan = await prisma.learningPlan.findUnique({
      where: { id: req.params.id, userId: req.userId! },
    })
    if (!plan) {
      return res.status(404).json({ error: '学习计划不存在' })
    }

    await prisma.learningPlan.delete({
      where: { id: req.params.id },
    })

    res.json({ message: '删除成功' })
  } catch {
    res.status(500).json({ error: '删除失败' })
  }
})

function generateFallbackPlan(targetJob: string, timeline: string, currentSkills: string[]): any {
  const phases: any[] = []
  const skillNames = currentSkills.join(', ')

  phases.push({
    phase: '基础阶段',
    duration: timeline === '1个月' ? '第一周' : '第1-2周',
    objectives: ['掌握核心基础概念', '熟悉开发环境'],
    tasks: ['学习基础语法和概念', '搭建开发环境', '完成简单demo项目'],
  })

  phases.push({
    phase: '进阶阶段',
    duration: timeline === '1个月' ? '第二-三周' : '第3-6周',
    objectives: ['深入理解核心技术', '完成实战项目'],
    tasks: ['学习进阶技术', '完成2-3个实战项目', '学习最佳实践'],
  })

  phases.push({
    phase: '冲刺阶段',
    duration: timeline === '1个月' ? '第四周' : '第7-12周',
    objectives: ['查漏补缺', '准备面试'],
    tasks: ['复习和巩固', '刷题准备面试', '模拟面试练习', '优化简历'],
  })

  let resources = [
    '官方文档',
    '技术博客和教程',
    '开源项目',
    '在线课程平台',
  ]

  if (targetJob.includes('前端')) {
    resources.push('MDN Web Docs', 'React/Vue 官方文档', 'LeetCode')
  } else if (targetJob.includes('后端')) {
    resources.push('数据库设计书籍', '系统设计教程', '设计模式')
  } else if (targetJob.includes('算法')) {
    resources.push('算法导论', 'LeetCode', '数据结构课程')
  }

  return {
    phases,
    milestones: [
      '完成基础学习',
      '独立完成项目',
      '通过模拟面试',
    ],
    resources,
  }
}

export default router