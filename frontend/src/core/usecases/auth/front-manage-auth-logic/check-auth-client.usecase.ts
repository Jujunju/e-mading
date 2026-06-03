import type { FrontAuthRepository } from '../../../repositories/auth/front-manage-auth-contracts/front-auth.repository';

export class CheckAuthClientUseCase {
  frontAuthRepository: FrontAuthRepository;
  constructor(frontAuthRepository: FrontAuthRepository) {
    this.frontAuthRepository = frontAuthRepository;
  }

  async execute(signal?: AbortSignal) {
    return await this.frontAuthRepository.checkAuthUser();
  }
}
