import { UseCaseBase } from '../../../../base/use-case.base';
import { CommentDTO } from '../../../../dtos/comment/comment.dtos';
import { UserCommentRepository } from '../../../../repositories/mading/client/user-comment-contracts/u-comment.repository';
import { CommentEntity } from '../../../../entities/comment.entity';
import { randomId } from '../../../../../infrastructure/helpers/set-time-id';

export class CreateCommentUseCase implements UseCaseBase<CommentDTO, void> {
  constructor(private userCommentRepository: UserCommentRepository) {}
  async execute(input: CommentDTO): Promise<void> {
    const newComment = new CommentEntity(randomId(), input.userId, input.madingId, input.isiKomentar);
    await this.userCommentRepository.create(newComment);
  }
}
