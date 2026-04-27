import { UserRepository } from "../../../domain/repositories/user.repository";
import { WalletRepository } from "../../../domain/repositories/wallet.repository";
import { User } from "../../../domain/entities/user.entity";
import { Wallet } from "../../../domain/entities/wallet.entity";
import bcrypt from "bcrypt";
import { v4 as uuid } from "uuid";
import { AppError } from "../../../shared/errors/app-error";

export class RegisterUseCase {
  constructor(
    private userRepo: UserRepository,
    private walletRepo: WalletRepository,
  ) {}

  async execute(data: { username: string; email: string; password: string }) {
    const existing = await this.userRepo.findByUsername(data.username);

    if (existing) {
      throw new AppError("Username already exists", 409);
    }

    const hashed = await bcrypt.hash(data.password, 10);

    const user = new User(uuid(), data.username, data.email, hashed);

    const createdUser = await this.userRepo.create(user);

    // auto create wallet
    const wallet = new Wallet(uuid(), createdUser.id);
    await this.walletRepo.create(wallet);

    return createdUser;
  }
}
