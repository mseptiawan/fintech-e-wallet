import { Response } from "express";

type ApiResponse<T> = {
  status: "success" | "fail" | "error";
  message: string;
  data?: T | null;
};

export function success<T>(
  res: Response,
  data: T | null = null,
  message: string = "success",
  statusCode: number = 200,
): Response {
  const payload: ApiResponse<T> = {
    status: "success",
    message,
    data,
  };

  return res.status(statusCode).json(payload);
}

export function fail(
  res: Response,
  message: string = "fail",
  statusCode: number = 400,
): Response {
  return res.status(statusCode).json({
    status: "fail",
    message,
  });
}

export function sendError(
  res: Response,
  message: string = "error",
  statusCode: number = 500,
): Response {
  return res.status(statusCode).json({
    status: "error",
    message,
  });
}
