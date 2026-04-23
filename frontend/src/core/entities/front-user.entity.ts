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

export interface FrontUserEntity {
  id: string;
  fullName: string;
  username: string;
  role: Role | null | string;
  kelas: Kelas | null | string;
  jurusan: Jurusan | null | string;
  createdAt: string | null | number | undefined;
}
