import type { FrontMadingDTO } from "../../../../../dto/front-mading.dto";
import type { FrontMadingRepository } from "../../../../../repositories/admin/front-manage-mading-contracts/front-mading.repository";

export class FrontEditMadingByIdUseCase {
      frontMadingRepository: FrontMadingRepository;
      constructor(frontMadingRepository: FrontMadingRepository) {
        this.frontMadingRepository = frontMadingRepository;
      }

      async execute(id: string, data: FrontMadingDTO) {
        return await this.frontMadingRepository.updateMadingById(id, data)
      }
    
}