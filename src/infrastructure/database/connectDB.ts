import mongoose from "mongoose";

async function connectDB(): Promise<void> {
  try {
    const mongoUri = process.env.MONGO_URI;

    if (!mongoUri) {
      throw new Error("MONGO_URI is not defined in environment variables");
    }

    await mongoose.connect(mongoUri);

    console.log("✅ MongoDB connected successfully");
  } catch (err: any) {
    console.error("❌ DB error:", err.message);
    process.exit(1); // optional tapi bagus untuk production
  }
}

export default connectDB;
