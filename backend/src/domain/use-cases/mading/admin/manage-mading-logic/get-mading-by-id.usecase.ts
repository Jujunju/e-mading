import { UseCaseBase } from '../../../../base/use-case.base';
import { MadingEntity } from '../../../../entities/mading.entity';
import { AppError } from '../../../../errors/app.error';
import { MadingRepository } from '../../../../repositories/mading/admin/manage-mading-contracts/mading.repository';

export class GetMadingByIdUseCase implements UseCaseBase<string, MadingEntity> {
  constructor(private madingRepository: MadingRepository) {}
  async execute(input: string): Promise<MadingEntity> {
    const response = await this.madingRepository.findMadingById(input);

    if (!response) {
      throw new AppError('Data Mading tidak Ditemukan', 404);
    }
    return response;
  }
}
