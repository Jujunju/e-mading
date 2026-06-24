import fs from 'node:fs/promises';
import path from 'node:path';
import { UseCaseBase } from '../../../../base/use-case.base';
import { MadingRepository } from '../../../../repositories/mading/admin/manage-mading-contracts/mading.repository';
import { AppError } from '../../../../errors/app.error';

export class DeleteMadingByIdUsecase implements UseCaseBase<string, boolean> {
  constructor(private madingRepository: MadingRepository) {}
  async execute(input: string): Promise<boolean> {
    const responseMading = await this.madingRepository.findMadingById(input);
    if (!responseMading) {
      throw new AppError(`Data mading dengan id ${input} tidak ditemukan`, 404);
    }

    await this.madingRepository.deleteMadingById(input);

    try {
      const fullPath = path.join(process.cwd(), 'src', 'infrastructure', 'uploads', responseMading?.gambar as string);
      await fs.unlink(fullPath);
    } catch (error) {
      console.error('File storage gagal dihapus:', error);
    }

    return true;
  }
}
