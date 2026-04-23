import { UseCaseBase } from '../../../../base/use-case.base';
import { UserCommentRepository } from '../../../../repositories/mading/clients/user-comment-contracts/u-comment.repository';
import { CommentEntity } from '../../../../entities/comment.entity';
import { AppError } from '../../../../errors/app.error';

export class EditCommentUseCase implements UseCaseBase<any, CommentEntity> {
  constructor(private userCommentRepository: UserCommentRepository) {}
  async execute(input: any): Promise<CommentEntity> {
    try {
      const response = await this.userCommentRepository.editComment(input.id, input.body);

      if (!response) {
        throw new AppError('Gagal memperbarui data komentar', 400);
      }

      return response;
    } catch (error) {
      if (error instanceof AppError) throw error;

      throw new AppError('Terjadi kesalahan saat menyimpan komentar', 500);
    }
  }
}
