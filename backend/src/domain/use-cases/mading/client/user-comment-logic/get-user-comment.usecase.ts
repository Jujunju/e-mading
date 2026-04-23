import { UseCaseBase } from '../../../../base/use-case.base';
import { CommentEntity } from '../../../../entities/comment.entity';
import { AppError } from '../../../../errors/app.error';
import { UserCommentRepository } from '../../../../repositories/mading/clients/user-comment-contracts/u-comment.repository';

export class GetCommentUseCase implements UseCaseBase<void, CommentEntity[]> {
  constructor(private userCommentRepository: UserCommentRepository) {}
  async execute(input: void): Promise<CommentEntity[]> {
    try {
      const response = await this.userCommentRepository.getDetailComment();

      if (!response) {
        throw new AppError('Tidak ada data', 500);
      }

      return response;
    } catch (error) {
      if (error instanceof AppError) throw error;

      throw new AppError('Terjadi kesalahan saat menyimpan komentar', 500);
    }
  }
}
