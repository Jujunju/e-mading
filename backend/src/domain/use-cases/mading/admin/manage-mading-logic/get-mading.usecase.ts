import { UseCaseBase } from '../../../../base/use-case.base';
import { MadingEntity } from '../../../../entities/mading.entity';
import { AppError } from '../../../../errors/app.error';
import { MadingRepository } from '../../../../repositories/mading/admins/manage-mading-contracts/mading.repository';

export class GetMadingUseCase implements UseCaseBase<void, MadingEntity[]> {
  constructor(private madingRepository: MadingRepository) {}

  async execute(): Promise<MadingEntity[]> {
    try {
      const response = await this.madingRepository.getMading();

      return response;
    } catch (error) {
      if (error instanceof AppError) {
        throw error;
      }
      throw new AppError('Terjadi kesalahan saat mengambil data mading', 500);
    }
  }
}
