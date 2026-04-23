import { UseCaseBase } from '../../../../base/use-case.base';
import { AppError } from '../../../../errors/app.error';
import { UserCommentRepository } from '../../../../repositories/mading/clients/user-comment-contracts/u-comment.repository';

export class DeleteCommentUseCase implements UseCaseBase<string, void> {
  constructor(private userCommentRepository: UserCommentRepository) {}
  async execute(input: string): Promise<void> {
    try {
      await this.userCommentRepository.deleteComment(input);
    } catch (error) {
      if (error instanceof AppError) throw error;

      throw new AppError('Terjadi kesalahan saat menyimpan komentar', 500);
    }
  }
}
