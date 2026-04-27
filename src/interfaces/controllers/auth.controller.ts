import { RegisterUseCase } from "../../application/usecases/auth/register.usecase";
import { LoginUseCase } from "../../application/usecases/auth/login.usecase";
import { Request, Response, NextFunction } from "express";
import { success } from "../../shared/utils/response";
export class AuthController {
  constructor(
    private registerUC: RegisterUseCase,
    private loginUC: LoginUseCase,
  ) {}

  register = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const user = await this.registerUC.execute(req.body);

      return success(res, user, "Register success", 201);
    } catch (err) {
      next(err);
    }
  };

  login = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = await this.loginUC.execute(
        req.body.username,
        req.body.password,
      );
      return success(res, result, "Login success", 200);
    } catch (err) {
      next(err);
    }
  };
}
