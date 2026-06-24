import { CommentEntity } from "../../../entities/comment.entity";

export interface CommentRepository {
  findCommentById(id: string): Promise<CommentEntity[]>;
}