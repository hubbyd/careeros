import { Router, Request, Response } from 'express'
import { PrismaClient } from '@prisma/client'
import { authMiddleware, AuthRequest } from '../middleware/auth'

const router = Router()
const prisma = new PrismaClient()

// 获取所有待办（按日期）
router.get('/', authMiddleware, async (req: AuthRequest, res: Response) => {
  const { date } = req.query
  try {
    const todos = await prisma.todo.findMany({
      where: {
        userId: req.userId!,
        ...(date ? { date: date as string } : {}),
      },
      orderBy: { createdAt: 'desc' },
    })
    res.json(todos)
  } catch {
    res.status(500).json({ error: '获取待办失败' })
  }
})

// 创建待办
router.post('/', authMiddleware, async (req: AuthRequest, res: Response) => {
  const { content, date } = req.body
  if (!content) return res.status(400).json({ error: '内容不能为空' })

  try {
    const todo = await prisma.todo.create({
      data: {
        userId: req.userId!,
        content,
        date: date || new Date().toISOString().split('T')[0],
      },
    })
    res.status(201).json(todo)
  } catch {
    res.status(500).json({ error: '创建待办失败' })
  }
})

// 切换完成状态
router.patch('/:id/toggle', authMiddleware, async (req: AuthRequest, res: Response) => {
  try {
    const todo = await prisma.todo.findFirst({
      where: { id: req.params.id, userId: req.userId! },
    })
    if (!todo) return res.status(404).json({ error: '待办不存在' })

    const updated = await prisma.todo.update({
      where: { id: req.params.id },
      data: { done: !todo.done },
    })
    res.json(updated)
  } catch {
    res.status(500).json({ error: '更新失败' })
  }
})

// 删除待办
router.delete('/:id', authMiddleware, async (req: AuthRequest, res: Response) => {
  try {
    await prisma.todo.deleteMany({
      where: { id: req.params.id, userId: req.userId! },
    })
    res.json({ success: true })
  } catch {
    res.status(500).json({ error: '删除失败' })
  }
})

export default router
