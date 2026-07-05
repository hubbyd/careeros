import { Router, Request, Response } from 'express'
import { PrismaClient } from '@prisma/client'
import { authMiddleware, AuthRequest } from '../middleware/auth'

const router = Router()
const prisma = new PrismaClient()

// 获取学习记录（按日期或本月）
router.get('/', authMiddleware, async (req: AuthRequest, res: Response) => {
  const { date, month } = req.query
  try {
    const where: any = { userId: req.userId! }
    if (date) {
      where.date = date
    } else if (month) {
      // 获取某月所有记录
      const startDate = `${month}-01`
      const endDate = `${month}-31`
      where.date = { gte: startDate, lte: endDate }
    }

    const logs = await prisma.studyLog.findMany({
      where,
      orderBy: { date: 'desc' },
    })
    res.json(logs)
  } catch {
    res.status(500).json({ error: '获取学习记录失败' })
  }
})

// 打卡 / 更新今日学习
router.post('/checkin', authMiddleware, async (req: AuthRequest, res: Response) => {
  const { date, subject, minutes, pomodoroCount } = req.body
  const today = date || new Date().toISOString().split('T')[0]

  try {
    const existing = await prisma.studyLog.findUnique({
      where: { userId_date: { userId: req.userId!, date: today } },
    })

    if (existing) {
      const updated = await prisma.studyLog.update({
        where: { id: existing.id },
        data: {
          checkedIn: true,
          subject: subject || existing.subject,
          minutes: (existing.minutes || 0) + (minutes || 0),
          pomodoroCount: (existing.pomodoroCount || 0) + (pomodoroCount || 0),
        },
      })
      res.json(updated)
    } else {
      const log = await prisma.studyLog.create({
        data: {
          userId: req.userId!,
          date: today,
          subject: subject || '未指定',
          minutes: minutes || 0,
          pomodoroCount: pomodoroCount || 0,
          checkedIn: true,
        },
      })
      res.status(201).json(log)
    }
  } catch {
    res.status(500).json({ error: '打卡失败' })
  }
})

// 获取打卡 streak
router.get('/streak', authMiddleware, async (req: AuthRequest, res: Response) => {
  try {
    const logs = await prisma.studyLog.findMany({
      where: { userId: req.userId!, checkedIn: true },
      orderBy: { date: 'desc' },
      select: { date: true },
    })

    // 计算连续打卡天数
    let streak = 0
    const today = new Date().toISOString().split('T')[0]
    let checkDate = new Date(today)

    for (const log of logs) {
      const logDate = new Date(log.date)
      const diffDays = Math.floor((checkDate.getTime() - logDate.getTime()) / (1000 * 60 * 60 * 24))

      if (diffDays <= 1) {
        streak++
        checkDate = logDate
      } else {
        break
      }
    }

    // 总学习时长
    const totalMinutes = logs.reduce((sum, log) => {
      // Need to fetch all logs with minutes
      return sum
    }, 0)

    const allLogs = await prisma.studyLog.findMany({
      where: { userId: req.userId! },
      select: { minutes: true, pomodoroCount: true },
    })

    const stats = {
      streak,
      totalMinutes: allLogs.reduce((s, l) => s + l.minutes, 0),
      totalPomodoros: allLogs.reduce((s, l) => s + l.pomodoroCount, 0),
      totalDays: logs.length,
    }

    res.json(stats)
  } catch {
    res.status(500).json({ error: '获取打卡数据失败' })
  }
})

export default router
