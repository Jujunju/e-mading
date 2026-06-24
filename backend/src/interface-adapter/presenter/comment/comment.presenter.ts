import { CommentEntity } from '../../../domain/entities/comment.entity';

export class CommentPresenter {
  static toResponse(entity: CommentEntity) {
    return {
      id: entity.id,
      userId: entity.userId,
      madingId: entity.madingId,
      isiKomentar: entity.isiKomentar,
      fullName: entity.fullName,
      role: entity.role,
      judul: entity.judul,
      createdAt: entity.createdAt?.toLocaleString('id-ID', {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      }),
      updatedAt: entity.updatedAt?.toLocaleString('id-ID', {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      }),
    };
  }

  static toListResponse(entity: CommentEntity[]) {
    return entity.map((comment) => this.toResponse(comment));
  }
}
