import { UseCaseBase } from '../../../../base/use-case.base';
import { MadingEntity } from '../../../../entities/mading.entity';
import { MadingRepository } from '../../../../repositories/mading/admin/manage-mading-contracts/mading.repository';

export class GetAllMadingUseCase implements UseCaseBase<void, MadingEntity[]> {
  constructor(private madingRepository: MadingRepository) {}

  async execute(): Promise<MadingEntity[]> {
      return await this.madingRepository.getAllMading();
  }
}
