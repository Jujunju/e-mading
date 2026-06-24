import type { FrontCreateUserDTO } from '../../../core/dto/front-user.dtos';
import type { FrontUserEntity } from '../../../core/entities/front-user.entity';
import type { FrontUserRepository } from '../../../core/repositories/user/front-manage-user-contract/front-user.repository';
import { handleApiError } from '../../errors/error-handler';
import { axiosInstance } from '../../sources/axios-instance';

export class UserImplRepository implements FrontUserRepository {
  async create(user: FrontCreateUserDTO): Promise<FrontUserEntity> {
    try {
      const response = await axiosInstance.post('/users', user);
      return response.data?.data;
    } catch (error) {
      throw new Error(handleApiError(error));
    }
  }
}
