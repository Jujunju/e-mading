import type { FrontUserEntity } from '../../../../../core/entities/front-user.entity';
import type { FrontStudentRepository } from '../../../../../core/repositories/mading/admin/front-manage-student-contracts/front-student.repository';
import { handleApiError } from '../../../../errors/error-handler';
import { axiosInstance } from '../../../../sources/axios-instance';

export class FrontStudentImplRepository implements FrontStudentRepository {
  async getAllStudent(): Promise<FrontUserEntity[] | null> {
    try {
      const response = await axiosInstance.get('/student');
      return response.data?.data;
    } catch (error) {
      throw new Error(handleApiError(error));
    }
  }
  async getStudentById(id: string): Promise<FrontUserEntity | null> {
    try {
      const response = await axiosInstance.get(`/student/${id}`);
      return response.data?.data;
    } catch (error) {
      throw new Error(handleApiError(error));
    }
  }

  async deleteStudentById(id: string): Promise<void> {
    try {
      const response = await axiosInstance.delete(`/student/${id}`);
      return response.data?.data;
    } catch (error) {
      throw new Error(handleApiError(error));
    }
  }

  async bulkDeleteStudentByIds(ids: string[]): Promise<void> {
    try {
      const response = await axiosInstance.delete(`/student/bulk`, { data: { ids } });
      return response.data?.data;
    } catch (error) {
      throw new Error(handleApiError(error));
    }
  }
}