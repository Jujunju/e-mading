import { AuthRepository } from "../../../../../../domain/repositories/auth/auth-repository-contracts/auth.repository";
import { UserEntity } from '../../../../../../domain/entities/user.entity';
import { UserDoc, UserModel } from '../../../models/user-mongodb.model';
import { RegisterDTO } from '../../../../../../domain/dtos/auth/auth.dtos';
import { HydratedDocument, Require_id } from 'mongoose';

export class AuthMongodbRepository implements AuthRepository {
  private toEntity(r: UserDoc & Require_id<UserDoc>): UserEntity {
    return new UserEntity(r._id.toString(), r.fullName, r.username, r.password, r.role, r.kelas, r.jurusan, r.createdAt.toString(), r.updatedAt.toString());
  }

  async create(user: RegisterDTO): Promise<UserEntity | null> {
    const result = new UserModel(user);
    await result.save();

    return result ? this.toEntity(result) : null;
  }
  async findByUsername(username: string): Promise<UserEntity | null> {
    const result = await UserModel.findOne({ username }).lean();

    return result ? this.toEntity(result) : null;
  }
}
