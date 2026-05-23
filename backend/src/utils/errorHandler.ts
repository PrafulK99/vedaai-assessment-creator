import type { Request, Response, NextFunction } from "express";

export interface AppError extends Error {
  status?: number;
  details?: unknown;
}

export const errorHandler = (
  err: AppError,
  _req: Request,
  res: Response,
  _next: NextFunction
) => {
  const status = err.status || 500;
  const message = err.message || "Internal Server Error";

  console.error(`[Error] ${status}: ${message}`, err.details);

  res.status(status).json({
    success: false,
    error: {
      status,
      message,
      details: process.env.NODE_ENV === "development" ? err.details : undefined,
    },
  });
};

export const asyncHandler = (
  fn: (req: Request, res: Response, next: NextFunction) => Promise<void>
) => {
  return (req: Request, res: Response, next: NextFunction) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
};

export const validationErrorHandler = (errors: Record<string, string>) => {
  const error: AppError = new Error("Validation failed");
  error.status = 400;
  error.details = errors;
  return error;
};
