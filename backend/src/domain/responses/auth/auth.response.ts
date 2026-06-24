import { UserEntity } from '../../entities/user.entity';

export class LoginResponse {
  constructor(
    public readonly user: Omit<UserEntity, 'password'>,
    public readonly token: string,
  ) {}
}
