import { LoginDTO } from '../../../domain/dtos/auth/auth.dtos';
import { AppError } from '../../../domain/errors/app.error';

export class AuthValidator {
  static handleLoginValidator(input: LoginDTO) {
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
  }
}
