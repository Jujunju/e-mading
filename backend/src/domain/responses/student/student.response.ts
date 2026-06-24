import { Jurusan, Kelas, Role, UserEntity } from "../../entities/user.entity";

export class UserResponse implements Omit<UserEntity, 'password'> {
  constructor(
    public readonly id: string | null | undefined,
    public readonly fullName: string,
    public readonly username: string,
    public readonly role?: Role | string,
    public readonly kelas?: Kelas | string,
    public readonly jurusan?: Jurusan | string,
    public readonly createdAt?: Date | string,
    public readonly updatedAt?: Date | string,
  ) {}
}
