import type { ClientFrontUserMadingRepository } from '../../../../repositories/mading/client/client-front-user-mading-contracts/front-user-mading.repository';

export class FrontGetMadingBySlugUseCase {
  clientFrontUserMadingRepository: ClientFrontUserMadingRepository;
  constructor(clientFrontUserMadingRepository: ClientFrontUserMadingRepository) {
    this.clientFrontUserMadingRepository = clientFrontUserMadingRepository;
  }

  async execute(slug: string) {
    return await this.clientFrontUserMadingRepository.findMadingBySlug(slug);
  }
}
