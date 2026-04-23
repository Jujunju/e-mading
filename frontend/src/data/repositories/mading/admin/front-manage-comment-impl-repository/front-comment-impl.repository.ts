import type { FrontCommentEntity } from '../../../../../core/entities/front-comment.entity';
import type { AdminCommentRepository } from '../../../../../core/repositories/admin/front-manage-comment-contracts/front-comment.repository';
import { handleApiError } from '../../../../errors/error-handler';
import { axiosInstance } from '../../../../sources/axios-instance';

export class AdminFrontCommentImplRepository implements AdminCommentRepository {
  async getCommentById(id: string): Promise<FrontCommentEntity[]> {
    try {
      const response = await axiosInstance.get(`/admin-comment/${id}`);
      return response.data?.data;
    } catch (error) {
      throw new Error(handleApiError(error));
    }
  }
  async deleteComment(id: string): Promise<void> {
    try {
      const response = await axiosInstance.delete(`/comment/${id}`);
      return response.data?.data;
    } catch (error) {
      throw new Error(handleApiError(error));
    }
  }
}
