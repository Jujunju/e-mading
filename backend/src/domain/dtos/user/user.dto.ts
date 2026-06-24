import { Role } from "../../entities/user.entity";

export class CreateUserDTO {
  constructor(
    public readonly fullName: string,
    public readonly username: string,
    public readonly password: string,
    public readonly role: Role | string,
    public readonly kelas?: string,
    public readonly jurusan?: string,
  ) {}
}
