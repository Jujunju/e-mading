import { Jurusan, Kelas, Role } from "../../../../../domain/entities/user.entity";

export interface UserDoc {
  id?: string | null;
  fullName: string;
  username: string;
  password: string;
  role?: Role | string;
  kelas?: Kelas | string | null | undefined;
  jurusan?: Jurusan | string | null | undefined;
  createdAt?: Date | string;
  updatedAt?: Date | string;
}
