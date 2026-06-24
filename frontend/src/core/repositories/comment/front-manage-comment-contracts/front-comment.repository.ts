import type { FrontCommentEntity } from "../../../entities/front-comment.entity";

export interface CommentRepository {
  getAllComment(): Promise<FrontCommentEntity[]>;
  deleteCommentById(id: string): Promise<void>;
}