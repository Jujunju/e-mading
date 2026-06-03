import { AuthRepository } from '../../../repositories/auth/auth-repository-contracts/auth.repository';
import { AppError } from '../../../errors/app.error';
import { UseCaseBase } from '../../../base/use-case.base';
import { AuthService } from '../../../services/auth.service';
import { RegisterDTO } from '../../../dtos/auth/auth.dtos';

export class RegisterUseCase implements UseCaseBase<RegisterDTO, void> {
  constructor(
    private authRepository: AuthRepository,
    private authService: AuthService,
  ) {}

  async execute(input: RegisterDTO): Promise<void> {
    const response = await this.authRepository.findByUsername(input.username);

    if (response) {
      throw new AppError('Gagal daftar / Username sudah digunakan!', 409);
    }

    if (!input.password) {
      throw new AppError('Password wajib diisi!', 400);
    }

    const hashPassword = await this.authService.hash(input.password);

    await this.authRepository.create({
      fullName: input.fullName,
      username: input.username,
      password: hashPassword,
      role: input.role,
      kelas: input.kelas,
      jurusan: input.jurusan,
    });
  }
}
