export type UserRole = "user" | "admin";
export type UserStatus = "active" | "inactive" | "banned";

export class User {
  constructor(
    public id: string,
    public username: string,
    public email: string,
    public password: string,
    public role: UserRole = "user",
    public status: UserStatus = "active",
    public createdAt: Date = new Date(),
    public updatedAt: Date = new Date(),
  ) {}
}
