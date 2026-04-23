import type { FrontAuthRepository } from "../../repositories/front-auth.repository";
import type { FrontAuthRegisterDTO } from "../../../dto/front-auth.dtos";

export class RegisterClientUseCase {
  private frontAuthRepository: FrontAuthRepository;
  constructor(frontAuthRepository: FrontAuthRepository) {
    this.frontAuthRepository = frontAuthRepository;
  }
  async execute(user: FrontAuthRegisterDTO) {
    return await this.frontAuthRepository.register(user);
  }
}