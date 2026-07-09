import { Request, Response, NextFunction } from 'express'

interface RateLimitEntry {
  count: number
  timestamp: number
}

const rateLimitStore = new Map<string, RateLimitEntry>()
const WINDOW_MS = 60 * 1000
const MAX_REQUESTS = 100

export function rateLimitMiddleware(req: Request, res: Response, next: NextFunction) {
  const ip = req.ip || req.socket.remoteAddress || 'unknown'
  const key = `rate_limit:${ip}`

  const now = Date.now()
  const existing = rateLimitStore.get(key)

  if (existing) {
    if (now - existing.timestamp > WINDOW_MS) {
      rateLimitStore.set(key, { count: 1, timestamp: now })
    } else {
      if (existing.count >= MAX_REQUESTS) {
        return res.status(429).json({ error: '请求过于频繁，请稍后再试' })
      }
      rateLimitStore.set(key, { count: existing.count + 1, timestamp: existing.timestamp })
    }
  } else {
    rateLimitStore.set(key, { count: 1, timestamp: now })
  }

  next()
}
