import { UserRepository } from '../../../../../../domain/repositories/user/user-repository-contracts/user.repository';
import { UserEntity } from '../../../../../../domain/entities/user.entity';
import { UserModel } from '../../../models/user-mongodb.model';
import { UserMapper } from '../../../../../../interface-adapter/mappers/user/user.mapper';

export class UserMongodbRepository implements UserRepository {
  async create(user: UserEntity): Promise<void> {
    const result = new UserModel(user);
    await result.save();
  }
  async findByUsername(username: string): Promise<UserEntity | null> {
    const result = await UserModel.findOne({ username }).lean();

    return result ? UserMapper.toEntity(result) : null;
  }
}
