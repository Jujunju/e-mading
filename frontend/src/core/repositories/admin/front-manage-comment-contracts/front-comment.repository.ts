import type { FrontCommentEntity } from "../../../entities/front-comment.entity";

export interface AdminCommentRepository {
  getCommentById(id: string): Promise<FrontCommentEntity[]>;
  deleteComment(id: string): Promise<void>;
}