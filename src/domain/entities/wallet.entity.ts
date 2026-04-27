export type WalletStatus = "active" | "inactive";

export class Wallet {
  constructor(
    public id: string,
    public userId: string, // 🔥 RELASI 1:1 ke User
    public balance: number = 0,
    public status: WalletStatus = "active",
    public currency: string = "IDR",
    public createdAt: Date = new Date(),
    public updatedAt: Date = new Date(),
  ) {}
}
