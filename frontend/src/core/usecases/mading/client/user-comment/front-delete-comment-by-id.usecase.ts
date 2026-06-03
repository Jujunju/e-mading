import type { ClientCommentRepository } from '../../../../repositories/client/client-front-manage-comment-contracts/front-comment.repository';

export class FrontDeleteCommentByIdUseCase {
  clientCommentRepository: ClientCommentRepository;
  constructor(clientCommentRepository: ClientCommentRepository) {
    this.clientCommentRepository = clientCommentRepository;
  }

  async execute(id: string) {
    return await this.clientCommentRepository.deleteCommentById(id);
  }
}
