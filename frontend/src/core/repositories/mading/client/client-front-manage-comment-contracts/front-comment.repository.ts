import type { FrontCommentDTO } from "../../../../dto/front-comment.dtos";

export interface ClientCommentRepository {
  create(data: FrontCommentDTO): Promise<void>;
  updateComment(id: string, data: FrontCommentDTO): Promise<void>;
}