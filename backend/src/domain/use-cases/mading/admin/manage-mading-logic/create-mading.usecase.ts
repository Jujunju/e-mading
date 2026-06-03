import { UseCaseBase } from '../../../../base/use-case.base';
import { MadingDTO } from '../../../../dtos/mading/mading.dtos';
import { MadingRepository } from '../../../../repositories/mading/admins/manage-mading-contracts/mading.repository';
import { AppError } from '../../../../errors/app.error';
import { MadingResponse } from '../../../../entities/mading.entity';

export class CreateMadingUseCase implements UseCaseBase<MadingDTO, MadingResponse> {
  constructor(private madingRepository: MadingRepository) {}
  async execute(input: MadingDTO): Promise<MadingResponse> {
    try {
      const response = await this.madingRepository.create(input);
      if (!response) {
        throw new AppError('Gagal Menyimpan Data Mading', 400);
      }

      return new MadingResponse(response.id, response.judul, response.slug, response.isi, response.kategori, response.gambar);
    } catch (error) {
      if (error instanceof AppError) {
        throw error;
      }
      throw new AppError('Terjadi kesalahan saat mengambil data mading', 500);
    }
  }
}
