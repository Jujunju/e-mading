import type { FrontAuthRepository } from '../../../repositories/auth/front-manage-auth-contracts/front-auth.repository';

export class LogoutClientUseCase {
  private frontAuthRepository: FrontAuthRepository;
  constructor(frontAuthRepository: FrontAuthRepository) {
    this.frontAuthRepository = frontAuthRepository;
  }
  async execute() {
    return await this.frontAuthRepository.logout();
  }
}
