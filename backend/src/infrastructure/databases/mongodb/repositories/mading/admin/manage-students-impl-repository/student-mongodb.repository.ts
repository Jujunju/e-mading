import mongoose from 'mongoose';
import { UserEntity } from '../../../../../../../domain/entities/user.entity';
import { StudentRepository } from '../../../../../../../domain/repositories/mading/admin/manage-student-contracts/student.repository';
import { UserModel } from '../../../../models/user-mongodb.model';
import { StudentMapper } from '../../../../../../../interface-adapter/mappers/student/student.mapper';
import { HandleMongooseError } from '../../../../errors/handle-mongoose-error';

export class StudentMongodbRepository implements StudentRepository {
  async getAllStudent(): Promise<UserEntity[]> {
    const result = await UserModel.find({}).select('-password').sort({ createdAt: -1 }).lean();

    return StudentMapper.toListEntity(result);
  }

  async findStudentById(id: string): Promise<UserEntity | null> {
    const result = await UserModel.findOne({id}).lean();

    return result ? StudentMapper.toEntity(result) : null;
  }

  async findManyStudentByIds(ids: string[]): Promise<UserEntity[]> {
    const result = await UserModel.find({ id: { $in: ids } });

    return StudentMapper.toListEntity(result);
  }

  async deleteStudentById(id: string): Promise<boolean> {
    try {
      const result = await UserModel.deleteOne({id});
      return result.deletedCount > 0;
    } catch (error) {
      HandleMongooseError.handlerError(error);
    }
  }

  async bulkDeleteStudentByIds(ids: string[]): Promise<boolean> {
    try {

      const result = await UserModel.deleteMany({ id: { $in: ids } });

      return result.deletedCount > 0;
    } catch (error) {
      HandleMongooseError.handlerError(error);
    }
  }
}
