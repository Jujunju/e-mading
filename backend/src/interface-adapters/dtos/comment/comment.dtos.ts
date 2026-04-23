import { CommentEntity } from '../../../domain/entities/comment.entity';

export class CommentDTO implements Pick<CommentEntity, 'userId' | 'madingId' | 'isiKomentar'> {
  constructor(
    public readonly userId: string,
    public readonly madingId: string,
    public readonly isiKomentar: string,
  ) {}
}
