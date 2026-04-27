import { Request, Response } from 'express';
import { GetWalletUseCase } from '../../application/usecases/wallet/get-wallet.usecase';
import { success } from '../../shared/utils/response';
import { AppError } from '../../shared/errors/app-error';
import { asyncHandler } from '../../shared/utils/async-handler'; // ✅ IMPORT

export class WalletController {
  constructor(private getWalletUC: GetWalletUseCase) {}

  getWallet = asyncHandler(async (req: Request, res: Response) => {
    const userId = req.user?.userId;

    if (!userId) {
      throw new AppError('Unauthorized', 401);
    }

    const wallet = await this.getWalletUC.execute(userId);

    return success(res, wallet, 'Get wallet success', 200);
  });
}
