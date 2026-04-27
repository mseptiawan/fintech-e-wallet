import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { AppError } from '../../shared/errors/app-error';

export const authMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      throw new AppError('No token provided', 401);
    }

    const token = authHeader.split(' ')[1]; // Bearer TOKEN

    if (!token) {
      throw new AppError('Invalid token format', 401);
    }

    const decoded = jwt.verify(token, process.env.JWT_ACCESS_SECRET!) as any;

    req.user = decoded; // 🔥 inject user ke request

    next();
  } catch (err) {
    next(new AppError('Unauthorized', 401));
  }
};
