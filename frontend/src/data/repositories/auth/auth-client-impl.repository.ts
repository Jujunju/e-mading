import type { FrontAuthRepository } from '../../../core/repositories/auth/front-manage-auth-contracts/front-auth.repository';
import { axiosInstance } from '../../sources/axios-instance';
import type { FrontAuthLoginDTO, FrontAuthRegisterDTO, FrontAuthLoginResponseDTO } from '../../../core/dto/front-auth.dtos';
import { handleApiError } from '../../errors/error-handler';
import type { FrontUserEntity } from '../../../core/entities/front-user.entity';

export class AuthClientImplRepository implements FrontAuthRepository {
  async register(user: FrontAuthRegisterDTO): Promise<FrontUserEntity> {
    try {
      const response = await axiosInstance.post('/auth/register', user);
      return response.data?.data;
    } catch (error) {
      throw new Error(handleApiError(error));
    }
  }
  async login(user: FrontAuthLoginDTO): Promise<FrontAuthLoginResponseDTO> {
    try {
      const response = await axiosInstance.post('/auth/login', user);
      return response.data?.data;
    } catch (error) {
      throw new Error(handleApiError(error));
    }
  }
}
