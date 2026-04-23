import type { AdminCommentRepository } from "../../../../repositories/admin/front-manage-comment-contracts/front-comment.repository";

export class FrontGetDetailCommentUseCase {
  adminCommentRepository: AdminCommentRepository;
  constructor(adminCommentRepository: AdminCommentRepository) {
    this.adminCommentRepository = adminCommentRepository;
  }

  async execute(id: string) {
    return await this.adminCommentRepository.getCommentById(id);
  }
}