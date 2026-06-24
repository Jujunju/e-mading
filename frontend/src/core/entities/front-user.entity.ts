export type Role = 'admin' | 'siswa';

export type Kelas = 'X' | 'XI' | 'XII';

export type Jurusan = 'PPLG' | 'DKV' | 'TJKT' | 'MPLB';

export interface FrontUserEntity {
  id: string;
  fullName: string;
  username: string;
  role?: Role | string;
  kelas?: Kelas | string;
  jurusan?: Jurusan | string;
  createdAt?: string;
}

export interface FrontAuthLoginResponse {
  user: { id: string; fullName: string; username: string; role: string | null | undefined; kelas: string | null | undefined; jurusan: string | null | undefined };
  token: string;
}
