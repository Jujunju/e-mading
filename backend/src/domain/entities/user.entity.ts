export enum Role {
  ADMIN = 'admin',
  SISWA = 'siswa',
}

export enum Kelas {
  SEPULUH = 'X',
  SEBELAS = 'XI',
  DUABELAS = 'XII',
}

export enum Jurusan {
  PPLG = 'PPLG',
  DKV = 'DKV',
  TJKT = 'TJKT',
  MPLB = 'MPLB',
}

export class UserEntity {
  constructor(
    public readonly id: string,
    public readonly fullName: string,
    public readonly username: string,
    public readonly password: string | null,
    public readonly role?: Role | string | null,
    public readonly kelas?: Kelas | string | null,
    public readonly jurusan?: Jurusan | string | null,
    public readonly createdAt?: string | null,
    public readonly updatedAt?: string | null,
  ) {}
}

export class UserResponse implements Omit<UserEntity, 'password'> {
  constructor(
    public readonly id: string,
    public readonly fullName: string,
    public readonly username: string,
    public readonly role: Role | string | null,
    public readonly kelas: Kelas | string | null,
    public readonly jurusan: Jurusan | string | null,
    public readonly createdAt: string | null,
    public readonly updatedAt: string | null,
  ) {}
}

export class LoginResponse {
  constructor(
    public readonly user: AuthenticatedUser,
    public readonly token: string,
  ) {}
}

export type LoginRequest = Pick<UserEntity, 'username' | 'password'>;
export type RegisterRequest = Pick<UserEntity, 'fullName' | 'username' | 'password' | 'role' | 'kelas' | 'jurusan'>;
export type AuthenticatedUser = Omit<UserEntity, 'password'>;


