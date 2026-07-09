import { Request, Response, NextFunction } from 'express'

export function loggerMiddleware(req: Request, res: Response, next: NextFunction) {
  const start = Date.now()
  const { method, url, ip } = req
  const userAgent = req.get('User-Agent') || ''

  res.on('finish', () => {
    const duration = Date.now() - start
    const statusCode = res.statusCode
    console.log(
      `[${new Date().toISOString()}] ${method} ${url} ${statusCode} ${duration}ms - ${ip} - ${userAgent}`
    )
  })

  next()
}
