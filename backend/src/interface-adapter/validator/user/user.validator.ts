import { CreateUserDTO } from '../../../domain/dtos/user/user.dto';
import { Jurusan, Kelas, Role } from '../../../domain/entities/user.entity';
import { AppError } from '../../../domain/errors/app.error';

export class UserValidator {
  static handleCreateUserValidator(input: CreateUserDTO): void {
    const checkRole: Role[] = ['admin', 'siswa'];
    const checkKelas: Kelas[] = ['X', 'XI', 'XII'];
    const checkJurusan: Jurusan[] = ['PPLG', 'DKV', 'MPLB', 'TJKT'];

    if (input.fullName) {
      if (input.fullName.length < 3) {
        throw new AppError('Nama lengkap minimal 3 karakter', 400);
      }
    } else {
      throw new AppError('Nama lengkap tidak boleh kosong', 400);
    }

    if (input.username) {
      if (input.username[0] !== input.username[0]?.toUpperCase()) {
        throw new AppError('Karakter awal username wajib kapital', 400);
      } else if (input.username.length < 3) {
        throw new AppError('Username minimal 3 karakter', 400);
      }
    } else {
      throw new AppError('Username tidak boleh kosong', 400);
    }

    if (input.password) {
      if (input.password.length < 3) {
        throw new AppError('Password minimal 3 karakter', 400);
      }
    } else {
      throw new AppError('Password tidak boleh kosong', 400);
    }

    if (input.role) {
      if (!checkRole.includes(input.role as Role)) {
        throw new AppError('Role tidak valid, harus admin atau siswa', 400);
      }
    } else {
      throw new AppError('Role tidak boleh kosong', 400);
    }

    if (input.kelas) {
      if (!checkKelas.includes(input.kelas as Kelas)) {
        throw new AppError('Kelas tidak valid, harus X, XI, atau XII', 400);
      }
    } else {
      throw new AppError('Kelas tidak boleh kosong', 400);
    }

    if (input.jurusan) {
      if (!checkJurusan.includes(input.jurusan as Jurusan)) {
        throw new AppError('Jurusan tidak valid, harus PPLG, MPLB, DKV, atau TJKT', 400);
      }
    } else {
      throw new AppError('Jurusan tidak boleh kosong', 400);
    }
  }
}
