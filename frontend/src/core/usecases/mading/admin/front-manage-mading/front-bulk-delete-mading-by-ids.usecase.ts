import type { FrontMadingRepository } from '../../../../repositories/mading/admin/front-manage-mading-contracts/front-mading.repository';

export class FrontBulkDeleteMadingByIdsUseCase {
  frontMadingRepository: FrontMadingRepository;

  constructor(frontMadingRepository: FrontMadingRepository) {
    this.frontMadingRepository = frontMadingRepository;
  }

  async execute(ids: string[]) {
    return await this.frontMadingRepository.bulkDeleteMadingByIds(ids);
  }
}
