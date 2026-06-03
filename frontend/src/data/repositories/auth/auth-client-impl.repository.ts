import type { FrontAuthRepository } from '../../../core/repositories/auth/front-manage-auth-contracts/front-auth.repository';
import { axiosInstance } from '../../sources/axios-instance';
import type { FrontAuthLoginDTO, FrontAuthRegisterDTO } from '../../../core/dto/front-auth.dtos';
import { handleApiError } from '../../errors/error-handler';
import type { FrontAuthLoginResponse, FrontUserEntity } from '../../../core/entities/front-user.entity';

export class AuthClientImplRepository implements FrontAuthRepository {
  async register(user: FrontAuthRegisterDTO): Promise<FrontUserEntity> {
    try {
      const response = await axiosInstance.post('/auth/register', user);
      return response.data?.data;
    } catch (error) {
      throw new Error(handleApiError(error));
    }
  }
  async login(user: FrontAuthLoginDTO): Promise<FrontAuthLoginResponse> {
    try {
      const response = await axiosInstance.post('/auth/login', user);
      return response.data?.data;
    } catch (error) {
      throw new Error(handleApiError(error));
    }
  }

  async logout(): Promise<unknown> {
    try {
      const response = await axiosInstance.get('/auth/logout');

      return response.data?.message;
    } catch (error) {
      throw new Error(handleApiError(error));
    }
  }

  async checkAuthUser(signal?: AbortSignal): Promise<FrontAuthLoginResponse | null> {
    try {
      const response = await axiosInstance.post('/auth/me', {}, { signal: signal });

      return response.data?.data?.user || response.data;
    } catch (error) {
      if (error instanceof Error) {
        if (error.name === 'AbortError' || error.name === 'CanceledError') {
          throw error;
        }
      }
      throw null;
    }
  }
}
