
import type { FrontMadingEntity } from '../../../../../core/entities/front-mading.entity';
import type { ClientFrontUserMadingRepository } from '../../../../../core/repositories/client/client-front-user-mading-contracts/front-user-mading.repository';
import { handleApiError } from '../../../../errors/error-handler';
import { axiosInstance } from '../../../../sources/axios-instance';

export class ClientFrontUserMadingImplRepository implements ClientFrontUserMadingRepository {
  async findMadingBySlug(slug: string): Promise<FrontMadingEntity[] | null> {
    try {
      const response = await axiosInstance.get(`/mading/slug/${slug}`);
      return response.data?.data;
    } catch (error) {
      throw new Error(handleApiError(error));
    }
  }
}
