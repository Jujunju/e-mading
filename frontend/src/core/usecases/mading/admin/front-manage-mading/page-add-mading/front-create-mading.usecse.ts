import type { FrontMadingRepository } from '../../../../../repositories/mading/admin/front-manage-mading-contracts/front-mading.repository';

export class FrontCreateMadingUseCase {
  frontMadingRepository: FrontMadingRepository;
  constructor(frontMadingRepository: FrontMadingRepository) {
    this.frontMadingRepository = frontMadingRepository;
  }

  async execute(data: FormData) {
    return await this.frontMadingRepository.create(data);
  }
}
