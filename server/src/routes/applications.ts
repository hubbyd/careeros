import { Router, Request, Response } from 'express'
import { PrismaClient } from '@prisma/client'
import { authMiddleware, AuthRequest } from '../middleware/auth'

const router = Router()
const prisma = new PrismaClient()

// 获取所有求职申请
router.get('/', authMiddleware, async (req: AuthRequest, res: Response) => {
  const { status } = req.query
  try {
    const apps = await prisma.application.findMany({
      where: {
        userId: req.userId!,
        ...(status && status !== 'all' ? { status: status as string } : {}),
      },
      orderBy: { updatedAt: 'desc' },
    })
    res.json(apps)
  } catch {
    res.status(500).json({ error: '获取申请列表失败' })
  }
})

// 创建申请
router.post('/', authMiddleware, async (req: AuthRequest, res: Response) => {
  const { company, position, salary, status, priority, deadline } = req.body
  if (!company || !position) return res.status(400).json({ error: '公司和岗位必填' })

  try {
    const app = await prisma.application.create({
      data: {
        userId: req.userId!,
        company,
        position,
        salary,
        status: status || 'pending',
        priority: priority || 'medium',
        deadline,
      },
    })
    res.status(201).json(app)
  } catch {
    res.status(500).json({ error: '创建申请失败' })
  }
})

// 更新申请状态
router.patch('/:id/status', authMiddleware, async (req: AuthRequest, res: Response) => {
  const { status } = req.body
  try {
    const app = await prisma.application.updateMany({
      where: { id: req.params.id, userId: req.userId! },
      data: { status, updatedAt: new Date() },
    })
    if (app.count === 0) return res.status(404).json({ error: '申请不存在' })
    res.json({ success: true })
  } catch {
    res.status(500).json({ error: '更新失败' })
  }
})

// 更新申请
router.put('/:id', authMiddleware, async (req: AuthRequest, res: Response) => {
  const { company, position, salary, status, priority, deadline, progress, notes } = req.body
  try {
    const app = await prisma.application.updateMany({
      where: { id: req.params.id, userId: req.userId! },
      data: { company, position, salary, status, priority, deadline, progress, notes, updatedAt: new Date() },
    })
    if (app.count === 0) return res.status(404).json({ error: '申请不存在' })
    res.json({ success: true })
  } catch {
    res.status(500).json({ error: '更新失败' })
  }
})

// 删除申请
router.delete('/:id', authMiddleware, async (req: AuthRequest, res: Response) => {
  try {
    await prisma.application.deleteMany({
      where: { id: req.params.id, userId: req.userId! },
    })
    res.json({ success: true })
  } catch {
    res.status(500).json({ error: '删除失败' })
  }
})

export default router
