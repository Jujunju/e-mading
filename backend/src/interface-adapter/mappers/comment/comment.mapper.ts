import { CommentEntity } from '../../../domain/entities/comment.entity';
import { AggregateTypeDoc } from '../../../infrastructure/databases/mongodb/types/comment/comment-populated.types';

export class CommentMapper {
  static toEntity(data: AggregateTypeDoc): CommentEntity {
    return new CommentEntity(data.id, data.userId, data.madingId, data.isiKomentar, data.fullName, data.role, data.judul, data.createdAt);
  }
  static toListEntity(data: AggregateTypeDoc[]): CommentEntity[] {
    return data.map((comment) => this.toEntity(comment));
  }
}
