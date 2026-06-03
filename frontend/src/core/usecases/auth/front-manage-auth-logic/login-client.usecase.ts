import type { FrontAuthRepository } from '../../../repositories/auth/front-manage-auth-contracts/front-auth.repository';
import type { FrontAuthLoginDTO } from '../../../dto/front-auth.dtos';

export class LoginClientUseCase {
  frontAuthRepository: FrontAuthRepository;
  constructor(frontAuthRepository: FrontAuthRepository) {
    this.frontAuthRepository = frontAuthRepository;
  }

  async execute(user: FrontAuthLoginDTO) {
    return await this.frontAuthRepository.login(user);
  }
}
