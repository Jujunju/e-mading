import { AppError } from '../../../errors/app.error';
import { UseCaseBase } from '../../../base/use-case.base';
import { PasswordSecurity } from '../../../security/password.security';
import { CreateUserDTO } from '../../../dtos/user/user.dto';
import { UserRepository } from '../../../repositories/user/user-repository-contracts/user.repository';
import { UserEntity } from '../../../entities/user.entity';
import { randomId, waktu } from '../../../../infrastructure/helpers/set-time-id';
import { UserValidator } from '../../../../interface-adapter/validator/user/user.validator';

export class CreateUserUseCase implements UseCaseBase<CreateUserDTO, void> {
  constructor(
    private userRepository: UserRepository,
    private passwordSecurity: PasswordSecurity,
  ) {}

  async execute(input: CreateUserDTO): Promise<void> {
    UserValidator.handleCreateUserValidator(input);
    const response = await this.userRepository.findByUsername(input.username);

    if (response) {
      throw new AppError('Gagal daftar / Username sudah digunakan!', 409);
    }

    const hashPassword = await this.passwordSecurity.hash(input.password);

    const newUser = new UserEntity(randomId(), input.fullName, input.username, hashPassword, input.role, input.kelas, input.jurusan);

    await this.userRepository.create(newUser);
  }
}
