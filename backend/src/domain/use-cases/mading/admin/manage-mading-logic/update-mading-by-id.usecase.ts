import { UseCaseBase } from '../../../../base/use-case.base';
import { MadingResponse } from '../../../../entities/mading.entity';
import { AppError } from '../../../../errors/app.error';
import { MadingRepository } from '../../../../repositories/mading/admins/manage-mading-contracts/mading.repository';

export class UpdateMadingByIdUseCase implements UseCaseBase<any, MadingResponse> {
  constructor(private madingRepository: MadingRepository) {}

  async execute(input: any): Promise<MadingResponse> {
    try {
      const response = await this.madingRepository.updateMadingById(input.id, input.body);

      if (!response) {
        throw new AppError('Gagal memperbarui data', 400);
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
