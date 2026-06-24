import { CommentEntity } from '../../../../entities/comment.entity';
import { CommentDTO } from '../../../../dtos/comment/comment.dtos';

export interface UserCommentRepository {
  create(data: CommentEntity): Promise<void>;
  updateComment(id: string, data: CommentDTO): Promise<boolean>;
  getAllComment(): Promise<CommentEntity[]>;
  deleteCommentById(id: string): Promise<boolean>;
}
