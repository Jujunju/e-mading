import type { FrontAuthLoginDTO, FrontAuthLoginResponseDTO, FrontAuthRegisterDTO } from "../../../dto/front-auth.dtos";
import type { FrontUserEntity } from "../../../entities/front-user.entity";

export interface FrontAuthRepository {
  register(user: FrontAuthRegisterDTO): Promise<FrontUserEntity>;
  login(user: FrontAuthLoginDTO): Promise<FrontAuthLoginResponseDTO>;
}