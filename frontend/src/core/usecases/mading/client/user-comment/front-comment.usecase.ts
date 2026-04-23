import type { FrontCommentDTO } from '../../../../dto/front-comment.dtos';
import type { ClientCommentRepository } from '../../../../repositories/client/client-front-manage-comment-contracts/front-comment.repository';

export class FrontCommentUseCase {
  clientCommentRepository: ClientCommentRepository;
  constructor(clientCommentRepository: ClientCommentRepository) {
    this.clientCommentRepository = clientCommentRepository;
  }

  async execute(data: FrontCommentDTO) {
    return await this.clientCommentRepository.create(data);
  }
}
