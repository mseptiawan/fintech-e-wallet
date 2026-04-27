import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { UserRepository } from '../../../domain/repositories/user.repository';
import { AppError } from '../../../shared/errors/app-error';

export class LoginUseCase {
  constructor(private userRepo: UserRepository) {}

  async execute(username: string, password: string) {
    const user = await this.userRepo.findByUsername(username);

    if (!user) {
      throw new AppError('User not found', 404);
    }

    const valid = await bcrypt.compare(password, user.password);

    if (!valid) {
      throw new AppError('Invalid password', 401);
    }

    const accessToken = jwt.sign(
      { userId: user.id, role: user.role },
      process.env.JWT_ACCESS_SECRET!,
      { expiresIn: '15m' },
    );

    const refreshToken = jwt.sign(
      { userId: user.id },
      process.env.JWT_REFRESH_SECRET!,
      { expiresIn: '7d' },
    );

    return {
      accessToken,
      refreshToken,
    };
  }
}
