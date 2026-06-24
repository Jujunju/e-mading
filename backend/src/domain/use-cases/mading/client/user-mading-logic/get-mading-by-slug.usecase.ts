import { UseCaseBase } from '../../../../base/use-case.base';
import { MadingEntity } from '../../../../entities/mading.entity';
import { UserMadingRepository } from '../../../../repositories/mading/client/user-mading-contracts/u-mading.repository';

export class GetMadingBySlugUseCase implements UseCaseBase<string, MadingEntity[]> {
  constructor(private userMadingRepository: UserMadingRepository) {}
  async execute(input: string): Promise<MadingEntity[]> {
    return await this.userMadingRepository.findMadingBySlug(input);
  }
}
