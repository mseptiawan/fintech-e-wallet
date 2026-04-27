import jwt from 'jsonwebtoken';
import { Request, Response } from 'express';
import { success } from '../../shared/utils/response';
import { AppError } from '../../shared/errors/app-error';
import {
  registerSchema,
  loginSchema,
} from '../../shared/validators/auth.validator';
import { RegisterUseCase } from '../../application/usecases/auth/register.usecase';
import { LoginUseCase } from '../../application/usecases/auth/login.usecase';
import { asyncHandler } from '../../shared/utils/async-handler'; // ✅ IMPORT

export class AuthController {
  constructor(
    private registerUC: RegisterUseCase,
    private loginUC: LoginUseCase,
  ) {}

  register = asyncHandler(async (req: Request, res: Response) => {
    const parsed = registerSchema.parse(req.body);

    const user = await this.registerUC.execute(parsed);

    const { password, ...safeUser } = user;

    return success(res, safeUser, 'Register success', 201);
  });

  login = asyncHandler(async (req: Request, res: Response) => {
    const parsed = loginSchema.parse(req.body);

    const result = await this.loginUC.execute(parsed.username, parsed.password);

    return success(res, result, 'Login success', 200);
  });

  refresh = asyncHandler(async (req: Request, res: Response) => {
    const { refreshToken } = req.body;

    if (!refreshToken) {
      throw new AppError('Refresh token required', 401);
    }

    const decoded = jwt.verify(
      refreshToken,
      process.env.JWT_REFRESH_SECRET!,
    ) as any;

    const newAccessToken = jwt.sign(
      { userId: decoded.userId, role: decoded.role },
      process.env.JWT_ACCESS_SECRET!,
      { expiresIn: '15m' },
    );

    return success(res, { accessToken: newAccessToken }, 'Token refreshed');
  });
}
