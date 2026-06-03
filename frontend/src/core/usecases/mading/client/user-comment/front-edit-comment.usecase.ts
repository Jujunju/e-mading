import type { FrontCommentDTO } from '../../../../dto/front-comment.dtos';
import type { ClientCommentRepository } from '../../../../repositories/client/client-front-manage-comment-contracts/front-comment.repository';

export class FrontEditCommentByIdUseCase {
  clientCommentRepository: ClientCommentRepository;
  constructor(clientCommentRepository: ClientCommentRepository) {
    this.clientCommentRepository = clientCommentRepository;
  }

  async execute(id: string, data: FrontCommentDTO) {
    return await this.clientCommentRepository.editComment(id, data);
  }
}