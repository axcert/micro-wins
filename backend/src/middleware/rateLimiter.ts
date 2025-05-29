import { RateLimiterMemory } from 'rate-limiter-flexible';
import { Request, Response, NextFunction } from 'express';

const rateLimiter = new RateLimiterMemory({
  points: 5,
  duration: 60,
});

export default async (key: string, req: Request, res: Response, next: NextFunction) => {
  try {
    await rateLimiter.consume(key);
    next();
  } catch {
    res.status(429).json({ error: 'Too many requests' });
  }
};