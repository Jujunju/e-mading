import type { FrontAuthLoginDTO } from '../../../dto/front-auth.dtos';
import type { FrontAuthLoginResponse } from '../../../entities/front-user.entity';

export interface FrontAuthRepository {
  login(user: FrontAuthLoginDTO): Promise<FrontAuthLoginResponse>;
  logout(): Promise<unknown>;
  checkAuthUser(): Promise<FrontAuthLoginResponse | null>;
}
