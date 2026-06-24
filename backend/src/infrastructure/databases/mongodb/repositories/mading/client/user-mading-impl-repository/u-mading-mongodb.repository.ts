import { MadingEntity } from '../../../../../../../domain/entities/mading.entity';
import { UserMadingRepository } from '../../../../../../../domain/repositories/mading/client/user-mading-contracts/u-mading.repository';
import { MadingMapper } from '../../../../../../../interface-adapter/mappers/mading/mading.mapper';
import { MadingModel } from '../../../../models/mading-mongodb.model';

export class UserMadingMongodbRepository implements UserMadingRepository {
  async findMadingBySlug(slug: string): Promise<MadingEntity[]> {
    const result = await MadingModel.find({ slug: slug }).lean();

    return MadingMapper.toListEntity(result);
  }
}
