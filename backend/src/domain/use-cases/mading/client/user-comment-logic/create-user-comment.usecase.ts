import { UseCaseBase } from '../../../../base/use-case.base';
import { CommentDTO } from '../../../../dtos/comment/comment.dtos';
import { UserCommentRepository } from '../../../../repositories/mading/clients/user-comment-contracts/u-comment.repository';
import { CommentEntity } from '../../../../entities/comment.entity';
import { AppError } from '../../../../errors/app.error';

export class CreateCommentUseCase implements UseCaseBase<CommentDTO, CommentEntity> {
  constructor(private userCommentRepository: UserCommentRepository) {}
  async execute(input: CommentDTO): Promise<CommentEntity> {
    try {
      const response = await this.userCommentRepository.create(input);

      if (!response) {
        throw new AppError('Gagal menyimpan data komentar', 400);
      }

      return response;
    } catch (error) {
      if (error instanceof AppError) throw error;

      throw new AppError('Terjadi kesalahan saat menyimpan komentar', 500);
    }
  }
}
