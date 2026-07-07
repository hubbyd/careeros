import cors from 'cors'
import express, { Request, Response, NextFunction } from 'express'
import path from 'path'
import dotenv from 'dotenv'
import authRoutes from './routes/auth'
import todoRoutes from './routes/todos'
import appRoutes from './routes/applications'
import studyRoutes from './routes/study'
import questionRoutes from './routes/questions'
import careerRoutes from './routes/career'
import resumeRoutes from './routes/resume'
import interviewRoutes from './routes/interview'
import learningRoutes from './routes/learning'
import growthRoutes from './routes/growth'
import aiRoutes from './routes/ai'

dotenv.config()

const app = express()
const PORT = process.env.PORT || 3001
const isProduction = process.env.NODE_ENV === 'production'

// 中间件
const allowedOrigins = [
  'http://localhost:3000',
  'http://localhost:5173',
  'https://jobsprint.pages.dev',
  'https://*.pages.dev',
]
const corsOrigin = isProduction 
  ? (origin: string | undefined) => origin && allowedOrigins.some(o => origin.startsWith(o.replace('*', '')))
  : 'http://localhost:5173'
app.use(cors({ origin: corsOrigin, credentials: true }))
app.use(express.json())

// 生产环境下提供前端静态文件
if (isProduction) {
  const clientDistPath = path.resolve(__dirname, '../../dist')
  app.use(express.static(clientDistPath))

  app.get('*', (req: Request, res: Response) => {
    if (!req.path.startsWith('/api')) {
      res.sendFile(path.resolve(clientDistPath, 'index.html'))
    }
  })
}

// 健康检查
app.get('/api/health', (_req: Request, res: Response) => {
  res.json({ status: 'ok', message: 'JobSprint API is running!' })
})

// 路由
app.use('/api/auth', authRoutes)
app.use('/api/todos', todoRoutes)
app.use('/api/applications', appRoutes)
app.use('/api/study', studyRoutes)
app.use('/api/questions', questionRoutes)
app.use('/api/career', careerRoutes)
app.use('/api/resume', resumeRoutes)
app.use('/api/interview', interviewRoutes)
app.use('/api/learning', learningRoutes)
app.use('/api/growth', growthRoutes)
app.use('/api/ai', aiRoutes)

// 错误处理
app.use((err: Error, _req: Request, res: Response, _next: NextFunction) => {
  console.error('Error:', err.message)
  res.status(500).json({ error: err.message || '服务器内部错误' })
})

app.listen(PORT, () => {
  console.log(`🚀 JobSprint 后端服务启动成功！`)
  console.log(`📡 API 地址: http://localhost:${PORT}/api`)
  console.log(`🩺 健康检查: http://localhost:${PORT}/api/health`)
})

export default app
