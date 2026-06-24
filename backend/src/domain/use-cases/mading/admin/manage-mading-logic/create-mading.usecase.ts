import { UseCaseBase } from '../../../../base/use-case.base';
import { MadingDTO } from '../../../../dtos/mading/mading.dtos';
import { MadingRepository } from '../../../../repositories/mading/admin/manage-mading-contracts/mading.repository';
import { AppError } from '../../../../errors/app.error';
import { MadingEntity } from '../../../../entities/mading.entity';
import { MadingValidator } from '../../../../../interface-adapter/validator/admin/mading/mading.validator';
import { randomId } from '../../../../../infrastructure/helpers/set-time-id';

export class CreateMadingUseCase implements UseCaseBase<MadingDTO, void> {
  constructor(private madingRepository: MadingRepository) {}

  async execute(input: MadingDTO): Promise<void> {
    MadingValidator.handleMadingValidator(input);

    const newMading = new MadingEntity(randomId(), input.judul, input.judul, input.kategori, input.isi, input.gambar);
    await this.madingRepository.create(newMading);
  }
}
