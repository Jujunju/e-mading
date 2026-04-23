import { UserEntity } from "../../entities/user.entity";
import { RegisterDTO } from "../../../interface-adapters/dtos/auth/auth.dtos";

export interface AuthRepository {
    create(user: RegisterDTO): Promise<UserEntity | null>
    findByUsername(username: string): Promise<UserEntity | null>
}