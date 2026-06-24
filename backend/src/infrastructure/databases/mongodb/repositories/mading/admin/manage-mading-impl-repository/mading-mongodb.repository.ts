import { MadingEntity } from '../../../../../../../domain/entities/mading.entity';
import { MadingRepository } from '../../../../../../../domain/repositories/mading/admin/manage-mading-contracts/mading.repository';
import { MadingModel } from '../../../../models/mading-mongodb.model';
import { HandleMongooseError } from '../../../../errors/handle-mongoose-error';
import { MadingMapper } from '../../../../../../../interface-adapter/mappers/mading/mading.mapper';

export class MadingMongodbRepository implements MadingRepository {
  async create(data: MadingEntity): Promise<void> {
    const result = new MadingModel(data);
    await result.save();
  }
  async findMadingById(id: string): Promise<MadingEntity | null> {
    const result = await MadingModel.findOne({ id }).lean();

    return result ? MadingMapper.toEntity(result) : null;
  }

  async findManyMadingByIds(ids: string[]): Promise<MadingEntity[]> {
    const result = await MadingModel.find({ id: { $in: ids } }).lean();

    return MadingMapper.toListEntity(result);
  }
  async getAllMading(): Promise<MadingEntity[]> {
    const result = await MadingModel.find({}).sort({ createdAt: -1 });

    return MadingMapper.toListEntity(result);
  }

  async updateMadingById(data: MadingEntity): Promise<boolean> {
    try {
      const { id, createdAt, updatedAt, ...dataDesc } = data;
      const result = await MadingModel.updateOne({ id }, { $set: dataDesc });

      return result.modifiedCount > 0;
    } catch (error) {
      HandleMongooseError.handlerError(error);
    }
  }

  async deleteMadingById(id: string): Promise<boolean> {
    try {
      const result = await MadingModel.deleteOne({ id });

      return result.deletedCount > 0;
    } catch (error) {
      HandleMongooseError.handlerError(error);
    }
  }

  async bulkDeleteMadingByIds(ids: string[]): Promise<boolean> {
    try {
      const result = await MadingModel.deleteMany({ id: { $in: ids } });

      return result.deletedCount > 0;
    } catch (error) {
      HandleMongooseError.handlerError(error);
    }
  }
}
