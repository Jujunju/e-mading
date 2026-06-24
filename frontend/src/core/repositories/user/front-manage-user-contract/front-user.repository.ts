import type { FrontCreateUserDTO } from '../../../dto/front-user.dtos';
import type { FrontUserEntity } from '../../../entities/front-user.entity';

export interface FrontUserRepository {
  create(user: FrontCreateUserDTO): Promise<FrontUserEntity>;
}
