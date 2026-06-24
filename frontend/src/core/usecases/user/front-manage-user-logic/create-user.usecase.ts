import type { FrontCreateUserDTO } from '../../../dto/front-user.dtos';
import type { FrontUserRepository } from '../../../repositories/user/front-manage-user-contract/front-user.repository';

export class CreateUserUseCase {
  private frontUserRepository: FrontUserRepository;
  constructor(frontUserRepository: FrontUserRepository) {
    this.frontUserRepository = frontUserRepository;
  }
  async execute(user: FrontCreateUserDTO) {
    return await this.frontUserRepository.create(user);
  }
}
