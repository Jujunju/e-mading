import { MadingValidator } from '../../../../../interface-adapter/validator/admin/mading/mading.validator';
import { UseCaseBase } from '../../../../base/use-case.base';
import { MadingDTO } from '../../../../dtos/mading/mading.dtos';
import { MadingEntity } from '../../../../entities/mading.entity';
import { AppError } from '../../../../errors/app.error';
import { MadingRepository } from '../../../../repositories/mading/admin/manage-mading-contracts/mading.repository';

export class UpdateMadingByIdUseCase implements UseCaseBase<MadingDTO, boolean> {
  constructor(private madingRepository: MadingRepository) {}

  async execute(input: MadingDTO): Promise<boolean> {

    MadingValidator.handleMadingValidator(input);

    const findMading = await this.madingRepository.findMadingById(input.id)

    if(!findMading) {
      throw new AppError('Data tidak ditemukan', 400);
    }

    const newMading = new MadingEntity(input.id, input.judul, input.judul, input.kategori, input.isi, input.gambar)

    const response = await this.madingRepository.updateMadingById(newMading);

    if (!response) {
      throw new AppError('Gagal memperbarui data', 400);
    }

    return response;
  }
}
