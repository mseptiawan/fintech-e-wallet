import { Response } from "express";

export const success = (
  res: Response,
  data: any = null,
  message: string = "success",
  statusCode: number = 200,
) => {
  return res.status(statusCode).json({
    status: "success",
    message,
    data,
  });
};

export const fail = (
  res: Response,
  message: string = "fail",
  statusCode: number = 400,
) => {
  return res.status(statusCode).json({
    status: "fail",
    message,
  });
};

export const error = (
  res: Response,
  message: string = "error",
  statusCode: number = 500,
) => {
  return res.status(statusCode).json({
    status: "error",
    message,
  });
};
