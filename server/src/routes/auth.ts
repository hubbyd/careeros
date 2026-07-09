import { Router, Request, Response } from 'express'
import prisma from '../utils/prisma'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { z } from 'zod'
import crypto from 'crypto'

const router = Router()
const JWT_SECRET = process.env.JWT_SECRET || 'fallback-secret'

// 注册验证 Schema
const registerSchema = z.object({
  email: z.string().email('邮箱格式不正确'),
  password: z.string().min(6, '密码至少 6 位'),
  name: z.string().min(1, '姓名不能为空'),
})

// 登录验证 Schema
const loginSchema = z.object({
  email: z.string().email('邮箱格式不正确'),
  password: z.string().min(1, '密码不能为空'),
})

// 注册
router.post('/register', async (req: Request, res: Response) => {
  console.log('[注册] 收到注册请求:', JSON.stringify(req.body))
  try {
    const { email, password, name } = registerSchema.parse(req.body)
    console.log('[注册] 解析后的字段 - email:', email, ', name:', name)

    const existing = await prisma.user.findUnique({ where: { email } })
    console.log('[注册] 查询用户是否存在 - email:', email, ', 结果:', existing ? '已存在' : '不存在')
    if (existing) {
      return res.status(400).json({ success: false, error: '该邮箱已被注册' })
    }

    const hashedPassword = await bcrypt.hash(password, 10)
    console.log('[注册] 密码加密完成')

    const user = await prisma.user.create({
      data: { email, password: hashedPassword, name },
      select: { id: true, email: true, name: true, onboarded: true, createdAt: true },
    })
    console.log('[注册] 用户创建成功 - id:', user.id)

    const token = jwt.sign({ userId: user.id }, JWT_SECRET, { expiresIn: '7d' })
    console.log('[注册] JWT生成成功')

    res.status(201).json({ success: true, user, token })
  } catch (error: any) {
    console.error('[注册] 注册失败:', error)
    if (error.name === 'ZodError') {
      return res.status(400).json({ success: false, error: error.errors[0].message })
    }
    res.status(500).json({ success: false, error: '注册失败' })
  }
})

// 登录
router.post('/login', async (req: Request, res: Response) => {
  console.log('[登录] 收到登录请求:', JSON.stringify(req.body))
  try {
    const { email, password } = loginSchema.parse(req.body)
    console.log('[登录] 解析后的字段 - email:', email)

    const user = await prisma.user.findUnique({ 
      where: { email },
      select: { id: true, email: true, name: true, onboarded: true, password: true }
    })
    console.log('[登录] 查询用户 - email:', email, ', 找到用户:', !!user)
    if (!user) {
      return res.status(400).json({ success: false, error: '邮箱或密码错误' })
    }

    const valid = await bcrypt.compare(password, user.password)
    console.log('[登录] 密码验证结果:', valid)
    if (!valid) {
      return res.status(400).json({ success: false, error: '邮箱或密码错误' })
    }

    const token = jwt.sign({ userId: user.id }, JWT_SECRET, { expiresIn: '7d' })
    console.log('[登录] JWT生成成功 - userId:', user.id)

    res.json({
      success: true,
      user: { id: user.id, email: user.email, name: user.name, onboarded: user.onboarded },
      token,
    })
  } catch (error: any) {
    console.error('[登录] 登录失败:', error)
    if (error.name === 'ZodError') {
      return res.status(400).json({ success: false, error: error.errors[0].message })
    }
    res.status(500).json({ success: false, error: '登录失败' })
  }
})

// 获取当前用户信息
router.get('/me', async (req: Request, res: Response) => {
  const authHeader = req.headers.authorization
  if (!authHeader) return res.status(401).json({ error: '未认证' })

  try {
    const token = authHeader.split(' ')[1]
    const decoded = jwt.verify(token, JWT_SECRET) as { userId: string }
    const user = await prisma.user.findUnique({
      where: { id: decoded.userId },
      select: { id: true, email: true, name: true, avatar: true, title: true, bio: true, location: true, education: true, experience: true, skills: true, onboarded: true, createdAt: true },
    })
    if (!user) return res.status(404).json({ error: '用户不存在' })
    res.json(user)
  } catch {
    res.status(401).json({ error: '认证失败' })
  }
})

