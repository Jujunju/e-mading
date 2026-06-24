
import type { FrontMadingRepository } from "../../../../../repositories/mading/admin/front-manage-mading-contracts/front-mading.repository";

export class FrontGetMadingByIdUseCase {
  frontMadingRepository: FrontMadingRepository;
  constructor(frontMadingRepository: FrontMadingRepository) {
    this.frontMadingRepository = frontMadingRepository;
  }

  async execute(id: string) {
    return await this.frontMadingRepository.findMadingById(id);
  }
}