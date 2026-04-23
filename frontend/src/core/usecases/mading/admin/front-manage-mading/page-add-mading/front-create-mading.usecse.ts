
import type { FrontMadingRepository } from "../../../../../repositories/admin/front-manage-mading-contracts/front-mading.repository";

export class FrontCreateMadingUseCase {
  frontMadingRepository: FrontMadingRepository;
  constructor(frontMadingRepository: FrontMadingRepository) {
    this.frontMadingRepository = frontMadingRepository;
  }

  async execute(data: FormData) {
    return await this.frontMadingRepository.createMading(data);
  }
}