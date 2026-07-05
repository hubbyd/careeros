import { Router, Request, Response } from 'express'
import { PrismaClient } from '@prisma/client'
import { authMiddleware, AuthRequest } from '../middleware/auth'

const router = Router()
const prisma = new PrismaClient()

// 获取面试题库
router.get('/', authMiddleware, async (req: AuthRequest, res: Response) => {
  const { category } = req.query
  try {
    const questions = await prisma.question.findMany({
      where: {
        userId: req.userId!,
        ...(category && category !== 'all' ? { category: category as string } : {}),
      },
      orderBy: { createdAt: 'desc' },
    })
    res.json(questions)
  } catch {
    res.status(500).json({ error: '获取题库失败' })
  }
})

// 添加题目
router.post('/', authMiddleware, async (req: AuthRequest, res: Response) => {
  const { category, question, answer, difficulty } = req.body
  if (!category || !question) return res.status(400).json({ error: '分类和题目必填' })

  try {
    const q = await prisma.question.create({
      data: {
        userId: req.userId!,
        category,
        question,
        answer,
        difficulty: difficulty || 'medium',
      },
    })
    res.status(201).json(q)
  } catch {
    res.status(500).json({ error: '添加题目失败' })
  }
})

// 切换掌握状态
router.patch('/:id/master', authMiddleware, async (req: AuthRequest, res: Response) => {
  try {
    const q = await prisma.question.findFirst({
      where: { id: req.params.id, userId: req.userId! },
    })
    if (!q) return res.status(404).json({ error: '题目不存在' })

    const updated = await prisma.question.update({
      where: { id: req.params.id },
      data: { mastered: !q.mastered },
    })
    res.json(updated)
  } catch {
    res.status(500).json({ error: '更新失败' })
  }
})

// 删除题目
router.delete('/:id', authMiddleware, async (req: AuthRequest, res: Response) => {
  try {
    await prisma.question.deleteMany({
      where: { id: req.params.id, userId: req.userId! },
    })
    res.json({ success: true })
  } catch {
    res.status(500).json({ error: '删除失败' })
  }
})

// 获取掌握率统计
router.get('/stats', authMiddleware, async (req: AuthRequest, res: Response) => {
  try {
    const questions = await prisma.question.findMany({
      where: { userId: req.userId! },
    })

    const total = questions.length
    const mastered = questions.filter(q => q.mastered).length
    const rate = total > 0 ? Math.round((mastered / total) * 100) : 0

    const byCategory = questions.reduce((acc: any, q) => {
      if (!acc[q.category]) acc[q.category] = { total: 0, mastered: 0 }
      acc[q.category].total++
      if (q.mastered) acc[q.category].mastered++
      return acc
    }, {})

    res.json({ total, mastered, rate, byCategory })
  } catch {
    res.status(500).json({ error: '获取统计失败' })
  }
})

export default router
