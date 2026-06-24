import { UserEntity } from "../../../entities/user.entity";

export interface UserRepository {
    create(user: UserEntity): Promise<void>
    findByUsername(username: string): Promise<UserEntity | null>
}