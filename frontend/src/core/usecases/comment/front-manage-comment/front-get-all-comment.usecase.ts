import type { CommentRepository } from "../../../repositories/comment/front-manage-comment-contracts/front-comment.repository";

export class FrontGetAllCommentUseCase {
  commentRepository: CommentRepository;
  constructor(commentRepository: CommentRepository) {
    this.commentRepository = commentRepository;
  }

  async execute() {
    return await this.commentRepository.getAllComment();
  }
}