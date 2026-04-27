import { UserRepository } from "../../../domain/repositories/user.repository";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { AppError } from "../../../shared/errors/app-error";

export class LoginUseCase {
  constructor(private userRepo: UserRepository) {}

  async execute(username: string, password: string) {
    const user = await this.userRepo.findByUsername(username);

    if (!user) {
      throw new AppError("User not found", 404);
    }

    const valid = await bcrypt.compare(password, user.password);

    if (!valid) {
      throw new AppError("Invalid password", 401);
    }

    const token = jwt.sign(
      { userId: user.id, role: user.role },
      process.env.JWT_SECRET!,
      { expiresIn: "1h" },
    );

    return { token };
  }
}
