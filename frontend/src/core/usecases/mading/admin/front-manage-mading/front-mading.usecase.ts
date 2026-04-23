
import type { FrontMadingRepository } from "../../../../repositories/admin/front-manage-mading-contracts/front-mading.repository";

export class FrontGetMadingUseCase {
  frontMadingRepository: FrontMadingRepository;
  constructor(frontMadingRepository: FrontMadingRepository) {
    this.frontMadingRepository = frontMadingRepository;
  }
  async execute() {
    return await this.frontMadingRepository.getMading();
  }
}