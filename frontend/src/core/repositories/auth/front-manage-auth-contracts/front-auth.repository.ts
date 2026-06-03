import type { FrontAuthLoginDTO, FrontAuthRegisterDTO } from '../../../dto/front-auth.dtos';
import type { FrontAuthLoginResponse, FrontUserEntity } from '../../../entities/front-user.entity';

export interface FrontAuthRepository {
  register(user: FrontAuthRegisterDTO): Promise<FrontUserEntity>;
  login(user: FrontAuthLoginDTO): Promise<FrontAuthLoginResponse>;
  logout(): Promise<unknown>;
  checkAuthUser(): Promise<FrontAuthLoginResponse | null>;
}
