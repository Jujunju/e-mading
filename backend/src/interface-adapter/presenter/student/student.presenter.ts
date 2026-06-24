import { UserEntity } from '../../../domain/entities/user.entity';

export class StudentPresenter {
  static toResponse(entity: UserEntity) {
    return {
      id: entity.id,
      fullName: entity.fullName,
      username: entity.username,
      role: entity.role,
      kelas: entity.kelas,
      jurusan: entity.jurusan,
      createdAt: entity.createdAt?.toLocaleString('id-ID', { day: '2-digit', month: 'short', year: 'numeric' }),
      updatedAt: entity.updatedAt?.toLocaleString('id-ID', { day: '2-digit', month: 'short', year: 'numeric' }),
    };
  }

  static toListResponse(entity: UserEntity[]) {
    return entity.map((user) => this.toResponse(user));
  }
}
