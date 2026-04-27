import { Request, Response, NextFunction } from "express";
import { AppError } from "../../shared/errors/app-error";
import { fail, error } from "../../shared/utils/response";

export const errorHandler = (
  err: unknown,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  if (err instanceof AppError) {
    return fail(res, err.message, err.statusCode);
  }

  console.error(err);

  return error(res, "Internal Server Error", 500);
};
