import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema(
  {
    id: { type: String, required: true, unique: true },

    username: { type: String, required: true, unique: true },

    email: { type: String, required: true, unique: true }, // ✅ TAMBAHAN DI SINI

    password: { type: String, required: true },

    role: { type: String, enum: ['user', 'admin'], default: 'user' },

    status: {
      type: String,
      enum: ['active', 'inactive', 'banned'],
      default: 'active',
    },
  },
  { timestamps: true },
);

export const UserModel = mongoose.model('User', UserSchema);
