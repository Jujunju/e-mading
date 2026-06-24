export type Role = 'admin'| 'siswa'

export type Kelas = 'X' | 'XI' | 'XII'

export type Jurusan = 'PPLG' | 'DKV' | 'TJKT' | 'MPLB'


export class UserEntity {
  constructor(
    public readonly id: string | null | undefined,
    public readonly fullName: string,
    public readonly username: string,
    public readonly password: string,
    public readonly role?: Role | string,
    public readonly kelas?: Kelas | string | null | undefined,
    public readonly jurusan?: Jurusan | string | null | undefined,
    public readonly createdAt?: Date | string,
    public readonly updatedAt?: Date | string,
  ) {}
}

