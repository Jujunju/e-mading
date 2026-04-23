import { UseCaseBase } from '../../../../base/use-case.base';
import { CommentEntity } from '../../../../entities/comment.entity';
import { AppError } from '../../../../errors/app.error';
import { CommentRepository } from '../../../../repositories/mading/admins/manage-comment-contracts/comment.repository';

export class GetCommentByIdUseCase implements UseCaseBase<string, CommentEntity[]> {
  constructor(private commentRepository: CommentRepository) {}

  async execute(input: string): Promise<CommentEntity[]> {
    try {
      const response = await this.commentRepository.getCommentById(input);
      
      if (!response) {
        throw new AppError('Data komentar tidak ditemukan', 404);
      }

      return response;
    } catch (error) {
      if (error instanceof AppError) throw error;

      throw new AppError('Terjadi kesalahan saat mengambil data komentar', 500);
    }
  }
}
