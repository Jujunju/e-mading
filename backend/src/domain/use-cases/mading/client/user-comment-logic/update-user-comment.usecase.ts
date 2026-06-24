import { UseCaseBase } from '../../../../base/use-case.base';
import { UserCommentRepository } from '../../../../repositories/mading/client/user-comment-contracts/u-comment.repository';
import { AppError } from '../../../../errors/app.error';
import { UpdateCommentInput } from '../../../../dtos/comment/comment.dtos';

export class UpdateCommentUseCase implements UseCaseBase<UpdateCommentInput, boolean> {
  constructor(private userCommentRepository: UserCommentRepository) {}
  async execute(input: UpdateCommentInput): Promise<boolean> {
    const {id, dto} = input
    const response = await this.userCommentRepository.updateComment(id, dto);

    if (!response) {
      throw new AppError('Gagal memperbarui data komentar', 400);
    }

    return response;
  }
}
