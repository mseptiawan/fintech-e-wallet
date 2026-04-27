import { WalletRepository } from "../../domain/repositories/wallet.repository";
import { Wallet } from "../../domain/entities/wallet.entity";
import { WalletModel } from "../models/wallet.model";

export class MongoWalletRepository implements WalletRepository {
  async create(wallet: Wallet): Promise<Wallet> {
    const created = await WalletModel.create(wallet);

    return new Wallet(
      created.id,
      created.userId,
      created.balance,
      created.status,
      created.currency,
      created.createdAt,
      created.updatedAt,
    );
  }

  async findByUserId(userId: string): Promise<Wallet | null> {
    const data = await WalletModel.findOne({ userId });

    if (!data) return null;

    return new Wallet(
      data.id,
      data.userId,
      data.balance,
      data.status,
      data.currency,
      data.createdAt,
      data.updatedAt,
    );
  }

  async updateBalance(walletId: string, amount: number): Promise<void> {
    await WalletModel.updateOne(
      { id: walletId },
      { $inc: { balance: amount } },
    );
  }
}
