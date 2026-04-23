import { CommentEntity } from "../../../../entities/comment.entity";

export interface CommentRepository {
  getCommentById(id: string): Promise<CommentEntity[] | null>;
}