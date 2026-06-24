import type { CommentRepository } from "../../../repositories/comment/front-manage-comment-contracts/front-comment.repository";

export class FrontDeleteCommentByIdUseCase {
  commentRepository: CommentRepository;
  constructor(commentRepository: CommentRepository) {
    this.commentRepository = commentRepository;
  }

  async execute(id: string) {
    return await this.commentRepository.deleteCommentById(id);
  }
}
