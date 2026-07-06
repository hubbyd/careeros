import { Injectable, NestMiddleware, Logger } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

const SENSITIVE_FIELDS = ['password', 'oldPassword', 'newPassword', 'token', 'refreshToken'];
const SENSITIVE_PATHS = ['/auth/login', '/auth/register', '/auth/forgot-password', '/auth/reset-password', '/auth/me/change-password'];

function sanitizeBody(body: Record<string, unknown>): Record<string, unknown> {
  const result = { ...body };
  SENSITIVE_FIELDS.forEach((field) => {
    if (result[field]) {
      result[field] = '[REDACTED]';
    }
  });
  return result;
}

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  private logger = new Logger('HTTP');

  use(req: Request, res: Response, next: NextFunction) {
    const { method, originalUrl, ip, body } = req;
    const userAgent = req.get('user-agent') || '';

    res.on('finish', () => {
      const { statusCode } = res;
      const contentLength = res.get('content-length');

      this.logger.log(
        `${method} ${originalUrl} ${statusCode} ${contentLength || 0} - ${userAgent} ${ip}`,
      );

      if (statusCode >= 500) {
        const shouldLogBody = !SENSITIVE_PATHS.some((path) => originalUrl.startsWith(path));
        if (shouldLogBody && body) {
          this.logger.error(
            `Error ${method} ${originalUrl} ${statusCode}`,
            JSON.stringify(sanitizeBody(body as Record<string, unknown>)),
          );
        } else {
          this.logger.error(`Error ${method} ${originalUrl} ${statusCode}`);
        }
      }
    });

    next();
  }
}