// 更新用户资料
router.put('/me', async (req: Request, res: Response) => {
  const authHeader = req.headers.authorization
  if (!authHeader) return res.status(401).json({ error: '未认证' })

  try {
    const token = authHeader.split(' ')[1]
    const decoded = jwt.verify(token, JWT_SECRET) as { userId: string }
    
    const { name, avatar, title, bio, location, education, experience, skills, onboarded } = req.body
    
    const updatedUser = await prisma.user.update({
      where: { id: decoded.userId },
      data: {
        ...(name && { name }),
        ...(avatar && { avatar }),
        ...(title && { title }),
        ...(bio && { bio }),
        ...(location && { location }),
        ...(education && { education }),
        ...(experience && { experience }),
        ...(skills && { skills }),
        ...(onboarded !== undefined && { onboarded }),
      },
      select: { id: true, email: true, name: true, avatar: true, title: true, bio: true, location: true, education: true, experience: true, skills: true, onboarded: true, createdAt: true },
    })
    
    res.json(updatedUser)
  } catch {
    res.status(500).json({ error: '更新失败' })
  }
})

// 上传头像
router.post('/me/avatar', async (req: Request, res: Response) => {
  const authHeader = req.headers.authorization
  if (!authHeader) return res.status(401).json({ error: '未认证' })

  try {
    const token = authHeader.split(' ')[1]
    const decoded = jwt.verify(token, JWT_SECRET) as { userId: string }
    
    const { image } = req.body
    
    if (!image) {
      return res.status(400).json({ error: '请选择图片' })
    }
    
    const updatedUser = await prisma.user.update({
      where: { id: decoded.userId },
      data: { avatar: image },
      select: { id: true, avatar: true },
    })
    
    res.json(updatedUser)
  } catch (error: any) {
    console.error('上传失败:', error)
    res.status(500).json({ error: '上传失败' })
  }
})

const forgotPasswordSchema = z.object({
  email: z.string().email('邮箱格式不正确'),
})

router.post('/forgot-password', async (req: Request, res: Response) => {
  try {
    const { email } = forgotPasswordSchema.parse(req.body)

    const user = await prisma.user.findUnique({ where: { email } })
    if (!user) {
      return res.status(400).json({ error: '该邮箱未注册' })
    }

    const resetToken = crypto.randomBytes(32).toString('hex')
    const resetTokenExpires = new Date(Date.now() + 3600000)

    await prisma.user.update({
      where: { id: user.id },
      data: { resetToken, resetTokenExpires },
    })

    const resetUrl = `${process.env.FRONTEND_URL || 'http://localhost:5173'}/reset-password/${resetToken}`

    console.log(`重置密码链接: ${resetUrl}`)

    res.json({ message: '重置密码链接已发送到您的邮箱', resetUrl })
  } catch (error: any) {
    if (error.name === 'ZodError') {
      return res.status(400).json({ error: error.errors[0].message })
    }
    res.status(500).json({ error: '发送失败' })
  }
})

const resetPasswordSchema = z.object({
  token: z.string().min(1, '令牌不能为空'),
  password: z.string().min(6, '密码至少 6 位'),
})

// 重置所有用户数据（需要密钥验证）
router.post('/reset-all-users', async (req: Request, res: Response) => {
  const { secret } = req.body
  
  if (secret !== process.env.RESET_SECRET) {
    return res.status(401).json({ error: '未授权' })
  }

  try {
    console.log('[重置] 开始清空所有用户数据...')
    
    await prisma.growthRecord.deleteMany({})
    await prisma.learningPlan.deleteMany({})
    await prisma.interviewQuestion.deleteMany({})
    await prisma.interviewSession.deleteMany({})
    await prisma.resume.deleteMany({})
    await prisma.careerAssessment.deleteMany({})
    await prisma.question.deleteMany({})
    await prisma.studyLog.deleteMany({})
    await prisma.application.deleteMany({})
    await prisma.todo.deleteMany({})
    await prisma.user.deleteMany({})
    
    console.log('[重置] 所有用户数据已清空')
    res.json({ success: true, message: '所有用户数据已清空' })
  } catch (error) {
    console.error('[重置] 重置失败:', error)
    res.status(500).json({ error: '重置失败' })
  }
})

router.post('/reset-password', async (req: Request, res: Response) => {
  try {
    const { token, password } = resetPasswordSchema.parse(req.body)

    const user = await prisma.user.findFirst({
      where: {
        resetToken: token,
        resetTokenExpires: { gt: new Date() },
      },
    })

    if (!user) {
      return res.status(400).json({ error: '无效或过期的重置链接' })
    }

    const hashedPassword = await bcrypt.hash(password, 10)

    await prisma.user.update({
      where: { id: user.id },
      data: {
        password: hashedPassword,
        resetToken: null,
        resetTokenExpires: null,
      },
    })

    res.json({ message: '密码重置成功，请登录' })
  } catch (error: any) {
    if (error.name === 'ZodError') {
      return res.status(400).json({ error: error.errors[0].message })
    }
    res.status(500).json({ error: '重置失败' })
  }
})

export default router
