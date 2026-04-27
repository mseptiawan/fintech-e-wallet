import { Wallet } from '../entities/wallet.entity'

export interface WalletRepository {
  create(wallet: Wallet): Promise<Wallet>
  findByUserId(userId: string): Promise<Wallet | null>
  updateBalance(walletId: string, amount: number): Promise<void>
}