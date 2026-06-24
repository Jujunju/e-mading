
import type { FrontMadingRepository } from '../../../../../repositories/mading/admin/front-manage-mading-contracts/front-mading.repository';

export class FrontUpdateMadingByIdUseCase {
  frontMadingRepository: FrontMadingRepository;
  constructor(frontMadingRepository: FrontMadingRepository) {
    this.frontMadingRepository = frontMadingRepository;
  }

  async execute(id: string, data: FormData) {
    return await this.frontMadingRepository.updateMadingById(id, data);
  }
}
