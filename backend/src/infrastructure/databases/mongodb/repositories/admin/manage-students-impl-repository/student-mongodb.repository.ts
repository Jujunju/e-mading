import mongoose from 'mongoose';
import { UserEntity } from '../../../../../../domain/entities/user.entity';
import { StudentRepository } from '../../../../../../domain/repositories/mading/admins/manage-student-contracts/student.repository';
import { UserModel } from '../../../models/user-mongodb.model';

export class StudentMongodbRepository implements StudentRepository {

  private toEntity(e: any): UserEntity {
    return new UserEntity(e._id.toString(), e.fullName, e.username, e.password,  e.role, e.kelas, e.jurusan, e.createdAt.toString(), e.updatedAt.toString());
  }

  async getStudent(): Promise<UserEntity[]> {
    const response = await UserModel.find({}).select('-password').sort({ createdAt: -1 });

    return response.map((e) => {
      return this.toEntity(e);
    });
  }

  async getStudentById(id: string): Promise<UserEntity | null> {
    const response = await UserModel.findById(id).lean()

    return response ? this.toEntity(response) : null
  }

  async findManyStudentById(ids: string[]): Promise<UserEntity[] | null> {
    const response = await UserModel.find({ _id: { $in: ids } });

    return response.map((e) => {
      return this.toEntity(e)
    })
  }

  async deleteStudent(id: string): Promise<UserEntity | null> {
    const response = await UserModel.findByIdAndDelete(id);
     return response ? this.toEntity(response) : null;
  }

  async deleteAllStudent(ids: string[]): Promise<boolean> {
    const objectId = ids.map((id) => new mongoose.Types.ObjectId(id))

    const response = await UserModel.deleteMany({_id: {$in: objectId}})

    return response.acknowledged === true
  }
}
