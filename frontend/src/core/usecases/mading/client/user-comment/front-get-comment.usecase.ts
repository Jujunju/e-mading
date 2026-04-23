import type { ClientCommentRepository } from "../../../../repositories/client/client-front-manage-comment-contracts/front-comment.repository";

export class FrontGetCommentUseCase {
  clientCommentRepository: ClientCommentRepository;
  constructor(clientCommentRepository: ClientCommentRepository) {
    this.clientCommentRepository = clientCommentRepository;
  }

  async execute() {
    return await this.clientCommentRepository.getComment();
  }
}