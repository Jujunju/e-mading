import { UseCaseBase } from '../../../../base/use-case.base';
import { MadingResponse } from '../../../../entities/mading.entity';
import { AppError } from '../../../../errors/app.error';
import { MadingRepository } from '../../../../repositories/mading/admins/manage-mading-contracts/mading.repository';

export class GetMadingByIdUseCase implements UseCaseBase<string, MadingResponse> {
  constructor(private madingRepository: MadingRepository) {}
  async execute(input: string): Promise<MadingResponse> {
    try {
      const response = await this.madingRepository.findMadingById(input);

      if (!response) {
        throw new AppError('Data Mading tidak Ditemukan', 404);
      }
      return new MadingResponse(response.id, response.judul, response.slug, response.kategori, response.isi, response.gambar);
    } catch (error) {
      if (error instanceof AppError) {
        throw error;
      }
      throw new AppError('Terjadi kesalahan saat mengambil data mading', 500);
    }
  }
}
