import type { FrontMadingRepository } from '../../../../../core/repositories/admin/front-manage-mading-contracts/front-mading.repository';
import { axiosInstance } from '../../../../sources/axios-instance';
import { handleApiError } from '../../../../errors/error-handler';
import type { FrontMadingEntity } from '../../../../../core/entities/front-mading.entity';
import type { FrontMadingDTO } from '../../../../../core/dto/front-mading.dto';

export class FrontMadingImplRepository implements FrontMadingRepository {
  async createMading(data: FormData): Promise<void> {
    try {
      const response = await axiosInstance.post('/mading', data);
      return response.data?.data;
    } catch (error) {
      throw new Error(handleApiError(error));
    }
  }

  async findMadingById(id: string): Promise<FrontMadingEntity | null> {
    try {
      const response = await axiosInstance.get(`/mading/${id}`);
      return response.data?.data;
    } catch (error) {
      throw new Error(handleApiError(error));
    }
  }

  async updateMadingById(id: string, data: FrontMadingDTO): Promise<void> {
    try {
      const response = await axiosInstance.put(`/mading/${id}`, data);
      return response.data?.data;
    } catch (error) {
      throw new Error(handleApiError(error));
    }
  }

  async getMading(): Promise<FrontMadingEntity[] | null> {
    try {
      const response = await axiosInstance.get('/mading');
      return response.data?.data;
    } catch (error) {
      throw new Error(handleApiError(error));
    }
  }

  async deleteMadingById(id: string): Promise<void> {
    try {
      const response = await axiosInstance.delete(`/mading/${id}`);
      return response.data?.data;
    } catch (error) {
      throw new Error(handleApiError(error));
    }
  }

  async deleteAllMading(ids: string[]): Promise<void> {
    try {
      const response = await axiosInstance.delete('/mading/bulk', { data: { ids } });
      return response.data?.data;
    } catch (error) {
      throw new Error(handleApiError(error));
    }
  }
}
