import { UseCaseBase } from '../../../../base/use-case.base';
import { CommentEntity } from '../../../../entities/comment.entity';
import { UserCommentRepository } from '../../../../repositories/mading/client/user-comment-contracts/u-comment.repository';

export class GetAllCommentUseCase implements UseCaseBase<void, CommentEntity[]> {
  constructor(private userCommentRepository: UserCommentRepository) {}
  async execute(): Promise<CommentEntity[]> {
    return await this.userCommentRepository.getAllComment();
  }
}
