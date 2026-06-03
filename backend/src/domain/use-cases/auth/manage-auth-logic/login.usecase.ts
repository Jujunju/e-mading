import { ITokenJwt } from '../../../../infrastructure/security/jwt.security';
import { UseCaseBase } from '../../../base/use-case.base';
import { AppError } from '../../../errors/app.error';
import { LoginDTO } from '../../../dtos/auth/auth.dtos';
import { AuthRepository } from '../../../repositories/auth/auth-repository-contracts/auth.repository';
import { AuthService } from '../../../services/auth.service';
import { LoginResponse } from '../../../entities/user.entity';

export class LoginUseCase implements UseCaseBase<LoginDTO, LoginResponse> {
  constructor(
    private authRepository: AuthRepository,
    private authService: AuthService,
    private iTokenJwt: ITokenJwt,
  ) {}
  async execute(input: LoginDTO): Promise<LoginResponse> {
    const response = await this.authRepository.findByUsername(input.username);

    if (!response || !response.password) {
      throw new AppError('Username atau Password belum terdaftar', 401);
    }

    const matchPassword = await this.authService.compare(input.password, response.password);

    if (!matchPassword) {
      throw new AppError('Password anda salah', 401);
    }

    const token = this.iTokenJwt.generateToken({ id: response.id.toString(), fullName: response.fullName, username: response.username, role: response.role });

    return new LoginResponse({ id: response.id.toString(), fullName: response.fullName, username: response.username, role: response.role, kelas: response.kelas, jurusan: response.jurusan }, token);
  }
}
