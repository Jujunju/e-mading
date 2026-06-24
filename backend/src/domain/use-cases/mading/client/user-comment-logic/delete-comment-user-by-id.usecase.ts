import { UseCaseBase } from '../../../../base/use-case.base';
import { AppError } from '../../../../errors/app.error';
import { UserCommentRepository } from '../../../../repositories/mading/client/user-comment-contracts/u-comment.repository';

export class DeleteCommentByIdUseCase implements UseCaseBase<string, boolean> {
  constructor(private userCommentRepository: UserCommentRepository) {}
  async execute(input: string): Promise<boolean> {
    const response = await this.userCommentRepository.deleteCommentById(input);

    if(!response) {
      throw new AppError('Data komentar tidak ditemukan', 404)
    }

    return true
  }
}
