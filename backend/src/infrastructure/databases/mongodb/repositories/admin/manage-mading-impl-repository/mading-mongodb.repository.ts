import { MadingEntity } from '../../../../../../domain/entities/mading.entity';
import { MadingDTO } from '../../../../../../domain/dtos/mading/mading.dtos';
import { MadingRepository } from '../../../../../../domain/repositories/mading/admins/manage-mading-contracts/mading.repository';
import { MadingModel } from '../../../models/mading-mongodb.model';
import mongoose from 'mongoose';

export class MadingMongodbRepository implements MadingRepository {
  private toEntity(r: any): MadingEntity {
    return new MadingEntity(r._id.toString(), r?.judul, r?.slug, r?.kategori, r?.isi, r?.gambar, r.createdAt.toString(), r.updatedAt.toString());
  }

  async create(data: MadingDTO): Promise<MadingEntity | null> {
    const response = new MadingModel(data);
    await response.save();

    if (!response) {
      return null;
    }

    return response ? this.toEntity(response) : null;
  }
  async findMadingById(id: string): Promise<MadingEntity | null> {
    const response = await MadingModel.findById(id);

    if (!response) {
      return null;
    }

    return response ? this.toEntity(response) : null;
  }

  async findManyMadingById(ids: string[]): Promise<MadingEntity[] | null> {
    const response = await MadingModel.find({ _id: { $in: ids } });

    if (!response) {
      return null;
    }

    return response.map((r) => {
      return this.toEntity(r);
    });
  }
  async getMading(): Promise<MadingEntity[]> {
    const response = await MadingModel.find({}).sort({ createdAt: -1 });

    return response.map((r) => {
      return this.toEntity(r);
    });
  }

  async updateMadingById(id: string, data: MadingDTO): Promise<MadingEntity | null> {
    const response = await MadingModel.findByIdAndUpdate(id, data, { returnDocument: 'after' });

    if (!response) {
      return null;
    }

    return response ? this.toEntity(response) : null;
  }

  async deleteMadingById(id: string): Promise<MadingEntity | null> {
    const response = await MadingModel.findByIdAndDelete(id);

    if (!response) {
      return null;
    }

    return response ? this.toEntity(response) : null;
  }

  async deleteAllMading(ids: string[]): Promise<boolean> {
    const objectIds = ids.map((id) => new mongoose.Types.ObjectId(id));

    const response = await MadingModel.deleteMany({
      _id: { $in: objectIds },
    });

    return response.acknowledged === true;
  }
}
