import type { FrontCommentEntity } from '../../../../../core/entities/front-comment.entity';
import type { CommentRepository } from '../../../../../core/repositories/comment/front-manage-comment-contracts/front-comment.repository';
import { handleApiError } from '../../../../errors/error-handler';
import { axiosInstance } from '../../../../sources/axios-instance';

export class FrontCommentImplRepository implements CommentRepository {
  async getAllComment(): Promise<FrontCommentEntity[]> {
    try {
      const response = await axiosInstance.get(`/client-comment`);
      return response.data?.data;
    } catch (error) {
      throw new Error(handleApiError(error));
    }
  }
  async deleteCommentById(id: string): Promise<void> {
    try {
      const response = await axiosInstance.delete(`/comment/${id}`);
      return response.data?.data;
    } catch (error) {
      throw new Error(handleApiError(error));
    }
  }
}
