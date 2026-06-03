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
