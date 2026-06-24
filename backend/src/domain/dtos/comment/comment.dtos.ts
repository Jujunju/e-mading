import { CommentEntity } from '../../../domain/entities/comment.entity';

export class CommentDTO implements Pick<CommentEntity, 'userId' | 'madingId' | 'isiKomentar'> {
  constructor(
    public readonly userId: string,
    public readonly madingId: string,
    public readonly isiKomentar: string,
  ) {}
}

export class UpdateCommentInput {
  constructor(
    public id: string,
    public dto: CommentDTO,
  ) {}
}
