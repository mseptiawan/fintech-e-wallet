import { Request, Response, NextFunction } from "express";
import { GetWalletUseCase } from "../../application/usecases/wallet/get-wallet.usecase";
import { success } from "../../shared/utils/response";
import { AppError } from "../../shared/errors/app-error";

export class WalletController {
  constructor(private getWalletUC: GetWalletUseCase) {}

  getWallet = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userId = req.user?.userId;

      if (!userId) {
        throw new AppError("Unauthorized", 401);
      }

      const wallet = await this.getWalletUC.execute(userId);

      return success(res, wallet, "Get wallet success", 200);
    } catch (err) {
      next(err);
    }
  };
}
