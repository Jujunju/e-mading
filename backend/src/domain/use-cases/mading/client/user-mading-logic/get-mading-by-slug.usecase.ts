import { UseCaseBase } from '../../../../base/use-case.base';
import { MadingEntity } from '../../../../entities/mading.entity';
import { AppError } from '../../../../errors/app.error';
import { UserMadingRepository } from '../../../../repositories/mading/clients/user-mading-contracts/u-mading.repository';

export class GetMadingBySlugUseCase implements UseCaseBase<string, MadingEntity[]> {
  constructor(private userMadingRepository: UserMadingRepository) {}
  async execute(input: string): Promise<MadingEntity[]> {
    try {
      const response = await this.userMadingRepository.findMadingBySlug(input);

      if (!response) {
        throw new AppError('Data Mading tidak Ditemukan', 404);
      }
      return response;
    } catch (error) {
      if (error instanceof AppError) throw error;

      throw new AppError('Terjadi kesalahan saat menyimpan komentar', 500);
    }
  }
}
