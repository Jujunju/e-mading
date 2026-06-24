import { UseCaseBase } from '../../../../base/use-case.base';
import { MadingRepository } from '../../../../repositories/mading/admin/manage-mading-contracts/mading.repository';
import { AppError } from '../../../../errors/app.error';
import fs from 'fs/promises';
import { join } from 'path';

export class BulkDeleteMadingByIdUseCase implements UseCaseBase<string[], boolean> {
  constructor(private madingRepository: MadingRepository) {}

  async execute(input: string[]): Promise<boolean> {

    const responseMading = await this.madingRepository.findManyMadingByIds(input);

    if (!responseMading || responseMading.length === 0) {
      throw new AppError('Data mading tidak ditemukan', 404);
    }

    const isSuccess = await this.madingRepository.bulkDeleteMadingByIds(input);

    if (!isSuccess) {
      throw new AppError('Gagal menghapus data mading dari database', 400);
    }
    
    const deleteFilesPromises = responseMading.map(async (mading) => {
      if (mading.gambar) {
        try {
          const fullPath = join(process.cwd(), 'src', 'infrastructure', 'uploads', mading.gambar);
          await fs.unlink(fullPath);
        } catch (err: any) {
          if (err.code === 'ENOENT') {
            console.warn(`[SKIP] File ${mading.gambar} tidak ditemukan di folder, mungkin sudah terhapus manual.`);
          } else {
            console.error(`[ERROR] Gagal menghapus file ${mading.gambar}:`, err.message);
          }
        }
      }
    });

    await Promise.all(deleteFilesPromises);

    return true;
  }
}
