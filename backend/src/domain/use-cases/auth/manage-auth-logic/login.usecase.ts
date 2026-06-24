import { ITokenJwt } from '../../../../infrastructure/security/jwt.security';
import { UseCaseBase } from '../../../base/use-case.base';
import { AppError } from '../../../errors/app.error';
import { LoginDTO } from '../../../dtos/auth/auth.dtos';
import { UserRepository } from '../../../repositories/user/user-repository-contracts/user.repository';
import { PasswordSecurity } from '../../../security/password.security';
import { LoginResponse } from '../../../responses/auth/auth.response';
import { AuthValidator } from '../../../../interface-adapter/validator/auth/auth.validator';

export class LoginUseCase implements UseCaseBase<LoginDTO, LoginResponse> {
  constructor(
    private userRepository: UserRepository,
    private passwordSecurity: PasswordSecurity,
    private iTokenJwt: ITokenJwt,
  ) {}
  async execute(input: LoginDTO): Promise<LoginResponse> {
    AuthValidator.handleLoginValidator(input);
    const response = await this.userRepository.findByUsername(input.username);

    if (!response || !response.password) {
      throw new AppError('Username atau Password belum terdaftar', 401);
    }

    const matchPassword = await this.passwordSecurity.compare(input.password, response.password);

    if (!matchPassword) {
      throw new AppError('Password anda salah', 401);
    }

    const token = await this.iTokenJwt.generateToken({ id: response?.id?.toString(), fullName: response.fullName, username: response.username, role: response.role });

    return new LoginResponse({ id: response?.id?.toString(), fullName: response.fullName, username: response.username, role: response.role, kelas: response.kelas, jurusan: response.jurusan }, token);
  }
}
