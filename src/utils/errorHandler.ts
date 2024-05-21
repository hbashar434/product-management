import { Request, Response, NextFunction } from 'express';

interface AppError extends Error {
  statusCode?: number;
}

// The errorHandler function
const errorHandler = (
  err: AppError,
  req: Request,
  res: Response,
  next: NextFunction,
): void => {
  const statusCode = err.statusCode || 500;
  const message = err.message || 'Internal Server Error';

  res.status(statusCode).json({
    statusCode,
    data: null,
    message,
    success: false,
  });
  next();
};

export { errorHandler };
