import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import { success } from '../../shared/utils/response';
import { AppError } from '../../shared/errors/app-error';
import { registerSchema } from '../../shared/validators/auth.validator';
import { loginSchema } from '../../shared/validators/auth.validator';
export class AuthController {
  constructor(
    private registerUC: any,
    private loginUC: any,
  ) {}

  register = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const parsed = registerSchema.parse(req.body); // 🔥 VALIDATION HERE

      const user = await this.registerUC.execute(parsed);

      return success(res, user, 'Register success', 201);
    } catch (err) {
      next(err);
    }
  };

  login = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const parsed = loginSchema.parse(req.body); // 🔥 VALIDATION HERE

      const result = await this.loginUC.execute(
        parsed.username,
        parsed.password,
      );

      return success(res, result, 'Login success', 200);
    } catch (err) {
      next(err);
    }
  };

  refresh = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { refreshToken } = req.body;

      if (!refreshToken) {
        throw new AppError('Refresh token required', 401);
      }

      const decoded = jwt.verify(
        refreshToken,
        process.env.JWT_REFRESH_SECRET!,
      ) as any;

      const newAccessToken = jwt.sign(
        { userId: decoded.userId },
        process.env.JWT_ACCESS_SECRET!,
        { expiresIn: '15m' },
      );

      return success(res, { accessToken: newAccessToken }, 'Token refreshed');
    } catch (err) {
      next(new AppError('Invalid refresh token', 401));
    }
  };
}
