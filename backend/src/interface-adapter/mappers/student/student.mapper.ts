import { UserEntity } from '../../../domain/entities/user.entity';
import { UserDoc } from '../../../infrastructure/databases/mongodb/types/user/user-doc.types';

export class StudentMapper {
  static toEntity(user: UserDoc): UserEntity {
    return new UserEntity(user.id, user.fullName, user.username, user.password, user.role, user.kelas, user.jurusan, user.createdAt, user.updatedAt);
  }
  static toListEntity(user: UserDoc[]): UserEntity[] {
    return user.map((u) => this.toEntity(u));
  }
}
