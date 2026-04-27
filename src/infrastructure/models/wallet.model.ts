import mongoose from "mongoose";

const WalletSchema = new mongoose.Schema(
  {
    id: { type: String, required: true, unique: true },
    userId: { type: String, required: true, unique: true }, // 🔥 1:1 RELATION
    balance: { type: Number, default: 0 },
    status: { type: String, enum: ["active", "inactive"], default: "active" },
    currency: { type: String, default: "IDR" },
  },
  { timestamps: true },
);

export const WalletModel = mongoose.model("Wallet", WalletSchema);
