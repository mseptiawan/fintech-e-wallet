import { WalletRepository } from '../../../domain/repositories/wallet.repository';
import { AppError } from '../../../shared/errors/app-error';
export class GetWalletUseCase {
  constructor(private walletRepo: WalletRepository) {}

  async execute(userId: string) {
    const wallet = await this.walletRepo.findByUserId(userId);
    if (!wallet) throw new AppError('Wallet not found', 404);

    return wallet;
  }
}
