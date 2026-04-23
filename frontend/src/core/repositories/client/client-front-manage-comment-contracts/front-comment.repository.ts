import type { FrontCommentDTO } from "../../../dto/front-comment.dtos";
import type { FrontCommentEntity } from "../../../entities/front-comment.entity";

export interface ClientCommentRepository {
  create(data: FrontCommentDTO): Promise<void>;
  editComment(id: string, data: FrontCommentDTO): Promise<void>;
  getComment(): Promise<FrontCommentEntity[]>;
}