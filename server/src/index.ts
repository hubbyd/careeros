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

dotenv.config()

const app = express()
const PORT = process.env.PORT || 3001
const isProduction = process.env.NODE_ENV === 'production'

// 中间件
const corsOrigin = isProduction ? true : 'http://localhost:5173'
app.use(cors({ origin: corsOrigin }))
app.use(express.json())

// 生产环境下提供前端静态文件
if (isProduction) {
  // __dirname 在生产环境是 server/dist，需要回到项目根目录找 dist/
  const clientDistPath = path.resolve(__dirname, '../../dist')
  app.use(express.static(clientDistPath))

  // SPA fallback：所有非 API 请求都返回 index.html
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
