import { Router, Request, Response } from 'express'
import prisma from '../utils/prisma'
import { authMiddleware, AuthRequest } from '../middleware/auth'

const router = Router()

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

    const today = new Date().toISOString().split('T')[0]
    let currentStreak = 0
    let longestStreak = 0
    let lastCheckIn = ''
    const calendar: Record<string, boolean> = {}

    if (logs.length > 0) {
      lastCheckIn = logs[0].date

      let tempStreak = 0
      let checkDate = new Date(today)

      for (const log of logs) {
        calendar[log.date] = true
        const logDate = new Date(log.date)
        const diffDays = Math.floor((checkDate.getTime() - logDate.getTime()) / (1000 * 60 * 60 * 24))

        if (diffDays <= 1) {
          tempStreak++
          checkDate = logDate
        } else {
          longestStreak = Math.max(longestStreak, tempStreak)
          tempStreak = 1
          checkDate = logDate
        }
      }
      longestStreak = Math.max(longestStreak, tempStreak)
      currentStreak = tempStreak

      const todayLog = logs.find(l => l.date === today)
      if (!todayLog) {
        const yesterday = new Date(Date.now() - 86400000).toISOString().split('T')[0]
        if (!logs.find(l => l.date === yesterday)) {
          currentStreak = 0
        }
      }
    }

    res.json({
      current: currentStreak,
      longest: longestStreak,
      lastCheckIn,
      calendar,
    })
  } catch {
    res.status(500).json({ error: '获取打卡数据失败' })
  }
})

export default router
