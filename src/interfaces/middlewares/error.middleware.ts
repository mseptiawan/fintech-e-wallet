import { Request, Response, NextFunction } from 'express';
import { AppError } from '../../shared/errors/app-error';
import { fail, error } from '../../shared/utils/response';
import { ZodError } from 'zod'; // ✅ TAMBAHAN

export const errorHandler = (
  err: unknown,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  // ✅ HANDLE CUSTOM ERROR (APP ERROR)
  if (err instanceof AppError) {
    return fail(res, err.message, err.statusCode);
  }

  // ✅ HANDLE VALIDATION ERROR (ZOD)
  if (err instanceof ZodError) {
    return fail(res, err.issues[0].message, 400);
  }

  // ✅ LOG ERROR (DEV ONLY)
  if (process.env.NODE_ENV === 'development') {
    console.error(err);
  }

  // ✅ DEFAULT ERROR
  return error(res, 'Internal Server Error', 500);
};
