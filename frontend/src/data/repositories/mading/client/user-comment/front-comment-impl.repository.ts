import type { FrontCommentDTO } from '../../../../../core/dto/front-comment.dtos';
import type { FrontCommentEntity } from '../../../../../core/entities/front-comment.entity';
import type { ClientCommentRepository } from '../../../../../core/repositories/client/client-front-manage-comment-contracts/front-comment.repository';
import { handleApiError } from '../../../../errors/error-handler';
import { axiosInstance } from '../../../../sources/axios-instance';

export class ClientFrontCommentImplRepository implements ClientCommentRepository {
  async create(data: FrontCommentDTO): Promise<void> {
    try {
      const response = await axiosInstance.post('/client-comment', data);
      return response.data?.data;
    } catch (error) {
      throw new Error(handleApiError(error));
    }
  }
  async editComment(id: string, data: FrontCommentDTO): Promise<void> {
    try {
      const response = await axiosInstance.put(`/client-comment/${id}`, data);
      return response.data?.data;
    } catch (error) {
      throw new Error(handleApiError(error));
    }
  }

  async getComment(): Promise<FrontCommentEntity[]> {
    try {
      const response = await axiosInstance.get('/client-comment');
      return response.data?.data;
    } catch (error) {
      throw new Error(handleApiError(error));
    }
  }
}
