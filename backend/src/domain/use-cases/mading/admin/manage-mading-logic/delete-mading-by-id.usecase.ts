import fs from 'node:fs/promises';
import path from 'node:path';
import { UseCaseBase } from '../../../../base/use-case.base';
import { MadingRepository } from '../../../../repositories/mading/admins/manage-mading-contracts/mading.repository';
import { AppError } from '../../../../errors/app.error';
import { MadingResponse } from '../../../../entities/mading.entity';

export class DeleteMadingByIdUsecase implements UseCaseBase<string, MadingResponse> {
  constructor(private madingRepository: MadingRepository) {}
  async execute(input: string): Promise<MadingResponse> {
    const responseGetIdmading = await this.madingRepository.findMadingById(input)
    if (!responseGetIdmading) {
      throw new AppError(`Data mading dengan id ${input} tidak ditemukan`, 404);
    }
    
    const response = await this.madingRepository.deleteMadingById(input);
    if (!response) {
      throw new AppError(`Data mading tidak ditemukan`, 404);
    }
    try {
      const fullPath = path.join(__dirname, '../../../../../infrastructure/uploads', responseGetIdmading?.gambar);
      await fs.unlink(fullPath);
    } catch (error) {
      console.error('File storage gagal dihapus:', error);
    }


    return new MadingResponse(response.id, response.judul, response.slug, response.kategori, response.isi, response.gambar);
  }
}
