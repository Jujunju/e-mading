import type { FrontMadingRepository } from '../../../../repositories/admin/front-manage-mading-contracts/front-mading.repository';

export class FrontDeleteAllMadingUseCase {
  frontMadingRepository: FrontMadingRepository;

  constructor(frontMadingRepository: FrontMadingRepository) {
    this.frontMadingRepository = frontMadingRepository;
  }

  async execute(ids: string[]) {
    return await this.frontMadingRepository.deleteAllMading(ids);
  }
}
