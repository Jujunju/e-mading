import { CommentEntity } from '../../../../entities/comment.entity';
import { CommentDTO } from '../../../../../interface-adapters/dtos/comment/comment.dtos';

export interface UserCommentRepository {
  create(data: CommentDTO): Promise<CommentEntity | null>;
  editComment(id: string, data: CommentDTO): Promise<CommentEntity | null>;
  getDetailComment(): Promise<CommentEntity[] | null>;
  deleteComment(id: string): Promise<CommentEntity | null>;
}
