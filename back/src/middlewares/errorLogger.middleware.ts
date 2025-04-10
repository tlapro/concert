// error-logger.middleware.ts
import { Request, Response, NextFunction } from 'express';

export function errorLogger(
  err: any,
  req: Request,
  res: Response,
  next: NextFunction,
) {
  console.error(`[ErrorLogger] » ${req.method} ${req.url}`);
  console.error(`[ErrorLogger] » ${err.message}`);
  console.error(err.stack);

  next(err);
}
