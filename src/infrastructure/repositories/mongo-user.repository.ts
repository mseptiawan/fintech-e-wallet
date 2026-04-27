import { UserRepository } from "../../domain/repositories/user.repository";
import { User } from "../../domain/entities/user.entity";
import { UserModel } from "../models/user.model";
import { v4 as uuid } from "uuid";

export class MongoUserRepository implements UserRepository {
  async create(user: User): Promise<User> {
    const created = await UserModel.create({
      id: user.id ?? uuid(),
      username: user.username,
      email: user.email,
      password: user.password,
      role: user.role,
      status: user.status,
    });

    return new User(
      created.id,
      created.username,
      created.email,
      created.password,
      created.role,
      created.status,
      created.createdAt,
      created.updatedAt,
    );
  }

  async findByUsername(username: string): Promise<User | null> {
    const data = await UserModel.findOne({ username });

    if (!data) return null;

    return new User(
      data.id,
      data.username,
      data.email,
      data.password,
      data.role,
      data.status,
      data.createdAt,
      data.updatedAt,
    );
  }

  async findById(id: string): Promise<User | null> {
    const data = await UserModel.findOne({ id });

    if (!data) return null;

    return new User(
      data.id,
      data.username,
      data.email,
      data.password,
      data.role,
      data.status,
      data.createdAt,
      data.updatedAt,
    );
  }
}
