import type { FrontMadingRepository } from '../../../../repositories/mading/admin/front-manage-mading-contracts/front-mading.repository';

export class FrontGetAllMadingUseCase {
  frontMadingRepository: FrontMadingRepository;
  constructor(frontMadingRepository: FrontMadingRepository) {
    this.frontMadingRepository = frontMadingRepository;
  }
  async execute() {
    return await this.frontMadingRepository.getAllMading();
  }
}
