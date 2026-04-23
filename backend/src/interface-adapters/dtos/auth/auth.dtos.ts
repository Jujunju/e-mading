import { AuthenticatedUser } from "../../../domain/entities/user.entity";

export class RegisterDTO {
  constructor(
    public readonly fullName: string,
    public readonly username: string,
    public readonly password: string,
    public readonly role: string,
    public readonly kelas: string,
    public readonly jurusan: string,
  ) {}
}

export class LoginDTO {
  constructor(
    public readonly username: string,
    public readonly password: string,
  ) {}
}

export class LoginResponseDTO {
  constructor(
    public readonly user: AuthenticatedUser,
    public readonly token: string,
  ) {}
}