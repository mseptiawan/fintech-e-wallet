import { WalletRepository } from "../../../domain/repositories/wallet.repository"

export class GetWalletUseCase {
  constructor(private walletRepo: WalletRepository) {}

  async execute(userId: string) {
    const wallet = await this.walletRepo.findByUserId(userId)
    if (!wallet) throw new Error('Wallet not found')

    return wallet
  }
}